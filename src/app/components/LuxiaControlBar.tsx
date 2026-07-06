import { Mic, Keyboard, Send, Plus, LogOut, ChevronDown, Check, Globe2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { SessionState, LangCode, LANGUAGES } from '../types'

interface Props {
  sessionState: SessionState
  lang: LangCode
  keyboardOpen: boolean
  onParla: () => void
  onScrivi: () => void
  onReset: () => void
  onTermina: () => void
  onLangChange: (lang: LangCode) => void
}

export function LuxiaControlBar({
  sessionState, lang, keyboardOpen,
  onParla, onScrivi, onReset, onTermina, onLangChange,
}: Props) {
  const [langOpen, setLangOpen] = useState(false)
  const isListening = sessionState === 'listening'
  const isTyping = sessionState === 'typing'
  const isProcessing = sessionState === 'processing'
  const currentLang = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0]
  const compact = keyboardOpen

  const btnH = compact ? 60 : 82
  const iconSz = compact ? 20 : 22
  const barPad = compact ? 10 : 12

  const railWidth = compact ? 124 : 132
  const columnWidth = railWidth + 40
  const buttonGap = compact ? 7 : 8
  const sectionGap = compact ? 12 : 16

  return (
    <motion.aside
      style={{
        position: 'relative',
        width: columnWidth,
        flexShrink: 0,
        alignSelf: 'stretch',
        fontFamily: 'Inter, sans-serif',
        overflow: 'visible',
        zIndex: 30,
        pointerEvents: 'none',
      }}
      animate={{ width: columnWidth }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        key="rail"
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.18 }}
        style={{
          position: 'absolute',
          top: 12,
          right: 16,
          width: railWidth,
          maxHeight: 'calc(100% - 24px)',
          background: '#FFFFFF',
          border: '1px solid rgba(234,29,10,0.10)',
          borderRadius: 20,
          boxShadow: '0 8px 26px rgba(95,31,25,0.11)',
          fontFamily: 'Inter, sans-serif',
          paddingInline: 8,
          paddingTop: barPad,
          paddingBottom: barPad,
          overflow: 'visible',
          pointerEvents: 'auto',
          transition: 'padding 0.22s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 0,
            background: 'transparent',
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            padding: 0,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: sectionGap, flexShrink: 0 }}>
            <ActionGroup flex={1.3} tone="softRed" gap={buttonGap}>
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
                label={isListening ? 'Invia domanda' : 'Parla'}
                desc={isListening ? 'Invia la domanda' : 'Parla con Luxia'}
                icon={isListening ? <Send size={iconSz} strokeWidth={2} /> : <Mic size={iconSz} strokeWidth={2} />}
              />
              <Btn
                onClick={onScrivi}
                active={isTyping}
                activeColor="#B00502"
                disabled={isProcessing}
                tone="softRed"
                flex={1}
                height={btnH}
                iconSize={iconSz}
                compact={compact}
                label="Scrivi"
                desc="Digita la domanda"
                icon={<Keyboard size={iconSz} strokeWidth={2} />}
              />
            </ActionGroup>

            <ActionGroup flex={1.18} tone="neutral" gap={buttonGap}>
              <Btn
                onClick={onReset}
                disabled={isProcessing}
                tone="neutral"
                flex={1}
                height={btnH}
                iconSize={iconSz}
                compact={compact}
                label="Nuova chat"
                desc="Nuova sessione"
                icon={<Plus size={iconSz - 1} strokeWidth={2.2} />}
                contentGap={compact ? 2 : 3}
                labelFontSize={compact ? 10.8 : 11.8}
                labelLineHeight={1.04}
                descFontSize={10}
              />
              <Btn
                onClick={onTermina}
                danger
                disabled={isProcessing}
                flex={1}
                height={btnH}
                iconSize={iconSz}
                compact={compact}
                label="Termina sessione"
                desc="Chiudi sessione"
                icon={<LogOut size={iconSz - 1} strokeWidth={2} />}
                contentGap={compact ? 2 : 3}
                labelFontSize={compact ? 9.6 : 10.4}
                labelLineHeight={1.02}
                descFontSize={10}
              />
            </ActionGroup>

            <div style={{ width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
              <button
                onClick={() => setLangOpen(o => !o)}
                aria-label="Lingua"
                style={{
                  width: '100%',
                  height: compact ? 44 : 50,
                  borderRadius: 14,
                  border: '1px solid #EFE4E2',
                  background: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  color: '#404040',
                  transition: 'border-color 0.18s ease, background 0.18s ease',
                }}
              >
                <Globe2 size={16} strokeWidth={2} color="#EA1D0A" />
                <span style={{ fontSize: 15, fontWeight: 800, color: '#404040', letterSpacing: '0.04em', lineHeight: 1 }}>
                  {currentLang.code}
                </span>
                <ChevronDown
                  size={14}
                  color="#9A8B88"
                  strokeWidth={2.4}
                  style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s' }}
                />
              </button>

              <LanguageMenu
                open={langOpen}
                lang={lang}
                onSelect={(nextLang) => { onLangChange(nextLang); setLangOpen(false) }}
              />

            </div>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  )
}

function LanguageMenu({
  open,
  lang,
  onSelect,
}: {
  open: boolean
  lang: LangCode
  onSelect: (lang: LangCode) => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lang-drop"
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'absolute',
            right: 'calc(100% + 8px)',
            bottom: 0,
            minWidth: 210,
            background: '#FFFFFF',
            border: '1px solid rgba(234,29,10,0.10)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 -4px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)',
            zIndex: 4000,
            fontFamily: 'Inter, sans-serif',
            pointerEvents: 'auto',
          }}
        >
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => onSelect(l.code)}
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
  )
}

interface ActionGroupProps {
  flex: number
  tone?: 'softRed' | 'neutral'
  gap: number
  children: React.ReactNode
}

function ActionGroup({ flex, tone, gap, children }: ActionGroupProps) {
  const background = tone === 'softRed' ? 'rgba(234,29,10,0.035)' : 'rgba(247,247,248,0.72)'

  return (
    <section
      style={{
        flex: 'none',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap,
        alignItems: 'stretch',
        padding: 6,
        borderRadius: 16,
        background,
      }}
    >
      {children}
    </section>
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
  contentGap?: number
  labelFontSize?: number
  labelLineHeight?: number
  descFontSize?: number
}

function Btn({
  onClick,
  label,
  desc,
  icon,
  active,
  activeColor,
  disabled,
  danger,
  pulsing,
  tone,
  flex,
  height,
  compact,
  contentGap,
  labelFontSize,
  labelLineHeight,
  descFontSize,
}: BtnProps) {
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
      : '#5F5F64'
  const showDesc = !compact

  return (
    <div style={{ flex: 'none', position: 'relative', minWidth: 0 }}>
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
          gap: contentGap ?? (compact ? 2 : 4),
          paddingInline: compact ? 5 : 7,
          cursor: disabled ? 'default' : 'pointer',
          color: clr,
          transition: 'background 0.20s ease, color 0.20s ease, border-color 0.20s ease, height 0.22s ease',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
          flexShrink: 0,
          overflow: 'visible',
        }}
      >
        {icon}
        <span
          style={{
            fontSize: labelFontSize ?? (compact ? 11 : 12),
            fontWeight: 800,
            letterSpacing: 0,
            lineHeight: labelLineHeight ?? 1,
            textAlign: 'center',
            whiteSpace: 'normal',
            maxWidth: '100%',
            overflowWrap: 'break-word',
          }}
        >
          {label}
        </span>
        {showDesc && (
          <span
            style={{
              fontSize: descFontSize ?? 10,
              fontWeight: 500,
              color: descClr,
              lineHeight: 1.08,
              letterSpacing: 0,
              maxWidth: '100%',
              textAlign: 'center',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {desc}
          </span>
        )}
      </button>
    </div>
  )
}
