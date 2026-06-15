import { X, Delete, ArrowRight, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface Props {
  onKeyPress: (key: string) => void
  onClose: () => void
}

const ROW_LETTERS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

const ROW_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

export function KioskKeyboard({ onKeyPress, onClose }: Props) {
  const [shifted, setShifted] = useState(false)

  const handleLetter = (key: string) => {
    onKeyPress(shifted ? key.toUpperCase() : key.toLowerCase())
  }

  const KEY_HEIGHT = 80
  const KEY_RADIUS = 10
  const KEY_GAP = 8

  const letterKeyStyle: React.CSSProperties = {
    height: KEY_HEIGHT,
    borderRadius: KEY_RADIUS,
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: 26,
    color: '#FFFFFF',
    letterSpacing: '0.02em',
    background: '#EA1D0A',
    transition: 'background 0.1s ease',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    flexShrink: 0,
  }

  const accentKeyStyle: React.CSSProperties = {
    ...letterKeyStyle,
    background: '#1EA2B1',
    fontSize: 22,
  }

  const punctKeyStyle: React.CSSProperties = {
    ...letterKeyStyle,
    background: '#E0E0E2',
    color: '#404040',
    fontSize: 26,
    fontWeight: 600,
  }

  const closeKeyStyle: React.CSSProperties = {
    ...letterKeyStyle,
    background: '#404040',
    fontSize: 18,
    gap: 6,
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: KEY_GAP,
    justifyContent: 'center',
    width: '100%',
  }

  return (
    <div
      style={{
        height: 520,
        flexShrink: 0,
        background: '#F6F6F7',
        borderTop: '1px solid #E0E0E2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: KEY_GAP,
        padding: '16px 28px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Number row */}
      <div style={rowStyle}>
        {ROW_NUMBERS.map((k) => (
          <button
            key={k}
            onClick={() => onKeyPress(k)}
            style={{ ...letterKeyStyle, flex: 1, fontSize: 24 }}
          >
            {k}
          </button>
        ))}
        <button
          onClick={() => onKeyPress('BACKSPACE')}
          style={{ ...accentKeyStyle, flex: 1.4 }}
        >
          <Delete size={26} strokeWidth={2} />
        </button>
      </div>

      {/* Q W E R T Y U I O P */}
      <div style={rowStyle}>
        {ROW_LETTERS[0].map((k) => (
          <button
            key={k}
            onClick={() => handleLetter(k)}
            style={{ ...letterKeyStyle, flex: 1 }}
          >
            {shifted ? k : k.toLowerCase()}
          </button>
        ))}
      </div>

      {/* A S D F G H J K L + Enter */}
      <div style={rowStyle}>
        {ROW_LETTERS[1].map((k) => (
          <button
            key={k}
            onClick={() => handleLetter(k)}
            style={{ ...letterKeyStyle, flex: 1 }}
          >
            {shifted ? k : k.toLowerCase()}
          </button>
        ))}
        <button
          onClick={() => onKeyPress('ENTER')}
          style={{ ...accentKeyStyle, flex: 1.8, gap: 6 }}
        >
          <ArrowRight size={24} strokeWidth={2.5} />
          <span style={{ fontSize: 18, fontWeight: 700 }}>Invia</span>
        </button>
      </div>

      {/* Shift + Z X C V B N M + punctuation */}
      <div style={rowStyle}>
        <button
          onClick={() => setShifted((s) => !s)}
          style={{
            ...accentKeyStyle,
            flex: 1.5,
            background: shifted ? '#D51507' : '#1EA2B1',
          }}
        >
          <ChevronUp size={26} strokeWidth={2.5} />
        </button>
        {ROW_LETTERS[2].map((k) => (
          <button
            key={k}
            onClick={() => handleLetter(k)}
            style={{ ...letterKeyStyle, flex: 1 }}
          >
            {shifted ? k : k.toLowerCase()}
          </button>
        ))}
        <button onClick={() => onKeyPress(',')} style={{ ...punctKeyStyle, flex: 1 }}>,</button>
        <button onClick={() => onKeyPress('.')} style={{ ...punctKeyStyle, flex: 1 }}>.</button>
        <button onClick={() => onKeyPress('!')} style={{ ...punctKeyStyle, flex: 1 }}>!</button>
      </div>

      {/* Space row */}
      <div style={rowStyle}>
        <button onClick={onClose} style={{ ...closeKeyStyle, flex: 1 }}>
          <X size={20} strokeWidth={2.5} />
          <span>Chiudi</span>
        </button>
        <button
          onClick={() => onKeyPress('SPACE')}
          style={{ ...accentKeyStyle, flex: 6, fontSize: 18, letterSpacing: '0.15em' }}
        >
          SPAZIO
        </button>
        <button onClick={() => onKeyPress('@')} style={{ ...punctKeyStyle, flex: 1 }}>@</button>
        <button onClick={() => onKeyPress('?')} style={{ ...punctKeyStyle, flex: 1 }}>?</button>
      </div>
    </div>
  )
}
