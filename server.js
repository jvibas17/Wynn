import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'https://vegasviphost.net',
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message, systemPrompt, language, sessionId } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt || `You are an expert VIP assistant for vegasviphost.net. Your job is to provide accurate, detailed, and helpful answers about VIP casino hosting, Wynn Rewards, hotel bookings, dining reservations, entertainment, spa services, host Winnie Lee, contact info, and all available services provided by VegasVIPHost. Answer professionally as if you are an exclusive concierge.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.3,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      })
    });

    const data = await response.json();

    // Log for monitoring (remove in production)
    console.log(`[${sessionId}] ${language} - User: ${message.substring(0, 100)}...`);
    
    const reply = data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI.',
      fallback: 'I apologize for the technical difficulty. Please contact Winnie Lee directly at lovepicaso888@gmail.com for immediate VIP assistance.'
    });
  }
});

app.listen(PORT, () => console.log(`AI Chatbot server running on port ${PORT}`));