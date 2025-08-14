"use client"

import { lazy, useState } from "react"
const Spline = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: () => void
}

export function SplineScene({ scene, className = "", onLoad }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#9200cf"
                strokeWidth="8"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset="251.2"
                className="animate-[dash_1.5s_ease-in-out_infinite]"
              />
            </svg>
          </div>
        </div>
      )}
      <Spline
        scene={scene}
        className={className}
        onLoad={() => {
          setIsLoading(false)
          if (onLoad) onLoad()
        }}
      />
    </>
  )
}
