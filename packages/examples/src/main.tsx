import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './layout/Header'
import Loader from './layout/Loader'
import './index.css'

const Home = lazy(() => import('./home'))
const HeroCarousel = lazy(() => import('./hero-carousel'))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="fixed top-0 left-0 w-full z-20">
        <Header />
      </div>
      <main className="z-10">
        <Routes>
          <Route
            path="/slider"
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/slider/hero-carousel"
            element={
              <Suspense fallback={<Loader />}>
                <HeroCarousel />
              </Suspense>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>,
)
