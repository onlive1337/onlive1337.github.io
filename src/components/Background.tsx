"use client"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 min-h-screen w-full">
      <div 
        className={`fixed inset-0 min-h-screen w-full contain-paint ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`} 
      />
      
      <div 
        className="fixed bottom-4 right-4 px-3 py-1.5 rounded-lg backdrop-blur-sm
                   text-gray-900 dark:text-white font-medium text-sm z-[100] cursor-help
                   bg-white/10 dark:bg-black/10 opacity-50 hover:opacity-100 
                   transition-opacity contain-paint"
        title="2025?"
      >
        Soon... 💍
      </div>
    </div>
  );
}