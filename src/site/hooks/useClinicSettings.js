import { useEffect, useState } from 'react'
import apiClient from '../../admin/api/axiosClient'

export function useClinicSettings() {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    apiClient
      .get('/setting')
      .then(({ data }) => {
        const raw = data?.data ?? data ?? {}

        setSettings({
          ...raw,

          // Contact
          whatsapp: raw.socialLinks?.whatsapp ?? raw.whatsapp ?? '',
          phone: raw.phone ?? '',
          address: raw.address ?? '',

          // Social Links
          facebook: raw.socialLinks?.facebook ?? '',
          instagram: raw.socialLinks?.instagram ?? '',
          youtube: raw.socialLinks?.youtube ?? '',
          linkedin: raw.socialLinks?.linkedin ?? '',
          tiktok: raw.socialLinks?.tiktok ?? '',

          // Maps
          googleMapsUrl: raw.googleMap ?? raw.googleMapsUrl ?? '',

          // Images
          heroImage: raw.heroImage?.secure_url ?? '',
        })
      })
      .catch(() => setSettings(null))
  }, [])

  return settings
}