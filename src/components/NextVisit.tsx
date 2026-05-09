interface Visit {
  id: string
  date: string
  title: string
  description: string
  confirmed: boolean
}

interface Props {
  visit: Visit | undefined
}

export default function NextVisit({ visit }: Props) {
  if (!visit) {
    return (
      <section className="next-visit-section">
        <div className="next-visit-card empty">
          <h2>💕 Nächster Besuch</h2>
          <p>Noch kein Termin geplant...</p>
          <p className="next-visit-hint">Erstellt einen gemeinsamen Termin, um vorfreudige Momente zu schaffen!</p>
        </div>
      </section>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Heute'
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Morgen'
    }

    const daysUntil = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    if (daysUntil < 7) {
      return `in ${daysUntil} Tagen`
    }

    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const daysUntil = Math.ceil((new Date(visit.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <section className="next-visit-section">
      <div className={`next-visit-card ${visit.confirmed ? 'confirmed' : 'pending'}`}>
        <div className="countdown">
          <span className="countdown-number">{daysUntil}</span>
          <span className="countdown-label">Tage</span>
        </div>
        <div className="visit-info">
          <h2>💕 {visit.title}</h2>
          <p className="visit-when">📅 {formatDate(visit.date)}</p>
          {visit.description && <p className="visit-details">{visit.description}</p>}
          <span className={`mini-badge ${visit.confirmed ? 'confirmed' : 'pending'}`}>
            {visit.confirmed ? '✓ Bestätigt' : '⏳ Ausstehend'}
          </span>
        </div>
      </div>
    </section>
  )
}
