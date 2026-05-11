import { useState, useEffect } from 'react'

interface Event {
  id: string
  title: string
  description: string
  category: string
}

interface Props {
  selectedDate: string
}

const suggestedEvents: Event[] = [
  {
    id: '1',
    title: 'Romantisches Picknick am See',
    description: 'Packt eure Lieblingssnacks ein und genießt die Zeit am Wasser.',
    category: 'Natur',
  },
  {
    id: '2',
    title: 'Sternenhimmel beobachten',
    description: 'Legt euch auf eine Decke und zählt die Sterne. Vielleicht seht ihr eine Sternschnuppe!',
    category: 'Romantik',
  },
  {
    id: '3',
    title: 'Gemeinsamer Kochabend',
    description: 'Kocht zusammen ein neues Rezept und genießt das Ergebnis.',
    category: 'Zuhause',
  },
  {
    id: '4',
    title: 'Wanderung im Wald',
    description: 'Erkundet die Natur und tankt frische Luft.',
    category: 'Abenteuer',
  },
  {
    id: '5',
    title: 'Kreativer Malabend',
    description: 'Malt zusammen ein Bild und lasst eurer Kreativität freien Lauf.',
    category: 'Kreativität',
  },
]

const categoryEmojis: { [key: string]: string } = {
  'Natur': '🌳',
  'Romantik': '💖',
  'Zuhause': '🏠',
  'Abenteuer': '🗺️',
  'Kreativität': '🎨',
}

export default function EventSuggestions({ selectedDate }: Props) {
  const [suggestedCategory, setSuggestedCategory] = useState<string>('')
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(suggestedEvents)

  useEffect(() => {
    const categories = [...new Set(suggestedEvents.map(e => e.category))]
    const randomCategory = categories[Math.floor(Math.random() * categories.length)]
    setSuggestedCategory(randomCategory)
  }, [selectedDate])

  useEffect(() => {
    if (suggestedCategory) {
      setFilteredEvents(suggestedEvents.filter(e => e.category === suggestedCategory))
    } else {
      setFilteredEvents(suggestedEvents)
    }
  }, [suggestedCategory])

  const allCategories = [...new Set(suggestedEvents.map(e => e.category))]

  return (
    <section className="events-section">
      <div className="section-header">
        <h2>🎉 Unternehmungs-Ideen</h2>
        <p>Inspirationen für eure gemeinsame Zeit</p>
      </div>

      <div className="category-filters">
        <button
          className={`filter-btn ${suggestedCategory === '' ? 'active' : ''}`}
          onClick={() => setSuggestedCategory('')}
        >
          Alle zeigen
        </button>
        {allCategories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${suggestedCategory === cat ? 'active' : ''}`}
            onClick={() => setSuggestedCategory(cat)}
          >
            {categoryEmojis[cat]} {cat}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-category">
              <span className="category-badge">
                {categoryEmojis[event.category]} {event.category}
              </span>
            </div>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <button className="event-action-btn">
              💭 Diese Idee speichern
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
