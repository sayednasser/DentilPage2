import { useMemo, useRef, useState } from 'react'
import { CalendarCheck, CheckCircle2, AlertCircle, User, Phone, Stethoscope, Clock } from 'lucide-react'
import Reveal from './Reveal'
import { useActiveDoctors } from '../hooks/useActiveDoctors'
import { useCreateAppointment } from '../hooks/useCreateAppointment'
import { useBookedSlots } from '../hooks/useBookedSlots'
import { generateSlots, getNextDateForDay } from '../../shared/scheduleUtils'
import { useActiveServices } from '../hooks/useActiveServices'
import { useLang } from '../i18n/LanguageContext'

export default function Booking() {
  const { doctors, loading: doctorsLoading } = useActiveDoctors()
  const { services, loading: servicesLoading } = useActiveServices()
  const { createAppointment } = useCreateAppointment()
  const { t } = useLang()

  const [serviceId, setServiceId] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [doctorId, setDoctorId] = useState('')
  const [day, setDay] = useState('')
  const [slot, setSlot] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const submittingRef = useRef(false)

  const resolvedDate = day ? getNextDateForDay(day) : ''
  const { bookedSlots } = useBookedSlots(doctorId, resolvedDate)

  const selectedDoctor = useMemo(
    () => doctors.find((d) => String(d.id) === String(doctorId)),
    [doctors, doctorId]
  )

  const availableDays = selectedDoctor?.schedule?.map((s) => s.day) || []
  console.log("Doctor:", selectedDoctor?.name)
  console.log("Schedule:", selectedDoctor?.schedule)
  console.log("Available Days:", availableDays)
  console.log("Selected Day:", day)
  console.log("Resolved Date:", resolvedDate)

  const daySchedule = useMemo(() => {
    if (!selectedDoctor || !day) return null
    return selectedDoctor.schedule.find((s) => s.day === day)
  }, [selectedDoctor, day])

  const slotsForDay = useMemo(() => {
    if (!daySchedule) return []
    return generateSlots(daySchedule.from, daySchedule.to, daySchedule.slotDuration)
  }, [daySchedule])

  const handleDoctorChange = (e) => {
    setDoctorId(e.target.value)
    setDay('')
    setSlot('')
    setConfirmed(false)
  }

  const handleDayChange = (chosenDay) => {
    setDay(chosenDay)
    setSlot('')
    setConfirmed(false)
  }

  const canConfirm = name.trim() && phone.trim() && selectedDoctor && serviceId && day && slot

  const handleConfirm = async () => {
    if (!canConfirm || submittingRef.current) return
    submittingRef.current = true
    setBookingError('')
    setSubmitting(true)
    try {
      await createAppointment({
        patientName: name.trim(),
        phone: phone.trim(),
        doctor: selectedDoctor.id,
        service: serviceId,
        appointmentDate: resolvedDate,
        appointmentTime: convertTimeTo24(slot),
      })
      setConfirmed(true)
    } catch (err) {
      setBookingError(t.booking?.errorGeneric || 'حدث خطأ، يرجى المحاولة مجدداً')
    } finally {
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  const resetForNewBooking = () => {
    setName(''); setServiceId(''); setPhone(''); setDoctorId('')
    setDay(''); setSlot(''); setConfirmed(false); setBookingError('')
  }

  function convertTimeTo24(time) {
    if (!time) return ''
    const parts = time.split(' ')
    if (parts.length === 1) return time
    const [timePart, period] = parts
    let [hour, minute] = timePart.split(':').map(Number)
    if (period === 'م' && hour < 12) hour += 12
    if (period === 'ص' && hour === 12) hour = 0
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  }

  return (
    <section id="booking" className="bg-surface py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-teal-gradient" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="eyebrow">
            <CalendarCheck size={14} />
            {t.booking?.eyebrow || 'الحجز الإلكتروني'}
          </span>
          <h2 className="section-heading mt-4">{t.booking?.heading || 'احجز موعدك بسهولة'}</h2>
          <div className="section-divider" />
          <p className="mt-6 text-ink-soft max-w-lg mx-auto">{t.booking?.desc}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Form card */}
          <div className="card-luxury p-6 sm:p-8">
            <h3 className="text-base font-bold text-navy-900 mb-6 pb-4 border-b border-navy-100">
              {t.booking?.patientInfo || 'بيانات المريض'}
            </h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  <User size={13} className="text-primary-500" />
                  {t.booking?.patientName || 'الاسم'}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={t.booking?.namePlaceholder || 'الاسم الكامل'}
                  className="lux-input"
                />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  <Phone size={13} className="text-primary-500" />
                  {t.booking?.phone || 'الهاتف'}
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className="lux-input"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  <Stethoscope size={13} className="text-primary-500" />
                  {t.booking?.selectDoctor || 'الطبيب'}
                </label>
                <select
                  value={doctorId}
                  onChange={handleDoctorChange}
                  disabled={doctorsLoading}
                  className="lux-select"
                >
                  <option value="">
                    {doctorsLoading ? t.booking?.loadingDoctors : t.booking?.selectDoctorDefault || 'اختر الطبيب'}
                  </option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {t.booking?.selectService || 'الخدمة'}
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  disabled={servicesLoading}
                  className="lux-select"
                >
                  <option value="">
                    {servicesLoading ? t.booking?.loadingServices : t.booking?.selectServiceDefault || 'اختر الخدمة'}
                  </option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Days */}
            {selectedDoctor && (
              <div className="mt-7 animate-fadeUp">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {t.booking?.availableDays || 'الأيام المتاحة'}
                </p>
                {availableDays.length === 0 ? (
                  <p className="text-sm text-ink-soft">{t.booking?.noDays}</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {availableDays.map((d) => (
                      <button
                        key={d}
                        onClick={() => handleDayChange(d)}
                        className={`rounded-xl border-2 px-4 py-2 text-sm font-semibold transition-all duration-200 ${day === d
                            ? 'border-primary-500 bg-primary-500 text-white shadow-glow'
                            : 'border-navy-100 text-ink-soft hover:border-primary-300 hover:text-primary-600'
                          }`}
                      >
                        {t.booking?.days?.[d] || d}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Slots */}
            {day && (
              <div className="mt-7 animate-fadeUp">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {t.booking?.availableSlots || 'المواعيد'} ({resolvedDate})
                  </span>
                </p>
                {slotsForDay.length === 0 ? (
                  <p className="text-sm text-ink-soft">{t.booking?.noSlots}</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slotsForDay.map((time) => {
                      const isBooked = bookedSlots.includes(convertTimeTo24(time))
                      const isSelected = slot === time
                      return (
                        <button
                          key={time}
                          disabled={isBooked}
                          onClick={() => { setSlot(time); setConfirmed(false) }}
                          className={`rounded-xl border-2 px-2 py-2.5 text-xs font-semibold transition-all duration-200 ${isBooked
                              ? 'cursor-not-allowed border-navy-50 bg-navy-50 text-navy-200 line-through'
                              : isSelected
                                ? 'border-primary-500 bg-primary-500 text-white shadow-glow'
                                : 'border-navy-100 text-ink-soft hover:border-primary-300'
                            }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Summary card */}
          <div className="card-luxury flex flex-col justify-between p-6 sm:p-8">
            <div>
              <h3 className="text-base font-bold text-navy-900 mb-6 pb-4 border-b border-navy-100">
                {t.booking?.summary || 'ملخص الحجز'}
              </h3>
              <div className="space-y-4">
                <SummaryRow label={t.booking?.summaryName || 'الاسم'} value={name || '—'} />
                <SummaryRow label={t.booking?.summaryDoctor || 'الطبيب'} value={selectedDoctor?.name || '—'} />
                <SummaryRow
                  label={t.booking?.summaryDay || 'اليوم'}
                  value={day ? `${t.booking?.days?.[day] || day} (${resolvedDate})` : '—'}
                />
                <SummaryRow label={t.booking?.summaryTime || 'الموعد'} value={slot || '—'} />
              </div>
            </div>

            {!confirmed ? (
              <div className="mt-8">
                {bookingError && (
                  <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-600">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {bookingError}
                  </div>
                )}
                <button
                  onClick={handleConfirm}
                  disabled={!canConfirm || submitting}
                  aria-busy={submitting}
                  className={`btn-primary w-full ${!canConfirm ? '!cursor-not-allowed !bg-navy-200 !shadow-none !transform-none' : ''
                    }`}
                >
                  <CalendarCheck size={18} />
                  {submitting ? t.booking?.confirming : t.booking?.confirm || 'تأكيد الحجز'}
                </button>
              </div>
            ) : (
              <div className="mt-8 animate-fadeUp rounded-2xl bg-primary-50 border border-primary-100 p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white mx-auto shadow-glow">
                  <CheckCircle2 size={28} />
                </div>
                <p className="mt-3 font-bold text-primary-700">{t.booking?.successTitle || 'تم الحجز بنجاح!'}</p>
                <p className="mt-1 text-sm text-ink-soft">{t.booking?.successDesc}</p>
                <button
                  onClick={resetForNewBooking}
                  className="mt-4 text-sm font-semibold text-primary-600 underline underline-offset-4 hover:text-primary-700"
                >
                  {t.booking?.bookAnother || 'حجز جديد'}
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-dashed border-navy-100 last:border-0">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</span>
      <span className="text-sm font-semibold text-navy-900">{value}</span>
    </div>
  )
}
