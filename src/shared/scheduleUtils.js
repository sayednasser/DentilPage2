const DAY_TO_INDEX = {
  // English
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,

  // Arabic
  الأحد: 0,
  الاحد: 0,

  الاثنين: 1,

  الثلاثاء: 2,

  الأربعاء: 3,
  الاربعاء: 3,

  الخميس: 4,

  الجمعة: 5,

  السبت: 6,
}

// ترجع أقرب تاريخ لليوم المختار بصيغة YYYY-MM-DD
export function getNextDateForDay(dayName) {
  if (!dayName) return null

  const normalizedDay = String(dayName).trim().toLowerCase()

  const targetDow = DAY_TO_INDEX[normalizedDay]

  if (targetDow === undefined) {
    console.log('Unknown day:', dayName)
    return null
  }

  const today = new Date()

  const diff = (targetDow - today.getDay() + 7) % 7

  const result = new Date(today)

  // منع مشاكل UTC
  result.setHours(12, 0, 0, 0)
  result.setDate(result.getDate() + diff)

  const year = result.getFullYear()
  const month = String(result.getMonth() + 1).padStart(2, '0')
  const day = String(result.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatArabicTime(hour, minute) {
  const period = hour >= 12 ? 'م' : 'ص'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  const paddedMinute = String(minute).padStart(2, '0')

  return `${String(displayHour).padStart(2, '0')}:${paddedMinute} ${period}`
}

// توليد المواعيد حسب ساعات العمل
export function generateSlots(from, to, duration = 30) {
  if (!from || !to || !duration) return []

  const [fromH, fromM] = from.split(':').map(Number)
  const [toH, toM] = to.split(':').map(Number)

  const slots = []

  let cursor = fromH * 60 + fromM
  const end = toH * 60 + toM

  while (cursor + duration <= end) {
    const h = Math.floor(cursor / 60)
    const m = cursor % 60

    slots.push(formatArabicTime(h, m))

    cursor += duration
  }

  return slots
}