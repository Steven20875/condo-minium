import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Send, Search } from 'lucide-react'
import { mockConversations, type Conversation, type ChatMessage } from '@/lib/mockData'

export const Route = createFileRoute('/_app/admin/chat')({
  component: ChatPage,
})

const avatarColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f97316', '#c9a84c']

function ChatPage() {
  const [conversations, setConversations] = useState(mockConversations)
  const [activeId, setActiveId] = useState(conversations[0].id)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  const active = conversations.find(c => c.id === activeId)!

  const filteredConvs = conversations.filter(c =>
    c.participantName.toLowerCase().includes(search.toLowerCase()) ||
    c.participantUnit.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (id: string) => {
    setActiveId(id)
    setConversations(prev =>
      prev.map(c => c.id === id ? { ...c, unread: 0 } : c)
    )
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: 'admin',
      senderName: 'Admin',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }),
      read: true,
    }
    setConversations(prev =>
      prev.map(c =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: input.trim(), lastTime: 'Just now' }
          : c
      )
    )
    setInput('')
  }

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0)

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 fade-in">
        <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'DM Serif Display', serif", color: '#0f1e42' }}>
          Messages
        </h1>
        <p className="text-sm" style={{ color: '#6b7a99' }}>
          {totalUnread > 0 ? `${totalUnread} unread message${totalUnread > 1 ? 's' : ''}` : 'All caught up'}
        </p>
      </div>

      <div
        className="bg-white rounded-2xl shadow-sm overflow-hidden flex"
        style={{ border: '1px solid #e8edf5', height: 'calc(100vh - 200px)', minHeight: 480 }}
      >
        {/* Sidebar */}
        <div
          className="w-72 flex-shrink-0 flex flex-col border-r"
          style={{ borderColor: '#e8edf5' }}
        >
          <div className="p-4 border-b" style={{ borderColor: '#e8edf5' }}>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9aa3b8' }} />
              <input
                type="text"
                placeholder="Search conversations…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm"
                style={{ border: '1.5px solid #dde3ef', color: '#1a2040', background: '#f8fafc' }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConvs.map((conv, i) => {
              const isActive = conv.id === activeId
              const color = avatarColors[i % avatarColors.length]
              return (
                <button
                  key={conv.id}
                  onClick={() => handleSelect(conv.id)}
                  className="w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors border-b"
                  style={{
                    borderColor: '#f5f7fb',
                    background: isActive ? '#f0f4ff' : 'transparent',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0 mt-0.5"
                    style={{ background: color }}
                  >
                    {conv.participantName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-semibold truncate" style={{ color: isActive ? '#0f1e42' : '#1a2040' }}>
                        {conv.participantName}
                      </span>
                      <span className="text-xs flex-shrink-0 ml-2" style={{ color: '#9aa3b8' }}>{conv.lastTime}</span>
                    </div>
                    <div className="text-xs" style={{ color: '#6b7a99' }}>Unit {conv.participantUnit}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs truncate" style={{ color: '#9aa3b8', maxWidth: '150px' }}>
                        {conv.lastMessage}
                      </span>
                      {conv.unread > 0 && (
                        <span
                          className="ml-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: '#0f1e42' }}
                        >
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div
            className="px-5 py-4 border-b flex items-center gap-3"
            style={{ borderColor: '#e8edf5', background: '#fafbfe' }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
              style={{ background: avatarColors[conversations.findIndex(c => c.id === activeId) % avatarColors.length] }}
            >
              {active.participantName.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: '#0f1e42' }}>{active.participantName}</div>
              <div className="text-xs" style={{ color: '#9aa3b8' }}>Unit {active.participantUnit}</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: '#059669' }} />
              <span className="text-xs" style={{ color: '#059669' }}>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {active.messages.map(msg => {
              const isAdmin = msg.senderId === 'admin'
              return (
                <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={isAdmin
                      ? { background: '#0f1e42', color: '#fff', borderBottomRightRadius: '4px' }
                      : { background: '#f1f5f9', color: '#1a2040', borderBottomLeftRadius: '4px' }
                    }
                  >
                    {msg.content}
                    <div
                      className="text-xs mt-1"
                      style={{ color: isAdmin ? 'rgba(255,255,255,0.5)' : '#9aa3b8' }}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t flex gap-3"
            style={{ borderColor: '#e8edf5' }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm"
              style={{ border: '1.5px solid #dde3ef', color: '#1a2040', background: '#f8fafc' }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all flex-shrink-0 disabled:opacity-50"
              style={{ background: '#0f1e42' }}
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
