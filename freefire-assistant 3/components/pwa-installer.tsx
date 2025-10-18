"use client"

import { useEffect, useState } from "react"

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    // Registrar service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[PWA] Service Worker registered:", registration)
        })
        .catch((error) => {
          console.log("[PWA] Service Worker registration failed:", error)
        })
    }

    // Capturar evento de instalación
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log("[PWA] User choice:", outcome)
    setDeferredPrompt(null)
    setShowInstall(false)
  }

  if (!showInstall) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 z-50">
      <p className="text-sm text-white mb-2">Instalar Free Fire Assistant como app nativa</p>
      <div className="flex gap-2">
        <button onClick={handleInstall} className="flex-1 bg-white text-black px-4 py-2 rounded font-semibold">
          Instalar
        </button>
        <button onClick={() => setShowInstall(false)} className="px-4 py-2 rounded border border-gray-600 text-white">
          Después
        </button>
      </div>
    </div>
  )
}
