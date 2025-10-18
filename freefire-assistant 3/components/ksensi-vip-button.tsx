"use client"

import { useEffect, useRef, useState } from "react"

export function KsensiVipButton() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
    }> = []

    // Create button particles (red and gray)
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? "rgba(220, 38, 38, 0.6)" : "rgba(120, 120, 120, 0.5)",
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  const handleClick = () => {
    // Try multiple Free Fire deep link schemes for cross-platform compatibility
    const schemes = [
      "freefire://",
      "freefireth://",
      "freefiremax://",
      "com.dts.freefireth://",
      "com.dts.freefiremax://",
      "garena-freefire://",
      "intent://freefire#Intent;scheme=freefire;package=com.dts.freefireth;end",
      "intent://freefire#Intent;scheme=freefire;package=com.dts.freefiremax;end",
    ]

    let attempted = 0
    const tryScheme = (index: number) => {
      if (index >= schemes.length) {
        alert("No se pudo abrir Free Fire. Asegúrate de que el juego esté instalado.")
        return
      }

      const scheme = schemes[index]
      const iframe = document.createElement("iframe")
      iframe.style.display = "none"
      iframe.src = scheme
      document.body.appendChild(iframe)

      setTimeout(() => {
        document.body.removeChild(iframe)
        attempted++
        if (attempted < 3) {
          tryScheme(index + 1)
        }
      }, 500)
    }

    // Try opening with window.location first
    const primaryScheme = schemes[0]
    window.location.href = primaryScheme

    // Fallback attempts
    setTimeout(() => {
      tryScheme(1)
    }, 1000)
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full py-6 bg-black border-2 border-red-600 rounded-lg overflow-hidden transition-all duration-300 ${
        isHovered ? "scale-105 shadow-lg shadow-red-600/50" : ""
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />
      <span className="relative z-10 text-white text-2xl font-bold tracking-wider">KSENSI VIP</span>
    </button>
  )
}
