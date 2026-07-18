import { MoveHorizontal } from 'lucide-react'

export default function BeforeAfterSlider({ before, after, alt }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-black">
      <div
        className="
          grid
          grid-cols-2
          aspect-[4/3]
          sm:aspect-[16/10]
          lg:aspect-[16/9]
        "
      >
        {/* Before */}
        <div className="relative overflow-hidden">
          <img
            src={before}
            alt={`${alt} - قبل`}
            draggable={false}
            className="h-full w-full object-cover"
          />

          <span className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-xs font-bold text-white">
            قبل
          </span>
        </div>

        {/* After */}
        <div className="relative overflow-hidden">
          <img
            src={after}
            alt={`${alt} - بعد`}
            draggable={false}
            className="h-full w-full object-cover"
          />

          <span className="absolute top-3 right-3 rounded-full bg-primary-500 px-3 py-1 text-xs font-bold text-white">
            بعد
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="absolute inset-y-0 left-1/2 z-10 w-1 -translate-x-1/2 bg-white">
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-600 shadow-xl">
          <MoveHorizontal size={20} />
        </div>
      </div>
    </div>
  )
}