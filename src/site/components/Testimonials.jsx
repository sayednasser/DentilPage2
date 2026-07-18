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
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">
              {t.testimonials?.eyebrow || 'آراء المرضى'}
            </span>

            <h2 className="section-heading mt-4">
              {t.testimonials?.heading || 'ماذا يقول مرضانا'}
            </h2>

            <div className="section-divider !mx-0" />
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
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-md"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-4 w-4 animate-pulse rounded bg-slate-200"
                    />
                  ))}
                </div>

                <div className="mb-3 h-3 w-full animate-pulse rounded bg-slate-200" />
                <div className="mb-3 h-3 w-4/5 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <p className="mt-16 text-center text-ink-soft">
            {t.testimonials?.empty}
          </p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {reviews.map((review, i) => (
              <Reveal
                key={review.id}
                delay={0.05 * i}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-lg
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-cyan-300
                  hover:shadow-2xl
                "
              >
                {/* Top Accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Quote Icon */}
                <div className="absolute left-4 top-4 opacity-5 transition-opacity group-hover:opacity-10">
                  <Quote size={52} />
                </div>

                {/* Stars */}
                <div className="relative flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={18}
                      className={
                        idx < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-slate-200 text-slate-200'
                      }
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="relative mt-4 line-clamp-4 text-sm leading-7 text-slate-600">
                  "{review.comment}"
                </p>

                {/* User */}
                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 text-lg font-bold text-white shadow-lg">
                    {review.patientName?.[0] || '؟'}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {review.patientName}
                    </p>
                    <p className="text-xs text-slate-500">
                      مريض
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <AddReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  )
}