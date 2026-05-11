import { useState, useEffect } from 'react'

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
  read: boolean
}

interface Props {
  messages: Message[]
  onAddMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  onMarkAsRead: (messageId: string) => void
  currentUser: string
  partnerName: string
}

export default function LoveMessages({ messages, onAddMessage, onMarkAsRead, currentUser, partnerName }: Props) {
  const [newMessage, setNewMessage] = useState('')
  const [quickReply, setQuickReply] = useState('')
  const [reminder, setReminder] = useState(false)

  const suggestions = [
    'Warum liebst du mich? ❤️',
    'Was war unser schönster Moment? ✨',
    'Wobei kann ich dich diese Woche unterstützen? 🤝',
    'Was wünschst du dir von mir? 🌟',
  ]

  useEffect(() => {
    const lastMessage = messages.find(m => m.sender === currentUser)
    if (!lastMessage || new Date(lastMessage.timestamp).getDay() !== new Date().getDay()) {
      setReminder(true)
    } else {
      setReminder(false)
    }
  }, [messages, currentUser])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onAddMessage({
        content: newMessage,
        sender: currentUser,
        read: false,
      })
      setNewMessage('')
    }
  }

  const sortedMessages = [...messages].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <section className="messages-section">
      <div className="section-header">
        <h2>💌 Liebesnachrichten</h2>
        <p>Kleine Botschaften der Zuneigung</p>
        {unreadCount > 0 && <span className="unread-badge">{unreadCount} neu</span>}
      </div>

      {reminder && (
        <div className="reminder">
          <p>💡 Denk daran, diese Woche eine Nachricht an {partnerName} zu schreiben!</p>
        </div>
      )}

      <div className="message-compose form-card">
        <div className="form-group">
          <label>Vorschläge</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {suggestions.map(s => (
              <button key={s} className="filter-btn" onClick={() => setNewMessage(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>💌 Deine Nachricht</label>
          <textarea
            placeholder="Schreibe eine liebevolle Nachricht..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleSendMessage()
              }
            }}
            rows={3}
            className="message-input"
          ></textarea>
          <div className="form-hint">Tipp: Ctrl+Enter zum Absenden</div>
        </div>

        <button 
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="send-btn"
        >
          ✈️ Absenden
        </button>
      </div>

      <div className="messages-list">
        {sortedMessages.length === 0 ? (
          <div className="empty-state">
            <p>Noch keine Nachrichten...</p>
            <p className="empty-hint">Schreibt euch die erste liebevolle Nachricht! 💕</p>
          </div>
        ) : (
          sortedMessages.map((msg) => (
            <div
              key={msg.id}
              className={`message-card ${msg.read ? 'read' : 'unread'}`}
            >
              <div className="message-header">
                <span className="message-sender">💕 {msg.sender}</span>
                <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString('de-DE', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}</span>
              </div>
              <p className="message-content">{msg.content}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                {!msg.read ? (
                  <button className="confirm-btn" onClick={() => onMarkAsRead(msg.id)}>Als gelesen markieren</button>
                ) : (
                  <div style={{ color: 'var(--text-light)', alignSelf: 'center' }}>Gelesen</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
