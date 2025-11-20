"use client"

import { useCallback, useRef } from "react"

export function useTypingSounds() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const isEnabledRef = useRef(true)

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  const playTypingSound = useCallback(() => {
    if (!isEnabledRef.current) return

    try {
      const audioContext = initAudioContext()

      // Create a short click sound for typing
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Random frequency for variation
      oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime)
      oscillator.type = "square"

      // Quick fade in/out for click effect
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.05)
    } catch (error) {
      console.warn("Audio playback failed:", error)
    }
  }, [initAudioContext])

  const playLineCompleteSound = useCallback(() => {
    if (!isEnabledRef.current) return

    try {
      const audioContext = initAudioContext()

      // Create a subtle ding for line completion
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (error) {
      console.warn("Audio playback failed:", error)
    }
  }, [initAudioContext])

  const playCommandSound = useCallback(() => {
    if (!isEnabledRef.current) return

    try {
      const audioContext = initAudioContext()

      // Create a command execution sound
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
      oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.1)
      oscillator.type = "sawtooth"

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.15)
    } catch (error) {
      console.warn("Audio playback failed:", error)
    }
  }, [initAudioContext])

  const playSmoothTypingSound = useCallback(() => {
    if (!isEnabledRef.current) return

    try {
      const audioContext = initAudioContext()

      // Create a smooth, soft typing sound
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      const filterNode = audioContext.createBiquadFilter()

      oscillator.connect(filterNode)
      filterNode.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // Smooth sine wave with slight frequency modulation
      oscillator.frequency.setValueAtTime(400 + Math.random() * 200, audioContext.currentTime)
      oscillator.frequency.linearRampToValueAtTime(450 + Math.random() * 150, audioContext.currentTime + 0.1)
      oscillator.type = "sine"

      // Low-pass filter for smoothness
      filterNode.type = "lowpass"
      filterNode.frequency.setValueAtTime(800, audioContext.currentTime)
      filterNode.Q.setValueAtTime(1, audioContext.currentTime)

      // Smooth envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 0.02)
      gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 0.08)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.15)
    } catch (error) {
      console.warn("Audio playback failed:", error)
    }
  }, [initAudioContext])

  const toggleSounds = useCallback(() => {
    isEnabledRef.current = !isEnabledRef.current
    return isEnabledRef.current
  }, [])

  const enableSounds = useCallback(() => {
    isEnabledRef.current = true
    // Initialize audio context on user interaction
    initAudioContext()
  }, [initAudioContext])

  return {
    playTypingSound,
    playSmoothTypingSound,
    playLineCompleteSound,
    playCommandSound,
    toggleSounds,
    enableSounds,
    isEnabled: () => isEnabledRef.current,
  }
}
