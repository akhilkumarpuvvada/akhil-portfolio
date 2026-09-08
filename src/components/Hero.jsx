import { lazy, Suspense } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { CONTACT } from '../data/resume'
import { useTilt } from '../hooks/useTilt'
import { useReveal } from '../hooks/useReveal'
import { ArrowDownIcon, GithubIcon, GlobeIcon, LinkedinIcon } from './icons'

const Scene3D = lazy(() => import('./Scene3D'))

const FLOATERS = ['React', 'TypeScript', 'Node.js', 'LangGraph', 'PostgreSQL', 'Redis']

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t
  const nameRef = useTilt({ max: 9, perspective: 1200 })
  const { ref: aboutRef, visible } = useReveal()

  return (
    <section id="top" className="relative overflow-hidden">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 bg-navy-950/40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent" />

      <div className="relative z-10">
        <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-28 pb-16">
          <div className="animate-fade-up">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-navy-100 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zest-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-zest-400" />
              </span>
              {hero.role}
            </p>

            <h1
              ref={nameRef}
              className="text-3d origin-left font-display text-[19vw] font-bold leading-[0.85] tracking-tight text-white transition-transform duration-300 ease-out will-change-transform sm:text-8xl lg:text-[9.5rem]"
            >
              <span className="block">Akhil</span>
              <span className="block text-gradient">Puvvada</span>
            </h1>

            <p className="mt-6 font-display text-lg font-medium text-navy-100 sm:text-2xl">
              {hero.role} <span className="text-flare-400">·</span> {hero.tagline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${CONTACT.email}`}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent-500 via-flare-500 to-glow-500 bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-flare-500/25 transition-[background-position,transform] duration-500 hover:bg-right hover:scale-[1.03]"
              >
                {hero.ctaPrimary}
              </a>
              <a
                href="#experience"
                className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
              >
                {hero.ctaSecondary}
              </a>

              <div className="ml-1 flex items-center gap-1">
                {[
                  { icon: GithubIcon, href: CONTACT.github, label: 'GitHub' },
                  { icon: LinkedinIcon, href: CONTACT.linkedin, label: 'LinkedIn' },
                  { icon: GlobeIcon, href: CONTACT.website, label: 'Website' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full text-navy-200 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <s.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a
            href="#experience"
            aria-label="Scroll down"
            className="mx-auto mt-14 hidden animate-fade-in text-navy-300 transition-colors hover:text-white sm:block"
          >
            <ArrowDownIcon className="animate-bounce" />
          </a>
        </div>

        <div ref={aboutRef} className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-6xl px-6 pb-28`}>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="space-y-4 text-base leading-relaxed text-navy-200 sm:text-lg lg:col-span-3">
              {hero.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <div className="flex flex-wrap gap-2.5 pt-2" style={{ perspective: '600px' }}>
                {FLOATERS.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-navy-100 backdrop-blur-sm transition-transform duration-300 hover:[transform:translateZ(24px)_rotateX(8deg)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <dl className="grid h-fit grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:col-span-2 lg:grid-cols-1">
              {hero.stats.map((s) => (
                <div key={s.label} className="bg-navy-950/80 p-5 backdrop-blur-sm">
                  <dt className="font-display text-3xl font-bold text-white sm:text-4xl">{s.value}</dt>
                  <dd className="mt-1.5 text-xs leading-tight text-navy-300">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
