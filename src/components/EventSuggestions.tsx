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
    title: 'Fürth Erlebnispark',
    description: 'Familienfreundlicher Park mit vielen Aktivitäten und schönen Spazierweg',
    category: 'Parks & Natur',
  },
  {
    id: '2',
    title: 'Besuch im Museum Mensch und Natur',
    description: 'Interessante Ausstellungen über Geschichte und Kultur',
    category: 'Kultur',
  },
  {
    id: '3',
    title: 'Spaziergang durch die Fürther Altstadt',
    description: 'Romantischer Spaziergang durch die historische Altstadt mit Cafés und Restaurants',
    category: 'Entdeckungen',
  },
  {
    id: '4',
    title: 'Gemeinsames Picknick im Grünen',
    description: 'Ein schönes Picknick mit leckerem Essen im Park oder am See genießen',
    category: 'Picknick & Natur',
  },
  {
    id: '5',
    title: 'Kino-Abend im Fürth Cinemaxx',
    description: 'Gemütlicher Kinoabend mit euren Lieblings-Snacks',
    category: 'Unterhaltung',
  },
  {
    id: '6',
    title: 'Besuch in der Fürther Kunsthalle',
    description: 'Inspirierende Kunstausstellungen und kulturelle Veranstaltungen',
    category: 'Kultur',
  },
  {
    id: '7',
    title: 'Fahrradtour durch Fürth und Umgebung',
    description: 'Schöne Fahrradstrecken durch Fürth und die nähere Umgebung',
    category: 'Sport & Outdoor',
  },
  {
    id: '8',
    title: 'Gemeinsames Kochen & Dinner',
    description: 'Ein schönes Dinner zusammen kochen und genießen',
    category: 'Zuhause',
  },
  {
    id: '9',
    title: 'Besuch auf dem Fürther Wochenmarkt',
    description: 'Frische Produkte kaufen und das bunte Treiben genießen',
    category: 'Shopping',
  },
  {
    id: '10',
    title: 'Entspanntes Wellness-Erlebnis',
    description: 'Gemeinsam entspannen und abschalten - Spa oder Massagetermin',
    category: 'Wellness',
  },
]

const categoryEmojis: { [key: string]: string } = {
  'Parks & Natur': '🌳',
  'Kultur': '🎨',
  'Entdeckungen': '🗺️',
  'Picknick & Natur': '🧺',
  'Unterhaltung': '🎬',
  'Sport & Outdoor': '🚴',
  'Zuhause': '🏠',
  'Shopping': '🛍️',
  'Wellness': '🧘',
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
        <h2>🎉 Unternehmungs-Ideen für Fürth</h2>
        <p>Inspirationen für euren nächsten Besuch</p>
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
