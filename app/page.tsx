"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { AnimatedOutput } from "@/components/animated-output"
import { SoundToggle } from "@/components/sound-toggle"
import { IDCard } from "@/components/id-card"
import { useTypingSounds } from "@/hooks/use-typing-sounds"

interface Command {
  command: string
  output: React.ReactNode
}

interface TypeWriterProps {
  content: React.ReactNode
  speed?: number
  onComplete?: () => void
}

function TypeWriter({ content, speed = 30, onComplete }: TypeWriterProps) {
  const [displayedContent, setDisplayedContent] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (typeof content === "string") {
      let index = 0
      const timer = setInterval(() => {
        if (index < content.length) {
          setDisplayedContent(content.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(timer)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(timer)
    } else {
      // For JSX content, we'll convert it to text and type that
      const textContent = extractTextFromJSX(content)
      let index = 0
      const timer = setInterval(() => {
        if (index < textContent.length) {
          setDisplayedContent(textContent.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          setDisplayedContent("")
          clearInterval(timer)
          onComplete?.()
        }
      }, speed)

      return () => clearInterval(timer)
    }
  }, [content, speed, onComplete])

  if (typeof content === "string") {
    return (
      <span>
        {displayedContent}
        {isTyping && <span className="animate-pulse">|</span>}
      </span>
    )
  }

  if (!isTyping) {
    return <>{content}</>
  }

  return (
    <span>
      {displayedContent}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  )
}

function extractTextFromJSX(jsx: React.ReactNode): string {
  if (typeof jsx === "string") return jsx
  if (typeof jsx === "number") return jsx.toString()
  if (!jsx) return ""

  if (Array.isArray(jsx)) {
    return jsx.map(extractTextFromJSX).join("")
  }

  if (typeof jsx === "object" && "props" in jsx) {
    const element = jsx as React.ReactElement
    if (element.props && typeof element.props === "object" && "children" in element.props) {
      return extractTextFromJSX(element.props.children as React.ReactNode)
    }
  }

  return ""
}

const commands = {
  help: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">📋 Available Commands:</div>
      <div className="ml-4 space-y-1">
        <div>
          <span className="text-blue-400">help</span> - Show this help message
        </div>
        <div>
          <span className="text-blue-400">about</span> - Learn about me
        </div>
        <div>
          <span className="text-blue-400">projects</span> - View my projects
        </div>
        <div>
          <span className="text-blue-400">skills</span> - See my technical skills
        </div>
        <div>
          <span className="text-blue-400">experience</span> - View work experience
        </div>
        <div>
          <span className="text-blue-400">contact</span> - Get my contact information
        </div>
        <div>
          <span className="text-blue-400">education</span> - View educational background
        </div>
        <div>
          <span className="text-blue-400">certifications</span> - See my certifications
        </div>
        <div>
          <span className="text-blue-400">leadership</span> - Leadership experience
        </div>
        <div>
          <span className="text-blue-400">sudo</span> - Execute with admin privileges
        </div>
        <div>
          <span className="text-blue-400">clear</span> - Clear the terminal
        </div>
        <div>
          <span className="text-blue-400">welcome</span> - Return to welcome screen
        </div>
        <div>
          <span className="text-blue-400">sound</span> - Toggle typing sound effects
        </div>
        <div>
          <span className="text-blue-400">smooth</span> - Switch to smooth typing sounds
        </div>
        <div>
          <span className="text-blue-400">click</span> - Switch to click typing sounds
        </div>
        <div>
          <span className="text-blue-400">flip</span> - Flip the ID card
        </div>
      </div>
    </div>
  ),
  about: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">👨‍💻 About Maradana Radhakrishna </div>
      <div className="ml-4 space-y-2">
        <div>Enthusiastic learner with a passion for technology and a strong background in programming languages and technologies.</div>
        <div>Passionate about creating innovative solutions and learning new technologies</div>
        
        <div>Strong background in modern technologies and frameworks</div>
      </div>
    </div>
  ),
  resume: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">📝 Resume</div>
  
      <div className="ml-2">
        <a
          href="https://drive.google.com/file/d/1O6DbFCLSpnQYM3t8mRsfmPMZWEhrQgux/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300 cursor-pointer"
        >
          view resume
        </a>
      </div>
  
      <div className="ml-2 mt-2">
        <a
          href="https://drive.google.com/uc?export=download&id=1O6DbFCLSpnQYM3t8mRsfmPMZWEhrQgux"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300 cursor-pointer"
        >
          ⬇️ Download Resume
        </a>
      </div>
    </div>
  ),
  
  projects: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">🚀 Projects:</div>
      <div className="ml-4 space-y-4">
        <div>
          <div className="text-white font-bold">1. Cricsphere : Turf & Tournament Management System</div>
          <div className="ml-2">A Full Stack Application for managing turf and tournaments. </div>
          <div className="ml-2 text-cyan-400">
            Technologies: React, JavaScript, Tailwind CSS, HTML5,MongoDB, MySQL, Vercel, Git, GitHub Actions
          </div>
          <div className="ml-2">
            Link: <a href="https://afyamavuno.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 cursor-pointer">https://afyamavuno.vercel.app</a>
          </div>
        </div>
        <div>
          <div className="text-white font-bold">2. Non-Ischemic Heart Disease Classification in Younger Adults</div>
          <div className="ml-2">Machine learning model for classifying non-ischemic heart diseases in younger adults using PTB-XL metadata.</div>
          <div className="ml-2 text-cyan-400">
            Technologies: Python, Flask
          </div>
          <div className="ml-2">
            Link: <a href="https://masomo-net.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 cursor-pointer">https://masomo-net.vercel.app/</a>
          </div>
        </div>
        <div>
          <div className="text-white font-bold">3. EmoScan: Real-Time sentiment analysis tool</div>
          <div className="ml-2">A Real-Time sentiment analysis tool for analyzing the sentiment of text in real-time.</div>
          <div className="ml-2 text-cyan-400">
            Technologies: Python, Pandas, NumPy, Scikit-Learn
          </div>
          <div className="ml-2">
            Link: <a href="https://masomo-net.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 cursor-pointer">https://masomo-net.vercel.app/</a>
          </div>
        </div>
        <div>
          <div className="text-white font-bold">4. SmartPark : Parking Management System</div>
          <div className="ml-2">A Parking Management System for managing parking lots and vehicles.</div>
          <div className="ml-2 text-cyan-400">Technologies: React, JavaScript, Tailwind CSS, HTML5,Firebase, Firebase Firestore</div>
          <div className="ml-2">
            Link: <a href="https://parking-slot-allocation-a41a1.web.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 cursor-pointer">https://parking-slot-allocation-a41a1.web.app</a>
          </div>
        </div>
       
      </div>
    </div>
  ),
  skills: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">💻 Technical Skills:</div>
      <div className="ml-4 space-y-3">
        
        <div>
          <div className="text-white font-bold">Programming Languages:</div>
          <div className="ml-2"> Java,Python,R</div>
        </div>
        <div>
          <div className="text-white font-bold">Databases:</div>
          <div className="ml-2">MYSQL Oracle PL/SQL, MongoDB,  Firebase,</div>
        </div>
        <div>
          <div className="text-white font-bold">Frontend:</div>
          <div className="ml-2">React, JavaScript, Tailwind CSS, HTML5,</div>
        </div>
        <div>
          <div className="text-white font-bold">Cloud & DevOps:</div>
          <div className="ml-2">AWS, Vercel,  Git, GitHub Actions</div>
        </div>
        <div>
          <div className="text-white font-bold">AI/ML:</div>
          <div className="ml-2"> OpenAI API, Machine Learning, Computer Vision</div>
        </div>
      </div>
    </div>
  ),
  experience: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">💼 Work Experience:</div>
      <div className="ml-4 space-y-4">
        <div>
          <div className="text-white font-bold">Senior Software Engineer - Tech Startup (2022-Present)</div>
          <div className="ml-2">• Led development of multiple full-stack applications</div>
          <div className="ml-2">• Implemented AI-powered features using OpenAI API</div>
          <div className="ml-2">• Managed cloud infrastructure on AWS and Azure</div>
        </div>
        <div>
          <div className="text-white font-bold">Full Stack Developer - Freelance (2020-2022)</div>
          <div className="ml-2">• Developed custom web applications for various clients</div>
          <div className="ml-2">• Specialized in React/Next.js and Node.js development</div>
          <div className="ml-2">• Integrated payment systems and third-party APIs</div>
        </div>
      </div>
    </div>
  ),
  contact: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">📧 Contact Information:</div>
      <div className="ml-4 space-y-2">
        <div>
          Email: <a href="mailto:radhakrishnamaradana22@gmail.com" className="text-blue-400 hover:text-blue-300 cursor-pointer underline">radhakrishnamaradana22@gmail.com</a>
        </div>
        <div>
          LinkedIn: <a href="https://linkedin.com/in/radhakrishnamaradana/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 cursor-pointer">linkedin.com/in/radhakrishnamaradana/</a>
        </div>
        <div>
          GitHub: <a href="https://github.com/radhakrishnachinna" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 cursor-pointer">github.com/radhakrishnachinna</a>
        </div>
        <div>
          Phone: <span className="text-blue-400">+91 9381823801</span>
        </div>
        <div>
          Location: <span className="text-blue-400">Hyderabad, India</span>
        </div>
      </div>
    </div>
  ),
  education: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">🎓 Education:</div>
      <div className="ml-4 space-y-3">
        <div>
          <div className="text-white font-bold">Bachelor of Science in Computer Science</div>
          <div className="ml-2">Malla Reddy University  - 2022-2026</div>
          <div className="ml-2">CGPA: 9.02</div>
        </div>
        <div>
          <div className="text-white font-bold">Intermediate in MPC</div>
          <div className="ml-2">Narayana Jr College  - 2020-2022</div>
          <div className="ml-2">CGPA: 9.52</div>
        </div>
        <div>
          <div className="text-white font-bold">Secondary School:</div>
          <div className="ml-2">Narayana Techo School  - 2020</div>
          <div className="ml-2">CGPA: 10.00</div>
        </div>
        <div>
          <div className="text-white font-bold"></div>
          <div className="ml-2">Data Structures & Algorithms, Software Engineering, Database Systems, AI/ML</div>
        </div>
      </div>
    </div>
  ),
  certifications: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">🏆 Certifications:</div>
      <div className="ml-4 space-y-2">
        <div>• Basic Python Programming - Coursera</div>
        <div>• Programming Fundamentals - Coursera</div>
        <div>• AWS - Forage</div>
        <div>• Power BI - SkillUp</div>
        
      </div>
    </div>
  ),
  leadership: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">👥 Leadership Experience:</div>
      <div className="ml-4 space-y-3">
        <div>
          <div className="text-white font-bold">Tech Lead - Current Team (2023-Present)</div>
          <div className="ml-2">• Leading a team of 5 developers</div>
          <div className="ml-2">• Mentoring junior developers</div>
          <div className="ml-2">• Architecture decisions and code reviews</div>
        </div>
        <div>
          <div className="text-white font-bold">Open Source Contributor</div>
          <div className="ml-2">• Active contributor to various open source projects</div>
          <div className="ml-2">• Maintained several npm packages</div>
        </div>
      </div>
    </div>
  ),
  sudo: () => (
    <div className="text-red-400">
      <div>sudo: access granted</div>
      <div className="text-green-400 mt-2">🔓 Admin privileges activated!</div>
      <div className="text-yellow-400">You now have full access to all portfolio data.</div>
      <div className="text-cyan-400 mt-2">
        Secret: I'm always learning new technologies and love solving complex problems! 🚀
      </div>
    </div>
  ),
  sound: () => (
    <div className="text-green-400">
      <div className="text-yellow-400 mb-2">🔊 Sound Settings:</div>
      <div className="ml-4">
        <div>Use the sound toggle button in the header to enable/disable typing sound effects.</div>
        <div className="mt-2">Sound effects include:</div>
        <div className="ml-2">• Typing sounds for each word</div>
        <div className="ml-2">• Line completion chimes</div>
        <div className="ml-2">• Command execution sounds</div>
      </div>
    </div>
  ),
  clear: () => null,
  welcome: () => (
    <div className="text-green-400">
      <div>Welcome to  Maradana Radhakrishna's Portfolio Terminal</div>
      <div>Type 'help' to see available commands</div>
      <div className="mt-2">
        <span className="text-blue-400">help</span> | <span className="text-blue-400">about</span> |{" "}
        <span className="text-blue-400">projects</span> | <span className="text-blue-400">skills</span> |{" "}
        <span className="text-blue-400">experience</span> | <span className="text-blue-400">contact</span> |{" "}
        <span className="text-blue-400">education</span> | <span className="text-blue-400">certifications</span> |{" "}
        <span className="text-blue-400">leadership</span> | <span className="text-blue-400">sudo</span> |{" "}
        <span className="text-blue-400">welcome</span> | <span className="text-blue-400">clear</span>
      </div>
    </div>
  ),
}

export default function TerminalPortfolio() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([
    {
      command: "welcome",
      output: commands.welcome(),
    },
  ])
  const [currentPath] = useState("radhakrishna@portfolio:~$")
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const idCardRef = useRef<{ flip: () => void }>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typingIndex, setTypingIndex] = useState(-1)
  const [isExecutingCommand, setIsExecutingCommand] = useState(false)
  const [soundMode, setSoundMode] = useState<"normal" | "smooth">("smooth")
  const [currentTime, setCurrentTime] = useState("")

  const { playCommandSound } = useTypingSounds()

  // Focus input after typing animation completes
  const handleTypingComplete = () => {
    setIsExecutingCommand(false)
    // Small delay to ensure the animation is fully complete
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  // Add sound mode toggle to commands
  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    // Play command sound
    playCommandSound()

    if (trimmedCmd === "flip") {
      // Trigger card flip
      const cardElement = document.querySelector(".card-container") as HTMLElement
      if (cardElement) {
        cardElement.click()
      }
      const output = (
        <div className="text-green-400">
          <div>🔄 ID Card flipped!</div>
          <div className="text-gray-400 text-sm mt-1">Check out the other side of the card</div>
        </div>
      )
      const newCommand = { command: cmd, output }
      setHistory((prev) => [...prev, newCommand])
      setIsExecutingCommand(true)
      return
    }

    if (trimmedCmd === "smooth") {
      setSoundMode("smooth")
      const output = (
        <div className="text-green-400">
          <div>🌊 Switched to smooth typing sounds</div>
          <div className="text-gray-400 text-sm mt-1">Typing sounds are now soft and flowing</div>
        </div>
      )
      const newCommand = { command: cmd, output }
      setHistory((prev) => [...prev, newCommand])
      setIsExecutingCommand(true)
      return
    }

    if (trimmedCmd === "click") {
      setSoundMode("normal")
      const output = (
        <div className="text-green-400">
          <div>⚡ Switched to click typing sounds</div>
          <div className="text-gray-400 text-sm mt-1">Typing sounds are now crisp and sharp</div>
        </div>
      )
      const newCommand = { command: cmd, output }
      setHistory((prev) => [...prev, newCommand])
      setIsExecutingCommand(true)
      return
    }

    if (trimmedCmd === "clear") {
      setHistory([
        {
          command: "welcome",
          output: commands.welcome(),
        },
      ])
      return
    }

    if (trimmedCmd === "welcome") {
      setHistory([
        {
          command: "welcome",
          output: commands.welcome(),
        },
      ])
      return
    }

    const output = commands[trimmedCmd as keyof typeof commands]?.() || (
      <div className="text-red-400">Command not found: {cmd}. Type 'help' for available commands.</div>
    )

    const newCommand = { command: cmd, output }
    setHistory((prev) => [...prev, newCommand])
    setIsTyping(true)
    setTypingIndex(history.length)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isExecutingCommand) {
      setIsExecutingCommand(true)
      handleCommand(input)
      setInput("")
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    if (inputRef.current && !isExecutingCommand) {
      inputRef.current.focus()
    }
  }, [isExecutingCommand])

  // Set current time only on client side to avoid hydration error
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString())
    }
    updateTime() // Set initial time
    const interval = setInterval(updateTime, 1000) // Update every second
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="bg-gray-900 text-green-400 p-2 border-b border-green-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-sm">Radhakrishna - Software Engineer</span>
          </div>
          <SoundToggle />
        </div>
      </div>

      <div className="flex h-[calc(100vh-40px)]">
        {/* Left Panel - ID Card */}
        <div className="w-80 bg-gray-900 p-6 flex flex-col items-center justify-center">
          <IDCard />
        </div>

        {/* Right Panel - Terminal */}
        <div className="flex-1 flex flex-col border-l border-gray-700">
          <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto space-y-2">
            {history.map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">{currentPath}</span>
                  <span className="text-white">{item.command}</span>
                </div>
                <div className="mt-1 mb-4">
                  {index === history.length - 1 && isExecutingCommand ? (
                    <AnimatedOutput
                      wordSpeed={80}
                      lineDelay={300}
                      soundMode={soundMode}
                      onComplete={handleTypingComplete}
                    >
                      {item.output}
                    </AnimatedOutput>
                  ) : (
                    item.output
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-green-400 p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-blue-400">{currentPath}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-green-400 outline-none disabled:opacity-50"
                placeholder={isExecutingCommand ? "Executing command..." : "Type a command..."}
                autoComplete="off"
                disabled={isExecutingCommand}
              />
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-900 p-2 text-xs text-gray-500 text-right">{currentTime || "Loading..."}</div>
        </div>
      </div>

      <style jsx>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
        }
      `}</style>
    </div>
  )
}
