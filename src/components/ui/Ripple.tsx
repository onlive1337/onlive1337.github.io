"use client";
import React, { useState, useEffect } from 'react';

interface RippleType {
  key: number;
  x: number;
  y: number;
  size: number;
}

export function Ripple() {
  const [ripples, setRipples] = useState<RippleType[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    
    // We want the ripple to cover the entire container.
    // The diameter of the ripple should be twice the diagonal length or just twice the max side.
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: RippleType = {
      key: Date.now() + Math.random(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  const cleanRipple = (key: number) => {
    setRipples((prev) => prev.filter((r) => r.key !== key));
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-auto cursor-pointer select-none"
      onMouseDown={addRipple}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className="absolute rounded-full bg-md-primary/20 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          onAnimationEnd={() => cleanRipple(ripple.key)}
        />
      ))}
    </div>
  );
}
