import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// Initialize Supabase client with service role for database access
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Twilio credentials (set these in Supabase dashboard)
const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
const TWILIO_WHATSAPP_NUMBER = Deno.env.get('TWILIO_WHATSAPP_NUMBER'); // e.g., whatsapp:+14155238886

interface WhatsAppMessage {
  From: string;
  To: string;
  Body: string;
  MessageSid: string;
  ProfileName?: string;
}

// Import chat logic (duplicated from chat function for now)
function detectLanguage(message: string): string {
  const chinesePattern = /[\u4e00-\u9fff]/;
  const japanesePattern = /[\u3040-\u309f\u30a0-\u30ff]/;
  
  if (chinesePattern.test(message)) {
    return message.includes('繁') || message.includes('台') || message.includes('灣') || 
           message.includes('臺') ? 'zh-tw' : 'zh';
  }
  if (japanesePattern.test(message)) {
    return 'ja';
  }
  return 'en';
}

// Get or create conversation
async function getOrCreateConversation(phoneNumber: string, userName?: string) {
  // Check if conversation exists
  const { data: existing } = await supabase
    .from('whatsapp_conversations')
    .select('*')
    .eq('phone_number', phoneNumber)
    .maybeSingle();

  if (existing) {
    // Update last message time
    await supabase
      .from('whatsapp_conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', existing.id);
    return existing;
  }

  // Create new conversation
  const { data: newConv } = await supabase
    .from('whatsapp_conversations')
    .insert({
      phone_number: phoneNumber,
      user_name: userName,
      session_data: { language: 'en' }
    })
    .select()
    .single();

  return newConv;
}

// Store message in database
async function storeMessage(
  conversationId: string,
  direction: 'inbound' | 'outbound',
  content: string,
  fromNumber: string,
  toNumber: string,
  messageSid?: string
) {
  await supabase
    .from('whatsapp_messages')
    .insert({
      conversation_id: conversationId,
      message_sid: messageSid,
      direction,
      content,
      from_number: fromNumber,
      to_number: toNumber,
      status: 'sent'
    });
}

// Generate bot response using existing chat API
async function generateResponse(message: string, language: string): Promise<string> {
  try {
    // Call the existing chat edge function
    const chatUrl = `${supabaseUrl}/functions/v1/chat`;
    const response = await fetch(chatUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        message,
        language,
        sessionId: `whatsapp_${Date.now()}`
      })
    });

    const data = await response.json();
    return data.reply || 'I apologize, but I\'m having trouble responding right now. Please contact Winnie Lee at lovepicaso888@gmail.com for immediate assistance.';
  } catch (error) {
    console.error('Error generating response:', error);
    return 'I apologize for the technical difficulty. Please contact Winnie Lee at lovepicaso888@gmail.com for immediate VIP assistance.';
  }
}

// Send WhatsApp message via Twilio
async function sendWhatsAppMessage(to: string, message: string): Promise<string | null> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_WHATSAPP_NUMBER) {
    console.error('Twilio credentials not configured');
    return null;
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    
    const formData = new URLSearchParams();
    formData.append('From', TWILIO_WHATSAPP_NUMBER);
    formData.append('To', to);
    formData.append('Body', message);

    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data = await response.json();
    
    if (response.ok) {
      return data.sid;
    } else {
      console.error('Twilio error:', data);
      return null;
    }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return null;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // Parse incoming webhook from Twilio (form-urlencoded)
    const formData = await req.formData();
    const message: WhatsAppMessage = {
      From: formData.get('From') as string,
      To: formData.get('To') as string,
      Body: formData.get('Body') as string,
      MessageSid: formData.get('MessageSid') as string,
      ProfileName: formData.get('ProfileName') as string,
    };

    console.log('Received WhatsApp message:', message);

    // Get or create conversation
    const conversation = await getOrCreateConversation(
      message.From,
      message.ProfileName
    );

    if (!conversation) {
      throw new Error('Failed to create/get conversation');
    }

    // Store incoming message
    await storeMessage(
      conversation.id,
      'inbound',
      message.Body,
      message.From,
      message.To,
      message.MessageSid
    );

    // Detect language
    const language = detectLanguage(message.Body);

    // Update conversation language if detected
    if (language !== 'en') {
      await supabase
        .from('whatsapp_conversations')
        .update({ 
          session_data: { ...conversation.session_data, language } 
        })
        .eq('id', conversation.id);
    }

    // Generate response
    const botReply = await generateResponse(message.Body, language);

    // Send response via Twilio
    const messageSid = await sendWhatsAppMessage(message.From, botReply);

    // Store outbound message
    await storeMessage(
      conversation.id,
      'outbound',
      botReply,
      message.To,
      message.From,
      messageSid || undefined
    );

    // Respond to Twilio with TwiML (empty response - we already sent the message)
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/xml',
        },
      }
    );
  } catch (error) {
    console.error('Error processing WhatsApp webhook:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});