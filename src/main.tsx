import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HeroUIProvider, ToastProvider } from "@heroui/react"
import App from './App.tsx'
import './index.css'

// Убедимся, что корневой элемент существует
const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HeroUIProvider>
        <ToastProvider />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HeroUIProvider>
    </React.StrictMode>,
  )
} else {
  console.error("Root element not found");
}