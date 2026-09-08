import { useReveal } from '../hooks/useReveal'

export default function Section({ id, index, title, subtitle, children }) {
  const { ref, visible } = useReveal()

  return (
    <section id={id} className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <div className="mb-14">
            {index && (
              <div className="flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.3em] text-flare-400">
                {index}
                <span className="h-px w-12 bg-gradient-to-r from-flare-400 to-transparent" />
              </div>
            )}
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 max-w-xl text-navy-300">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
