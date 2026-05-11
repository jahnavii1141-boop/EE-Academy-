'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, RotateCcw, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const STARTERS = [
  'Help me refine my research question',
  'How do I score high on Criterion C?',
  'What should my introduction include?',
  'How do I write a strong conclusion?',
  'What makes a good EE for my subject?',
  'Review my argument structure',
]

function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
          style={{ background: '#0a0a0a' }}>
          <Sparkles size={12} color="#fff" strokeWidth={1.5} />
        </div>
      )}
      <div
        className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
        style={{
          maxWidth: '72%',
          background: isUser ? '#0a0a0a' : '#fff',
          color: isUser ? '#fff' : '#1a1a1a',
          border: isUser ? 'none' : '1px solid #e8e8e8',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          whiteSpace: 'pre-wrap',
        }}
        dangerouslySetInnerHTML={{
          __html: message.content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^## (.*$)/gm, '<div style="font-weight:700;font-size:0.9rem;margin:0.75rem 0 0.25rem">$1</div>')
            .replace(/^- (.*$)/gm, '• $1'),
        }}
      />
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ background: '#0a0a0a' }}>
        <Sparkles size={12} color="#fff" strokeWidth={1.5} />
      </div>
      <div className="px-4 py-3 rounded-2xl border flex items-center gap-1.5"
        style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: '18px 18px 18px 4px' }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#ccc', animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
    </div>
  )
}

function UpgradeCard() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
        style={{ background: '#0a0a0a' }}>
        <Sparkles size={12} color="#fff" strokeWidth={1.5} />
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ maxWidth: '72%', border: '1px solid #e8e8e8' }}>
        <div className="px-5 py-4" style={{ background: '#fff' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>
            That's your 3 free messages
          </p>
          <p className="text-xs leading-relaxed mb-4" style={{ color: '#888' }}>
            Liked what you saw? Premium gives you unlimited access — plus your EE Mentor knows your exact subject, research question, and IB criteria inside out.
          </p>
          <Link href="/pricing"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{ background: '#0a0a0a', color: '#fff' }}>
            Upgrade to Premium
            <ArrowRight size={13} />
          </Link>
        </div>
        <div className="px-5 py-3 flex items-center gap-4"
          style={{ background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
          {['Unlimited AI messages', 'Subject-specific advice', 'Essay review'].map(f => (
            <div key={f} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full" style={{ background: '#16a34a' }} />
              <span className="text-[10px]" style={{ color: '#888' }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DashboardAIAgent({ isPremium, freeUsesLeft, setFreeUsesLeft, freeLimit = 3 }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [hitLimit, setHitLimit] = useState(false)
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  // Derive whether we've hit the limit
  const isLimited = !isPremium && (freeUsesLeft <= 0 || hitLimit)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText, loading])

  const sendMessage = async (content) => {
    if (!content.trim() || loading || isLimited) return
    const userMsg = { role: 'user', content: content.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setStreamingText('')

    try {
      const res = await fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok) {
        const err = await res.json()
        if (err.error === 'trial_limit_reached') {
          setHitLimit(true)
          setFreeUsesLeft(0)
          setMessages(prev => [...prev, { role: 'upgrade', content: '' }])
        } else if (err.error === 'api_key_missing') {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'EE Mentor is being set up — check back in a few minutes.',
          }])
        } else {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: `Error: ${err.error || 'Something went wrong. Please try again.'}`,
          }])
        }
        setLoading(false)
        return
      }

      // Read remaining uses from header
      const remaining = res.headers.get('X-Free-Uses-Remaining')
      if (remaining !== null && !isPremium) {
        setFreeUsesLeft(parseInt(remaining, 10))
        if (parseInt(remaining, 10) === 0) setHitLimit(true)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullText += decoder.decode(value)
        setStreamingText(fullText)
      }

      const finalMessages = [...newMessages, { role: 'assistant', content: fullText }]

      // If this was their last free message, append the upgrade card
      if (!isPremium && parseInt(remaining, 10) === 0) {
        finalMessages.push({ role: 'upgrade', content: '' })
      }

      setMessages(finalMessages)
      setStreamingText('')
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Connection error. Check your internet and try again.',
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const reset = () => {
    setMessages([])
    setStreamingText('')
    setInput('')
  }

  return (
    <div className="h-full flex flex-col" style={{ background: '#fafafa' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid #e8e8e8', background: '#fff' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: '#0a0a0a' }}>
            <Sparkles size={14} color="#fff" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#0a0a0a', letterSpacing: '-0.01em' }}>EE Mentor</p>
            <p className="text-[10px]" style={{ color: '#aaa' }}>Expert in IB Extended Essay research</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Free uses counter */}
          {!isPremium && !hitLimit && (
            <div className="flex items-center gap-1.5">
              {Array.from({ length: freeLimit }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i < freeUsesLeft ? '#0a0a0a' : '#e8e8e8' }} />
              ))}
              <span className="text-[10px] ml-1" style={{ color: '#aaa' }}>
                {freeUsesLeft} free {freeUsesLeft === 1 ? 'message' : 'messages'} left
              </span>
            </div>
          )}
          {!isPremium && (
            <Link href="/pricing" className="text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all"
              style={{ background: '#f0f0f0', color: '#555' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.color = '#555' }}>
              Upgrade
            </Link>
          )}
          {messages.length > 0 && !hitLimit && (
            <button onClick={reset}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
              style={{ color: '#888', border: '1px solid #e8e8e8', background: '#fff' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#0a0a0a'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e8e8e8'}>
              <RotateCcw size={11} />
              New chat
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center pb-10">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: '#0a0a0a' }}>
              <Sparkles size={18} color="#fff" strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold mb-1.5"
              style={{ color: '#0a0a0a', letterSpacing: '-0.02em', fontSize: 18 }}>
              Your EE Mentor
            </h3>
            <p className="text-sm mb-2 max-w-xs leading-relaxed" style={{ color: '#888' }}>
              Ask anything about your Extended Essay — research questions, structure, criteria, subject-specific advice.
            </p>
            {!isPremium && (
              <p className="text-xs mb-8 px-3 py-1.5 rounded-lg"
                style={{ color: '#aaa', background: '#f5f5f5' }}>
                {freeUsesLeft} free {freeUsesLeft === 1 ? 'message' : 'messages'} to try it out
              </p>
            )}
            <div className="grid grid-cols-2 gap-2 w-full max-w-md">
              {STARTERS.map(s => (
                <button key={s} onClick={() => sendMessage(s)}
                  className="text-left px-4 py-3 rounded-xl text-xs leading-relaxed transition-all"
                  style={{ background: '#fff', border: '1px solid #e8e8e8', color: '#555' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a0a0a'; e.currentTarget.style.color = '#0a0a0a' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; e.currentTarget.style.color = '#555' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) =>
          msg.role === 'upgrade'
            ? <UpgradeCard key={i} />
            : <MessageBubble key={i} message={msg} />
        )}

        {loading && !streamingText && <TypingIndicator />}

        {streamingText && (
          <div className="flex gap-3 justify-start">
            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
              style={{ background: '#0a0a0a' }}>
              <Sparkles size={12} color="#fff" strokeWidth={1.5} />
            </div>
            <div className="rounded-2xl px-4 py-3 text-sm leading-relaxed"
              style={{
                maxWidth: '72%', background: '#fff', color: '#1a1a1a',
                border: '1px solid #e8e8e8', borderRadius: '18px 18px 18px 4px', whiteSpace: 'pre-wrap',
              }}
              dangerouslySetInnerHTML={{
                __html: streamingText
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/^- (.*$)/gm, '• $1') +
                  '<span style="display:inline-block;width:2px;height:14px;background:#ccc;margin-left:2px;animation:blink 1s step-end infinite;vertical-align:text-bottom"></span>',
              }}
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input — hidden when limit hit */}
      {!isLimited && (
        <div className="px-6 py-4" style={{ borderTop: '1px solid #e8e8e8', background: '#fff' }}>
          <div className="flex items-end gap-3 rounded-2xl px-4 py-3"
            style={{ border: '1px solid #e0e0e0', background: '#fafafa' }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => {
                setInput(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px'
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask your EE Mentor anything…"
              rows={1}
              className="flex-1 resize-none text-sm focus:outline-none bg-transparent leading-relaxed"
              style={{ color: '#0a0a0a', maxHeight: 140, minHeight: 22 }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: '#0a0a0a' }}>
              <Send size={13} color="#fff" strokeWidth={2} />
            </button>
          </div>
          <p className="text-[10px] text-center mt-2" style={{ color: '#ccc' }}>
            Shift+Enter for new line · Enter to send
          </p>
        </div>
      )}

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
      `}</style>
    </div>
  )
}
