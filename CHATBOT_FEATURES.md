# Chatbot Human Handoff Feature

## Overview

Your VIP concierge chatbot now includes a smart choice system that lets users decide whether they want to chat with:

1. **Cena (AI Assistant)** - Instant answers to common questions about Wynn Las Vegas
2. **Winnie Lee (Human VIP Host)** - Direct contact for personalized VIP services

## How It Works

### Initial Greeting

When a user opens the chatbot, they see a welcome message with two prominent buttons:

```
Welcome to Wynn VIP Concierge!
How would you like to proceed?

[🤖 Chat with Cena (AI Assistant)]
[👤 Speak with Winnie Lee (Human)]
```

### AI Assistant Mode

When users choose **Cena (AI Assistant)**:
- They can ask questions about Wynn Rewards, dining, rooms, entertainment, etc.
- Get instant AI-powered responses
- Can switch to human mode anytime using the "Switch Mode" button

### Human VIP Mode

When users choose **Winnie Lee (Human)**:
- They see Winnie's contact information prominently displayed
- Message includes:
  - Email: lovepicaso888@gmail.com
  - Available 24/7 notice
  - List of Winnie's specialties (room reservations, dining, entertainment, etc.)
- Input is disabled (no need to chat - they contact Winnie directly)
- Can return to choice menu using "Back to Options"

## Language Support

The choice interface automatically adapts to the user's language:
- **English**: "Chat with Cena (AI Assistant)" / "Speak with Winnie Lee (Human)"
- **简体中文**: "与Cena对话 (AI助手)" / "与Winnie Lee对话 (人工服务)"
- **繁體中文**: "與Cena對話 (AI助手)" / "與Winnie Lee對話 (人工服務)"
- **日本語**: "Cenaと話す (AIアシスタント)" / "Winnie Leeと話す (人間のサービス)"

## User Flow

```
1. User opens chatbot
   ↓
2. Sees choice: AI or Human
   ↓
3a. Choose AI → Chat with Cena
    - Ask questions
    - Get instant answers
    - Switch mode anytime

3b. Choose Human → See Winnie's contact
    - View email and services
    - Contact directly via email
    - Return to menu if needed
```

## Benefits

### For Quick Questions
Users can get instant answers from the AI without waiting for human response.

### For VIP Services
Users can immediately see Winnie's contact information for personalized service.

### Flexibility
Users can switch between modes at any time based on their needs.

### Reduced Wait Time
Common questions are handled by AI, allowing Winnie to focus on complex VIP requests.

## Technical Details

### State Management
- Chatbot maintains three modes: `choice`, `ai`, `human`
- Mode switching is seamless and preserves conversation context
- Input field is conditionally rendered based on mode

### UI Components
- Beautiful gradient buttons for mode selection
- Icons: 🤖 Bot icon for AI, 👤 User icon for Human
- Smooth transitions and hover effects
- Fully responsive design (mobile, tablet, desktop)

### Message Types
- **system** - Initial choice message
- **normal** - Regular AI responses
- **escalation** - Human contact information (highlighted)
- **user** - User messages

## Customization

You can easily customize:

1. **Button Colors** - Edit the gradient classes in `src/components/ChatBot.tsx`
2. **Winnie's Information** - Update the `getHumanWelcomeMessage()` function
3. **Languages** - Add more languages to the translation objects
4. **AI Behavior** - Modify the chat edge function responses

## Best Practices

### For Users
- Choose AI for general information
- Choose Human for:
  - Room reservations & upgrades
  - Special event planning
  - VIP gaming arrangements
  - Complex requests

### For Business
- Monitor which mode users prefer
- Track conversion rates from AI to Human
- Use AI chat logs to improve responses
- Train Winnie on common questions that bypass AI

## Screenshots

### Choice Screen
Users see two attractive buttons to choose their preferred interaction mode.

### AI Mode
Full chat interface with message history, typing indicator, and "Switch Mode" button.

### Human Mode
Displays Winnie's contact information with a "Back to Options" button.

## Integration with WhatsApp

This feature also works seamlessly with WhatsApp integration (see WHATSAPP_SETUP.md):
- Users can send "talk to human" or "speak to winnie" to get human contact info
- AI automatically detects intent and provides appropriate response
- Same choice system can be implemented in WhatsApp flow

## Future Enhancements

Consider adding:
- **Smart routing** - AI detects complex requests and suggests human contact
- **Appointment booking** - Schedule calls with Winnie directly in chat
- **Live chat** - Real-time chat with Winnie (when online)
- **Hybrid mode** - AI handles initial questions, then hands off to human
- **Analytics** - Track mode preference and conversion metrics
- **CRM Integration** - Log human handoff requests in your CRM
- **Availability indicator** - Show Winnie's online/offline status

## Support

The chatbot works seamlessly across:
- Website (desktop & mobile)
- WhatsApp (when configured)
- All major browsers

For technical support or customization requests, contact your development team.

---

**Last Updated**: January 2026
