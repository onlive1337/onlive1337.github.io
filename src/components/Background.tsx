"use client"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showSnowflakes, setShowSnowflakes] = useState(false);
 
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowSnowflakes(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;
 
  return (
    <>
      <div className="fixed inset-0 -z-10 min-h-screen w-full">
        <div className={`fixed inset-0 min-h-screen w-full ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} />
      </div>

      {showSnowflakes && (
        <div className="fixed inset-0 z-40 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className={`snowflake ${theme === 'dark' ? 'snowflake-dark' : 'snowflake-light'}`}
              style={{
                left: `${30 + i * 20}%`,
                animationDelay: `${i * 2}s`,
                top: '-10vh'
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}

      <div 
        className="fixed bottom-4 right-4 opacity-30 hover:opacity-100 transition-opacity cursor-help text-sm z-[100]"
        title="2025?"
      >
        Soon... 💍
      </div>
    </>
  );
}