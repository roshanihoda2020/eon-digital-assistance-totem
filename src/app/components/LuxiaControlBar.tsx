import { Mic, Keyboard, Send, RefreshCw, LogOut, ChevronDown, Check, User, MessageSquare, Globe2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { SessionState, LangCode, LANGUAGES, DisplayMode, KEYBOARD_HEIGHT, TEXT_STRIP_HEIGHT } from '../types'

interface Props {
  sessionState: SessionState
  displayMode: DisplayMode
  lang: LangCode
  keyboardOpen: boolean
  onParla: () => void
  onScrivi: () => void
  onInvia: () => void
  onReset: () => void
  onTermina: () => void
  onLangChange: (lang: LangCode) => void
  onSetAvatar: () => void
  onSetChat: () => void
}

const FOOTER_H = 192
const BAR_H_NORM = 112
const BAR_H_COMP = 106

export function LuxiaControlBar({
  sessionState, displayMode, lang, keyboardOpen,
  onParla, onScrivi, onInvia, onReset, onTermina, onLangChange, onSetAvatar, onSetChat,
}: Props) {
  const [langOpen, setLangOpen] = useState(false)
  const isListening = sessionState === 'listening'
  const isTyping = sessionState === 'typing'
  const isProcessing = sessionState === 'processing'
  const currentLang = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0]
  const inAvatarMode = displayMode === 'avatar'
  const compact = keyboardOpen

  const btnH = compact ? 64 : 68
  const iconSz = compact ? 18 : 20
  const barPad = compact ? 10 : 14

  const dropBottom = keyboardOpen
    ? FOOTER_H + BAR_H_COMP + TEXT_STRIP_HEIGHT + KEYBOARD_HEIGHT + 8
    : FOOTER_H + BAR_H_NORM + 8

  return (
    <div
      style={{
        flexShrink: 0,
        background: '#FDF3F2',
        borderTop: '1px solid rgba(234,29,10,0.10)',
        fontFamily: 'Inter, sans-serif',
        paddingInline: 22,
        paddingTop: barPad,
        paddingBottom: barPad,
        overflow: 'visible',
        position: 'relative',
        zIndex: 30,
        transition: 'padding 0.22s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 14,
          background: '#FFFFFF',
          border: '1px solid rgba(234,29,10,0.10)',
          borderRadius: 22,
          boxShadow: '0 -8px 28px rgba(95,31,25,0.08)',
          padding: compact ? '12px 14px' : '16px',
        }}
      >
        <ActionGroup flex={1.3} tone="softRed">
          <Btn
            onClick={onParla}
            active={isListening}
            activeColor="#EA1D0A"
            disabled={isProcessing}
            pulsing={isListening}
            tone="softRed"
            flex={1}
            height={btnH}
            iconSize={iconSz}
            compact={compact}
            label="Parla"
            desc="Premi per parlare con Luxia"
            icon={<Mic size={iconSz} strokeWidth={2} />}
          />
          <Btn
            onClick={isListening ? onInvia : onScrivi}
            active={isListening || isTyping}
            activeColor={isListening ? '#EA1D0A' : '#B00502'}
            disabled={isProcessing}
            tone="softRed"
            flex={1}
            height={btnH}
            iconSize={iconSz}
            compact={compact}
            label="Scrivi"
            desc="Digita la tua domanda"
            icon={isListening ? <Send size={iconSz} strokeWidth={2} /> : <Keyboard size={iconSz} strokeWidth={2} />}
          />
        </ActionGroup>

        <Divider />

        <ActionGroup flex={1.05} tone="neutral">
          <Btn
            onClick={onSetAvatar}
            active={inAvatarMode}
            activeColor="#EA1D0A"
            tone="neutral"
            flex={1}
            height={btnH}
            iconSize={iconSz}
            compact={compact}
            label="Avatar"
            desc="Mostra assistente virtuale"
            icon={<User size={iconSz} strokeWidth={2} />}
          />
          <Btn
            onClick={onSetChat}
            active={!inAvatarMode}
            activeColor="#EA1D0A"
            tone="neutral"
            flex={1}
            height={btnH}
            iconSize={iconSz}
            compact={compact}
            label="Chat"
            desc="Solo conversazione testuale"
            icon={<MessageSquare size={iconSz} strokeWidth={2} />}
          />
        </ActionGroup>

        <Divider />

        <ActionGroup flex={1.18} tone="neutral">
          <Btn
            onClick={onReset}
            disabled={isProcessing}
            tone="neutral"
            flex={1}
            height={btnH}
            iconSize={iconSz}
            compact={compact}
            label="Reset"
            desc="Nuova conversazione"
            icon={<RefreshCw size={iconSz - 1} strokeWidth={2} />}
          />
          <Btn
            onClick={onTermina}
            danger
            disabled={isProcessing}
            flex={1}
            height={btnH}
            iconSize={iconSz}
            compact={compact}
            label="Termina"
            desc="Chiudi la sessione"
            icon={<LogOut size={iconSz - 1} strokeWidth={2} />}
          />
        </ActionGroup>

        <Divider />

        <div style={{ width: compact ? 82 : 92, position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
          <button
            onClick={() => setLangOpen(o => !o)}
            aria-label="Lingua"
            style={{
              width: '100%',
              height: compact ? 44 : 48,
              borderRadius: 14,
              border: '1px solid #EFE4E2',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              color: '#404040',
              transition: 'border-color 0.18s ease, background 0.18s ease',
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>{currentLang.flag}</span>
            <Globe2 size={15} strokeWidth={2} color="#EA1D0A" />
            <span style={{ fontSize: 14, fontWeight: 800, color: '#404040', letterSpacing: '0.04em', lineHeight: 1 }}>
              {currentLang.code}
            </span>
            <ChevronDown
              size={13}
              color="#9A8B88"
              strokeWidth={2.4}
              style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }}
            />
          </button>

          <AnimatePresence>
            {langOpen && (
              <motion.div
                key="lang-drop"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'fixed',
                  bottom: dropBottom,
                  right: 24,
                  minWidth: 210,
                  background: '#FFFFFF',
                  borderRadius: 14,
                  overflow: 'hidden',
                  boxShadow: '0 -4px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
                  zIndex: 500,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => { onLangChange(l.code); setLangOpen(false) }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 18px',
                      border: 'none',
                      background: l.code === lang ? '#FDF3F2' : '#FFFFFF',
                      cursor: 'pointer',
                      borderBottom: '1px solid #F4F4F4',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{l.flag}</span>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: l.code === lang ? 700 : 500,
                        color: l.code === lang ? '#EA1D0A' : '#404040',
                        flex: 1,
                        textAlign: 'left',
                      }}
                    >
                      {l.label}
                    </span>
                    {l.code === lang && <Check size={15} color="#EA1D0A" strokeWidth={2.5} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

interface ActionGroupProps {
  flex: number
  tone?: 'softRed' | 'neutral'
  children: React.ReactNode
}

function ActionGroup({ flex, tone, children }: ActionGroupProps) {
  const background = tone === 'softRed' ? 'rgba(234,29,10,0.035)' : 'rgba(247,247,248,0.72)'

  return (
    <section
      style={{
        flex,
        minWidth: 0,
        display: 'flex',
        gap: 8,
        alignItems: 'stretch',
        padding: 6,
        borderRadius: 18,
        background,
      }}
    >
      {children}
    </section>
  )
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        background: 'linear-gradient(to bottom, transparent, #E9D8D5 18%, #E9D8D5 82%, transparent)',
        alignSelf: 'stretch',
      }}
    />
  )
}

interface BtnProps {
  onClick: () => void
  label: string
  desc: string
  icon: React.ReactNode
  active?: boolean
  activeColor?: string
  disabled?: boolean
  danger?: boolean
  pulsing?: boolean
  tone?: 'softRed' | 'neutral'
  flex: number
  height: number
  iconSize: number
  compact: boolean
}

function Btn({ onClick, label, desc, icon, active, activeColor, disabled, danger, pulsing, tone, flex, height, compact }: BtnProps) {
  const baseSoftRed = '#FDF3F2'
  const bg = active && activeColor ? activeColor
    : disabled ? '#F2F2F2'
    : danger ? '#FFFFFF'
    : tone === 'softRed' ? baseSoftRed
    : '#F7F7F8'
  const bdr = active && activeColor ? '1px solid transparent'
    : danger ? '1.5px solid rgba(234,29,10,0.55)'
    : tone === 'softRed' ? '1px solid rgba(234,29,10,0.12)'
    : '1px solid #E6E6E8'
  const clr = active ? '#FFFFFF'
    : disabled ? '#BFBFBF'
    : danger ? '#EA1D0A'
    : tone === 'softRed' ? '#B00502'
    : '#404040'
  const descClr = active ? 'rgba(255,255,255,0.72)'
    : disabled ? '#C9C9C9'
    : danger ? 'rgba(234,29,10,0.72)'
    : '#8E8E92'

  return (
    <div style={{ flex, position: 'relative', minWidth: 0 }}>
      {pulsing && (
        <motion.div
          style={{ position: 'absolute', inset: -3, borderRadius: 17, border: `2px solid ${activeColor}`, opacity: 0.30 }}
          animate={{ scale: [1, 1.045, 1], opacity: [0.30, 0.08, 0.30] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          width: '100%',
          height,
          borderRadius: 14,
          border: bdr,
          background: bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: compact ? 2 : 3,
          cursor: disabled ? 'default' : 'pointer',
          color: clr,
          transition: 'background 0.20s ease, color 0.20s ease, border-color 0.20s ease, height 0.22s ease',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {icon}
        <span style={{ fontSize: compact ? 12 : 13, fontWeight: 800, letterSpacing: 0, lineHeight: 1 }}>
          {label}
        </span>
        <span
          style={{
            fontSize: compact ? 9 : 10,
            fontWeight: 500,
            color: descClr,
            lineHeight: 1.12,
            letterSpacing: 0,
            maxWidth: '96%',
            textAlign: 'center',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {desc}
        </span>
      </button>
    </div>
  )
}
