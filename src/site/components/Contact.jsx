import { Phone, MessageCircle, MapPin, Clock, Navigation } from 'lucide-react'
import Reveal from './Reveal'
import { useClinicSettings } from '../hooks/useClinicSettings'
import { useLang } from '../i18n/LanguageContext'

export default function Contact() {
  const settings = useClinicSettings()
  const { t } = useLang()

  const phone = settings?.phone || '+20 123 456 7890'
  const whatsapp = settings?.whatsapp || '+20 123 456 7890'

  const formatWhatsAppNumber = (phone) => {
    if (!phone) return ''

    let cleaned = String(phone).replace(/\D/g, '')

    // لو مكتوب بصيغة دولية
    if (cleaned.startsWith('20')) {
      return cleaned
    }

    // لو مكتوب 011xxxx
    if (cleaned.startsWith('0')) {
      return `20${cleaned.slice(1)}`
    }

    // لو مكتوب 11xxxxxxxx
    if (cleaned.length === 10 && cleaned.startsWith('1')) {
      return `20${cleaned}`
    }

    return cleaned
  }

  const phoneDigits = phone.replace(/[^0-9+]/g, '')
  const whatsappDigits = formatWhatsAppNumber(whatsapp)
  const address = settings?.address || t.contact?.defaultAddress
  const mapsUrl = settings?.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  const contactItems = [
    { icon: Phone, label: t.contact?.callUs || 'اتصل بنا', value: phone, href: `tel:${phoneDigits}` },
    { icon: MessageCircle, label: t.contact?.whatsapp || 'واتساب', value: whatsapp, href: `https://wa.me/${whatsappDigits}` },
    { icon: MapPin, label: t.contact?.address || 'العنوان', value: address, href: null },
    { icon: Clock, label: t.contact?.hours || 'ساعات العمل', value: t.contact?.hoursValue, href: null },
  ]

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="eyebrow">{t.contact?.eyebrow || 'تواصل معنا'}</span>
          <h2 className="section-heading mt-4">{t.contact?.heading || 'نحن هنا لمساعدتك'}</h2>
          <div className="section-divider" />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 items-start">
          {/* Left: Contact details */}
          <Reveal className="space-y-4">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4 p-5 rounded-2xl border border-navy-100 hover:border-primary-200 hover:shadow-card transition-all duration-300 group">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white">
                  <Icon size={19} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                      className="text-sm font-semibold text-navy-900 hover:text-primary-600 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-navy-900">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              <a href={`tel:${phoneDigits}`} className="btn-outline">
                <Phone size={17} />
                {t.contact?.callNow || 'اتصل الآن'}
              </a>
              <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer" className="btn-whatsapp">
                <MessageCircle size={17} />
                {t.contact?.whatsappBtn || 'واتساب'}
              </a>
            </div>
          </Reveal>

          {/* Right: Map CTA */}
          <Reveal delay={0.1}>
            <a
              href={mapsUrl}
              target="_blank" rel="noreferrer"
              className="group flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-navy-100 bg-surface p-10 text-center transition-all duration-300 hover:border-primary-300 hover:bg-primary-50 hover:shadow-card min-h-[300px]"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-primary-100/50 transition-transform duration-500 group-hover:scale-110" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
                  <MapPin size={32} />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-navy-900">{t.contact?.locationTitle || 'موقعنا على الخريطة'}</p>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed max-w-xs mx-auto">{address}</p>
                <p className="mt-1 text-xs text-ink-soft/60">{t.contact?.locationDesc}</p>
              </div>
              <span className="btn-primary">
                <Navigation size={15} />
                {t.contact?.viewOnMap || 'عرض على الخريطة'}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
