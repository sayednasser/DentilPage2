import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useClinicSettings } from '../hooks/useClinicSettings'

export default function FloatingWhatsapp() {
  const settings = useClinicSettings()

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

  const whatsappDigits = formatWhatsAppNumber(settings?.whatsapp)

  return (
    <motion.a
      href={`https://wa.me/${whatsappDigits}`}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل عبر واتساب"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 1,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 left-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-floaty"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <MessageCircle size={26} className="relative" />
    </motion.a>
  )
}