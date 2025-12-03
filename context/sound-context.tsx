"use client"

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react"

interface SoundContextType {
    isEnabled: boolean
    toggleSounds: () => boolean
    enableSounds: () => void
    playTypingSound: () => void
    playSmoothTypingSound: () => void
    playLineCompleteSound: () => void
    playCommandSound: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [isEnabled, setIsEnabled] = useState(false)
    const audioContextRef = useRef<AudioContext | null>(null)

    const initAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }
        if (audioContextRef.current.state === "suspended") {
            audioContextRef.current.resume()
        }
        return audioContextRef.current
    }, [])

    const toggleSounds = useCallback(() => {
        setIsEnabled((prev) => {
            const newState = !prev
            if (newState) {
                initAudioContext()
            }
            return newState
        })
        return !isEnabled // Return the *new* state (this logic in setState is async, but for the return value we can just invert current)
        // Wait, the return value of toggleSounds in the original hook returned the new state.
        // Let's fix this to be consistent.
    }, [isEnabled, initAudioContext])

    // Actually, to be safe and consistent with the previous hook's behavior which returned the new value immediately:
    const toggleSoundsWrapper = useCallback(() => {
        let newState = false
        setIsEnabled((prev) => {
            newState = !prev
            if (newState) {
                initAudioContext()
            }
            return newState
        })
        return !isEnabled // This is still using the closure value.
    }, [isEnabled, initAudioContext])

    // Let's simplify. We can just use the state setter and return the inverted value.
    const handleToggle = useCallback(() => {
        const newState = !isEnabled
        setIsEnabled(newState)
        if (newState) {
            initAudioContext()
        }
        return newState
    }, [isEnabled, initAudioContext])


    const enableSounds = useCallback(() => {
        setIsEnabled(true)
        initAudioContext()
    }, [initAudioContext])

    const playTypingSound = useCallback(() => {
        if (!isEnabled) return

        try {
            const audioContext = initAudioContext()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime)
            oscillator.type = "square"

            gainNode.gain.setValueAtTime(0, audioContext.currentTime)
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.05)
        } catch (error) {
            console.warn("Audio playback failed:", error)
        }
    }, [isEnabled, initAudioContext])

    const playLineCompleteSound = useCallback(() => {
        if (!isEnabled) return

        try {
            const audioContext = initAudioContext()
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
    }, [isEnabled, initAudioContext])

    const playCommandSound = useCallback(() => {
        if (!isEnabled) return

        try {
            const audioContext = initAudioContext()
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
    }, [isEnabled, initAudioContext])

    const playSmoothTypingSound = useCallback(() => {
        if (!isEnabled) return

        try {
            const audioContext = initAudioContext()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()
            const filterNode = audioContext.createBiquadFilter()

            oscillator.connect(filterNode)
            filterNode.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(400 + Math.random() * 200, audioContext.currentTime)
            oscillator.frequency.linearRampToValueAtTime(450 + Math.random() * 150, audioContext.currentTime + 0.1)
            oscillator.type = "sine"

            filterNode.type = "lowpass"
            filterNode.frequency.setValueAtTime(800, audioContext.currentTime)
            filterNode.Q.setValueAtTime(1, audioContext.currentTime)

            gainNode.gain.setValueAtTime(0, audioContext.currentTime)
            gainNode.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + 0.02)
            gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 0.08)
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.15)
        } catch (error) {
            console.warn("Audio playback failed:", error)
        }
    }, [isEnabled, initAudioContext])

    return (
        <SoundContext.Provider
            value={{
                isEnabled,
                toggleSounds: handleToggle,
                enableSounds,
                playTypingSound,
                playSmoothTypingSound,
                playLineCompleteSound,
                playCommandSound,
            }}
        >
            {children}
        </SoundContext.Provider>
    )
}

export function useSoundContext() {
    const context = useContext(SoundContext)
    if (context === undefined) {
        throw new Error("useSoundContext must be used within a SoundProvider")
    }
    return context
}
