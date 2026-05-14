import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace('/rest/v1/', '') || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database helpers
export const db = {
  // Visits
  async addVisit(visit: any) {
    const { data, error } = await supabase
      .from('visits')
      .insert([visit])
    if (error) console.error('Error adding visit:', error)
    return data
  },

  async getVisits() {
    const { data, error } = await supabase
      .from('visits')
      .select('*')
      .order('date', { ascending: true })
    if (error) console.error('Error fetching visits:', error)
    return data || []
  },

  // Messages
  async addMessage(message: any) {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
    if (error) console.error('Error adding message:', error)
    return data
  },

  async getMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('timestamp', { ascending: false })
    if (error) console.error('Error fetching messages:', error)
    return data || []
  },

  // Topics
  async addTopic(topic: any) {
    const { data, error } = await supabase
      .from('topics')
      .insert([topic])
    if (error) console.error('Error adding topic:', error)
    return data
  },

  async getTopics() {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error('Error fetching topics:', error)
    return data || []
  },

  // Feedback
  async addFeedback(feedback: any) {
    const { data, error } = await supabase
      .from('feedback')
      .insert([feedback])
    if (error) console.error('Error adding feedback:', error)
    return data
  },

  async getFeedback() {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error('Error fetching feedback:', error)
    return data || []
  }
}
