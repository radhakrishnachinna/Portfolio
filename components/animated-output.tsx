"use client"

import { useState, useEffect, cloneElement } from "react"
import type React from "react"
import { useTypingSounds } from "@/hooks/use-typing-sounds"

interface AnimatedOutputProps {
  children: React.ReactNode
  wordSpeed?: number
  lineDelay?: number
  soundMode?: "normal" | "smooth"
  onComplete?: () => void
}

export function AnimatedOutput({
  children,
  wordSpeed = 80,
  lineDelay = 300,
  soundMode = "normal",
  onComplete,
}: AnimatedOutputProps) {
  const [displayedLines, setDisplayedLines] = useState<React.ReactNode[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [lines, setLines] = useState<React.ReactNode[]>([])

  const { playTypingSound, playSmoothTypingSound, playLineCompleteSound } = useTypingSounds()

  // Extract individual lines/elements from JSX
  const extractLines = (node: React.ReactNode): React.ReactNode[] => {
    if (!node) return []

    if (Array.isArray(node)) {
      return node.flatMap(extractLines)
    }

    if (typeof node === "object" && node && "props" in node) {
      const element = node as React.ReactElement

      // If it's a container div, extract its children as separate lines
      if (element.type === "div" && element.props && typeof element.props === "object" && "children" in element.props) {
        const children = Array.isArray(element.props.children) ? element.props.children : [element.props.children]

        return children.filter((child: React.ReactNode) => child && (typeof child === "string" || typeof child === "object"))
      }
    }

    return [node]
  }

  // Check if a line contains a link
  const hasLink = (line: React.ReactNode): boolean => {
    if (!line || typeof line !== "object" || !("props" in line)) return false
    
    const element = line as React.ReactElement
    if (element.type === "a") return true
    
    if (element.props && typeof element.props === "object" && "children" in element.props) {
      const children = element.props.children as React.ReactNode
      if (Array.isArray(children)) {
        return children.some((child) => hasLink(child as React.ReactNode))
      }
      return hasLink(children)
    }
    
    return false
  }

  // Extract text content from a single line/element
  const extractTextFromLine = (line: React.ReactNode): string => {
    if (typeof line === "string") return line
    if (typeof line === "number") return line.toString()
    if (!line) return ""

    if (typeof line === "object" && line && "props" in line) {
      const element = line as React.ReactElement
      if (element.type === "a") {
        // For links, extract text but preserve the link structure
        if (element.props && typeof element.props === "object" && "children" in element.props) {
          return extractTextFromLine(element.props.children as React.ReactNode)
        }
        return ""
      }
      
      if (element.props && typeof element.props === "object" && "children" in element.props) {
        if (typeof element.props.children === "string") {
          return element.props.children
        }
        if (Array.isArray(element.props.children)) {
          return element.props.children.map(extractTextFromLine).join("")
        }
        return extractTextFromLine(element.props.children as React.ReactNode)
      }
    }

    return ""
  }

  // Create a typed version of a line with partial text, preserving links
  const createTypedLine = (originalLine: React.ReactNode, typedText: string): React.ReactNode => {
    if (typeof originalLine === "string") {
      return typedText
    }

    if (typeof originalLine === "object" && originalLine && "props" in originalLine) {
      const element = originalLine as React.ReactElement

      // If this is a link, preserve it fully
      if (element.type === "a") {
        return originalLine
      }

      // If this line contains links, preserve them
      if (hasLink(originalLine)) {
        // For lines with links, try to preserve the link structure
        // Extract the text before the link and the link itself
        if (element.props && typeof element.props === "object" && "children" in element.props) {
          const children = element.props.children
          
          // If children is a string, just replace it
          if (typeof children === "string") {
            // Check if typedText contains the link text
            const linkElement = findLinkInLine(originalLine)
            if (linkElement) {
              // Preserve the link
              return cloneElement(element, {}, linkElement)
            }
            return cloneElement(element, {}, typedText)
          }
          
          // If children is an array, preserve links
          if (Array.isArray(children)) {
            const preservedChildren = children.map((child) => {
              if (hasLink(child)) {
                return child
              }
              return child
            })
            return cloneElement(element, {}, preservedChildren)
          }
        }
      }

      // For regular elements without links, update with typed text
      return cloneElement(element, {}, typedText)
    }

    return typedText
  }

  // Helper to find link element in a line
  const findLinkInLine = (line: React.ReactNode): React.ReactNode | null => {
    if (!line || typeof line !== "object" || !("props" in line)) return null
    
    const element = line as React.ReactElement
    if (element.type === "a") return line
    
    if (element.props && typeof element.props === "object" && "children" in element.props) {
      const children = element.props.children as React.ReactNode
      if (Array.isArray(children)) {
        for (const child of children) {
          const link = findLinkInLine(child as React.ReactNode)
          if (link) return link
        }
      } else {
        return findLinkInLine(children)
      }
    }
    
    return null
  }

  useEffect(() => {
    const extractedLines = extractLines(children)
    setLines(extractedLines)
    setDisplayedLines([])
    setCurrentLineIndex(0)
    setCurrentWordIndex(0)
    setIsTyping(true)
  }, [children])

  useEffect(() => {
    if (!isTyping || lines.length === 0) return

    if (currentLineIndex >= lines.length) {
      setIsTyping(false)
      onComplete?.()
      return
    }

    const currentLine = lines[currentLineIndex]
    
    // If line contains a link, render it immediately without typing animation
    if (hasLink(currentLine)) {
      setDisplayedLines((prev) => {
        const newLines = [...prev]
        newLines[currentLineIndex] = currentLine
        return newLines
      })
      
      // Move to next line immediately (no delay for links)
      const lineTimer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentWordIndex(0)
      }, 50) // Small delay for smooth transition
      
      return () => clearTimeout(lineTimer)
    }

    const lineText = extractTextFromLine(currentLine)
    const words = lineText.split(" ").filter((word) => word.length > 0)

    if (currentWordIndex >= words.length) {
      // Play line complete sound
      playLineCompleteSound()

      // Move to next line after a delay
      const lineTimer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentWordIndex(0)
      }, lineDelay)

      return () => clearTimeout(lineTimer)
    }

    // Type the current word
    const wordTimer = setTimeout(() => {
      // Play appropriate typing sound based on mode
      if (soundMode === "smooth") {
        playSmoothTypingSound()
      } else {
        playTypingSound()
      }

      const currentWords = words.slice(0, currentWordIndex + 1)
      const currentLineProgress = currentWords.join(" ")

      const typedLine = createTypedLine(currentLine, currentLineProgress)

      // Update displayed lines
      setDisplayedLines((prev) => {
        const newLines = [...prev]
        newLines[currentLineIndex] = typedLine
        return newLines
      })

      setCurrentWordIndex((prev) => prev + 1)
    }, wordSpeed)

    return () => clearTimeout(wordTimer)
  }, [
    isTyping,
    lines,
    currentLineIndex,
    currentWordIndex,
    wordSpeed,
    lineDelay,
    onComplete,
    playTypingSound,
    playSmoothTypingSound,
    playLineCompleteSound,
    soundMode,
  ])

  if (!isTyping && currentLineIndex >= lines.length) {
    return <div>{children}</div>
  }

  return (
    <div>
      {displayedLines.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      {isTyping && <span className="animate-pulse text-green-400 ml-1">|</span>}
    </div>
  )
}
