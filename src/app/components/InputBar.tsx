import { Mic, Send, ChevronDown, Check } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export type LangCode = 'IT' | 'EN' | 'DE' | 'FR' | 'ES'

interface Props {
  value: string
  lang: LangCode
  onInputPress: () => void
  onVoice: () => void
  onSend: () => void
  onLangChange: (lang: LangCode) => void
  isListening?: boolean
}

const LANGUAGES: { code: LangCode; flag: string; label: string }[] = [
  { code: 'IT', flag: '🇮🇹', label: 'Italiano' },
  { code: 'EN', flag: '🇬🇧', label: 'English' },
  { code: 'DE', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'FR', flag: '🇫🇷', label: 'Français' },
  { code: 'ES', flag: '🇪🇸', label: 'Español' },
]

export function InputBar({ value, lang, onInputPress, onVoice, onSend, onLangChange, isListening }: Props) {
  const [langOpen, setLangOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  useEffect(() => {
    if (!langOpen) return
    const handle = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [langOpen])

  return (
    <div
      style={{
        height: 100,
        flexShrink: 0,
        background: '#B00502',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 32,
        paddingRight: 32,
        gap: 20,
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Language selector */}
      <div ref={dropdownRef} style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => setLangOpen((o) => !o)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 16px',
            borderRadius: 12,
            border: '1.5px solid rgba(255,255,255,0.28)',
            background: langOpen ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.10)',
            cursor: 'pointer',
            transition: 'background 0.15s ease',
            minWidth: 170,
          }}
        >
          <span style={{ fontSize: 28, lineHeight: 1 }}>{current.flag}</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.60)',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
              }}
            >
              Lingua
            </span>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.02em' }}>
              {current.label}
            </span>
          </div>
          <ChevronDown
            size={18}
            color="rgba(255,255,255,0.70)"
            strokeWidth={2.5}
            style={{
              marginLeft: 'auto',
              transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>

        {/* Dropdown — opens upward */}
        {langOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              left: 0,
              minWidth: 220,
              background: '#FFFFFF',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 -8px 32px rgba(0,0,0,0.18)',
              zIndex: 50,
            }}
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  onLangChange(l.code)
                  setLangOpen(false)
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '18px 24px',
                  border: 'none',
                  background: l.code === lang ? '#FDF3F2' : '#FFFFFF',
                  cursor: 'pointer',
                  borderBottom: '1px solid #F0F0F0',
                  transition: 'background 0.12s ease',
                }}
              >
                <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{l.flag}</span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: l.code === lang ? 700 : 500,
                    color: l.code === lang ? '#EA1D0A' : '#404040',
                    flex: 1,
                    textAlign: 'left',
                  }}
                >
                  {l.label}
                </span>
                {l.code === lang && (
                  <Check size={20} color="#EA1D0A" strokeWidth={2.5} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Vertical divider */}
      <div style={{ width: 1, height: 52, background: 'rgba(255,255,255,0.22)', flexShrink: 0 }} />

      {/* Text input touch area */}
      <div
        onClick={onInputPress}
        style={{
          flex: 1,
          height: 64,
          borderRadius: 12,
          background: 'rgba(255,255,255,0.11)',
          border: '1.5px solid rgba(255,255,255,0.24)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 28,
          paddingRight: 28,
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            width: '100%',
            textAlign: value ? 'left' : 'center',
            fontSize: 22,
            fontWeight: 400,
            color: value ? '#FFFFFF' : 'rgba(255,255,255,0.50)',
            letterSpacing: '0.01em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value || 'Scrivi un messaggio'}
        </span>
      </div>

      {/* Vertical divider */}
      <div style={{ width: 1, height: 52, background: 'rgba(255,255,255,0.22)', flexShrink: 0 }} />

      {/* Voice button */}
      <button
        onClick={onVoice}
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: isListening ? '#EA1D0A' : 'rgba(255,255,255,0.14)',
          border: '1.5px solid rgba(255,255,255,0.28)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'all 0.2s ease',
        }}
      >
        <Mic size={26} color="#FFFFFF" strokeWidth={2} />
      </button>

      {/* Send button */}
      <button
        onClick={onSend}
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: '#EA1D0A',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          boxShadow: '0 2px 14px rgba(234,29,10,0.40)',
        }}
      >
        <Send size={26} color="#FFFFFF" strokeWidth={2} />
      </button>
    </div>
  )
}
