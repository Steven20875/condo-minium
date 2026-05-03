import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Send } from 'lucide-react'
import { mockConversations, type ChatMessage } from '@/lib/mockData'

export const Route = createFileRoute('/_app/dashboard/messages')({
  component: ResidentMessagesPage,
})

function ResidentMessagesPage() {
  const [messages, setMessages] = useState(
    mockConversations.find(c => c.participantId === '1')?.messages ?? []
  )
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const msg: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: '1',
      senderName: 'Maria Santos',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    }
    setMessages(prev => [...prev, msg])
    setInput('')
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-6 fade-in">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
          Messages
        </h1>
        <p className="text-sm" style={{ color: '#6b7a99' }}>Chat with building administration</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col" style={{ border: '1px solid #e8edf5', height: 'calc(100vh - 220px)', minHeight: 400 }}>
        {/* Admin header */}
        <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor: '#e8edf5', background: '#fafbfe' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white" style={{ background: '#0f1e42' }}>A</div>
          <div>
            <div className="font-semibold text-sm" style={{ color: '#0f1e42' }}>SkyView Administration</div>
            <div className="text-xs" style={{ color: '#059669' }}>Online</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.map(msg => {
            const isMe = msg.senderId !== 'admin'
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                  style={isMe
                    ? { background: '#0f1e42', color: '#fff', borderBottomRightRadius: '4px' }
                    : { background: '#f1f5f9', color: '#1a2040', borderBottomLeftRadius: '4px' }
                  }
                >
                  {msg.content}
                  <div className="text-xs mt-1" style={{ color: isMe ? 'rgba(255,255,255,0.5)' : '#9aa3b8' }}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t flex gap-3" style={{ borderColor: '#e8edf5' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message…"
            className="flex-1 px-4 py-2.5 rounded-xl text-sm"
            style={{ border: '1.5px solid #dde3ef', color: '#1a2040', background: '#f8fafc' }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0 disabled:opacity-50"
            style={{ background: '#0f1e42' }}
          >
            <Send size={17} />
          </button>
        </form>
      </div>
    </div>
  )
}
