import { useState } from 'react'

const principles = [
  { icon: '💬', title: 'Vollständigkeit', desc: 'Wir erzählen uns alles (Gutes wie Schwieriges)' },
  { icon: '🗺️', title: 'Gemeinsame Abenteuer', desc: 'Wir planen gemeinsame Ausflüge und Urlaube' },
  { icon: '💑', title: 'Regelmäßige Dates', desc: 'Mindestens ein Date pro Monat (virtuell oder persönlich)' },
  { icon: '💌', title: 'Liebevolle Worte', desc: 'Wir schreiben uns liebevolle Nachrichten' },
  { icon: '🏠', title: 'Gemeinsame Entscheidungen', desc: 'Entscheidungen über Wohnung und Zukunft treffen wir gemeinsam' },
  { icon: '🤝', title: 'Gegenseitige Unterstützung', desc: 'Wir unterstützen uns gegenseitig und sind füreinander Priorität 1' },
  { icon: '🗣️', title: 'Offene Kommunikation', desc: 'Wenn etwas nicht passt, sprechen wir es direkt an' },
  { icon: '🔍', title: 'Lösungsorientierung', desc: 'Wir suchen Lösungen statt Fehler' },
  { icon: '👥', title: 'Gegenseitiger Respekt', desc: 'Gegenseitiger Respekt' },
  { icon: '⚖️', title: 'Gleichberechtigung', desc: 'Jede Meinung zählt gleich viel' },
  { icon: '⏸️', title: 'Raum für Individualität', desc: 'Zeit für sich ist in Ordnung' },
  { icon: '👂', title: 'Aktives Zuhören', desc: 'Wir hören einander zu, auch bei kleinen Sorgen' },
  { icon: '🔒', title: 'Vertrauen', desc: 'Vertrauen ist die Basis' },
]

export default function RelationshipPrinciples() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section className="principles-section">
      <div className="section-header">
        <h2>✨ Unsere Leitlinien</h2>
        <p>Die Fundamente unserer wunderschönen Beziehung</p>
      </div>

      <div className="principles-grid">
        {principles.map((principle, index) => (
          <div
            key={index}
            className={`principle-card ${expandedId === index ? 'expanded' : ''}`}
            onClick={() => setExpandedId(expandedId === index ? null : index)}
          >
            <div className="principle-icon">{principle.icon}</div>
            <h3 className="principle-title">{principle.title}</h3>
            <p className="principle-description">{principle.desc}</p>
          </div>
        ))}
      </div>

      <div className="principles-footer">
        <p className="warm-message">
          Diese Leitlinien bilden das Fundament unserer Liebe. Gemeinsam schaffen wir einen Raum 
          der Authentizität, des Vertrauens und der gegenseitigen Unterstützung. 💕
        </p>
      </div>
    </section>
  )
}
