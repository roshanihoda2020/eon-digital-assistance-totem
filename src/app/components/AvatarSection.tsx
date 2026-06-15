import avatarImg from '../../imports/Avatar.png'

interface Props {
  keyboardOpen: boolean
}

export function AvatarSection({ keyboardOpen }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          background: '#F6F6F7',
        }}
      >
        <img
          src={avatarImg}
          alt="Lucia - assistente digitale E.ON"
          style={{
            width: '100%',
            height: '100%',
            objectFit: keyboardOpen ? 'contain' : 'cover',
            objectPosition: keyboardOpen ? 'center 38%' : 'center 42%',
            display: 'block',
            transition: 'object-position 280ms ease, transform 280ms ease',
            transform: keyboardOpen ? 'scale(0.98)' : 'scale(1)',
          }}
        />
      </div>

      <div
        style={{
          height: 3,
          background: '#EA1D0A',
          flexShrink: 0,
        }}
      />
    </div>
  )
}
