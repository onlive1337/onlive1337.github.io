"use client"

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  const springConfig = { 
    damping: 35,
    stiffness: 300,
    mass: 1.2
  }
  
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY + window.scrollY)
    }

    const updatePointerStatus = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.closest('a,button,input') !== null ||
        getComputedStyle(target).cursor === 'pointer'
      setIsPointer(isClickable)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousemove', updatePointerStatus)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousemove', updatePointerStatus)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 mix-blend-difference">
      <motion.div
        style={{
          left: springX,
          top: springY,
        }}
        animate={{
          scale: isPointer ? (isClicking ? 1.5 : 2.5) : (isClicking ? 0.8 : 1),
        }}
        className="fixed h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        transition={{
          scale: {
            type: "spring",
            damping: 25,
            stiffness: 300
          }
        }}
      />
      
      <motion.div
        style={{
          left: springX,
          top: springY,
        }}
        animate={{
          scale: isPointer ? (isClicking ? 0.5 : 0) : (isClicking ? 1.2 : 1),
          opacity: isPointer ? 0 : 0.3
        }}
        className="fixed h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        transition={{
          scale: {
            type: "spring",
            damping: 25,
            stiffness: 300
          },
          opacity: {
            duration: 0.2
          }
        }}
      />
    </div>
  )
}