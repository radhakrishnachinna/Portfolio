"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function IDCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="flex flex-col items-center">
      {/* Chain connection point at top */}
      <div className="chain-top-section">
        <div className="chain-top-anchor"></div>
        <div className="chain-top-connector"></div>
      </div>
      <div className="swinging-card">
        <div className="card-container" onClick={handleFlip}>
          {/* Lanyard/Chain */}
          <div className="lanyard">
            <div className="chain-link"></div>
            <div className="chain-link"></div>
            <div className="chain-link"></div>
            <div className="chain-link"></div>
            <div className="chain-link"></div>
            <div className="chain-link"></div>
            <div className="chain-link"></div>
            <div className="chain-link"></div>
            <div className="chain-link"></div>
            <div className="chain-link"></div>
          </div>

          <div className={`card ${isFlipped ? "flipped" : ""}`}>
            {/* Front of the card */}
            <div className="card-front">
              <Card className="bg-gray-800 border-green-400 border-2 p-6 w-64 shadow-2xl cursor-pointer relative">
                {/* ID Card Tag/Hole */}
                <div className="card-tag">
                  <div className="tag-hole"></div>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-green-400">
                    <Image
                      src="/boys.gif"
                      alt="Radhakrishna"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-green-400 text-xl font-bold">Radhakrishna</h2>
                    <p className="text-gray-400 text-sm">CSE-DS</p>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Email: radhakrishnamaradana22@gmail.com</div>
                    <div>Location: Hyderabad, India</div>
                    <div>Phone: +91 9381823801</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Back of the card */}
            <div className="card-back">
              <Card className="bg-gray-800 border-green-400 border-2 p-6 w-64 shadow-2xl cursor-pointer relative">
                {/* ID Card Tag/Hole */}
                <div className="card-tag">
                  <div className="tag-hole"></div>
                </div>

                <div className="text-center space-y-3">
                  <div className="text-green-400 text-lg font-bold mb-4">Quick Stats</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">LeetCode:</span>
                      <span className="text-green-400">50+ Questions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Hackerrank:</span>
                      <span className="text-green-400">50+ Questions</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Certifications:</span>
                      <span className="text-green-400">5+</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-600">
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>🌟 Top Skills</div>
                      <div className="text-cyan-400">•Java • Python • MYSQL</div>
                      <div className="text-cyan-400"> • R • Power BI • AI/ML</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth separator line */}
      <div className="separator-line"></div>

      <div className="mt-4 text-center">
        <Button
          onClick={handleFlip}
          variant="ghost"
          size="sm"
          className="text-green-400 hover:text-green-300 hover:bg-gray-800 border border-green-400 mb-2"
        >
          🔄 Flip Card
        </Button>
        <div className="text-sm text-gray-500">[Interactive ID Card]</div>
      </div>

      <style jsx>{`
        .chain-top-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 0;
          position: relative;
          z-index: 15;
        }

        .chain-top-anchor {
          width: 14px;
          height: 14px;
          background: linear-gradient(135deg, #666, #999, #888, #999, #666);
          border: 2px solid #555;
          border-radius: 50%;
          box-shadow: 
            0 2px 4px rgba(0, 0, 0, 0.5),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
          position: relative;
        }

        .chain-top-anchor::after {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 5px;
          background: linear-gradient(90deg, transparent, #666, #999, #888, #999, #666, transparent);
          border-radius: 3px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .chain-top-connector {
          width: 4px;
          height: 6px;
          background: linear-gradient(180deg, #999, #666);
          margin-top: 1px;
          margin-bottom: 2px;
          border-radius: 0 0 2px 2px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .swinging-card {
          animation: swing 3s ease-in-out infinite;
          transform-origin: top center;
          margin-top: -2px;
        }

        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-3deg); }
        }

        .swinging-card:hover {
          animation-duration: 1s;
        }

        .card-container {
          perspective: 1000px;
          width: 256px;
          height: 320px;
          position: relative;
        }

        .lanyard {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .chain-link {
          width: 4px;
          height: 10px;
          background: linear-gradient(180deg, #999 0%, #666 50%, #999 100%);
          border-radius: 2px;
          box-shadow: 
            0 1px 2px rgba(0, 0, 0, 0.4),
            inset 0 0 1px rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
        }

        .card {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card.flipped {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 8px;
        }

        .card-back {
          transform: rotateY(180deg);
        }

        .card-tag {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 16px;
          background: #374151;
          border-radius: 4px 4px 0 0;
          border: 1px solid #22c55e;
          z-index: 5;
        }

        .tag-hole {
          position: absolute;
          top: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background: #000;
          border-radius: 50%;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .separator-line {
          width: 200px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(34, 197, 94, 0.2) 10%,
            rgba(34, 197, 94, 0.6) 50%,
            rgba(34, 197, 94, 0.2) 90%,
            transparent 100%
          );
          margin: 20px 0 10px 0;
          position: relative;
        }

        .separator-line::before {
          content: '';
          position: absolute;
          top: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
        }

        .separator-line::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(34, 197, 94, 0.1) 20%,
            rgba(34, 197, 94, 0.3) 50%,
            rgba(34, 197, 94, 0.1) 80%,
            transparent 100%
          );
          animation: pulse-line 2s ease-in-out infinite;
        }

        @keyframes pulse-line {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
