import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, Languages } from 'lucide-react'
import { useClinicSettings } from '../hooks/useClinicSettings'
import { useLang } from '../i18n/LanguageContext'

export default function Navbar() {
  const settings = useClinicSettings()
  const { t, toggleLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const phoneDigits = settings?.phone?.replace(/[^0-9+]/g, '') || '+201234567890'
  const whatsappDigits = settings?.whatsapp?.replace(/[^0-9]/g, '') || '201234567890'
  const clinicName = settings?.clinicName || 'دنتافلو'

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#offers', label: t.nav.offers },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#doctors', label: t.nav.doctors },
    { href: '#booking', label: t.nav.booking },
    { href: '#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    const { style } = document.body
    const prev = { position: style.position, top: style.top, width: style.width }
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.width = '100%'
    return () => {
      Object.assign(style, prev)
      window.scrollTo(0, scrollY)
    }
  }, [open])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    requestAnimationFrame(() => {
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[55] transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-xl shadow-luxury py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
              <path d="M24 6c-4.5 0-6.8 2.4-9.6 2.4-3.6 0-6.4 2.9-6.4 8.2 0 5 1.6 9.9 2.9 14.6.9 3.4 1.7 7.6 4.6 7.6 3.3 0 3-9.2 8.5-9.2s5.2 9.2 8.5 9.2c2.9 0 3.7-4.2 4.6-7.6 1.3-4.7 2.9-9.6 2.9-14.6 0-5.3-2.8-8.2-6.4-8.2C30.8 8.4 28.5 6 24 6z" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-base font-bold text-white tracking-wide">{clinicName}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-primary-400 transition-all duration-300 group-hover:w-4/5" />
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-2 text-xs font-semibold text-white/70 transition-all hover:border-white/40 hover:text-white"
          >
            <Languages size={14} />
            {t.nav.switchLang}
          </button>
          <a
            href={`tel:${phoneDigits}`}
            className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-all hover:border-white/40 hover:text-white"
          >
            <Phone size={15} />
            {t.nav.callNow}
          </a>
          <a
            href={`https://wa.me/${whatsappDigits}`}
            target="_blank" rel="noreferrer"
            className="btn-primary !py-2.5 !px-5 text-sm"
          >
            <MessageCircle size={15} />
            {t.nav.whatsapp}
          </a>
        </div>

        {/* Mobile burger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={toggleLang} className="rounded-lg p-2 text-white/70 hover:text-white">
            <Languages size={18} />
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.close : t.nav.openMenu}
            className="rounded-lg p-2 text-white/80 transition-colors hover:text-white"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
            style={{ backgroundColor: '#0d1b2a' }}
          >
            <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span className="h-1 w-1 rounded-full bg-primary-400" />
                  {link.label}
                </motion.a>
              ))}
              <div className="flex gap-3 pt-4 border-t border-white/10 mt-2">
                <a href={`tel:${phoneDigits}`} className="btn-ghost flex-1 text-sm !py-2.5">
                  <Phone size={15} />
                  {t.nav.callNow}
                </a>
                <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer" className="btn-primary flex-1 text-sm !py-2.5">
                  <MessageCircle size={15} />
                  {t.nav.whatsapp}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
