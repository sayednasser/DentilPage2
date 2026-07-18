import { Tag, BadgePercent, CalendarCheck } from 'lucide-react'
import Reveal from './Reveal'
import { useActiveOffers } from '../hooks/useActiveOffers'
import { useLang } from '../i18n/LanguageContext'

export default function Offers() {
  const { offers, loading } = useActiveOffers()
  const { t } = useLang()

  return (
    <section id="offers" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="eyebrow">
            <Tag size={13} />
            {t.offers?.eyebrow || 'عروض حصرية'}
          </span>
          <h2 className="section-heading mt-4">{t.offers?.heading || 'العروض الحالية'}</h2>
          <div className="section-divider" />
          <p className="mt-6 text-ink-soft max-w-xl mx-auto">{t.offers?.desc}</p>
        </Reveal>

        {loading ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="aspect-[4/3] animate-pulse bg-navy-100" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-navy-100" />
                  <div className="h-3 w-full animate-pulse rounded bg-navy-100" />
                  <div className="h-6 w-1/3 animate-pulse rounded bg-navy-100" />
                </div>
              </div>
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-navy-100 bg-surface px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-ink-soft shadow-card">
              <Tag size={24} />
            </div>
            <p className="text-base font-bold text-navy-900">{t.offers?.emptyTitle}</p>
            <p className="max-w-xs text-sm text-ink-soft">{t.offers?.emptyDesc}</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, i) => (
              <Reveal
                key={offer.id}
                delay={0.08 * i}
                className="group card flex flex-col overflow-hidden hover:-translate-y-2 hover:shadow-card-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Discount badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-xl bg-gold-DEFAULT px-3 py-1.5 text-xs font-bold text-white shadow-gold">
                    <BadgePercent size={12} />
                    {t.offers?.discount} {offer.discountPercentage}%
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-base font-bold text-navy-900">{offer.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-ink-soft leading-relaxed">{offer.description}</p>
                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-primary-600">
                      {offer.newPrice} {t.offers?.currency || 'ج.م'}
                    </span>
                    <span className="text-sm text-ink-soft line-through">
                      {offer.oldPrice} {t.offers?.currency || 'ج.م'}
                    </span>
                  </div>
                  <a href="#booking" className="btn-primary mt-5 w-full !py-3 !text-sm">
                    <CalendarCheck size={16} />
                    {t.offers?.bookNow || 'احجز الآن'}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
