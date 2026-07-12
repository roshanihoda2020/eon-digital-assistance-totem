import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { EONHeader } from './components/EONHeader'
import { AvatarSection } from './components/AvatarSection'
import { ChatArea } from './components/ChatArea'
import { LuxiaControlBar } from './components/LuxiaControlBar'
import { KioskKeyboard } from './components/KioskKeyboard'
import { EONFooter } from './components/EONFooter'
import { ConfirmationOverlay } from './components/ConfirmationOverlay'
import { LuxiaWelcomePanel } from './components/LuxiaWelcomePanel'
import {
  DisplayMode, SessionState, LangCode, Message,
  AVATAR_HEIGHT_NORMAL, AVATAR_HEIGHT_COMPRESSED, KEYBOARD_HEIGHT, TEXT_STRIP_HEIGHT,
} from './types'

// Inactivity threshold — deactivates mic/speaking without resetting conversation
const INACTIVITY_MS = 30_000
const DESIGN_WIDTH = 1080
const DESIGN_HEIGHT = 1920

function currentTime() {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

function makeWelcome(): Message {
  return { id: Date.now(), role: 'assistant', text: 'Ciao, sono Lucia. Come posso aiutarti oggi?', time: currentTime() }
}

const RESPONSES = [
  'Grazie per la tua domanda. Sono qui per aiutarti con tutti i servizi E.ON: luce, gas, mobilità elettrica e molto altro.',
  'Ho capito. Per questo servizio puoi contattare il nostro supporto clienti al numero verde 800 900 860, attivo dal lunedì al venerdì.',
  'Certamente! Posso fornirti maggiori dettagli. Vuoi che prenoti un appuntamento con un nostro consulente?',
  "Ottima domanda. L'offerta E.ON include soluzioni personalizzate per uso domestico e business. Preferisci ricevere una consulenza?",
  "Il codice cliente si trova in alto a destra sulla tua bolletta. Puoi accedere all'area clienti su eon.it per tutti i tuoi documenti.",
]

export default function App() {
  const debugPreview = typeof window !== 'undefined'
    && new URLSearchParams(window.location.search).get('debugPreview') === 'true'
  const [previewScale, setPreviewScale] = useState(1)
  const [displayMode, setDisplayMode] = useState<DisplayMode>('avatar')
  const [sessionState, setSessionState] = useState<SessionState>('waiting')
  const [messages, setMessages] = useState<Message[]>([makeWelcome()])
  const [inputValue, setInputValue] = useState('')
  const [lang, setLang] = useState<LangCode>('IT')
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const [hasAnswer, setHasAnswer] = useState(false)
  const [confirmation, setConfirmation] = useState<'reset' | 'end' | null>(null)

  // Hero panel height — drives smooth layout animation
  const heroHeight = displayMode === 'avatar'
    ? (keyboardOpen ? AVATAR_HEIGHT_COMPRESSED : AVATAR_HEIGHT_NORMAL)
    : 232

  const heroKey = displayMode === 'avatar' ? 'avatar'
    : 'welcome'

  // ── 30-second inactivity: deactivates mic/speaking, keeps conversation ──
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetInactivity = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    inactivityTimer.current = setTimeout(() => {
      setSessionState(s => (s === 'listening' || s === 'speaking' ? 'waiting' : s))
    }, INACTIVITY_MS)
  }, [])

  useEffect(() => {
    resetInactivity()
    return () => { if (inactivityTimer.current) clearTimeout(inactivityTimer.current) }
  }, [resetInactivity])

  useEffect(() => {
    const updatePreviewScale = () => {
      if (debugPreview) {
        setPreviewScale(1)
        return
      }

      const nextScale = Math.min(
        window.innerWidth / DESIGN_WIDTH,
        window.innerHeight / DESIGN_HEIGHT,
        1,
      )
      setPreviewScale(nextScale)
    }

    updatePreviewScale()
    window.addEventListener('resize', updatePreviewScale)
    return () => window.removeEventListener('resize', updatePreviewScale)
  }, [debugPreview])

  useEffect(() => {
    const root = document.getElementById('root')
    const html = document.documentElement
    const body = document.body

    if (debugPreview) {
      html.style.height = 'auto'
      html.style.overflow = 'auto'
      body.style.height = 'auto'
      body.style.overflow = 'auto'
      body.style.position = 'static'
      body.style.inset = 'auto'
      if (root) {
        root.style.height = 'auto'
        root.style.overflow = 'visible'
      }
      return
    }

    html.style.height = '100%'
    html.style.overflow = 'hidden'
    body.style.height = '100%'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.inset = '0'
    if (root) {
      root.style.height = '100%'
      root.style.overflow = 'hidden'
    }
  }, [debugPreview])

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSend = useCallback(() => {
    if (sessionState === 'processing') return
    const text = inputValue.trim()
    if (!text && sessionState !== 'listening') return
    resetInactivity()

    const time = currentTime()
    const isVoiceMessage = sessionState === 'listening'
    const messageText = text || 'Vorrei sapere il codice cliente'
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: 'user',
      text: messageText,
      time,
      source: isVoiceMessage ? 'voice' : 'text',
    }])
    setInputValue('')
    setKeyboardOpen(false)
    setSessionState('processing')

    setTimeout(() => {
      const response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: response, time: currentTime() }])
      setHasAnswer(true)
      setSessionState('speaking')
      setTimeout(() => { setSessionState('waiting'); resetInactivity() }, 2000)
    }, 1500)
  }, [inputValue, sessionState, resetInactivity])

  const handleParla = useCallback(() => {
    resetInactivity()
    if (sessionState === 'listening') {
      handleSend()
    } else {
      setKeyboardOpen(false)
      setSessionState('listening')
    }
  }, [handleSend, sessionState, resetInactivity])

  const handleScrivi = useCallback(() => {
    resetInactivity()
    if (keyboardOpen) {
      setKeyboardOpen(false)
      setSessionState('waiting')
    } else {
      setKeyboardOpen(true)
      setSessionState('typing')
    }
  }, [keyboardOpen, resetInactivity])

  const handleKeyPress = useCallback((key: string) => {
    resetInactivity()
    if (key === 'BACKSPACE') setInputValue(p => p.slice(0, -1))
    else if (key === 'SPACE') setInputValue(p => p + ' ')
    else if (key === 'ENTER') handleSend()
    else setInputValue(p => p + key)
  }, [handleSend, resetInactivity])

  const closeKeyboard = useCallback(() => {
    setKeyboardOpen(false)
    if (sessionState === 'typing') setSessionState('waiting')
  }, [sessionState])

  const handleRipeti = useCallback(() => {
    if (!hasAnswer || sessionState === 'processing') return
    setSessionState('speaking')
    resetInactivity()
    setTimeout(() => { setSessionState('waiting'); resetInactivity() }, 2000)
  }, [hasAnswer, resetInactivity, sessionState])

  const executeReset = useCallback(() => {
    setMessages([makeWelcome()])
    setInputValue('')
    setKeyboardOpen(false)
    setSessionState('waiting')
    setHasAnswer(false)
    setConfirmation(null)
    resetInactivity()
    // Keep current displayMode (Avatar or Chat) — per spec
  }, [resetInactivity])

  const executeEnd = useCallback(() => {
    setMessages([makeWelcome()])
    setInputValue('')
    setKeyboardOpen(false)
    setSessionState('waiting')
    setHasAnswer(false)
    setConfirmation(null)
    setDisplayMode('avatar')
    resetInactivity()
  }, [resetInactivity])

  const activeScale = debugPreview ? 1 : previewScale

  return (
    <div
      style={{
        width: debugPreview ? DESIGN_WIDTH + 64 : '100vw',
        minWidth: debugPreview ? DESIGN_WIDTH + 64 : undefined,
        minHeight: debugPreview ? DESIGN_HEIGHT + 64 : undefined,
        height: debugPreview ? 'auto' : '100dvh',
        overflow: debugPreview ? 'visible' : 'hidden',
        background: '#181818',
        display: 'flex',
        alignItems: debugPreview ? 'flex-start' : 'center',
        justifyContent: debugPreview ? 'flex-start' : 'center',
        padding: debugPreview ? 32 : 0,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: DESIGN_WIDTH * activeScale,
          height: DESIGN_HEIGHT * activeScale,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: '#FDF3F2',
            fontFamily: 'Inter, sans-serif',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            position: 'relative',
            flexShrink: 0,
            transform: debugPreview ? 'none' : `scale(${activeScale})`,
            transformOrigin: 'top left',
            boxShadow: !debugPreview && activeScale < 1 ? '0 24px 80px rgba(0,0,0,0.35)' : 'none',
          }}
        >
          {/* ── Header — minimal, no interactive controls ─────────── */}
          <EONHeader
            displayMode={displayMode}
            onToggleMode={() => setDisplayMode(m => m === 'avatar' ? 'fullchat' : 'avatar')}
          />

          {/* ── Hero panel — single container, crossfades content on state change ─ */}
          <motion.div
            animate={{ height: heroHeight }}
            transition={{ duration: 0.30, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'relative', flexShrink: 0, overflow: 'hidden' }}
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={heroKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                {displayMode === 'avatar' ? (
                  <AvatarSection keyboardOpen={keyboardOpen} />
                ) : (
                  <LuxiaWelcomePanel />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ── Conversation — always expands to fill remaining space ─ */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0, position: 'relative' }}>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <ChatArea
                messages={messages}
                onRipeti={hasAnswer ? handleRipeti : undefined}
              />

              {/* Typing indicator */}
              <AnimatePresence>
                {sessionState === 'processing' && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ paddingLeft: 42, paddingBottom: 12, flexShrink: 0 }}
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <LuxiaControlBar
              sessionState={sessionState}
              lang={lang}
              keyboardOpen={keyboardOpen}
              onParla={handleParla}
              onScrivi={handleScrivi}
              onReset={() => setConfirmation('reset')}
              onTermina={() => setConfirmation('end')}
              onLangChange={setLang}
            />
          </div>

          {/* ── Text display strip — shows while keyboard is open ─────
          Bordeaux bar above keyboard showing what's being typed.
      ─────────────────────────────────────────────────────────── */}
          <AnimatePresence>
            {keyboardOpen && (
              <motion.div
                key="text-strip"
                initial={{ height: 0 }}
                animate={{ height: TEXT_STRIP_HEIGHT }}
                exit={{ height: 0 }}
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: 'hidden', flexShrink: 0 }}
              >
                <TextStrip value={inputValue} onSend={handleSend} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Keyboard — slides in below the input strip ─────────── */}
          <AnimatePresence>
            {keyboardOpen && (
              <motion.div
                key="keyboard"
                initial={{ height: 0 }}
                animate={{ height: KEYBOARD_HEIGHT }}
                exit={{ height: 0 }}
                transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: 'hidden', flexShrink: 0 }}
              >
                <KioskKeyboard onKeyPress={handleKeyPress} onClose={closeKeyboard} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Footer ─────────────────────────────────────────────── */}
          <EONFooter />

          {/* ── Confirmation overlays ───────────────────────────────── */}
          <AnimatePresence>
            {confirmation && (
              <ConfirmationOverlay
                key={confirmation}
                type={confirmation}
                onConfirm={confirmation === 'reset' ? executeReset : executeEnd}
                onCancel={() => setConfirmation(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ── Text strip shown above keyboard while typing ──────────── */
function TextStrip({ value, onSend }: { value: string; onSend: () => void }) {
  const canSend = value.trim().length > 0
  return (
    <div
      style={{
        height: TEXT_STRIP_HEIGHT,
        background: '#B00502',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        paddingInline: 24,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          flex: 1,
          height: 52,
          borderRadius: 10,
          background: 'rgba(255,255,255,0.10)',
          border: '1.5px solid rgba(255,255,255,0.20)',
          display: 'flex',
          alignItems: 'center',
          paddingInline: 20,
          overflow: 'hidden',
        }}
      >
        <span style={{
          fontSize: 22, fontWeight: 400,
          color: value ? '#FFFFFF' : 'rgba(255,255,255,0.40)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {value || 'Digita la tua domanda…'}
        </span>
      </div>
      <button
        onClick={canSend ? onSend : undefined}
        style={{
          width: 52, height: 52, borderRadius: '50%', border: 'none',
          background: canSend ? '#EA1D0A' : 'rgba(255,255,255,0.16)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: canSend ? 'pointer' : 'default', flexShrink: 0,
          boxShadow: canSend ? '0 2px 10px rgba(234,29,10,0.40)' : 'none',
          transition: 'all 0.18s ease',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  )
}

/* ── Animated typing indicator ─────────────────────────────── */
function TypingIndicator() {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 22px', borderRadius: '4px 20px 20px 20px', background: '#EA1D0A' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
