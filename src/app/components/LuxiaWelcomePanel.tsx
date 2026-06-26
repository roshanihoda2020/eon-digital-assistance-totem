/* Welcome panel shown when Avatar mode is OFF */

export function LuxiaWelcomePanel() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingInline: 56,
        paddingBlock: 32,
        background: '#FDF3F2',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          minHeight: 188,
          display: 'flex',
          alignItems: 'center',
          padding: '28px 34px',
          background: '#FFF7F6',
          border: '1.5px solid rgba(240,85,72,0.16)',
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(95,31,25,0.07)',
        }}
      >
        {/* E.ON red accent line */}
        <div
          style={{
            width: 4,
            height: 160,
            background: '#EA1D0A',
            borderRadius: 2,
            flexShrink: 0,
            alignSelf: 'center',
          }}
        />

        {/* Text content */}
        <div
          style={{
            marginLeft: 36,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#1A1A1A',
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              fontFamily: 'Inter, sans-serif',
              display: 'block',
              marginBottom: 10,
            }}
          >
            Ciao, sono Luxia
          </span>

          <span
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: '#EA1D0A',
              lineHeight: 1.3,
              fontFamily: 'Inter, sans-serif',
              display: 'block',
              marginBottom: 14,
              letterSpacing: '0.01em',
            }}
          >
            L'assistente digitale E.ON
          </span>

          <span
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: '#666666',
              lineHeight: 1.4,
              fontFamily: 'Inter, sans-serif',
              display: 'block',
              marginBottom: 18,
              maxWidth: 600,
            }}
          >
            Ti aiuto con informazioni, servizi e supporto clienti.
          </span>

          <span
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: '#1A1A1A',
              lineHeight: 1.3,
              fontFamily: 'Inter, sans-serif',
              display: 'block',
            }}
          >
            Come posso aiutarti oggi?
          </span>
        </div>
      </div>
    </div>
  )
}

/* Compact header shown after the first user message in fullchat mode */
export function LuxiaCompactHeader() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingInline: 56,
        background: '#FDF3F2',
        overflow: 'hidden',
        gap: 20,
      }}
    >
      {/* Red accent line */}
      <div
        style={{
          width: 3,
          height: 36,
          background: '#EA1D0A',
          borderRadius: 2,
          flexShrink: 0,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#1A1A1A',
            lineHeight: 1,
            letterSpacing: '-0.01em',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Luxia
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: '#888888',
            letterSpacing: '0.01em',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          L'assistente digitale E.ON
        </span>
      </div>

      {/* Online indicator */}
      <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#1EA2B1',
            boxShadow: '0 0 0 3px rgba(30,162,177,0.20)',
          }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#888888',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Online
        </span>
      </div>
    </div>
  )
}
