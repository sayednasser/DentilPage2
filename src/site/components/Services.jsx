import * as Icons from 'lucide-react'
import Reveal from './Reveal'
import { useActiveServices } from '../hooks/useActiveServices'
import { useLang } from '../i18n/LanguageContext'

export default function Services() {
  const { services, loading } = useActiveServices()
  const { t } = useLang()

  return (
    <section id="services" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="text-center">
          <span className="eyebrow">{t.services?.eyebrow || 'خدماتنا'}</span>
          <h2 className="section-heading mt-4">{t.services?.heading || 'رعاية متكاملة لأسنانك'}</h2>
          <div className="section-divider" />
          <p className="mt-6 text-ink-soft max-w-xl mx-auto leading-relaxed">{t.services?.desc}</p>
        </Reveal>

        {loading ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card-luxury p-8 space-y-5">
                <div className="h-14 w-14 animate-pulse rounded-2xl bg-navy-100" />
                <div className="h-5 w-2/3 animate-pulse rounded bg-navy-100" />
                <div className="h-3 w-full animate-pulse rounded bg-navy-100" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-navy-100" />
              </div>
            ))}
          </div>
        ) : services.length === 0 ? (
          <p className="mt-16 text-center text-ink-soft">{t.services?.empty}</p>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = Icons[service.icon] || Icons.Sparkles
              return (
                <Reveal
                  key={service.id}
                  delay={0.07 * i}
                  className="card-luxury group p-8 hover:-translate-y-2 hover:shadow-card-hover cursor-default"
                >
                  {/* Top accent is handled by ::before in CSS */}

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center transition-all duration-300 group-hover:bg-primary-500 group-hover:shadow-glow">
                      <Icon
                        size={24}
                        className="text-primary-500 transition-colors duration-300 group-hover:text-white"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 mb-3">{service.name}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{service.description}</p>

                  {/* Bottom arrow */}
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-primary-500 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <a href="#booking" className="hover:text-primary-600">احجز الآن</a>
                    <Icons.ArrowLeft size={14} />
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
