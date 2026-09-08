import { useLanguage } from '../i18n/useLanguage'
import { CONTACT } from '../data/resume'
import { ArrowDownIcon, GithubIcon, GlobeIcon, LinkedinIcon } from './icons'

const FLOATERS = ['React', 'TypeScript', 'Node.js', 'LangGraph', 'PostgreSQL', 'Redis']

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-20">
        <div className="animate-fade-up">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-navy-200 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zest-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-zest-400" />
            </span>
            {hero.role}
          </p>

          <h1 className="font-display text-[19vw] font-bold leading-[0.85] tracking-tight text-white sm:text-8xl lg:text-9xl">
            <span className="block">Akhil</span>
            <span className="block text-gradient">Puvvada</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
            {hero.summary}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent-500 via-flare-500 to-glow-500 bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-flare-500/25 transition-[background-position,transform] duration-500 hover:bg-right hover:scale-[1.03]"
            >
              {hero.ctaPrimary}
            </a>
            <a
              href="#experience"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5"
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
                  className="grid h-11 w-11 place-items-center rounded-full text-navy-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            {FLOATERS.map((tech, i) => (
              <span
                key={tech}
                className="animate-float rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-navy-100 backdrop-blur-sm"
                style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${5 + (i % 3)}s` }}
              >
                {tech}
              </span>
            ))}
          </div>

          <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {hero.stats.map((s) => (
              <div key={s.label} className="bg-navy-950/80 p-5 backdrop-blur-sm">
                <dt className="font-display text-3xl font-bold text-white sm:text-4xl">{s.value}</dt>
                <dd className="mt-1.5 text-xs leading-tight text-navy-300">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#experience"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-fade-in text-navy-400 transition-colors hover:text-white sm:block"
      >
        <ArrowDownIcon className="animate-bounce" />
      </a>
    </section>
  )
}
