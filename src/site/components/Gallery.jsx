import Reveal from './Reveal'
import BeforeAfterSlider from './BeforeAfterSlider'
import { useGalleryCases } from '../hooks/useGalleryCases'
import { useLang } from '../i18n/LanguageContext'

export default function Gallery() {
  const { cases, loading } = useGalleryCases()
  const { t } = useLang()

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-navy-900 py-20 lg:py-28"
    >
      <div className="absolute inset-0 bg-dot-grid bg-dot-sm opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary-400">
            {t.gallery?.eyebrow || 'نتائج حقيقية'}
          </span>

          <h2 className="section-heading-light mt-4">
            {t.gallery?.heading || 'قبل وبعد.. شاهد الفرق'}
          </h2>

          <div className="mx-auto mt-4 h-0.5 w-12 bg-primary-400" />

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/50">
            {t.gallery?.desc}
          </p>
        </Reveal>

        {loading ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-white/10"
              >
                <div className="aspect-[16/10] animate-pulse bg-white/5" />
              </div>
            ))}
          </div>
        ) : cases.length === 0 ? (
          <p className="mt-14 text-center text-white/40">
            {t.gallery?.empty}
          </p>
        ) : (
          <>
            {/* Mobile */}
            <div className="gallery-mobile-scroll mt-14 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden">
              {cases.map((item) => (
                <div
                  key={item.id}
                  className="w-[90vw] flex-shrink-0 snap-center"
                >
                  <GalleryCard item={item} />
                </div>
              ))}
            </div>

            {/* Tablet & Desktop */}
            <div className="mt-14 hidden gap-8 sm:grid md:grid-cols-2">
              {cases.map((item, i) => (
                <Reveal key={item.id} delay={0.05 * i}>
                  <GalleryCard item={item} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function GalleryCard({ item }) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-primary-400/50
        hover:shadow-2xl
      "
    >
      <BeforeAfterSlider
        before={item.before}
        after={item.after}
        alt={item.title}
      />

      <div className="p-5 lg:p-6">
        <h3 className="text-lg font-bold text-white">
          {item.title}
        </h3>

        {item.description && (
          <p className="mt-2 text-sm leading-7 text-white/60">
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}