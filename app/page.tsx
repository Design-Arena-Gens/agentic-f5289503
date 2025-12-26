'use client'

import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [channelName, setChannelName] = useState('')
  const [channelTopic, setChannelTopic] = useState('')
  const [taskType, setTaskType] = useState('video-ideas')
  const [taskInput, setTaskInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const [messages, setMessages] = useState<Message[]>([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelName,
          channelTopic,
          taskType,
          taskInput,
        }),
      })

      const data = await response.json()
      setResult(data.result || data.error || 'No response received')
    } catch (error) {
      setResult('Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage: Message = { role: 'user', content: chatInput }
    setMessages(prev => [...prev, userMessage])
    setChatInput('')
    setChatLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          channelName,
          channelTopic,
        }),
      })

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message || data.error || 'No response received',
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Error: ' + (error instanceof Error ? error.message : 'Unknown error'),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🎬 YouTube Channel Agent</h1>
        <p>Your AI-powered assistant for creating amazing content</p>
      </header>

      <div className="main-content">
        <div className="card">
          <h2>Channel Setup</h2>
          <div className="input-group">
            <label htmlFor="channelName">Channel Name</label>
            <input
              id="channelName"
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Enter your channel name"
            />
          </div>
          <div className="input-group">
            <label htmlFor="channelTopic">Channel Topic/Niche</label>
            <input
              id="channelTopic"
              type="text"
              value={channelTopic}
              onChange={(e) => setChannelTopic(e.target.value)}
              placeholder="e.g., Gaming, Tech Reviews, Cooking"
            />
          </div>
        </div>

        <div className="card">
          <h2>Quick Task</h2>
          <form onSubmit={handleTaskSubmit}>
            <div className="input-group">
              <label htmlFor="taskType">Task Type</label>
              <select
                id="taskType"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
              >
                <option value="video-ideas">Generate Video Ideas</option>
                <option value="title">Create Video Title</option>
                <option value="description">Write Video Description</option>
                <option value="tags">Suggest Tags</option>
                <option value="script">Write Video Script</option>
                <option value="thumbnail">Thumbnail Ideas</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="taskInput">Additional Details</label>
              <textarea
                id="taskInput"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Provide any specific details or requirements..."
              />
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </form>
          {result && (
            <div className="result">
              <h3>Result:</h3>
              <p>{result}</p>
            </div>
          )}
        </div>

        <div className="card chat-container">
          <h2>Chat with Your Agent</h2>
          <div className="messages">
            {messages.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#999' }}>
                Start a conversation with your YouTube agent...
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role}`}>
                  <div className="message-role">
                    {msg.role === 'user' ? 'You' : 'Agent'}
                  </div>
                  <div className="message-content">{msg.content}</div>
                </div>
              ))
            )}
            {chatLoading && <div className="loading">Agent is thinking...</div>}
          </div>
          <form onSubmit={handleChatSubmit}>
            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask anything about your YouTube channel..."
                disabled={chatLoading}
              />
              <button
                type="submit"
                className="btn"
                disabled={chatLoading || !chatInput.trim()}
                style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>💡 Content Ideas</h3>
          <p>Generate unlimited video ideas tailored to your niche and audience</p>
        </div>
        <div className="feature-card">
          <h3>✍️ Script Writing</h3>
          <p>Get complete video scripts with hooks, content, and calls-to-action</p>
        </div>
        <div className="feature-card">
          <h3>🎯 SEO Optimization</h3>
          <p>Create optimized titles, descriptions, and tags for better discoverability</p>
        </div>
        <div className="feature-card">
          <h3>🖼️ Thumbnail Concepts</h3>
          <p>Receive creative thumbnail ideas to maximize click-through rates</p>
        </div>
      </div>
    </div>
  )
}
