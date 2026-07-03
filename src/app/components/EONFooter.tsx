import { Zap, Flame, Car, Home } from 'lucide-react'

const SERVICES = [
  { icon: Zap, label: 'Luce', color: '#EA1D0A' },
  { icon: Flame, label: 'Gas', color: '#EA1D0A' },
  { icon: Car, label: 'E-Mobility', color: '#EA1D0A' },
  { icon: Home, label: 'Servizi Casa', color: '#EA1D0A' },
]

export function EONFooter() {
  return (
    <footer
      style={{
        height: 192,
        flexShrink: 0,
        background: '#FFFFFF',
        borderTop: '1px solid #E8E8E8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: '20px 40px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#EA1D0A',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          E.ON Digital Assistance Point
        </span>
        <span
          style={{
            fontSize: 14,
            color: '#999',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}
        >
          Assistenza clienti · Servizi energetici · Mobilità sostenibile
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 40,
          alignItems: 'center',
        }}
      >
        {SERVICES.map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: '#F6F6F7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={22} color={color} strokeWidth={1.8} />
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#404040',
                letterSpacing: '0.03em',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </footer>
  )
}
