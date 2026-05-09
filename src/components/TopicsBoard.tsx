import { useState } from 'react'

interface Topic {
  id: string
  title: string
  category: string
}

interface Props {
  topics: Topic[]
  onAddTopic: (topic: Omit<Topic, 'id'>) => void
  onDeleteTopic: (topicId: string) => void
}

const categories = [
  { id: 'discuss', label: '💬 Besprechen', emoji: '💬' },
  { id: 'dates', label: '💑 Date-Ideen', emoji: '💑' },
  { id: 'future', label: '🚀 Zukunftsziele', emoji: '🚀' },
  { id: 'ideas', label: '💡 Ideen', emoji: '💡' },
  { id: 'dreams', label: '✨ Träume', emoji: '✨' },
]

export default function TopicsBoard({ topics, onAddTopic, onDeleteTopic }: Props) {
  const [newTopic, setNewTopic] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('discuss')

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      onAddTopic({
        title: newTopic,
        category: selectedCategory,
      })
      setNewTopic('')
    }
  }

  const topicsByCategory = categories.map(cat => ({
    ...cat,
    topics: topics.filter(t => t.category === cat.id),
  }))

  return (
    <section className="topics-section">
      <div className="section-header">
        <h2>📝 Themen-Board</h2>
        <p>Was wir noch besprechen und erleben möchten</p>
      </div>

      <div className="topic-form form-card">
        <div className="form-group">
          <label>📌 Kategorie</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>✍️ Neues Thema</label>
          <input
            type="text"
            placeholder="z.B. Gemeinsamer Urlaub nach Spanien, Picknick im Park..."
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTopic()
              }
            }}
            className="topic-input"
          />
        </div>

        <button
          onClick={handleAddTopic}
          disabled={!newTopic.trim()}
          className="add-btn primary-btn"
        >
          + Hinzufügen
        </button>
      </div>

      <div className="topics-board">
        {topicsByCategory.map(category => (
          category.topics.length > 0 && (
            <div key={category.id} className="topic-category">
              <h3 className="category-title">{category.emoji} {category.label}</h3>
              <div className="topics-grid">
                {category.topics.map(topic => (
                  <div key={topic.id} className="topic-tile">
                    <p className="topic-text">{topic.title}</p>
                    <button
                      onClick={() => onDeleteTopic(topic.id)}
                      className="delete-topic-btn"
                      title="Löschen"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}

        {topics.length === 0 && (
          <div className="empty-state">
            <p>Noch keine Themen notiert...</p>
            <p className="empty-hint">Sammelt eure Ideen und Träume auf diesem Board! 💭</p>
          </div>
        )}
      </div>
    </section>
  )
}
