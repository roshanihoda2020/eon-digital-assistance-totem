import avatarImg from '../../imports/Avatar.png'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function AvatarSection() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Image fills all available height — parent controls how tall this is */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#F6F6F7' }}>
        <ImageWithFallback
          src={avatarImg}
          alt="Lucia — assistente digitale E.ON"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
        />

        {/* Online badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: 28,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 14px',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.90)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1EA2B1', boxShadow: '0 0 0 3px rgba(30,162,177,0.22)' }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#404040', letterSpacing: '0.03em', fontFamily: 'Inter, sans-serif' }}>
            Lucia
          </span>
          <span style={{ fontSize: 12, color: '#717182', fontFamily: 'Inter, sans-serif' }}>
            Assistente E.ON
          </span>
        </div>
      </div>

      {/* Clean separator */}
      <div style={{ height: 3, background: '#EA1D0A', flexShrink: 0 }} />
    </div>
  )
}
