import { useLanguage } from '../i18n/useLanguage'
import Section from './Section'

function Row({ items, reverse }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-mask flex overflow-hidden pause-on-hover">
      <div
        className={`flex shrink-0 gap-3 pr-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-navy-100 backdrop-blur-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const { skills } = t

  const all = skills.groups.flatMap((g) => g.items)
  const half = Math.ceil(all.length / 2)

  return (
    <Section id="skills" index="02" title={skills.title} subtitle={skills.subtitle}>
      <div className="space-y-3">
        <Row items={all.slice(0, half)} />
        <Row items={all.slice(half)} reverse />
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group) => (
          <div
            key={group.name}
            className="gradient-ring glass p-5 transition-transform duration-300 hover:-translate-y-1"
          >
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-flare-400">
              {group.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-navy-200">
              {group.items.join(' · ')}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
