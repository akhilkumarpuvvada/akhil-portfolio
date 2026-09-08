import { useLanguage } from '../i18n/useLanguage'
import Section from './Section'
import { ExternalIcon } from './icons'

export default function Experience() {
  const { t } = useLanguage()
  const { experience } = t

  return (
    <Section id="experience" index="01" title={experience.title} subtitle={experience.subtitle}>
      <div className="space-y-5">
        {experience.items.map((job, i) => (
          <article
            key={i}
            className="gradient-ring glass group relative overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent-500/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-xl font-semibold text-white">{job.role}</h3>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-accent-300">
                {job.period}
              </span>
            </div>

            <p className="mt-2 text-sm text-navy-300">
              <span className="text-navy-100">{job.company}</span> &mdash; {job.location}
              {job.link && (
                <>
                  {' '}&middot;{' '}
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-glow-400 hover:text-glow-300"
                  >
                    {job.linkLabel}
                    <ExternalIcon width={13} height={13} />
                  </a>
                </>
              )}
            </p>

            <ul className="mt-5 space-y-3">
              {job.points.map((point, j) => (
                <li key={j} className="flex gap-3 text-sm leading-relaxed text-navy-200">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent-400 to-flare-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
