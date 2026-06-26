import { useEffect, useRef } from 'react'
import { Volume2 } from 'lucide-react'
import { Message } from '../types'

export type { Message }

interface Props {
  messages: Message[]
  onRipeti?: () => void
}

export function ChatArea({ messages, onRipeti }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Index of the last assistant message — RIPETI chip shows only there
  const lastAssistantIdx = messages.reduce(
    (acc, msg, idx) => (msg.role === 'assistant' ? idx : acc),
    -1,
  )

  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '28px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        fontFamily: 'Inter, sans-serif',
        scrollbarWidth: 'none',
      }}
    >
      {messages.map((msg, idx) => (
        <div
          key={msg.id}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
            gap: 6,
          }}
        >
          {msg.role === 'assistant' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EA1D0A' }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: '#EA1D0A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Luxia
              </span>
            </div>
          )}

          <div
            style={{
              maxWidth: 820,
              padding: msg.role === 'assistant' ? '22px 28px' : '20px 28px',
              borderRadius: msg.role === 'assistant' ? '4px 24px 24px 24px' : '24px 4px 24px 24px',
              background: msg.role === 'assistant' ? '#EA1D0A' : '#FFFFFF',
              border: msg.role === 'user' ? '2px solid #EA1D0A' : 'none',
              color: msg.role === 'assistant' ? '#FFFFFF' : '#EA1D0A',
              fontSize: 24,
              fontWeight: 500,
              lineHeight: 1.35,
              letterSpacing: '0.01em',
            }}
          >
            {msg.text}
          </div>

          <span
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: '#999',
              lineHeight: 1.3,
              marginLeft: msg.role === 'assistant' ? 4 : 0,
              marginRight: msg.role === 'user' ? 4 : 0,
            }}
          >
            {msg.time}
          </span>

          {msg.role === 'user' && msg.source === 'voice' && (
            <button
              aria-label="Riascolta messaggio vocale"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginRight: 4,
                marginTop: 2,
                padding: '6px 12px 6px 10px',
                borderRadius: 16,
                border: '1.5px solid rgba(234,29,10,0.24)',
                background: 'rgba(234,29,10,0.06)',
                cursor: 'pointer',
                color: '#EA1D0A',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.02em',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <Volume2 size={14} strokeWidth={2} />
              Riascolta
            </button>
          )}

          {/* RIPETI — contextual, only after the last Luxia message */}
          {msg.role === 'assistant' && idx === lastAssistantIdx && onRipeti && (
            <button
              onClick={onRipeti}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginLeft: 4,
                marginTop: 2,
                padding: '6px 14px 6px 10px',
                borderRadius: 16,
                border: '1.5px solid rgba(30,162,177,0.30)',
                background: 'rgba(30,162,177,0.06)',
                cursor: 'pointer',
                color: '#1EA2B1',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.02em',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <Volume2 size={14} strokeWidth={2} />
              Ripeti risposta
            </button>
          )}
        </div>
      ))}

      <div ref={bottomRef} />
    </div>
  )
}
