import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Hero from './Hero'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/slider',
    element: <Home />,
  },
  {
    path: '/slider/hero',
    element: <Hero />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
