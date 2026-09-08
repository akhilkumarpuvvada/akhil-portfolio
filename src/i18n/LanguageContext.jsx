import { useEffect, useState } from 'react'
import { content } from '../data/resume'
import { LanguageContext, STORAGE_KEY } from './context'

function readSavedLang() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function persistLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    return false
  }
  return true
}

function getInitialLang() {
  const saved = readSavedLang()
  if (saved === 'en' || saved === 'de') return saved
  if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('de')) {
    return 'de'
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang)

  useEffect(() => {
    persistLang(lang)
    document.documentElement.lang = lang
    document.title =
      lang === 'de'
        ? 'Akhil Puvvada — Full-Stack-Entwickler'
        : 'Akhil Puvvada — Full-Stack Developer'
  }, [lang])

  const toggle = () => setLang((prev) => (prev === 'en' ? 'de' : 'en'))

  const value = { lang, setLang, toggle, t: content[lang] }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
