import { useState } from 'react'
import RelationshipPrinciples from './components/RelationshipPrinciples'
import VisitCalendar from './components/VisitCalendar'
import LoveMessages from './components/LoveMessages'
import TopicsBoard from './components/TopicsBoard'
import NextVisit from './components/NextVisit'
import EventSuggestions from './components/EventSuggestions'
import WeeklyOverview from './components/WeeklyOverview'

function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'principles' | 'calendar' | 'messages' | 'topics' | 'overview'>('home')

  const highlights = ['Schöner Spaziergang im Park', 'Gemeinsames Kochen']
  const challenges = ['Stress bei der Arbeit', 'Wenig Zeit für uns']
  const support = ['Mehr gemeinsame Zeit planen', 'Unterstützung bei Projekten']

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
        <button 
  className={`nav-btn ${currentTab === 'principles' ? 'active' : ''}`}
  onClick={() => setCurrentTab('principles')}
>
  📜 Leitlinien
</button>
      </nav>

      <main className="app-main">
        {currentTab === 'home' && (
          <div className="home-section">
            <NextVisit visit={null} />
            <EventSuggestions selectedDate={''} />
          </div>
        )}

        {currentTab === 'overview' && (
          <WeeklyOverview 
            highlights={highlights} 
            challenges={challenges} 
            support={support} 
          />
        )}

        {currentTab === 'calendar' && (
          <VisitCalendar 
            visits={[]} 
            onAddVisit={() => {}} 
            onConfirmVisit={() => {}} 
          />
        )}

        {currentTab === 'messages' && (
          <LoveMessages 
            messages={[]} 
            onAddMessage={() => {}} 
            onMarkAsRead={() => {}} 
            currentUser="Quentin" 
            partnerName="Naima" 
          />
        )}

        {currentTab === 'topics' && (
          <TopicsBoard 
            topics={[]} 
            onAddTopic={() => {}} 
            onDeleteTopic={() => {}} 
          />
        )}
      </main>
      {currentTab === 'principles' && (
  <RelationshipPrinciples 
    principles={[]} 
    onAddPrinciple={() => {}} 
  />
)}

      <footer className="app-footer">
        <p>Gebaut mit ❤️ für Quentin & Naima</p>
      </footer>
    </div>
  )
}

export default App
