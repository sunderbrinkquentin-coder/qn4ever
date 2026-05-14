import { useState, useEffect } from 'react'
import RelationshipPrinciples from './components/RelationshipPrinciples'
import VisitCalendar from './components/VisitCalendar'
import LoveMessages from './components/LoveMessages'
import TopicsBoard from './components/TopicsBoard'
import NextVisit from './components/NextVisit'
import EventSuggestions from './components/EventSuggestions'
import WeeklyOverview from './components/WeeklyOverview'
import { db } from './lib/supabase'

interface Visit {
  id: string
  date: string
  title: string
  description: string
  confirmed: boolean
  createdBy?: string
  createdAt?: string
}

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
  read: boolean
  createdBy?: string
}

interface Topic {
  id: string
  title: string
  category: string
  createdBy?: string
  createdAt?: string
}

function App() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [currentTab, setCurrentTab] = useState<'home' | 'principles' | 'calendar' | 'messages' | 'topics' | 'overview'>('home')
  const [loading, setLoading] = useState(true)

  // Load data from Supabase
  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const [visitsData, messagesData, topicsData] = await Promise.all([
        db.getVisits(),
        db.getMessages(),
        db.getTopics()
      ])
      setVisits(visitsData as Visit[])
      setMessages(messagesData as Message[])
      setTopics(topicsData as Topic[])
    } catch (error) {
      console.error('Error loading data:', error)
      // Fallback to localStorage
      setVisits(JSON.parse(localStorage.getItem('visits') || '[]'))
      setMessages(JSON.parse(localStorage.getItem('messages') || '[]'))
      setTopics(JSON.parse(localStorage.getItem('topics') || '[]'))
    }
    setLoading(false)
  }

  const handleAddVisit = async (visit: Omit<Visit, 'id' | 'confirmed'>) => {
    const newVisit: Visit = {
      ...visit,
      id: Date.now().toString(),
      confirmed: false,
      createdBy: 'Quentin',
      createdAt: new Date().toISOString()
    }
    
    try {
      await db.addVisit(newVisit)
    } catch (error) {
      console.error('Supabase error:', error)
    }
    
    setVisits([...visits, newVisit].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    localStorage.setItem('visits', JSON.stringify([...visits, newVisit]))
  }

  const handleConfirmVisit = (visitId: string) => {
    setVisits(visits.map(v => v.id === visitId ? { ...v, confirmed: true } : v))
    localStorage.setItem('visits', JSON.stringify(visits))
  }

  const handleAddMessage = async (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('de-DE'),
      createdBy: message.sender
    }
    
    try {
      await db.addMessage(newMessage)
    } catch (error) {
      console.error('Supabase error:', error)
    }
    
    setMessages([...messages, newMessage])
    localStorage.setItem('messages', JSON.stringify([...messages, newMessage]))
  }

  const handleMarkMessageAsRead = (messageId: string) => {
    setMessages(messages.map(m => m.id === messageId ? { ...m, read: true } : m))
    localStorage.setItem('messages', JSON.stringify(messages))
  }

  const handleAddTopic = async (topic: Omit<Topic, 'id'>) => {
    const newTopic: Topic = {
      ...topic,
      id: Date.now().toString(),
      createdBy: 'Quentin',
      createdAt: new Date().toISOString()
    }
    
    try {
      await db.addTopic(newTopic)
    } catch (error) {
      console.error('Supabase error:', error)
    }
    
    setTopics([...topics, newTopic])
    localStorage.setItem('topics', JSON.stringify([...topics, newTopic]))
  }

  const handleDeleteTopic = (topicId: string) => {
    setTopics(topics.filter(t => t.id !== topicId))
    localStorage.setItem('topics', JSON.stringify(topics))
  }

  const nextVisit = visits.filter(v => new Date(v.date) >= new Date()).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )[0]

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h2>💕 Lädt...</h2>
    </div>
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💕 Unsere Liebe</h1>
        <p className="app-subtitle">Quentin & Naima</p>
      </header>

      <nav className="app-nav">
        <button 
          className={`nav-btn ${currentTab === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentTab('home')}
        >
          🏠 Startseite
        </button>
        <button 
          className={`nav-btn ${currentTab === 'overview' ? 'active' : ''}`}
          onClick={() => setCurrentTab('overview')}
        >
          📅 Wochenübersicht
        </button>
        <button 
          className={`nav-btn ${currentTab === 'principles' ? 'active' : ''}`}
          onClick={() => setCurrentTab('principles')}
        >
          ✨ Leitlinien
        </button>
        <button 
          className={`nav-btn ${currentTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setCurrentTab('calendar')}
        >
          📅 Termine
        </button>
        <button 
          className={`nav-btn ${currentTab === 'messages' ? 'active' : ''}`}
          onClick={() => setCurrentTab('messages')}
        >
          💌 Nachrichten
        </button>
        <button 
          className={`nav-btn ${currentTab === 'topics' ? 'active' : ''}`}
          onClick={() => setCurrentTab('topics')}
        >
          📝 Themen
        </button>
      </nav>

      <main className="app-main">
        {currentTab === 'home' && (
          <div className="home-section">
            <NextVisit visit={nextVisit} />
            <EventSuggestions selectedDate={''} />
          </div>
        )}

        {currentTab === 'overview' && (
          <WeeklyOverview 
            highlights={[]} 
            challenges={[]} 
            support={[]} 
          />
        )}

        {currentTab === 'principles' && (
          <RelationshipPrinciples />
        )}

        {currentTab === 'calendar' && (
          <VisitCalendar 
            visits={visits} 
            onAddVisit={handleAddVisit} 
            onConfirmVisit={handleConfirmVisit}
            onProposeChange={() => {}}
          />
        )}

        {currentTab === 'messages' && (
          <LoveMessages 
            messages={messages} 
            onAddMessage={handleAddMessage} 
            onMarkAsRead={handleMarkMessageAsRead}
            currentUser="Quentin"
            partnerName="Naima"
          />
        )}

        {currentTab === 'topics' && (
          <TopicsBoard 
            topics={topics} 
            onAddTopic={handleAddTopic} 
            onDeleteTopic={handleDeleteTopic}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Gebaut mit ❤️ für Quentin & Naima</p>
      </footer>
    </div>
  )
}

export default App
