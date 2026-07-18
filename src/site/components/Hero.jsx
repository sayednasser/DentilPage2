import { motion } from 'framer-motion'
import { MessageCircle, CalendarCheck, Users, Award, Star, ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'
import { useClinicSettings } from '../hooks/useClinicSettings'
import { useLang } from '../i18n/LanguageContext'

export default function Hero() {
  const settings = useClinicSettings()
  const { t, isRTL } = useLang()
  const whatsappNumber = settings?.whatsapp?.replace(/[^0-9]/g, '') || '201234567890'
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  const stats = [
    { value: '+5000', label: t.stats?.[0]?.label || 'مريض', suffix: '' },
    { value: '+10', label: t.stats?.[1]?.label || 'سنوات خبرة', suffix: '' },
    { value: '98%', label: t.stats?.[2]?.label || 'نسبة الرضا', suffix: '' },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-navy-900 flex flex-col"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-dot-grid bg-dot-sm opacity-20" />
      <div className="absolute inset-0 bg-luxury-glow opacity-30" />

      {/* Decorative orbs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 -left-32 h-80 w-80 rounded-full bg-gold-DEFAULT/10 blur-3xl"
      />

      {/* Main content */}
      <div className="relative flex flex-1 items-center pt-24 pb-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1 text-center lg:text-start"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-primary-400" />
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary-400">
                  {t.hero?.badge || 'عيادة معتمدة لطب وتجميل الأسنان'}
                </span>
                <span className="h-px w-8 bg-primary-400" />
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight">
                {settings?.heroTitle || t.hero?.defaultTitle || 'ابتسامة أجمل'}
                <span className="block text-primary-400 mt-1">
                  {(settings?.heroTitle || t.hero?.defaultTitle) ? '' : 'تبدأ من هنا'}
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {settings?.heroDescription || t.hero?.defaultDesc}
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <a href="#booking" className="btn-primary">
                  <CalendarCheck size={18} />
                  {t.hero?.bookNow || 'احجز موعدك الآن'}
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank" rel="noreferrer"
                  className="btn-ghost"
                >
                  <MessageCircle size={18} />
                  {t.hero?.whatsapp || 'تواصل واتساب'}
                </a>
              </div>

              {/* Stats row */}
              <div className="mt-14 grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0 lg:max-w-none">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    className="text-center lg:text-start"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="mt-1 text-xs text-white/50 leading-tight">{stat.label}</div>
                    {i < 2 && <div className="hidden lg:block absolute top-2 right-0 h-8 w-px bg-white/10" />}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 relative flex justify-center"
            >
              {/* Image frame */}
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 rounded-[2rem] border border-primary-500/20" />
                <div className="absolute -inset-8 rounded-[2.5rem] border border-primary-500/10" />

                <div className="relative w-64 sm:w-80 md:w-96 lg:w-[420px] aspect-[3/4] rounded-[2rem] overflow-hidden">
                  <img
                    src={
                      settings?.heroImage ||
                      'https://images.pexels.com/photos/35438269/pexels-photo-35438269.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop'
                    }
                    alt="dental clinic"
                    className="h-full w-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
                </div>

                {/* Floating card — patients */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="absolute -right-4 sm:-right-8 top-8 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-luxury"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-navy-900">+5000</p>
                    <p className="text-xs text-ink-soft">{t.hero?.patients || 'مريض راضٍ'}</p>
                  </div>
                </motion.div>

                {/* Floating card — rating */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="absolute -left-4 sm:-left-8 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-luxury"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-light text-gold-dark">
                    <Star size={18} className="fill-gold-DEFAULT text-gold-DEFAULT" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-navy-900">4.9 / 5</p>
                    <p className="text-xs text-ink-soft">{t.hero?.rating || 'تقييم العملاء'}</p>
                  </div>
                </motion.div>

                {/* Gold accent line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-4 left-8 right-8 h-1 bg-gold-gradient rounded-full origin-left"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-white/30"
        >
          <span className="text-[10px] tracking-widest uppercase">scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
