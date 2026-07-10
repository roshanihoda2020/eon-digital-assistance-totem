import { RefreshCw, LogOut, X, Check } from 'lucide-react'
import { motion } from 'motion/react'

interface Props {
  type: 'reset' | 'end'
  onConfirm: () => void
  onCancel: () => void
}

const CONFIG = {
  reset: {
    Icon: RefreshCw,
    iconColor: '#404040',
    iconBg: '#F6F6F7',
    title: 'Avviare una nuova conversazione?',
    description: 'La conversazione attuale verrà eliminata. Lucia inizierà con un nuovo saluto.',
    confirmLabel: 'Sì, ricomincia',
    confirmBg: '#EA1D0A',
  },
  end: {
    Icon: LogOut,
    iconColor: '#EA1D0A',
    iconBg: '#FDF3F2',
    title: 'Terminare la sessione?',
    description: 'La conversazione verrà chiusa ed eliminata. Il totem tornerà alla schermata iniziale.',
    confirmLabel: 'Sì, termina',
    confirmBg: '#B00502',
  },
}

export function ConfirmationOverlay({ type, onConfirm, onCancel }: Props) {
  const cfg = CONFIG[type]
  const { Icon } = cfg

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.62)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: 740,
          background: '#FFFFFF',
          borderRadius: 24,
          padding: '52px 52px 44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: cfg.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={32} color={cfg.iconColor} strokeWidth={1.8} />
        </div>

        <div style={{ fontSize: 28, fontWeight: 700, color: '#1A1A1A', textAlign: 'center', lineHeight: 1.25 }}>
          {cfg.title}
        </div>

        <div style={{ fontSize: 19, color: '#717182', textAlign: 'center', lineHeight: 1.5, maxWidth: 520 }}>
          {cfg.description}
        </div>

        <div style={{ width: '100%', height: 1, background: '#F0F0F0', margin: '4px 0' }} />

        <div style={{ display: 'flex', gap: 14, width: '100%' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, height: 88, borderRadius: 14, border: '2px solid #E8E8E8',
              background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, cursor: 'pointer', fontSize: 19, fontWeight: 700, color: '#404040',
              letterSpacing: '0.03em', fontFamily: 'Inter, sans-serif',
            }}
          >
            <X size={20} strokeWidth={2.5} />
            Annulla
          </button>

          <button
            onClick={onConfirm}
            style={{
              flex: 1, height: 88, borderRadius: 14, border: 'none',
              background: cfg.confirmBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, cursor: 'pointer', fontSize: 19, fontWeight: 700, color: '#FFFFFF',
              letterSpacing: '0.03em', fontFamily: 'Inter, sans-serif',
            }}
          >
            <Check size={20} strokeWidth={2.5} />
            {cfg.confirmLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
