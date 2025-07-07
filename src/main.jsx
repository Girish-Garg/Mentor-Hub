import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Sidebar from '@/components/custom/sidebar'
import Question from '@/components/custom/Question'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <App  />
=======
  {/* <Sidebar></Sidebar> */}
  <App/>
>>>>>>> 3a9b35d (navbar)
  </StrictMode>,
)
