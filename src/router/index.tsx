import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'

const Home         = lazy(() => import('@/pages/Home'))
const CategoryPage = lazy(() => import('@/pages/CategoryPage'))
const About        = lazy(() => import('@/pages/About'))
const Contact      = lazy(() => import('@/pages/Contact'))

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas" aria-label="Cargando">
      <div className="w-6 h-6 rounded-full border-2 border-rust border-t-transparent animate-spin" />
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/',             element: <Suspense fallback={<Loading />}><Home /></Suspense> },
      { path: '/games',        element: <Suspense fallback={<Loading />}><CategoryPage /></Suspense> },
      { path: '/short-films',  element: <Suspense fallback={<Loading />}><CategoryPage /></Suspense> },
      { path: '/foley',        element: <Suspense fallback={<Loading />}><CategoryPage /></Suspense> },
      { path: '/alternative',  element: <Suspense fallback={<Loading />}><CategoryPage /></Suspense> },
      { path: '/about',        element: <Suspense fallback={<Loading />}><About /></Suspense> },
      { path: '/contact',      element: <Suspense fallback={<Loading />}><Contact /></Suspense> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
