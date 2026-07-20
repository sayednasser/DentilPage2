import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './site/HomePage'

import AdminAccess from './admin/pages/AdminAccess'
import AdminGuard from './admin/components/AdminGuard'

// Admin Pages
const AdminLayout = lazy(() => import('./admin/components/layout/AdminLayout'))
const Dashboard = lazy(() => import('./admin/pages/Dashboard'))
const Doctors = lazy(() => import('./admin/pages/Doctors'))
const Appointments = lazy(() => import('./admin/pages/Appointments'))
const Services = lazy(() => import('./admin/pages/Services'))
const Offers = lazy(() => import('./admin/pages/Offers'))
const Gallery = lazy(() => import('./admin/pages/Gallery'))
const Reviews = lazy(() => import('./admin/pages/Reviews'))
const Settings = lazy(() => import('./admin/pages/Settings'))

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500" />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      {/* الموقع الرئيسي */}
      <Route path="/" element={<HomePage />} />

      {/* صفحة إدخال كود الإدارة */}
      <Route path="/admin" element={<AdminAccess />} />

      {/* لوحة التحكم */}
      <Route
        path="/clinic-admin"
        element={
          <AdminGuard>handleSubmit
            <Suspense fallback={<AdminFallback />}>
              <AdminLayout />
            </Suspense>
          </AdminGuard>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="services" element={<Services />} />
        <Route path="offers" element={<Offers />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}