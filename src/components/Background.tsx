"use client"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 backdrop-blur-xl ${
            theme === 'dark' ? 'bg-gradient-dark' : 'bg-gradient-light'
          }`}
        />
      </div>
  
      <div className="snowflakes" aria-hidden="true">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className={`snowflake ${theme === 'dark' ? 'snowflake-dark' : 'snowflake-light'}`}
          >
            ❄
          </div>
        ))}
      </div>
    </>
  );
}