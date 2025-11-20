"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTypingSounds } from "@/hooks/use-typing-sounds"

export function SoundToggle() {
  const { toggleSounds, enableSounds, isEnabled } = useTypingSounds()
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [soundMode, setSoundMode] = useState<"normal" | "smooth">("normal")

  const handleToggle = () => {
    if (!soundEnabled) {
      enableSounds()
    }
    const newState = toggleSounds()
    setSoundEnabled(newState)
  }

  const handleModeToggle = () => {
    setSoundMode((prev) => (prev === "normal" ? "smooth" : "normal"))
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleToggle}
        variant="ghost"
        size="sm"
        className="text-green-400 hover:text-green-300 hover:bg-gray-800 border border-green-400"
      >
        {soundEnabled ? "🔊" : "🔇"} Sound
      </Button>
      {soundEnabled && (
        <Button
          onClick={handleModeToggle}
          variant="ghost"
          size="sm"
          className="text-green-400 hover:text-green-300 hover:bg-gray-800 border border-green-400"
          title={`Switch to ${soundMode === "normal" ? "smooth" : "normal"} typing sounds`}
        >
          {soundMode === "normal" ? "⚡" : "🌊"} {soundMode === "normal" ? "Click" : "Smooth"}
        </Button>
      )}
    </div>
  )
}

// Export the sound mode for use in other components
export function useSoundMode() {
  const [soundMode, setSoundMode] = useState<"normal" | "smooth">("normal")
  return { soundMode, setSoundMode }
}
