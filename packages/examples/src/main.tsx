import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './layout/Header'
import Loader from './layout/Loader'
import './index.css'

const Home = lazy(() => import('./home'))
const FullPageCarousel = lazy(() => import('./full-page-carousel'))
const Examples = lazy(() => import('./examples'))

const router = createBrowserRouter([
  {
    path: '/slider',
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/slider/examples',
    element: (
      <Suspense fallback={<Loader />}>
        <Examples />
      </Suspense>
    ),
  },
  {
    path: '/slider/full-page-carousel',
    element: (
      <Suspense fallback={<Loader />}>
        <FullPageCarousel />
      </Suspense>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div className="flex flex-col h-full">
      <Header />
      <main className="grow overflow-y-auto">
        <RouterProvider router={router} />
      </main>
    </div>
  </React.StrictMode>,
)
