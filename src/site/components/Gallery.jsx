import Reveal from './Reveal'
import BeforeAfterSlider from './BeforeAfterSlider'
import { useGalleryCases } from '../hooks/useGalleryCases'
import { useLang } from '../i18n/LanguageContext'

export default function Gallery() {
  const { cases, loading } = useGalleryCases()
  const { t } = useLang()

  return (
    <section id="gallery" className="bg-navy-900 py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid bg-dot-sm opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary-400">
            {t.gallery?.eyebrow || 'نتائج حقيقية'}
          </span>
          <h2 className="section-heading-light mt-4">{t.gallery?.heading || 'قبل وبعد.. شاهد الفرق'}</h2>
          <div className="w-12 h-0.5 bg-primary-400 mx-auto mt-4" />
          <p className="mt-6 text-white/50 max-w-xl mx-auto leading-relaxed">{t.gallery?.desc}</p>
        </Reveal>

        {loading ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-white/10">
                <div className="aspect-[4/3] animate-pulse bg-white/5" />
                <div className="p-4 space-y-2">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : cases.length === 0 ? (
          <p className="mt-14 text-center text-white/40">{t.gallery?.empty}</p>
        ) : (
          <>
            <div className="gallery-mobile-scroll mt-14 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:hidden">
              {cases.map((item) => (
                <div key={item.id} className="w-[min(85vw,320px)] flex-shrink-0 snap-center">
                  <GalleryCard item={item} />
                </div>
              ))}
            </div>
            <div className="mt-14 hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((item, i) => (
                <Reveal key={item.id} delay={0.06 * i}>
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
    <div className="group rounded-2xl overflow-hidden border border-white/10 bg-navy-800 transition-all duration-300 hover:border-primary-500/40 hover:shadow-glow">
      <div className="relative overflow-hidden">
        <BeforeAfterSlider before={item.before} after={item.after} alt={item.title} />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white">{item.title}</h3>
        <p className="mt-1 text-xs text-white/40 leading-relaxed">{item.description}</p>
      </div>
    </div>
  )
}
