import { useState } from 'react'
import { Star, Quote, MessageSquarePlus } from 'lucide-react'
import Reveal from './Reveal'
import AddReviewModal from './AddReviewModal'
import { useApprovedReviews } from '../hooks/useApprovedReviews'
import { useLang } from '../i18n/LanguageContext'

export default function Testimonials() {
  const { reviews, loading } = useApprovedReviews()
  const { t } = useLang()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <span className="eyebrow">{t.testimonials?.eyebrow || 'آراء المرضى'}</span>
            <h2 className="section-heading mt-4">{t.testimonials?.heading || 'ماذا يقول مرضانا'}</h2>
            <div className="w-12 h-0.5 bg-primary-400 mt-4" />
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-outline self-start sm:self-auto whitespace-nowrap"
          >
            <MessageSquarePlus size={16} />
            {t.testimonials?.addReview || 'أضف تقييمك'}
          </button>
        </Reveal>

        {loading ? (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card p-7 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-3 w-3 animate-pulse rounded-sm bg-navy-100" />
                  ))}
                </div>
                <div className="h-3 w-full animate-pulse rounded bg-navy-100" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-navy-100" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-navy-100" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <p className="mt-16 text-center text-ink-soft">{t.testimonials?.empty}</p>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Reveal
                key={review.id}
                delay={0.06 * i}
                className="group relative card p-7 hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                {/* Large decorative quote */}
                <div className="absolute top-5 left-5 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quote size={56} className="text-navy-900" />
                </div>

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className={
                        idx < review.rating
                          ? 'fill-gold-DEFAULT text-gold-DEFAULT'
                          : 'fill-navy-100 text-navy-100'
                      }
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="relative mt-4 text-sm text-ink-soft leading-relaxed">
                  "{review.comment}"
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-navy-100">
                  <div className="h-9 w-9 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 text-sm font-bold">
                    {review.patientName?.[0] || '؟'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{review.patientName}</p>
                    <p className="text-xs text-ink-soft">مريض</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <AddReviewModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}
