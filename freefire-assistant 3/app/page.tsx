"use client"

import { useState, useEffect } from "react"
import { ParticlesBackground } from "@/components/particles-background"
import { ToggleButton } from "@/components/toggle-button"
import { ToggleSwitch } from "@/components/toggle-switch"
import { SensitivitySlider } from "@/components/sensitivity-slider"
import { KsensiVipButton } from "@/components/ksensi-vip-button"

export default function Home() {
  const [headTrick, setHeadTrick] = useState(false)
  const [aimLock, setAimLock] = useState(false)
  const [regedit, setRegedit] = useState(false)
  const [aimShot, setAimShot] = useState(false)
  const [aimHead, setAimHead] = useState(false)
  const [aimbotDrag, setAimbotDrag] = useState(false)
  const [sensitivity, setSensitivity] = useState(50)

  useEffect(() => {
    setHeadTrick(false)
    setAimLock(false)
    setRegedit(false)
    setAimShot(false)
    setAimHead(false)
    setAimbotDrag(false)
  }, [])

  const executeFunction = async (functionName: string, enabled: boolean) => {
    if (enabled) {
      try {
        console.log(`[v0] Executing ${functionName} in background`)
        const response = await fetch("/api/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            function: functionName,
            sensitivity: sensitivity,
            deepLink: "com.dts.freefireth://",
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
        }

        const data = await response.json()
        console.log(`[v0] ${functionName} executed successfully:`, data)
        console.log(`[v0] Config applied:`, data.config)

        // No redirigir, solo ejecutar en segundo plano
        // Las configuraciones del plist se aplican automáticamente
      } catch (error) {
        console.error(`[v0] Error executing ${functionName}:`, error)
      }
    } else {
      console.log(`[v0] ${functionName} disabled`)
    }
  }

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <ParticlesBackground />

      <div className="relative z-10 container mx-auto px-4 py-4 max-w-md">
        <div className="space-y-4">
          {/* HeadTrick */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold italic">HeadTrick</h2>
            <ToggleButton
              enabled={headTrick}
              onToggle={() => {
                const newState = !headTrick
                setHeadTrick(newState)
                executeFunction("headtrick", newState)
              }}
            />
          </div>

          {/* Aim Lock */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold italic">Aim Lock</h2>
            <ToggleButton
              enabled={aimLock}
              onToggle={() => {
                const newState = !aimLock
                setAimLock(newState)
                executeFunction("aimlock", newState)
              }}
            />
          </div>

          {/* Regedit */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold italic">Regedit</h2>
            <ToggleSwitch
              enabled={regedit}
              onToggle={() => {
                const newState = !regedit
                setRegedit(newState)
                executeFunction("regedit", newState)
              }}
            />
          </div>

          {/* Aim Shot */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold italic">Aim Shot</h2>
            <ToggleSwitch
              enabled={aimShot}
              onToggle={() => {
                const newState = !aimShot
                setAimShot(newState)
                executeFunction("aimshot", newState)
              }}
            />
          </div>

          {/* Aim-Head */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold italic">Aim-Head</h2>
            <ToggleSwitch
              enabled={aimHead}
              onToggle={() => {
                const newState = !aimHead
                setAimHead(newState)
                executeFunction("aimhead", newState)
              }}
            />
          </div>

          {/* Aimbot Drag */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold italic">Aimbot Drag</h2>
            <ToggleSwitch
              enabled={aimbotDrag}
              onToggle={() => {
                const newState = !aimbotDrag
                setAimbotDrag(newState)
                executeFunction("aimbotdrag", newState)
              }}
            />
          </div>

          {/* Sensitivity Slider */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xl font-bold italic text-center">Aim Assist + Sensivity</h2>
            <SensitivitySlider value={sensitivity} onChange={setSensitivity} />
          </div>

          {/* KSENSI VIP Button */}
          <div className="pt-2">
            <KsensiVipButton />
          </div>

          {/* Description */}
          <div className="pt-2 space-y-1">
            <p className="text-xs italic text-gray-400 leading-relaxed">
              Explicação, maioria das funcoes e injetadas no "analistics" do iphone tipo meta data so que mais segura
            </p>
            <p className="text-xs italic text-gray-400">‪(829) 327‑8696</p>
          </div>
        </div>
      </div>
    </main>
  )
}
