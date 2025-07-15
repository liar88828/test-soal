import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { routerClient } from "@/router.client";
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routerClient} />
  </StrictMode>,
)
