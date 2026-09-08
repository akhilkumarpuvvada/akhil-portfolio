import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { CloseIcon, MenuIcon } from './icons'

const sectionIds = ['about', 'experience', 'skills', 'education', 'contact']

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = sectionIds.map((id) => ({ id, label: t.nav[id] }))

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-3xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? 'border border-white/10 bg-navy-950/70 shadow-lg shadow-black/30 backdrop-blur-xl'
            : 'border border-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 font-semibold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-500 via-flare-500 to-glow-500 text-xs font-bold text-white">
            AP
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.id === 'about' ? '#top' : `#${link.id}`}
              className="rounded-full px-3.5 py-1.5 text-sm text-navy-200 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} setLang={setLang} />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full text-navy-100 hover:bg-white/5 md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-20 rounded-2xl border border-white/10 bg-navy-950/95 p-2 backdrop-blur-xl md:hidden">
          <div className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.id === 'about' ? '#top' : `#${link.id}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-navy-100 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function LangSwitch({ lang, setLang }) {
  return (
    <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-xs font-semibold">
      {['en', 'de'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors ${
            lang === code
              ? 'bg-gradient-to-r from-accent-500 to-flare-500 text-white'
              : 'text-navy-400 hover:text-white'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}
