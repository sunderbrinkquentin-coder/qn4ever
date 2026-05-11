import React from 'react'

interface Props {
  highlights: string[]
  challenges: string[]
  support: string[]
}

export default function WeeklyOverview({ highlights, challenges, support }: Props) {
  return (
    <section className="weekly-overview">
      <div className="section-header">
        <h2>📅 Wochenübersicht</h2>
        <p>Ein Rückblick auf unsere Woche</p>
      </div>

      <div className="overview-section">
        <h3>✨ Highlights</h3>
        {highlights.length > 0 ? (
          <ul>
            {highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Keine Highlights eingetragen.</p>
        )}
      </div>

      <div className="overview-section">
        <h3>🌊 Herausforderungen</h3>
        {challenges.length > 0 ? (
          <ul>
            {challenges.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Keine Herausforderungen eingetragen.</p>
        )}
      </div>

      <div className="overview-section">
        <h3>🤝 Unterstützung</h3>
        {support.length > 0 ? (
          <ul>
            {support.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Keine Unterstützung eingetragen.</p>
        )}
      </div>
    </section>
  )
}
