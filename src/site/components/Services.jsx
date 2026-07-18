import * as Icons from 'lucide-react'
import Reveal from './Reveal'
import { useActiveServices } from '../hooks/useActiveServices'
import { useLang } from '../i18n/LanguageContext'

export default function Services() {
  const { services, loading } = useActiveServices()
  const { t } = useLang()

  return (
    <section id="services" className="bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="text-center">
          <span className="eyebrow">
            {t.services?.eyebrow || 'خدماتنا'}
          </span>

          <h2 className="section-heading mt-4">
            {t.services?.heading || 'رعاية متكاملة لأسنانك'}
          </h2>

          <div className="section-divider" />

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-ink-soft sm:text-base">
            {t.services?.desc}
          </p>
        </Reveal>

        {loading ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 h-14 w-14 animate-pulse rounded-2xl bg-slate-200" />
                <div className="mb-3 h-5 w-2/3 animate-pulse rounded bg-slate-200" />
                <div className="mb-2 h-3 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="mt-16 text-center text-ink-soft">
            {t.services?.empty}
          </p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, i) => {
              const Icon = Icons[service.icon] || Icons.Sparkles

              return (
                <Reveal
                  key={service.id}
                  delay={0.05 * i}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-5
                    shadow-md
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-primary-300
                    hover:shadow-2xl
                  "
                >
                  {/* Top Glow */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Icon */}
                  <div
                    className="
                      mb-4
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-cyan-500
                      to-teal-600
                      text-white
                      shadow-lg
                      transition-all
                      duration-500
                      group-hover:scale-110
                    "
                  >
                    <Icon size={24} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-extrabold text-slate-900">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-3 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <a
                      href="#booking"
                      className="text-sm font-bold text-cyan-600 transition-colors hover:text-cyan-700"
                    >
                      احجز الآن
                    </a>

                    <Icons.ArrowLeft
                      size={16}
                      className="text-cyan-600 transition-transform duration-300 group-hover:-translate-x-1"
                    />
                  </div>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}