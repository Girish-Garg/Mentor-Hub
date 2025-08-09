import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'react-quill/dist/quill.snow.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { ClerkProvider } from '@clerk/clerk-react'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.error("VITE_CLERK_PUBLISHABLE_KEY is not defined. Please set it in your .env file.");
}
createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        
        <App />
      </MantineProvider>
    </ClerkProvider>
)
