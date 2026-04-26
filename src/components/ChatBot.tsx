import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Minimize2, Crown, Sparkles, AlertTriangle, Shield, User, Bot, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
  type?: 'normal' | 'escalation' | 'error' | 'warning' | 'choice';
}

interface ChatBotProps {
  onClose?: () => void;
  onOpenWhatsApp?: () => void;
}

type ChatMode = 'choice' | 'ai' | 'human' | 'whatsapp-choice';

export function ChatBot({ onClose, onOpenWhatsApp }: ChatBotProps) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [chatMode, setChatMode] = useState<ChatMode>('choice');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasGreeted) {
        setShowWelcome(true);
        setHasGreeted(true);
        setTimeout(() => setShowWelcome(false), 6000);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasGreeted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      en: "Welcome to Wynn VIP Concierge! How would you like to proceed?",
      zh: "欢迎来到永利VIP礼宾服务！您希望如何继续？",
      'zh-tw': "歡迎來到永利VIP禮賓服務！您希望如何繼續？",
      ja: "ウィンVIPコンシェルジュへようこそ！どのように進めますか？"
    };
    return welcomeMessages[language] || welcomeMessages.en;
  };

  const getAIWelcomeMessage = () => {
    const messages = {
      en: "Hello! I'm Cena, your AI VIP concierge assistant. I can help you with information about Wynn Rewards, dining, entertainment, accommodations, and more. How may I assist you today?",
      zh: "您好！我是Cena，您的AI VIP礼宾助手。我可以帮助您了解永利奖励、餐饮、娱乐、住宿等信息。今天我可以为您做些什么？",
      'zh-tw': "您好！我是Cena，您的AI VIP禮賓助手。我可以幫助您了解永利獎勵、餐飲、娛樂、住宿等信息。今天我可以為您做些什麼？",
      ja: "こんにちは！私はCena、あなたのAI VIPコンシェルジュアシスタントです。ウィンリワード、ダイニング、エンターテイメント、宿泊施設などについてお手伝いできます。本日はいかがお手伝いできますでしょうか？"
    };
    return messages[language] || messages.en;
  };

  const getHumanWelcomeMessage = () => {
    const messages = {
      en: "Perfect! I'll connect you with Winnie Lee, your personal VIP host.\n\n📧 Email: lovepicaso888@gmail.com\n📱 Available 24/7 for VIP services\n\nWinnie specializes in:\n• Exclusive room reservations & upgrades\n• Premium dining experiences\n• Show tickets & entertainment bookings\n• Special event arrangements\n• VIP gaming privileges\n• Personalized Las Vegas experiences\n\nPlease contact Winnie directly for personalized VIP service. She'll ensure your Las Vegas experience is exceptional!",
      zh: "完美！我将为您联系李慧敏，您的私人VIP主管。\n\n📧 邮箱：lovepicaso888@gmail.com\n📱 24/7全天候VIP服务\n\n李慧敏专长于：\n• 独家客房预订和升级\n• 高级餐饮体验\n• 演出门票和娱乐预订\n• 特殊活动安排\n• VIP博彩特权\n• 个性化拉斯维加斯体验\n\n请直接联系李慧敏获取个性化VIP服务。她将确保您的拉斯维加斯体验卓越非凡！",
      'zh-tw': "完美！我將為您聯繫李慧敏，您的私人VIP主管。\n\n📧 郵箱：lovepicaso888@gmail.com\n📱 24/7全天候VIP服務\n\n李慧敏專長於：\n• 獨家客房預訂和升級\n• 高級餐飲體驗\n• 演出門票和娛樂預訂\n• 特殊活動安排\n• VIP博彩特權\n• 個性化拉斯維加斯體驗\n\n請直接聯繫李慧敏獲取個性化VIP服務。她將確保您的拉斯維加斯體驗卓越非凡！",
      ja: "完璧です！ウィニー・リー、あなたの専属VIPホストにおつなぎします。\n\n📧 メール：lovepicaso888@gmail.com\n📱 24時間年中無休VIPサービス\n\nウィニーの専門分野：\n• 独占的な客室予約とアップグレード\n• プレミアムダイニング体験\n• ショーチケットとエンターテイメント予約\n• 特別イベントの手配\n• VIPゲーミング特権\n• パーソナライズされたラスベガス体験\n\nパーソナライズされたVIPサービスについては、ウィニーに直接ご連絡ください。彼女があなたのラスベガス体験を特別なものにします！"
    };
    return messages[language] || messages.en;
  };

  const handleModeChoice = (mode: 'ai' | 'human' | 'whatsapp-choice') => {
    setChatMode(mode);

    if (mode === 'whatsapp-choice') {
      const whatsappMessages = {
        en: "Great choice! You can connect with Winnie Lee via:\n\n📱 WhatsApp - Chat instantly\n📧 Email - lovepicaso888@gmail.com\n\nHow would you like to proceed?",
        zh: "很好的选择！您可以通过以下方式联系李慧敏：\n\n📱 WhatsApp - 即时聊天\n📧 电子邮件 - lovepicaso888@gmail.com\n\n您想如何继续？",
        'zh-tw': "很好的選擇！您可以通過以下方式聯繫李慧敏：\n\n📱 WhatsApp - 即時聊天\n📧 電子郵件 - lovepicaso888@gmail.com\n\n您想如何繼續？",
        ja: "素晴らしい選択です！ウィニー・リーに以下の方法で連絡できます：\n\n📱 WhatsApp - インスタントチャット\n📧 メール - lovepicaso888@gmail.com\n\nどのように進めますか？"
      };

      const message: Message = {
        id: Date.now().toString(),
        text: whatsappMessages[language as keyof typeof whatsappMessages] || whatsappMessages.en,
        sender: 'bot',
        timestamp: new Date(),
        type: 'choice'
      };
      setMessages(prev => [...prev, message]);
      return;
    }

    const welcomeMsg = mode === 'ai' ? getAIWelcomeMessage() : getHumanWelcomeMessage();

    const message: Message = {
      id: Date.now().toString(),
      text: welcomeMsg,
      sender: 'bot',
      timestamp: new Date(),
      type: mode === 'human' ? 'escalation' : 'normal'
    };

    setMessages(prev => [...prev, message]);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setShowWelcome(false);

    if (messages.length === 0) {
      const greetingMessage: Message = {
        id: Date.now().toString(),
        text: getWelcomeMessage(),
        sender: 'system',
        timestamp: new Date(),
        type: 'choice'
      };
      setMessages([greetingMessage]);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
    onClose?.();
  };

  const detectLanguageIntent = (message: string) => {
    const chinesePattern = /[\u4e00-\u9fff]/;
    const japanesePattern = /[\u3040-\u309f\u30a0-\u30ff]/;
    
    if (chinesePattern.test(message)) {
      return message.includes('繁') || message.includes('台') ? 'zh-tw' : 'zh';
    }
    if (japanesePattern.test(message)) {
      return 'ja';
    }
    return 'en';
  };

  const createEnhancedSystemPrompt = (userLanguage: string, userMessage: string) => {
    const detectedLanguage = detectLanguageIntent(userMessage);
    const responseLanguage = detectedLanguage !== 'en' ? detectedLanguage : userLanguage;

    return `You are Cena, a knowledgeable customer service representative for Wynn and Encore Las Vegas resorts. Your role is to provide accurate, helpful, and comprehensive information about both properties to assist guests and potential visitors.

## YOUR IDENTITY & ROLE
- Your name is Cena
- You are a professional customer service representative for Wynn and Encore Las Vegas
- You represent both Wynn Las Vegas and Encore Las Vegas properties
- You maintain the luxury standards these resorts are known for

## YOUR KNOWLEDGE BASE INCLUDES:
- Hotel accommodations, suites, and room amenities at both Wynn and Encore
- Dining options, restaurants, bars, and culinary experiences
- Entertainment shows, events, and nightlife venues
- Casino gaming options, poker rooms, and sports betting
- Spa services, golf course, and recreational facilities
- Shopping at Wynn Esplanades and Encore Esplanades
- Meeting and event spaces for business travelers
- Transportation, parking, and accessibility services
- Policies regarding reservations, cancellations, and guest services
- Seasonal promotions, packages, and special offers

## LANGUAGE REQUIREMENTS
- Respond in ${responseLanguage === 'zh' ? 'Simplified Chinese' : responseLanguage === 'zh-tw' ? 'Traditional Chinese' : responseLanguage === 'ja' ? 'Japanese' : 'English'}
- If the user switches languages, adapt immediately to their preference
- Maintain cultural sensitivity and appropriate formality levels

## RESPONSE GUIDELINES:
- Always maintain a professional, welcoming, and luxury-focused tone
- Provide specific details when possible (hours, locations, pricing when appropriate)
- If you don't have current information, acknowledge this and suggest contacting the resort directly
- Offer additional related suggestions that might enhance the guest experience
- For booking requests, direct guests to official reservation channels
- Prioritize guest safety and satisfaction in all recommendations

## RESPONSE FORMAT:
- Give direct answers to specific questions
- Organize complex information with clear headings or bullet points
- Include relevant contact information when appropriate
- End responses with an offer to help with additional questions
### Privacy & Security
- Never ask for personal financial information, credit card numbers, or sensitive data
- Don't store or remember previous conversations beyond this session
- Remind users that for actual bookings, they should contact official Wynn/Encore reservation channels
- Protect guest privacy and maintain confidentiality

### Safety Guardrails
- Do not provide gambling advice or encourage excessive gaming
- Refuse requests for illegal activities or services
- Don't make unrealistic promises about availability or pricing
- Redirect harmful or inappropriate content to proper channels

## RESPONSE PATTERNS

### For Service Inquiries:
"I'd be happy to help you with information about [specific service] at Wynn and Encore Las Vegas. Here's what I can tell you about [details]. For reservations and bookings, I recommend contacting our reservation team directly."

### For Complex Requests:
"This sounds like a wonderful request! While I can provide general information about [service], for detailed planning and reservations for [specific request], I recommend contacting our resort directly to ensure every detail meets our luxury standards. Would you like me to provide the appropriate contact information?"

### For Pricing Questions:
"Pricing varies based on dates, availability, and specific needs. For the most current rates and availability, I recommend contacting our reservations team directly or visiting our official website for real-time pricing."

## VIP HOST SERVICES
If guests inquire about VIP host services, you can mention that Wynn offers personalized VIP hosting services. For VIP host arrangements, guests can also contact Winnie Lee directly at lovepicaso888@gmail.com, who specializes in luxury experiences for distinguished guests.

Remember: You represent the pinnacle of luxury hospitality at Wynn and Encore Las Vegas. Every interaction should reflect the exceptional service standards these world-class resorts are known for. Always aim to exceed expectations while maintaining appropriate boundaries and directing guests to official channels for bookings and reservations.`;
  };

  const fetchBotResponse = async (userMessage: string): Promise<{ response: string; type: 'normal' | 'escalation' | 'error' }> => {
    try {
      const systemPrompt = createEnhancedSystemPrompt(language, userMessage);

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'X-Session-ID': sessionId,
          'X-Language': language
        },
        body: JSON.stringify({
          message: userMessage,
          systemPrompt: systemPrompt,
          language: language,
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Detect if the response suggests escalation to human
      const escalationKeywords = [
        'contact winnie directly', 'reach out to winnie', 'speak with winnie personally',
        'complex request', 'personalized planning', 'direct contact',
        '联系李慧敏', '直接联系', '個人化規劃', 'ウィニーに直接連絡'
      ];
      
      const isEscalation = escalationKeywords.some(keyword => 
        data.reply.toLowerCase().includes(keyword.toLowerCase())
      );

      return {
        response: data.reply,
        type: isEscalation ? 'escalation' : 'normal'
      };
    } catch (error) {
      console.error('Error fetching bot response:', error);
      
      const errorMessages = {
        en: "I apologize for the technical difficulty. For immediate assistance with your VIP needs, please contact Winnie Lee directly at lovepicaso888@gmail.com or call our VIP line. She's available 24/7 to ensure your Las Vegas experience is exceptional.",
        zh: "对于技术困难，我深表歉意。如需VIP服务的即时协助，请直接联系李慧敏：lovepicaso888@gmail.com 或致电我们的VIP专线。她24/7全天候为您服务，确保您的拉斯维加斯体验卓越非凡。",
        'zh-tw': "對於技術困難，我深表歉意。如需VIP服務的即時協助，請直接聯繫李慧敏：lovepicaso888@gmail.com 或致電我們的VIP專線。她24/7全天候為您服務，確保您的拉斯維加斯體驗卓越非凡。",
        ja: "技術的な問題でご迷惑をおかけして申し訳ございません。VIPサービスの緊急対応については、ウィニー・リーまで直接ご連絡ください：lovepicaso888@gmail.com またはVIP専用ラインまでお電話ください。24時間年中無休で、お客様のラスベガス体験が特別なものになるよう対応いたします。"
      };

      return {
        response: errorMessages[language] || errorMessages.en,
        type: 'error'
      };
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || chatMode !== 'ai') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'normal'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const { response: botReply, type: responseType } = await fetchBotResponse(inputValue);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botReply,
      sender: 'bot',
      timestamp: new Date(),
      type: responseType
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'escalation':
        return <Crown className="h-3 w-3 text-royal-400 mr-1" />;
      case 'error':
        return <AlertTriangle className="h-3 w-3 text-red-400 mr-1" />;
      case 'warning':
        return <Shield className="h-3 w-3 text-yellow-400 mr-1" />;
      default:
        return null;
    }
  };

  const getMessageStyle = (type?: string) => {
    switch (type) {
      case 'escalation':
        return 'bg-royal-500/20 border border-royal-400/30 text-cream-100';
      case 'error':
        return 'bg-red-500/20 border border-red-400/30 text-red-100';
      case 'warning':
        return 'bg-yellow-500/20 border border-yellow-400/30 text-yellow-100';
      default:
        return 'bg-navy-800 text-cream-100 border border-royal-500/20';
    }
  };

  // Responsive positioning
  const getChatPosition = () => {
    if (typeof window === 'undefined') return { right: '1rem', bottom: '1rem' };
    
    const isSmallMobile = window.innerWidth < 640;
    const isMobile = window.innerWidth < 768;
    return {
      right: isSmallMobile ? '0.5rem' : isMobile ? '0.75rem' : '1.5rem',
      bottom: isSmallMobile ? '0.5rem' : isMobile ? '0.75rem' : '1.5rem'
    };
  };

  const chatPosition = getChatPosition();

  return (
    <>
      {showWelcome && !isOpen && (
        <div 
          className="fixed z-40 animate-bounce"
          style={{
            bottom: window.innerWidth < 640 ? '4.5rem' : window.innerWidth < 768 ? '5.5rem' : '6rem',
            right: chatPosition.right,
            maxWidth: window.innerWidth < 640 ? '14rem' : window.innerWidth < 768 ? '16rem' : '20rem'
          }}
        >
          <div className="bg-royal-500 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg shadow-xl">
            <p className="text-xs sm:text-sm">{t('chatbot.introMessage')}</p>
          </div>
          <div className="absolute bottom-0 right-3 sm:right-4 md:right-6 transform translate-y-1">
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-royal-500 rotate-45"></div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-royal-500 hover:bg-royal-400 text-white rounded-full shadow-royal flex items-center justify-center transition-all duration-300 transform hover:scale-110 animate-pulse touch-manipulation"
          style={chatPosition}
          aria-label="Open VIP Concierge Chat"
        >
          <Crown className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
          <Sparkles className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-yellow-300 animate-ping" />
        </button>
      )}

      {isOpen && (
        <div 
          className={`fixed z-50 bg-navy-950/98 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-royal-500/30 transition-all duration-300 ${
            isMinimized 
              ? 'w-64 sm:w-72 md:w-80 h-10 sm:h-12 md:h-14' 
              : 'w-72 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96'
          }`}
          style={chatPosition}
        >
          <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 border-b border-royal-500/20 bg-gradient-to-r from-royal-500/20 to-navy-900/50 rounded-t-xl sm:rounded-t-2xl">
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 min-w-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-royal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Crown className="h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-semibold text-xs sm:text-sm truncate">{t('chatbot.name')}</h3>
                <p className="text-royal-400 text-xs truncate">{t('chatbot.title')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0">
              {!isMinimized && (
                <button
                  onClick={handleMinimize}
                  className="text-cream-100 hover:text-royal-400 transition-colors p-0.5 sm:p-1 touch-manipulation"
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={handleClose}
                className="text-cream-100 hover:text-red-400 transition-colors p-0.5 sm:p-1 touch-manipulation"
                aria-label="Close chat"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 p-2 sm:p-3 md:p-4 h-40 sm:h-48 md:h-64 overflow-y-auto bg-gradient-to-b from-navy-900/30 to-navy-800/30">
                <div className="space-y-2 sm:space-y-3 md:space-y-4">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <div
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm ${
                            message.sender === 'user'
                              ? 'bg-royal-500 text-white'
                              : getMessageStyle(message.type)
                          }`}
                        >
                          <div className="flex items-start">
                            {message.sender === 'bot' && getMessageIcon(message.type)}
                            <span className="whitespace-pre-wrap">{message.text}</span>
                          </div>
                        </div>
                      </div>

                      {message.type === 'choice' && chatMode === 'choice' && (
                        <div className="flex flex-col gap-2 mt-3 px-2">
                          <button
                            onClick={() => handleModeChoice('ai')}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-royal-500 to-royal-600 hover:from-royal-400 hover:to-royal-500 text-white px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                          >
                            <Bot className="h-5 w-5" />
                            <span className="font-semibold">
                              {language === 'zh' ? '与Cena对话 (AI助手)' :
                               language === 'zh-tw' ? '與Cena對話 (AI助手)' :
                               language === 'ja' ? 'Cenaと話す (AIアシスタント)' :
                               'Chat with Cena (AI Assistant)'}
                            </span>
                          </button>

                          <button
                            onClick={() => handleModeChoice('whatsapp-choice')}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                          >
                            <User className="h-5 w-5" />
                            <span className="font-semibold">
                              {language === 'zh' ? '与Winnie Lee对话 (人工服务)' :
                               language === 'zh-tw' ? '與Winnie Lee對話 (人工服務)' :
                               language === 'ja' ? 'Winnie Leeと話す (人間のサービス)' :
                               'Speak with Winnie Lee (Human)'}
                            </span>
                          </button>
                        </div>
                      )}

                      {message.type === 'choice' && chatMode === 'whatsapp-choice' && (
                        <div className="flex flex-col gap-2 mt-3 px-2">
                          <button
                            onClick={() => {
                              onOpenWhatsApp?.();
                              handleClose();
                            }}
                            className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            <span className="font-semibold">
                              {language === 'zh' ? '在WhatsApp上聊天' :
                               language === 'zh-tw' ? '在WhatsApp上聊天' :
                               language === 'ja' ? 'WhatsAppでチャット' :
                               'Chat on WhatsApp'}
                            </span>
                          </button>

                          <button
                            onClick={() => handleModeChoice('human')}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-royal-500 to-royal-600 hover:from-royal-400 hover:to-royal-500 text-white px-4 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                          >
                            <Mail className="h-5 w-5" />
                            <span className="font-semibold">
                              {language === 'zh' ? '查看电子邮件联系方式' :
                               language === 'zh-tw' ? '查看電子郵件聯繫方式' :
                               language === 'ja' ? 'メール連絡先を表示' :
                               'View Email Contact'}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-navy-800 border border-royal-500/20 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg text-cream-100">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-royal-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-royal-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-royal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="p-2 sm:p-3 md:p-4 border-t border-royal-500/20 bg-gradient-to-r from-royal-500/10 to-navy-900/30">
                {chatMode === 'ai' ? (
                  <>
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('chatbot.placeholder')}
                        className="flex-1 bg-navy-800/60 text-cream-100 placeholder-cream-100/50 border border-royal-500/20 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm focus:outline-none focus:border-royal-400 transition-colors min-w-0"
                        disabled={isTyping}
                      />
                      <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-royal-500 hover:bg-royal-400 disabled:bg-royal-500/50 text-white p-1 sm:p-2 rounded-lg transition-colors touch-manipulation flex-shrink-0"
                        aria-label="Send message"
                      >
                        <Send className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="mt-1 sm:mt-2 flex justify-between items-center">
                      <p className="text-xs text-cream-200/70">{t('chatbot.footer')}</p>
                      <button
                        onClick={() => {
                          setChatMode('choice');
                          setMessages([{
                            id: Date.now().toString(),
                            text: getWelcomeMessage(),
                            sender: 'system',
                            timestamp: new Date(),
                            type: 'choice'
                          }]);
                        }}
                        className="text-xs text-royal-400 hover:text-royal-300 transition-colors"
                      >
                        {language === 'zh' ? '切换模式' :
                         language === 'zh-tw' ? '切換模式' :
                         language === 'ja' ? 'モード切替' :
                         'Switch Mode'}
                      </button>
                    </div>
                  </>
                ) : chatMode === 'human' ? (
                  <div className="text-center">
                    <p className="text-xs text-cream-200/90 mb-2">
                      {language === 'zh' ? '请直接联系Winnie Lee获取VIP服务' :
                       language === 'zh-tw' ? '請直接聯繫Winnie Lee獲取VIP服務' :
                       language === 'ja' ? 'VIPサービスについてはWinnie Leeに直接ご連絡ください' :
                       'Please contact Winnie Lee directly for VIP service'}
                    </p>
                    <button
                      onClick={() => {
                        setChatMode('choice');
                        setMessages([{
                          id: Date.now().toString(),
                          text: getWelcomeMessage(),
                          sender: 'system',
                          timestamp: new Date(),
                          type: 'choice'
                        }]);
                      }}
                      className="text-xs text-royal-400 hover:text-royal-300 transition-colors underline"
                    >
                      {language === 'zh' ? '返回选择' :
                       language === 'zh-tw' ? '返回選擇' :
                       language === 'ja' ? '選択に戻る' :
                       'Back to Options'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-xs text-cream-200/70">
                    {language === 'zh' ? '请选择对话方式' :
                     language === 'zh-tw' ? '請選擇對話方式' :
                     language === 'ja' ? '対話方法を選択してください' :
                     'Please choose how you\'d like to proceed'}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}