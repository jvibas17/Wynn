import { useState, useEffect, useRef } from 'react';
import { X, Minimize2, Send, CheckCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface WhatsAppChatProps {
  onClose?: () => void;
}

export function WhatsAppChat({ onClose }: WhatsAppChatProps) {
  const { language } = useLanguage();
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const winniePhone = '+17023213577';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isMinimized]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const welcomeMessages = getMessages();
      const initialMessages: Message[] = [
        {
          id: '1',
          text: welcomeMessages.greeting,
          sender: 'bot',
          timestamp: new Date(),
        },
        {
          id: '2',
          text: `${welcomeMessages.intro}\n\n${welcomeMessages.services.join('\n')}`,
          sender: 'bot',
          timestamp: new Date(),
        },
      ];
      setMessages(initialMessages);
    }, 1000);
    return () => clearTimeout(timer);
  }, [language]);

  const getMessages = () => {
    const messages = {
      en: {
        greeting: "Hello! I'm Winnie Lee, your personal VIP host at Wynn Las Vegas. 👋",
        intro: "I'm here to provide you with exceptional VIP services including:",
        services: [
          "🏨 Exclusive room reservations & upgrades",
          "🍽️ Premium dining experiences",
          "🎭 Show tickets & entertainment",
          "🎰 VIP gaming privileges",
          "🎉 Special event arrangements",
          "✨ Personalized Las Vegas experiences"
        ],
        button: "Chat on WhatsApp"
      },
      zh: {
        greeting: "您好！我是李慧敏（Winnie Lee），永利拉斯维加斯的专属VIP主管。👋",
        intro: "我在这里为您提供卓越的VIP服务，包括：",
        services: [
          "🏨 独家客房预订和升级",
          "🍽️ 高级餐饮体验",
          "🎭 演出门票和娱乐",
          "🎰 VIP博彩特权",
          "🎉 特殊活动安排",
          "✨ 个性化拉斯维加斯体验"
        ],
        button: "在WhatsApp上聊天"
      },
      'zh-tw': {
        greeting: "您好！我是李慧敏（Winnie Lee），永利拉斯維加斯的專屬VIP主管。👋",
        intro: "我在這裡為您提供卓越的VIP服務，包括：",
        services: [
          "🏨 獨家客房預訂和升級",
          "🍽️ 高級餐飲體驗",
          "🎭 演出門票和娛樂",
          "🎰 VIP博彩特權",
          "🎉 特殊活動安排",
          "✨ 個性化拉斯維加斯體驗"
        ],
        button: "在WhatsApp上聊天"
      },
      ja: {
        greeting: "こんにちは！ウィン・ラスベガスの専属VIPホスト、ウィニー・リーです。👋",
        intro: "私は以下の優れたVIPサービスを提供しています：",
        services: [
          "🏨 独占的な客室予約とアップグレード",
          "🍽️ プレミアムダイニング体験",
          "🎭 ショーチケットとエンターテイメント",
          "🎰 VIPゲーミング特権",
          "🎉 特別イベントの手配",
          "✨ パーソナライズされたラスベガス体験"
        ],
        button: "WhatsAppでチャット"
      }
    };
    return messages[language as keyof typeof messages] || messages.en;
  };

  const handleOpenWhatsApp = (message?: string) => {
    const defaultMessage = message || (language === 'en'
      ? 'Hello Winnie! I would like to inquire about VIP services at Wynn Las Vegas.'
      : language === 'zh'
      ? '您好Winnie！我想咨询永利拉斯维加斯的VIP服务。'
      : language === 'zh-tw'
      ? '您好Winnie！我想諮詢永利拉斯維加斯的VIP服務。'
      : 'こんにちはWinnie！ウィン・ラスベガスのVIPサービスについてお問い合わせしたいです。');

    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${winniePhone.replace(/\+/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessageText = inputValue.trim();
    handleOpenWhatsApp(userMessageText);
    setInputValue('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMinimized
        ? 'bottom-4 right-4 w-16 h-16'
        : 'bottom-0 right-0 sm:bottom-4 sm:right-4 w-full sm:w-96 h-full sm:h-[600px]'
    }`}>
      <div className="relative h-full bg-[#111b21] rounded-none sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* WhatsApp Header */}
        <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium text-sm">Winnie Lee</h3>
              <p className="text-[#8696a0] text-xs truncate">VIP Host • Wynn Las Vegas • Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isMinimized && (
              <>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-[#8696a0] hover:text-white p-2 rounded-full hover:bg-[#2a3942] transition-colors"
                >
                  <Minimize2 className="h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="text-[#8696a0] hover:text-white p-2 rounded-full hover:bg-[#2a3942] transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* WhatsApp Messages Area */}
        {!isMinimized && (
          <>
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='%23111b21'/%3E%3Cpath d='M30 0L0 30l30 30 30-30z' fill='%230b141a' fill-opacity='0.2'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-[80%] shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#005c4b] rounded-br-none'
                        : 'bg-[#202c33] rounded-tl-none'
                    }`}
                  >
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                    <div className="flex items-center justify-end mt-1 space-x-1">
                      <span className="text-[#8696a0] text-xs">
                        {formatTime(msg.timestamp)}
                      </span>
                      {msg.sender === 'user' && (
                        <CheckCheck className="h-3 w-3 text-[#53bdeb]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start">
                  <div className="bg-[#202c33] rounded-lg rounded-tl-none p-3 shadow-md max-w-[80px]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp Input Area */}
            <div className="bg-[#202c33] px-3 py-2">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <div className="flex-1 bg-[#2a3942] rounded-lg px-4 py-2 flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={language === 'en' ? 'Type a message' : language === 'zh' ? '输入消息' : language === 'zh-tw' ? '輸入訊息' : 'メッセージを入力'}
                    className="flex-1 bg-transparent text-white text-sm outline-none placeholder-[#8696a0]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-full transition-colors ${
                    inputValue.trim()
                      ? 'bg-[#25d366] hover:bg-[#20bd5a] text-white'
                      : 'bg-[#2a3942] text-[#8696a0] cursor-not-allowed'
                  }`}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        )}

        {/* Minimized State - Click to expand */}
        {isMinimized && (
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full bg-[#25d366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
