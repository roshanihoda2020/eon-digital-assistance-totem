import { Mic, Keyboard, Send, RefreshCw, LogOut, ChevronDown, Check, User, MessageSquare } from 'lucide-react'
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

// Heights for dropdown offset calculation (keep in sync with actual rendered heights)
const FOOTER_H   = 192
const BAR_H_NORM = 76
const BAR_H_COMP = 72

export function LuxiaControlBar({
  sessionState, displayMode, lang, keyboardOpen,
  onParla, onScrivi, onInvia, onReset, onTermina, onLangChange, onSetAvatar, onSetChat,
}: Props) {
  const [langOpen, setLangOpen] = useState(false)
  const isListening  = sessionState === 'listening'
  const isTyping     = sessionState === 'typing'
  const isProcessing = sessionState === 'processing'
  const currentLang  = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0]
  const inAvatarMode = displayMode === 'avatar'
  const compact      = keyboardOpen

  const btnH    = compact ? 58 : 56
  const iconSz  = compact ? 14 : 16
  const barPad  = compact ? 7  : 10

  // Position the dropdown so it always floats above all bottom UI
  const dropBottom = keyboardOpen
    ? FOOTER_H + BAR_H_COMP + TEXT_STRIP_HEIGHT + KEYBOARD_HEIGHT + 8
    : FOOTER_H + BAR_H_NORM + 8

  return (
    <div
      style={{
        flexShrink: 0,
        background: '#FFFFFF',
        borderTop: '2px solid #EA1D0A',
        fontFamily: 'Inter, sans-serif',
        paddingInline: 14,
        paddingTop: barPad,
        paddingBottom: barPad,
        overflow: 'visible',
        position: 'relative',
        zIndex: 30,
        transition: 'padding 0.22s ease',
      }}
    >
      <div style={{ display: 'flex', gap: 5, alignItems: 'stretch' }}>

        {/* PARLA */}
        <Btn
          onClick={onParla}
          active={isListening}
          activeColor="#EA1D0A"
          disabled={isProcessing}
          pulsing={isListening}
          flex={1}
          height={btnH}
          iconSize={iconSz}
          compact={compact}
          label={isListening ? 'STOP' : 'PARLA'}
          desc={isListening ? 'Tocca per fermare' : 'Premi per parlare con Luxia'}
          icon={<Mic size={iconSz} strokeWidth={2} />}
        />

        {/* SCRIVI ↔ INVIA */}
        {isListening ? (
          <Btn
            onClick={onInvia}
            active
            activeColor="#EA1D0A"
            flex={1}
            height={btnH}
            iconSize={iconSz}
            compact={compact}
            label="INVIA"
            desc="Invia messaggio vocale"
            icon={<Send size={iconSz} strokeWidth={2} />}
          />
        ) : (
          <Btn
            onClick={onScrivi}
            active={isTyping}
            activeColor="#1EA2B1"
            disabled={isProcessing}
            flex={1}
            height={btnH}
            iconSize={iconSz}
            compact={compact}
            label="SCRIVI"
            desc="Digita la tua domanda"
            icon={<Keyboard size={iconSz} strokeWidth={2} />}
          />
        )}

        {/* Hairline divider */}
        <div style={{ width: 1, background: '#EBEBED', alignSelf: 'stretch', margin: '4px 0' }} />

        {/* AVATAR */}
        <Btn
          onClick={onSetAvatar}
          active={inAvatarMode}
          activeColor="#EA1D0A"
          flex={0.9}
          height={btnH}
          iconSize={iconSz}
          compact={compact}
          label="AVATAR"
          desc="Mostra assistente virtuale"
          icon={<User size={iconSz} strokeWidth={2} />}
        />

        {/* CHAT */}
        <Btn
          onClick={onSetChat}
          active={!inAvatarMode}
          activeColor="#EA1D0A"
          flex={0.9}
          height={btnH}
          iconSize={iconSz}
          compact={compact}
          label="CHAT"
          desc="Solo conversazione testuale"
          icon={<MessageSquare size={iconSz} strokeWidth={2} />}
        />

        {/* Hairline divider */}
        <div style={{ width: 1, background: '#EBEBED', alignSelf: 'stretch', margin: '4px 0' }} />

        {/* RESET */}
        <Btn
          onClick={onReset}
          disabled={isProcessing}
          flex={0.85}
          height={btnH}
          iconSize={iconSz}
          compact={compact}
          label="RESET"
          desc="Nuova conversazione"
          icon={<RefreshCw size={iconSz - 1} strokeWidth={2} />}
        />

        {/* TERMINA */}
        <Btn
          onClick={onTermina}
          danger
          disabled={isProcessing}
          flex={1}
          height={btnH}
          iconSize={iconSz}
          compact={compact}
          label="TERMINA"
          desc="Chiudi la sessione"
          icon={<LogOut size={iconSz - 1} strokeWidth={2} />}
        />

        {/* Hairline divider */}
        <div style={{ width: 1, background: '#EBEBED', alignSelf: 'stretch', margin: '4px 0' }} />

        {/* LINGUA — dropdown opens upward, always above all fixed bars */}
        <div style={{ flex: 0.75, position: 'relative' }}>
          <button
            onClick={() => setLangOpen(o => !o)}
            style={{
              width: '100%',
              height: btnH,
              borderRadius: 8,
              border: '1.5px solid #E8E8E8',
              background: '#F6F6F7',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              transition: 'height 0.22s ease',
            }}
          >
            <span style={{ fontSize: compact ? 15 : 17, lineHeight: 1 }}>{currentLang.flag}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#404040', letterSpacing: '0.05em' }}>
                {currentLang.code}
              </span>
              <ChevronDown
                size={9}
                color="#999"
                strokeWidth={2.5}
                style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }}
              />
            </div>
            <span style={{ fontSize: compact ? 10 : 11, fontWeight: 500, color: '#999999', lineHeight: 1, marginTop: 1 }}>
              Lingua
            </span>
          </button>

          {/* Dropup — fixed position, always above footer + control bar + optional keyboard */}
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
                  right: 16,
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
                    <span style={{
                      fontSize: 16,
                      fontWeight: l.code === lang ? 700 : 500,
                      color: l.code === lang ? '#EA1D0A' : '#404040',
                      flex: 1,
                      textAlign: 'left',
                    }}>
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

/* ── Btn ─────────────────────────────────────────────────────────── */

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
  flex: number
  height: number
  iconSize: number
  compact: boolean
}

function Btn({ onClick, label, desc, icon, active, activeColor, disabled, danger, pulsing, flex, height, compact }: BtnProps) {
  const bg  = active && activeColor ? activeColor
            : disabled             ? '#F2F2F2'
            : danger               ? 'rgba(234,29,10,0.04)'
            :                        '#F6F6F7'
  const bdr = active && activeColor ? 'none'
            : danger               ? '1.5px solid rgba(234,29,10,0.20)'
            :                        '1.5px solid #E8E8E8'
  const clr = active               ? '#FFFFFF'
            : disabled             ? '#C4C4C4'
            : danger               ? '#EA1D0A'
            :                        '#404040'
  const descClr = active ? 'rgba(255,255,255,0.65)' : '#AAAAAA'

  return (
    <div style={{ flex, position: 'relative' }}>
      {pulsing && (
        <motion.div
          style={{ position: 'absolute', inset: -3, borderRadius: 11, border: `2px solid ${activeColor}`, opacity: 0.30 }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.30, 0.06, 0.30] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          width: '100%',
          height,
          borderRadius: 8,
          border: bdr,
          background: bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: compact ? 1 : 2,
          cursor: disabled ? 'default' : 'pointer',
          color: clr,
          transition: 'background 0.20s ease, color 0.20s ease, height 0.22s ease',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {icon}
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.07em', lineHeight: 1 }}>
          {label}
        </span>
        <span
          style={{
            fontSize: compact ? 10 : 11,
            fontWeight: 500,
            color: descClr,
            lineHeight: 1.05,
            letterSpacing: 0,
            maxWidth: '92%',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {desc}
        </span>
      </button>
    </div>
  )
}
