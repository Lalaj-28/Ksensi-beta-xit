"use client"

interface ToggleSwitchProps {
  enabled: boolean
  onToggle: () => void
}

export function ToggleSwitch({ enabled, onToggle }: ToggleSwitchProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-24 h-12 rounded-full transition-all duration-300 ${
        enabled ? "bg-gray-600" : "bg-gray-800"
      }`}
      aria-label="Toggle switch"
    >
      <div
        className={`absolute top-1 w-10 h-10 rounded-full transition-all duration-300 ${
          enabled ? "left-[calc(100%-44px)] bg-gray-400" : "left-1 bg-gray-500"
        }`}
      />
    </button>
  )
}
