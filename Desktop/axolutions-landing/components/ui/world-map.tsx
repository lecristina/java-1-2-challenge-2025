"use client"

import { useRef, useEffect, useState } from "react"
import DottedMap from "dotted-map"
import Image from "next/image"

interface MapProps {
  lineColor?: string
}

export function WorldMap({ lineColor = "#9200cf" }: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [mapSvg, setMapSvg] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Coordenadas EXATAS de pontos que existem no mapa pontilhado
  const connectionPoints = [
    { name: "Brasil", x: 304, y: 276 }, // Brasil
    { name: "EUA", x: 203, y: 150 }, // EUA
    { name: "Reino Unido", x: 408, y: 125 }, // Reino Unido
    { name: "França", x: 425, y: 140 }, // França
    { name: "Japão", x: 705, y: 160 }, // Japão
    { name: "Austrália", x: 715, y: 300 }, // Austrália
    { name: "Índia", x: 580, y: 195 }, // Índia
    { name: "África do Sul", x: 465, y: 310 }, // África do Sul
  ]

  // Definir as conexões entre os pontos
  const mapConnections = [
    { from: "Brasil", to: "EUA" },
    { from: "Brasil", to: "Reino Unido" },
    { from: "Brasil", to: "França" },
    { from: "Brasil", to: "Japão" },
    { from: "Brasil", to: "Austrália" },
    { from: "Brasil", to: "Índia" },
    { from: "Brasil", to: "África do Sul" },
  ]

  // Gerar o SVG do mapa apenas uma vez após a montagem do componente
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)

      // Criar o mapa pontilhado base
      const map = new DottedMap({ height: 100, grid: "diagonal" })

      // Gerar o SVG do mapa base
      const svg = map.getSVG({
        radius: 0.22,
        color: "#FFFFFF40",
        shape: "circle",
        backgroundColor: "black",
      })

      setMapSvg(svg)
    }
  }, [isMounted])

  // Renderização condicional para evitar problemas de hidratação
  if (!mapSvg) {
    return (
      <div className="w-full aspect-[2/1] bg-black rounded-lg flex items-center justify-center">
        <div className="text-white/50">Carregando mapa...</div>
      </div>
    )
  }

  return (
    <div className="w-full aspect-[2/1] bg-black rounded-lg relative font-sans">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(mapSvg)}`}
        className="h-full w-full pointer-events-none select-none"
        alt="world map"
        height={495}
        width={1056}
        draggable={false}
        loading="lazy"
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {/* Desenhar as linhas primeiro (para ficarem atrás dos pontos) */}
        {mapConnections.map((connection, i) => {
          const fromPoint = connectionPoints.find((p) => p.name === connection.from)
          const toPoint = connectionPoints.find((p) => p.name === connection.to)

          if (!fromPoint || !toPoint) return null

          // Criar uma curva suave entre os pontos
          const midX = (fromPoint.x + toPoint.x) / 2
          const midY = Math.min(fromPoint.y, toPoint.y) - 30
          const path = `M ${fromPoint.x} ${fromPoint.y} Q ${midX} ${midY} ${toPoint.x} ${toPoint.y}`

          return <path key={`path-${i}`} d={path} fill="none" stroke={lineColor} strokeWidth="1.5" />
        })}

        {/* Desenhar os pontos por cima das linhas */}
        {connectionPoints.map((point, i) => {
          return <circle key={`point-${i}`} cx={point.x} cy={point.y} r="4" fill={lineColor} />
        })}
      </svg>
    </div>
  )
}
