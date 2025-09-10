'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ComicPanelProps {
  src: string
  alt: string
  width: number
  height: number
  history: string
}

const PANEL_WIDTH = 800

export default function ComicPanel({ src, alt, width, height, history }: ComicPanelProps) {
  const [flipped, setFlipped] = useState(false)
  const panelHeight = Math.round((height / width) * PANEL_WIDTH)

  return (
    <div
      className="cursor-pointer [perspective:1000px] inline-block m-4"
      style={{ width: PANEL_WIDTH, height: panelHeight, boxSizing: 'border-box' }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div
          className="[backface-visibility:hidden] absolute inset-0 w-full h-full"
          style={{ width: PANEL_WIDTH, height: panelHeight, boxSizing: 'border-box' }}
        >
          <Image
            src={src}
            alt={alt}
            width={PANEL_WIDTH}
            height={panelHeight}
            className="w-full h-full object-contain"
          />
        </div>
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-100 p-4 text-center text-black overflow-auto [transform:rotateY(180deg)] [backface-visibility:hidden]"
          style={{ width: PANEL_WIDTH, height: panelHeight, boxSizing: 'border-box' }}
        >
          <p className="font-comic m-0">{history}</p>
        </div>
      </div>
    </div>
  )
}
