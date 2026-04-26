# WhatsApp Integration Setup Guide

This guide will help you connect your VIP Concierge Chatbot to WhatsApp using Twilio.

## Overview

The chatbot is now configured to receive and respond to WhatsApp messages automatically. All conversations are stored in your Supabase database for tracking and analytics.

## Prerequisites

1. A Twilio account (sign up at https://www.twilio.com/try-twilio)
2. WhatsApp Business approval (through Twilio)
3. Access to your Supabase project dashboard

## Step 1: Create Twilio Account

1. Go to https://www.twilio.com/try-twilio
2. Sign up for a free account (includes trial credits)
3. Verify your email and phone number

## Step 2: Enable WhatsApp Sandbox (For Testing)

For immediate testing, Twilio provides a WhatsApp Sandbox:

1. Log in to your Twilio Console
2. Navigate to **Messaging** → **Try it out** → **Send a WhatsApp message**
3. Follow the instructions to join the sandbox:
   - Send a message to the provided Twilio WhatsApp number
   - Use the join code shown (e.g., "join <your-code>")
4. Note your **Sandbox Phone Number** (format: `whatsapp:+14155238886`)

## Step 3: Get Twilio Credentials

1. In Twilio Console, go to **Account** → **Account Info**
2. Copy the following values:
   - **Account SID** (starts with `AC...`)
   - **Auth Token** (click to reveal)

## Step 4: Configure Supabase Environment Variables

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Settings** → **Edge Functions**
4. Add the following secrets (click "Add new secret"):

   ```
   TWILIO_ACCOUNT_SID=<your-account-sid>
   TWILIO_AUTH_TOKEN=<your-auth-token>
   TWILIO_WHATSAPP_NUMBER=<your-whatsapp-sandbox-number>
   ```

   Example:
   ```
   TWILIO_ACCOUNT_SID=AC1234567890abcdef1234567890abcd
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

## Step 5: Configure Twilio Webhook

1. In Twilio Console, go to **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Scroll to **Sandbox Configuration**
3. Under "When a message comes in", enter your webhook URL:

   ```
   https://<your-project-ref>.supabase.co/functions/v1/whatsapp-webhook
   ```

   Replace `<your-project-ref>` with your actual Supabase project reference (found in your Supabase project URL)

4. Set the method to **POST**
5. Click **Save**

## Step 6: Test the Integration

1. Open WhatsApp on your phone
2. Send a message to your Twilio WhatsApp Sandbox number
3. Send any question about Wynn Las Vegas (e.g., "Tell me about rooms")
4. You should receive an automated response from Cena, your VIP concierge!

## Monitoring & Debugging

### View Conversations in Database

You can view all WhatsApp conversations in your Supabase dashboard:

1. Go to **Table Editor**
2. Check these tables:
   - `whatsapp_conversations` - All active conversations
   - `whatsapp_messages` - Full message history

### Check Logs

1. **Supabase Logs**: Go to **Logs** → **Edge Functions** → Select `whatsapp-webhook`
2. **Twilio Logs**: In Twilio Console, go to **Monitor** → **Logs** → **Messaging**

### Common Issues

**Issue: Not receiving messages**
- Verify webhook URL is correct and includes `/functions/v1/whatsapp-webhook`
- Check that environment variables are set correctly
- Look at Twilio logs for error messages

**Issue: Bot responds but in wrong language**
- The bot auto-detects language based on message content
- It supports English, Chinese (Simplified/Traditional), and Japanese

**Issue: Twilio errors in logs**
- Verify your Auth Token is correct
- Ensure your account has sufficient credits
- Check that WhatsApp number format includes `whatsapp:` prefix

## Production Setup (After Testing)

For production use with your own WhatsApp Business number:

1. **Apply for WhatsApp Business API Access**:
   - In Twilio Console: **Messaging** → **WhatsApp** → **Senders**
   - Click "Request Access"
   - Complete business verification (requires business documents)
   - This process can take 1-2 weeks

2. **Update WhatsApp Number**:
   - Once approved, update `TWILIO_WHATSAPP_NUMBER` with your business number
   - Format: `whatsapp:+1234567890`

3. **Configure Message Templates** (Optional):
   - Create pre-approved message templates in Twilio
   - Required for outbound messages outside 24-hour window

## Features

### Automatic Language Detection
The bot automatically detects and responds in:
- English
- Simplified Chinese (简体中文)
- Traditional Chinese (繁體中文)
- Japanese (日本語)

### Conversation Persistence
All conversations are stored in your database, allowing you to:
- Track customer interactions
- Analyze common questions
- Build conversation history
- Export data for CRM systems

### Multi-User Support
The bot can handle multiple simultaneous conversations with different users, each tracked independently.

## Database Schema

### whatsapp_conversations
- Stores each unique phone number conversation
- Tracks last activity and user preferences
- Stores session data (language, context)

### whatsapp_messages
- Complete message history
- Tracks message status (sent, delivered, read)
- Links messages to conversations

## Security Notes

1. All data is stored in your private Supabase database
2. Row Level Security (RLS) is enabled - only service role can access
3. Twilio credentials are stored as encrypted environment variables
4. Webhook endpoint is public but validates Twilio signatures

## Cost Considerations

### Twilio Pricing (as of 2024):
- WhatsApp messages: ~$0.005 per message
- Free tier includes trial credits
- Sandbox is completely free for testing

### Supabase:
- Database storage and API calls included in your plan
- Edge Functions: Generous free tier

## Support

For issues with:
- **Chatbot responses**: Check the chat edge function logs
- **Message delivery**: Check Twilio console logs
- **Database issues**: Check Supabase logs

## Next Steps

After setting up WhatsApp:
1. Test various types of questions in different languages
2. Monitor initial conversations in the database
3. Adjust message templates if needed
4. Consider adding rich media responses (images, buttons)
5. Set up analytics to track usage patterns

## Advanced Features (Future Enhancements)

Consider implementing:
- Rich media messages (images, location sharing)
- Interactive buttons and quick replies
- Appointment booking through WhatsApp
- Payment links for VIP packages
- Automated follow-ups for special occasions
- Integration with CRM systems

---

**Questions?** Contact support or check the Twilio documentation at https://www.twilio.com/docs/whatsapp
