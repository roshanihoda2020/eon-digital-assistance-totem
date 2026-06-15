import { Send, X } from 'lucide-react'

interface Props {
  value: string
  onSend: () => void
  onClose: () => void
}

export function TextInputRow({ value, onSend, onClose }: Props) {
  const canSend = value.trim().length > 0

  return (
    <div
      style={{
        height: 80,
        flexShrink: 0,
        background: '#B00502',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        paddingInline: 24,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Close keyboard */}
      <button
        onClick={onClose}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.28)',
          background: 'rgba(255,255,255,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <X size={20} color="rgba(255,255,255,0.80)" strokeWidth={2.5} />
      </button>

      {/* Typed text display */}
      <div
        style={{
          flex: 1,
          height: 56,
          borderRadius: 10,
          background: 'rgba(255,255,255,0.10)',
          border: '1.5px solid rgba(255,255,255,0.22)',
          display: 'flex',
          alignItems: 'center',
          paddingInline: 22,
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            width: '100%',
            fontSize: 22,
            fontWeight: 400,
            color: value ? '#FFFFFF' : 'rgba(255,255,255,0.42)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            letterSpacing: '0.01em',
          }}
        >
          {value || 'Digita la tua domanda…'}
        </span>
      </div>

      {/* Send */}
      <button
        onClick={canSend ? onSend : undefined}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          background: canSend ? '#EA1D0A' : 'rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canSend ? 'pointer' : 'default',
          flexShrink: 0,
          transition: 'background 0.2s ease',
          boxShadow: canSend ? '0 2px 12px rgba(234,29,10,0.40)' : 'none',
        }}
      >
        <Send size={22} color="#FFFFFF" strokeWidth={2} />
      </button>
    </div>
  )
}
