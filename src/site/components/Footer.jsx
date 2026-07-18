import { Facebook, Instagram, Youtube, Phone, MessageCircle, MapPin } from 'lucide-react'
import { useClinicSettings } from '../hooks/useClinicSettings'
import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const settings = useClinicSettings()
  const { t } = useLang()
  const clinicName = settings?.clinicName || t.footer?.defaultName || 'دنتافلو'
  const phone = settings?.phone || ''
  const whatsapp = settings?.whatsapp || ''
  const address = settings?.address || ''
  const whatsappDigits = whatsapp.replace(/[^0-9]/g, '')
  const phoneDigits = phone.replace(/[^0-9+]/g, '')

  const quickLinks = [
    { href: '#home', label: t.nav?.home },
    { href: '#services', label: t.nav?.services },
    { href: '#offers', label: t.nav?.offers },
    { href: '#gallery', label: t.nav?.gallery },
    { href: '#doctors', label: t.nav?.doctors },
    { href: '#booking', label: t.nav?.booking },
    { href: '#contact', label: t.nav?.contact },
  ]

  return (
    <footer className="bg-navy-900 text-white">
      {/* Top accent line */}
      <div className="h-0.5 bg-teal-gradient" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 shadow-glow">
                <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                  <path d="M24 6c-4.5 0-6.8 2.4-9.6 2.4-3.6 0-6.4 2.9-6.4 8.2 0 5 1.6 9.9 2.9 14.6.9 3.4 1.7 7.6 4.6 7.6 3.3 0 3-9.2 8.5-9.2s5.2 9.2 8.5 9.2c2.9 0 3.7-4.2 4.6-7.6 1.3-4.7 2.9-9.6 2.9-14.6 0-5.3-2.8-8.2-6.4-8.2C30.8 8.4 28.5 6 24 6z" fill="currentColor"/>
                </svg>
              </div>
              <span className="text-lg font-bold tracking-wide">{clinicName}</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {t.footer?.tagline || 'عيادة متخصصة في طب وتجميل الأسنان بأعلى معايير الجودة.'}
            </p>
            <div className="mt-5 flex gap-2.5">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="social"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all hover:bg-primary-500 hover:border-primary-500 hover:shadow-glow">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5">
              {t.footer?.quickLinks || 'روابط سريعة'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}
                    className="text-sm text-white/60 hover:text-primary-400 transition-colors hover:translate-x-1 inline-block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5">
              {t.footer?.contact || 'تواصل معنا'}
            </h4>
            <ul className="space-y-4">
              {phone && (
                <li>
                  <a href={`tel:${phoneDigits}`} className="flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors group">
                    <Phone size={14} className="mt-0.5 flex-shrink-0 text-primary-500" />
                    {phone}
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer"
                    className="flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors">
                    <MessageCircle size={14} className="mt-0.5 flex-shrink-0 text-primary-500" />
                    {whatsapp}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-3 text-sm text-white/60">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-primary-500" />
                  {address}
                </li>
              )}
            </ul>
          </div>

          {/* Booking CTA */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-5">
              {t.nav?.booking || 'الحجز'}
            </h4>
            <p className="text-sm text-white/50 mb-5 leading-relaxed">
              احجز موعدك الآن وابدأ رحلتك نحو ابتسامة أجمل.
            </p>
            <a href="#booking" className="btn-primary !text-sm !px-5 !py-2.5 w-full justify-center">
              {t.hero?.bookNow || 'احجز الآن'}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {clinicName}. {t.footer?.rights || 'جميع الحقوق محفوظة.'}
          </p>
          <div className="flex items-center gap-1 text-xs text-white/20">
            <span className="h-1 w-1 rounded-full bg-primary-500" />
            <span>Luxury Dental Care</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
