export type DisplayMode = 'avatar' | 'fullchat'

// Avatar heights: normal vs compressed (keyboard open in avatar mode)
export const AVATAR_HEIGHT_NORMAL = 560
export const AVATAR_HEIGHT_COMPRESSED = 200

export type SessionState = 'waiting' | 'listening' | 'typing' | 'processing' | 'speaking'

export type LangCode = 'IT' | 'EN' | 'DE' | 'FR' | 'ES'

export type Message = {
  id: number
  role: 'assistant' | 'user'
  text: string
  time: string
}

export const LANGUAGES: { code: LangCode; flag: string; label: string }[] = [
  { code: 'IT', flag: '🇮🇹', label: 'Italiano' },
  { code: 'EN', flag: '🇬🇧', label: 'English' },
  { code: 'DE', flag: '🇩🇪', label: 'Deutsch' },
  { code: 'FR', flag: '🇫🇷', label: 'Français' },
  { code: 'ES', flag: '🇪🇸', label: 'Español' },
]
