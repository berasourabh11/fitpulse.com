import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthModalContextProvider } from './shared/contexts/AuthModalContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthModalContextProvider>
    <App />
    </AuthModalContextProvider>

  </React.StrictMode>,
)
