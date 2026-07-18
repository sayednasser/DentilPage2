import { GraduationCap, CalendarClock, Award } from 'lucide-react'
import Reveal from './Reveal'
import { useActiveDoctors } from '../hooks/useActiveDoctors'
import { useLang } from '../i18n/LanguageContext'

export default function Doctors() {
  const { doctors, loading } = useActiveDoctors()
  const { t } = useLang()

  return (
    <section id="doctors" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="eyebrow">{t.doctors?.eyebrow || 'طبيب العيادة'}</span>
          <h2 className="section-heading mt-4">{t.doctors?.heading || 'تعرف على طبيبك'}</h2>
          <div className="section-divider" />
          <p className="mt-6 text-ink-soft max-w-xl mx-auto leading-relaxed">{t.doctors?.desc}</p>
        </Reveal>

        {loading ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card overflow-hidden">
                <div className="aspect-[3/4] animate-pulse bg-navy-100" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-navy-100" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-navy-100" />
                </div>
              </div>
            ))}
          </div>
        ) : doctors.length === 0 ? (
          <p className="mt-16 text-center text-ink-soft">{t.doctors?.empty}</p>
        ) : (
          <div
            className={`mt-16 ${
              doctors.length === 1
                ? 'flex justify-center'
                : 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center'
            }`}
          >
            {doctors.map((doctor, i) => (
              <Reveal
                key={doctor.id}
                delay={0.1 * i}
                className={`group ${doctors.length === 1 ? 'w-full max-w-md' : 'w-full max-w-sm'}`}
              >
                <div className="card overflow-hidden hover:shadow-card-hover hover:-translate-y-2 transition-all duration-400">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={
                        doctor.image?.secure_url ||
                        doctor.image ||
                        'https://via.placeholder.com/500x600'
                      }
                      alt={doctor.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent" />

                    {/* Experience badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-gold-DEFAULT px-3 py-1.5 text-xs font-bold text-white shadow-gold">
                      <Award size={12} />
                      {doctor.experience}{t.doctors?.yearsExp || '+ سنوات'}
                    </div>

                    {/* Name overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary-300">
                        <GraduationCap size={14} />
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>

                  {/* Bio + CTA */}
                  <div className="p-5">
                    <p className="text-sm text-ink-soft leading-relaxed line-clamp-3">{doctor.bio}</p>
                    <a
                      href="#booking"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 group/link"
                    >
                      <CalendarClock size={15} />
                      {t.doctors?.viewSlots || 'احجز موعدًا'}
                      <span className="transition-transform group-hover/link:-translate-x-1">←</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
