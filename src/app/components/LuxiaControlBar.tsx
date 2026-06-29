import { Mic, Keyboard, Send, RefreshCw, LogOut, ChevronDown, Check, User, MessageSquare, Globe2, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { SessionState, LangCode, LANGUAGES, DisplayMode } from '../types'

interface Props {
  sessionState: SessionState
  displayMode: DisplayMode
  lang: LangCode
  keyboardOpen: boolean
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  onParla: () => void
  onScrivi: () => void
  onInvia: () => void
  onReset: () => void
  onTermina: () => void
  onLangChange: (lang: LangCode) => void
  onSetAvatar: () => void
  onSetChat: () => void
}

export function LuxiaControlBar({
  sessionState, displayMode, lang, keyboardOpen,
  collapsed, onCollapsedChange,
  onParla, onScrivi, onInvia, onReset, onTermina, onLangChange, onSetAvatar, onSetChat,
}: Props) {
  const [langOpen, setLangOpen] = useState(false)
  const isListening = sessionState === 'listening'
  const isTyping = sessionState === 'typing'
  const isProcessing = sessionState === 'processing'
  const currentLang = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0]
  const inAvatarMode = displayMode === 'avatar'
  const compact = keyboardOpen

  const btnH = compact ? 54 : 74
  const iconSz = compact ? 18 : 20
  const barPad = compact ? 8 : 10

  const railWidth = compact ? 104 : 110
  const collapsedWidth = 30
  const columnWidth = collapsed ? 54 : railWidth + 38
  const buttonGap = compact ? 5 : 6
  const sectionGap = compact ? 10 : 14

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
      <button
        onClick={() => onCollapsedChange(!collapsed)}
        aria-label={collapsed ? 'Espandi azioni' : 'Comprimi azioni'}
        style={{
          position: 'absolute',
          top: collapsed ? 18 : '50%',
          left: collapsed ? 'auto' : 0,
          right: collapsed ? 16 : 'auto',
          width: collapsed ? 30 : 20,
          height: collapsed ? 34 : 96,
          transform: collapsed ? 'none' : 'translateY(-50%)',
          border: '1px solid rgba(234,29,10,0.14)',
          borderRight: collapsed ? '1px solid rgba(234,29,10,0.14)' : 'none',
          borderRadius: collapsed ? '14px 0 0 14px' : '12px 0 0 12px',
          background: '#FFFFFF',
          boxShadow: '0 6px 18px rgba(95,31,25,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#EA1D0A',
          cursor: 'pointer',
          pointerEvents: 'auto',
          zIndex: 2,
        }}
      >
        {collapsed ? <ChevronLeft size={18} strokeWidth={2.4} /> : <ChevronRight size={18} strokeWidth={2.4} />}
      </button>

      <AnimatePresence>
        {collapsed && (
          <motion.div
            key="rail-collapsed"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.16 }}
            style={{
              position: 'absolute',
              top: 58,
              right: 16,
              bottom: 12,
              width: collapsedWidth,
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 4,
              paddingBottom: 4,
              pointerEvents: 'auto',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: sectionGap, flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: buttonGap }}>
                <IconBtn
                  onClick={onParla}
                  active={isListening}
                  activeColor="#EA1D0A"
                  disabled={isProcessing}
                  tone="softRed"
                  ariaLabel="Parla"
                  icon={isListening ? <Send size={16} strokeWidth={2} /> : <Mic size={16} strokeWidth={2} />}
                />
                <IconBtn
                  onClick={onScrivi}
                  active={isTyping}
                  activeColor="#B00502"
                  disabled={isProcessing}
                  tone="softRed"
                  ariaLabel="Scrivi"
                  icon={<Keyboard size={16} strokeWidth={2} />}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: buttonGap }}>
                <IconBtn
                  onClick={onSetAvatar}
                  active={inAvatarMode}
                  activeColor="#EA1D0A"
                  ariaLabel="Avatar"
                  icon={<User size={16} strokeWidth={2} />}
                />
                <IconBtn
                  onClick={onSetChat}
                  active={!inAvatarMode}
                  activeColor="#EA1D0A"
                  ariaLabel="Chat"
                  icon={<MessageSquare size={16} strokeWidth={2} />}
                />
              </div>
            </div>

            <div style={{ flex: 1, minHeight: compact ? 8 : 16 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: sectionGap, flexShrink: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: buttonGap }}>
                <IconBtn
                  onClick={onReset}
                  disabled={isProcessing}
                  ariaLabel="Reset"
                  icon={<RefreshCw size={15} strokeWidth={2} />}
                />
                <IconBtn
                  onClick={onTermina}
                  danger
                  disabled={isProcessing}
                  ariaLabel="Termina"
                  icon={<LogOut size={15} strokeWidth={2} />}
                />
              </div>

              <div style={{ position: 'relative' }}>
                <IconBtn
                  onClick={() => setLangOpen(o => !o)}
                  ariaLabel="Lingua"
                  icon={<Globe2 size={15} strokeWidth={2} />}
                />
              </div>
            </div>
          </motion.div>
        )}

        {!collapsed && (
          <motion.div
            key="rail"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 18 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              top: 12,
              right: 16,
              bottom: 12,
              width: railWidth,
              background: '#FFFFFF',
              border: '1px solid rgba(234,29,10,0.10)',
              borderRadius: 20,
              boxShadow: '0 8px 26px rgba(95,31,25,0.11)',
              fontFamily: 'Inter, sans-serif',
              paddingInline: 8,
              paddingTop: barPad,
              paddingBottom: barPad,
              overflowY: 'auto',
              overflowX: 'visible',
              scrollbarWidth: 'none',
              pointerEvents: 'auto',
              transition: 'padding 0.22s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                minHeight: '100%',
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
                    desc={isListening ? 'Invia la tua domanda' : 'Premi per parlare con Luxia'}
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
                    desc="Digita la tua domanda"
                    icon={<Keyboard size={iconSz} strokeWidth={2} />}
                  />
                </ActionGroup>

                <ActionGroup flex={1.05} tone="neutral" gap={buttonGap}>
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
              </div>

              <div style={{ flex: 1, minHeight: compact ? 8 : 16 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: sectionGap, flexShrink: 0 }}>
                <ActionGroup flex={1.18} tone="neutral" gap={buttonGap}>
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

                <div style={{ width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    onClick={() => setLangOpen(o => !o)}
                    aria-label="Lingua"
                    style={{
                      width: '100%',
                      height: compact ? 42 : 46,
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

                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LanguageMenu
        open={langOpen}
        collapsed={collapsed}
        railWidth={railWidth}
        lang={lang}
        onSelect={(nextLang) => { onLangChange(nextLang); setLangOpen(false) }}
      />
    </motion.aside>
  )
}

function LanguageMenu({
  open,
  collapsed,
  railWidth,
  lang,
  onSelect,
}: {
  open: boolean
  collapsed: boolean
  railWidth: number
  lang: LangCode
  onSelect: (lang: LangCode) => void
}) {
  const menuRight = collapsed ? 56 : railWidth + 26

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
            right: menuRight,
            bottom: 12,
            minWidth: 210,
            background: '#FFFFFF',
            border: '1px solid rgba(234,29,10,0.10)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 -4px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)',
            zIndex: 1000,
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
        padding: 5,
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
}

interface IconBtnProps {
  onClick: () => void
  ariaLabel: string
  icon: React.ReactNode
  active?: boolean
  activeColor?: string
  disabled?: boolean
  danger?: boolean
  tone?: 'softRed' | 'neutral'
}

function IconBtn({ onClick, ariaLabel, icon, active, activeColor, disabled, danger, tone }: IconBtnProps) {
  const bg = active && activeColor ? activeColor
    : disabled ? '#F2F2F2'
      : danger ? '#FFFFFF'
        : tone === 'softRed' ? '#FDF3F2'
          : '#FFFFFF'
  const bdr = active && activeColor ? '1px solid transparent'
    : danger ? '1.5px solid rgba(234,29,10,0.55)'
      : tone === 'softRed' ? '1px solid rgba(234,29,10,0.12)'
        : '1px solid #E6E6E8'
  const clr = active ? '#FFFFFF'
    : disabled ? '#BFBFBF'
      : danger ? '#EA1D0A'
        : tone === 'softRed' ? '#B00502'
          : '#404040'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        width: 30,
        height: 34,
        borderRadius: 11,
        border: bdr,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: clr,
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'Inter, sans-serif',
        transition: 'background 0.20s ease, color 0.20s ease, border-color 0.20s ease',
      }}
    >
      {icon}
    </button>
  )
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
          gap: compact ? 2 : 4,
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
        <span style={{ fontSize: compact ? 11 : 12, fontWeight: 800, letterSpacing: 0, lineHeight: 1 }}>
          {label}
        </span>
        {showDesc && (
          <span
            style={{
              fontSize: 9,
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
