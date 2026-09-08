import { useLanguage } from '../i18n/useLanguage'
import Section from './Section'

export default function Education() {
  const { t } = useLanguage()
  const { education } = t

  return (
    <Section id="education" index="03" title={education.title} subtitle={education.subtitle}>
      <div className="grid gap-5 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-3">
          {education.items.map((item) => (
            <div key={item.degree} className="gradient-ring glass p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-white">{item.degree}</h3>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-accent-300">
                  {item.period}
                </span>
              </div>
              <p className="mt-2 text-sm text-navy-300">
                {item.school} &mdash; {item.location}
              </p>
              <p className="mt-3 text-sm text-navy-200">{item.focus}</p>
            </div>
          ))}

          <div className="gradient-ring glass p-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-flare-400">
              {education.interestsTitle}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {education.interests.map((hobby) => (
                <span
                  key={hobby}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-navy-100"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="gradient-ring glass p-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-flare-400">
              {education.languagesTitle}
            </h3>
            <div className="mt-5 space-y-5">
              {education.languages.map((l) => (
                <div key={l.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium text-white">{l.name}</span>
                    <span className="text-navy-300">{l.level}</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent-500 via-flare-500 to-glow-400"
                      style={{ width: `${l.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
