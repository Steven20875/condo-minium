import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Send, Bot } from 'lucide-react'

type ChatMessage = {
  id: string
  sender: 'user' | 'bot'
  content: string
  timestamp: string
}

type Language = 'english' | 'tagalog' | 'ilonggo'

// Language detection keywords
const languageKeywords = {
  ilonggo: ['ang', 'sa', 'kon', 'kag', 'kay', 'para', 'indi', 'kano', 'dako', 'tuo', 'hanggad', 'tan-aw', 'mga', 'tu-od', 'pila', 'libro', 'bisita'],
  tagalog: ['ang', 'sa', 'kung', 'at', 'para', 'hindi', 'kami', 'kayo', 'tayo', 'sila', 'ako', 'ikaw', 'saan', 'ano', 'kailan', 'bakit', 'bisita', 'kwarto'],
  english: ['the', 'a', 'is', 'in', 'how', 'what', 'when', 'where', 'why', 'which', 'book', 'visitor', 'unit', 'help', 'can', 'for'],
}

const detectLanguage = (text: string): Language => {
  const lower = text.toLowerCase()
  let langScores = { ilonggo: 0, tagalog: 0, english: 0 }

  for (const word of lower.split(/\s+/)) {
    if (languageKeywords.ilonggo.some(kw => word.includes(kw))) langScores.ilonggo++
    if (languageKeywords.tagalog.some(kw => word.includes(kw))) langScores.tagalog++
    if (languageKeywords.english.some(kw => word.includes(kw))) langScores.english++
  }

  const max = Math.max(langScores.ilonggo, langScores.tagalog, langScores.english)
  if (max === 0) return 'english'
  if (langScores.ilonggo === max) return 'ilonggo'
  if (langScores.tagalog === max) return 'tagalog'
  return 'english'
}

const responses = {
  ilonggo: {
    booking: 'Para sa pag-book, pumunta sa Bookings page at piliin ang facility, date, at oras. Dako ako makatulong na check ang availability.',
    visitor: 'Para sa visitor management, bukas ang Visitor Logs page. Pwede mo i-register ang guest, i-check in, at i-track ang arrival.',
    unit: 'Ang available units ay naka-list sa Units page. Makikita mo ang unit type, floor, kag status.',
    login: 'Kung kailangan mo ng tulong sa pag-login, gamitin ang correct email at password. Demo: admin@condo.com / admin123 o resident@condo.com / resident123',
    greeting: 'Hello! Dako ako makatulong sa bookings, visitors, units, o account questions.',
    default: 'Maganda ang tanong! Pwede ko tulungan ka sa bookings, visitors, units, o account access. Subukan mo i-tanong kung paano mag-book o check in ng visitor.',
  },
  tagalog: {
    booking: 'Para mag-book, pumunta sa Bookings page at pumili ng facility, date, at oras. Pwede din akong tumulong na suriin ang availability.',
    visitor: 'Para sa visitor management, buksan ang Visitor Logs page. Maaari mong i-register ang guest, i-check in, at i-track ang pagdating.',
    unit: 'Ang available units ay nakakita sa Units page. Makikita mo ang unit type, floor, at status.',
    login: 'Kung kailangan mo ng tulong sa pag-login, gamitin ang tama email at password. Demo: admin@condo.com / admin123 o resident@condo.com / resident123',
    greeting: 'Halo! Ako ay handang tumulong sa mga booking, bisita, unit, o account na katanungan.',
    default: 'Magandang tanong! Pwede kang magtanong tungkol sa pag-book, pagpaparehistro ng bisita, availability ng unit, o tulong sa account.',
  },
  english: {
    booking: 'To make a booking, go to the Bookings page and choose the facility, date, and time. I can also help you check availability.',
    visitor: 'For visitor management, open the Visitor Logs page. You can register a guest, check them in, and track their expected arrival.',
    unit: 'Available units are listed in the Units page. You can view unit type, floor, and status there.',
    login: 'If you need help logging in, use the correct email and password. Demo accounts are admin@condo.com / admin123 and resident@condo.com / resident123.',
    greeting: 'Hi there! I can help with bookings, visitors, units, or account questions.',
    default: 'Great question! I can help with bookings, visitor registration, unit availability, or account access. Try asking about availability or how to check in a visitor.',
  },
}

const getBotReply = (message: string): [string, Language] => {
  const language = detectLanguage(message)
  const text = message.toLowerCase()
  const resp = responses[language]

  if (text.includes('booking') || text.includes('book') || text.includes('libro')) {
    return [resp.booking, language]
  }

  if (text.includes('visitor') || text.includes('guest') || text.includes('bisita') || text.includes('bumisita')) {
    return [resp.visitor, language]
  }

  if (text.includes('unit') || text.includes('available') || text.includes('room') || text.includes('kwarto')) {
    return [resp.unit, language]
  }

  if (text.includes('password') || text.includes('login') || text.includes('signin')) {
    return [resp.login, language]
  }

  if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('halo') || text.includes('dako')) {
    return [resp.greeting, language]
  }

  return [resp.default, language]
}

const initialMessages: ChatMessage[] = [
  {
    id: 'bot-1',
    sender: 'bot',
    content: 'Hello! I am the ONE SPATIAL ILOILO assistant. I can help you in English, Tagalog, or Ilonggo. Ask me about bookings, visitors, units, or your account. / Halo! Ako ang ONE SPATIAL ILOILO assistant. Makakatulong ako sa English, Tagalog, o Ilonggo. Magtanong tungkol sa bookings, visitors, units, o account. / Dako ako ang ONE SPATIAL ILOILO assistant. Pwede kita ko tulungan sa English, Tagalog, o Ilonggo. Magtanong sa mga booking, bisita, units, o account.',
    timestamp: new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
  },
]

export const Route = createFileRoute('/_app/admin/chat-multilang')({
  component: ChatBotPage,
})

export function ChatBotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    return () => setIsTyping(false)
  }, [])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    window.setTimeout(() => {
      const [reply] = getBotReply(text)
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        content: reply,
        timestamp: new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 700)
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 fade-in">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
          Chatbot
        </h1>
        <p className="text-sm" style={{ color: '#6b7a99' }}>
          Ask the ONE SPATIAL ILOILO assistant for help with bookings, visitors, units, or account questions. Supports English, Tagalog, and Ilonggo.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col" style={{ border: '1px solid #e8edf5', height: 'calc(100vh - 200px)', minHeight: 500 }}>
        <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: '#e8edf5', background: '#fafbfe' }}>
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[#0f1e42] text-white">
            <Bot size={22} />
          </div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#0f1e42' }}>ONE SPATIAL ILOILO Assistant</div>
            <div className="text-xs" style={{ color: '#9aa3b8' }}>AI-powered help • English • Tagalog • Ilonggo</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="max-w-xs lg:max-w-2xl px-4 py-3 rounded-3xl text-sm leading-relaxed"
                style={
                  msg.sender === 'user'
                    ? { background: '#0f1e42', color: '#fff', borderBottomRightRadius: '8px' }
                    : { background: '#f1f5f9', color: '#1a2040', borderBottomLeftRadius: '8px' }
                }
              >
                {msg.content}
                <div className="text-xs mt-2" style={{ color: msg.sender === 'user' ? 'rgba(255,255,255,0.6)' : '#9aa3b8' }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-3 rounded-3xl text-sm leading-relaxed" style={{ background: '#f1f5f9', color: '#1a2040' }}>
                Typing...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-4 border-t flex gap-3" style={{ borderColor: '#e8edf5' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask in English, Tagalog, or Ilonggo..."
            className="flex-1 px-4 py-3 rounded-2xl text-sm"
            style={{ border: '1.5px solid #dde3ef', color: '#1a2040', background: '#f8fafc' }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all disabled:opacity-50"
            style={{ background: '#0f1e42' }}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
