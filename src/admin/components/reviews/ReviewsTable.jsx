import { Check, X, Trash2, Star, Pencil } from 'lucide-react'
import Badge from '../ui/Badge'

export default function ReviewsTable({
  reviews,
  onApprove,
  onReject,
  onDelete,
  onEdit,
}) {
  const renderStars = (rating) => (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-slate-200 text-slate-200'
          }
        />
      ))}
    </div>
  )

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-slate-100 text-sm text-ink-soft">
              <th className="px-4 py-3 font-bold">اسم المريض</th>
              <th className="px-4 py-3 font-bold">التقييم</th>
              <th className="px-4 py-3 font-bold">التعليق</th>
              <th className="px-4 py-3 font-bold">الحالة</th>
              <th className="px-4 py-3 font-bold">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((r) => (
              <tr
                key={r.id}
                className="border-b border-slate-50 text-sm transition-colors hover:bg-slate-50/60"
              >
                <td className="px-4 py-3 font-bold text-ink">
                  {r.patientName}
                </td>

                <td className="px-4 py-3">
                  {renderStars(r.rating)}
                </td>

                <td className="max-w-xs px-4 py-3 text-ink-soft">
                  <p className="line-clamp-2">
                    {r.comment}
                  </p>
                </td>

                <td className="px-4 py-3">
                  <Badge
                    variant={
                      r.status === 'approved'
                        ? 'success'
                        : 'warning'
                    }
                  >
                    {r.status === 'approved'
                      ? 'Approved'
                      : 'Pending'}
                  </Badge>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={r.status === 'approved'}
                      onClick={() => onApprove(r)}
                      className="btn-icon text-emerald-600 hover:bg-emerald-50 disabled:opacity-30"
                      aria-label="موافقة"
                    >
                      <Check size={16} />
                    </button>

                    <button
                      disabled={r.status === 'pending'}
                      onClick={() => onReject(r)}
                      className="btn-icon text-amber-600 hover:bg-amber-50 disabled:opacity-30"
                      aria-label="رفض"
                    >
                      <X size={16} />
                    </button>

                    <button
                      onClick={() => onEdit(r)}
                      className="btn-icon text-ink-soft hover:bg-slate-100"
                      aria-label="تعديل"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(r)}
                      className="btn-icon text-red-500 hover:bg-red-50"
                      aria-label="حذف"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="font-extrabold text-ink">
                {r.patientName}
              </p>

              <Badge
                variant={
                  r.status === 'approved'
                    ? 'success'
                    : 'warning'
                }
              >
                {r.status === 'approved'
                  ? 'Approved'
                  : 'Pending'}
              </Badge>
            </div>

            <div className="mt-2">
              {renderStars(r.rating)}
            </div>

            <p className="mt-3 text-sm leading-7 text-ink-soft">
              {r.comment}
            </p>

            {/* Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
              <button
                disabled={r.status === 'approved'}
                onClick={() => onApprove(r)}
                className="admin-btn-outline !py-2 text-xs !text-emerald-600 disabled:opacity-40"
              >
                <Check size={14} />
                موافقة
              </button>

              <button
                disabled={r.status === 'pending'}
                onClick={() => onReject(r)}
                className="admin-btn-outline !py-2 text-xs !text-amber-600 disabled:opacity-40"
              >
                <X size={14} />
                رفض
              </button>

              <button
                onClick={() => onEdit(r)}
                className="admin-btn-outline !py-2 text-xs"
              >
                <Pencil size={14} />
                تعديل
              </button>

              <button
                onClick={() => onDelete(r)}
                className="admin-btn-danger !py-2 text-xs"
              >
                <Trash2 size={14} />
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}