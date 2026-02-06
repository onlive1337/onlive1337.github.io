"use client"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 min-h-screen w-full">
      <div 
        className={`fixed inset-0 min-h-screen w-full contain-paint ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`} 
      />
    </div>
  );
}