import { useLanguage } from '../i18n/useLanguage'
import Section from './Section'
import { CONTACT } from '../data/resume'
import { GithubIcon, GlobeIcon, LinkedinIcon, MailIcon, PhoneIcon } from './icons'

export default function Contact() {
  const { t } = useLanguage()
  const { contact } = t

  const rows = [
    { icon: MailIcon, label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: PhoneIcon, label: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    { icon: LinkedinIcon, label: 'linkedin.com/in/akhilpuvvada', href: CONTACT.linkedin },
    { icon: GithubIcon, label: 'github.com/akhilkumarpuvvada', href: CONTACT.github },
    { icon: GlobeIcon, label: 'akhil-portfolio-kohl.vercel.app', href: CONTACT.website },
  ]

  return (
    <Section id="contact" index="04" title={contact.title} subtitle={contact.subtitle}>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 animate-aurora-2 rounded-full bg-flare-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 animate-aurora-3 rounded-full bg-glow-500/20 blur-3xl" />

        <div className="relative">
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 via-flare-500 to-glow-500 bg-[length:200%_auto] px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-flare-500/25 transition-[background-position,transform] duration-500 hover:bg-right hover:scale-[1.03]"
          >
            <MailIcon width={18} height={18} />
            {contact.emailCta}
          </a>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {rows.map((row) => (
              <a
                key={row.label}
                href={row.href}
                target={row.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-navy-200 transition-colors hover:border-white/30 hover:text-white"
              >
                <row.icon
                  width={18}
                  height={18}
                  className="shrink-0 text-accent-400 transition-colors group-hover:text-flare-400"
                />
                <span className="truncate">{row.label}</span>
              </a>
            ))}
          </div>

          <p className="mt-10 text-xs text-navy-500">{contact.note}</p>
        </div>
      </div>
    </Section>
  )
}
