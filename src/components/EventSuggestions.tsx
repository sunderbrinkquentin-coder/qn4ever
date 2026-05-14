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
  // Romantik
  { id: '1', title: 'Sternenhimmel beobachten', description: 'Legt euch auf eine Decke und zählt die Sterne zusammen.', category: 'Romantik' },
  { id: '2', title: 'Sunset-Picknick', description: 'Packt Snacks ein und genießt gemeinsam den Sonnenuntergang.', category: 'Romantik' },
  { id: '3', title: 'Candlelight Dinner zu Hause', description: 'Kocht zusammen und genießt bei Kerzenlicht.', category: 'Romantik' },
  { id: '4', title: 'Slow Dancing im Wohnzimmer', description: 'Tanzt zu eurer Lieblingsmusik zusammen.', category: 'Romantik' },
  { id: '5', title: 'Liebesbrief schreiben', description: 'Schreibt sich gegenseitig liebevolle Briefe.', category: 'Romantik' },

  // Natur & Outdoor
  { id: '6', title: 'Wanderung im Wald', description: 'Erkundet die Natur und atmet frische Luft.', category: 'Natur' },
  { id: '7', title: 'Fahrradtour', description: 'Fahrt zusammen neue Strecken ab.', category: 'Natur' },
  { id: '8', title: 'Spaziergang im Park', description: 'Macht einen entspannten Spaziergang zusammen.', category: 'Natur' },
  { id: '9', title: 'Picknick am See', description: 'Genießt die Zeit am Wasser mit leckeren Snacks.', category: 'Natur' },
  { id: '10', title: 'Vogelbeobachtung', description: 'Beobachtet zusammen die Vogelwelt.', category: 'Natur' },

  // Zuhause
  { id: '11', title: 'Kochabend', description: 'Kocht zusammen ein neues Rezept.', category: 'Zuhause' },
  { id: '12', title: 'Filmabend mit Popcorn', description: 'Schaut zusammen euren Lieblingsfilm an.', category: 'Zuhause' },
  { id: '13', title: 'Backabenteuer', description: 'Backt zusammen Kekse, Kuchen oder Brot.', category: 'Zuhause' },
  { id: '14', title: 'Spa-Tag zu Hause', description: 'Macht euch gegenseitig Massagen und entspannt.', category: 'Zuhause' },
  { id: '15', title: 'Puzzle-Challenge', description: 'Löst zusammen ein großes Puzzle.', category: 'Zuhause' },

  // Kreativität
  { id: '16', title: 'Malabend', description: 'Malt zusammen ein Bild und lasst eurer Kreativität freien Lauf.', category: 'Kreativität' },
  { id: '17', title: 'Fotoshooting', description: 'Macht schöne Fotos zusammen als Erinnerung.', category: 'Kreativität' },
  { id: '18', title: 'Schreib-Workshop', description: 'Schreibt gemeinsam eine Geschichte oder Gedichte.', category: 'Kreativität' },
  { id: '19', title: 'DIY-Projekt', description: 'Bastelt zusammen etwas Neues.', category: 'Kreativität' },
  { id: '20', title: 'Musik machen', description: 'Singt zusammen oder spielt Instrumente.', category: 'Kreativität' },

  // Abenteuer
  { id: '21', title: 'Roadtrip', description: 'Macht einen spontanen Ausflug mit dem Auto.', category: 'Abenteuer' },
  { id: '22', title: 'Städtetrip', description: 'Erkundet zusammen eine neue Stadt.', category: 'Abenteuer' },
  { id: '23', title: 'Camping-Wochenende', description: 'Verbringt eine Nacht unter Sternen im Zelt.', category: 'Abenteuer' },
  { id: '24', title: 'Klettern gehen', description: 'Testet eure Grenzen beim Klettern.', category: 'Abenteuer' },
  { id: '25', title: 'Bootsfahrt', description: 'Fahrt zusammen mit dem Boot auf dem Wasser.', category: 'Abenteuer' },

  // Kultur
  { id: '26', title: 'Museum besuchen', description: 'Erkundet zusammen die Kunstwelt.', category: 'Kultur' },
  { id: '27', title: 'Theater oder Oper', description: 'Genießt eine kulturelle Aufführung zusammen.', category: 'Kultur' },
  { id: '28', title: 'Konzertbesuch', description: 'Hört euren Lieblingskünstler live zusammen.', category: 'Kultur' },
  { id: '29', title: 'Ausstellung besuchen', description: 'Erkundet zusammen eine Ausstellung.', category: 'Kultur' },
  { id: '30', title: 'Kunstkurs', description: 'Besucht zusammen einen Kunstkurs.', category: 'Kultur' },

  // Sport
  { id: '31', title: 'Yoga zusammen', description: 'Macht zusammen Yoga für Entspannung.', category: 'Sport' },
  { id: '32', title: 'Fitnesstraining', description: 'Trainiert zusammen im Fitnessstudio.', category: 'Sport' },
  { id: '33', title: 'Tennis spielen', description: 'Spielt zusammen Tennis.', category: 'Sport' },
  { id: '34', title: 'Tanzkurs', description: 'Besucht zusammen einen Tanzkurs.', category: 'Sport' },
  { id: '35', title: 'Schwimmen gehen', description: 'Genießt Zeit zusammen im Schwimmbad.', category: 'Sport' },

  // Spiele & Fun
  { id: '36', title: 'Brettspielabend', description: 'Spielt zusammen eure Lieblingsbrettspiele.', category: 'Spiele' },
  { id: '37', title: 'Karaoke-Nacht', description: 'Singt zusammen Karaoke.', category: 'Spiele' },
  { id: '38', title: 'Escape-Room', description: 'Löst zusammen Rätsel in einem Escape-Room.', category: 'Spiele' },
  { id: '39', title: 'Quiz-Duelle', description: 'Stellt euch gegenseitig Fragen und testet euer Wissen.', category: 'Spiele' },
  { id: '40', title: 'Schatzsuche', description: 'Versteckt Kleinigkeiten und sucht sie zusammen.', category: 'Spiele' },
]

const categoryEmojis: { [key: string]: string } = {
  'Romantik': '💖',
  'Natur': '🌳',
  'Zuhause': '🏠',
  'Kreativität': '🎨',
  'Abenteuer': '🗺️',
  'Kultur': '🎭',
  'Sport': '💪',
  'Spiele': '🎮',
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
        <p>Inspirationen für eure gemeinsame Zeit ({filteredEvents.length} Ideen)</p>
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
