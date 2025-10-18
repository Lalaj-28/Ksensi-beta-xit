"use client"

interface ToggleButtonProps {
  enabled: boolean
  onToggle: () => void
}

export function ToggleButton({ enabled, onToggle }: ToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-16 h-16 rounded-full border-4 transition-all duration-300 ${
        enabled ? "bg-gray-400 border-gray-500" : "bg-transparent border-gray-600"
      }`}
      aria-label="Toggle"
    />
  )
}
