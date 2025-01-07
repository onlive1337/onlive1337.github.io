"use client"
import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo } from 'react';

const createPoints = (isMobile: boolean) => {
  const count = isMobile ? 50 : 150;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 0.3 + 0.6,
    duration: Math.random() * 15 + 25,
    delay: Math.random() * -30
  }));
};

export function Background() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
 
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());
    
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(checkMobile());
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const points = useMemo(() => createPoints(isMobile), [isMobile]);

  if (!mounted) return null;

  return (
    <>
      <div className="fixed inset-0 -z-10 min-h-screen w-full">
        <div 
          className={`fixed inset-0 min-h-screen w-full contain-paint ${
            theme === 'dark' ? 'bg-black' : 'bg-white'
          }`} 
        />
      </div>

      <div className="fixed inset-0 z-40 overflow-hidden pointer-events-none contain-paint">
        {points.map(({ id, left, top, size, duration, delay }) => (
          <div 
            key={id}
            className={`fixed will-change-transform ${
              theme === 'dark' ? 'text-white/30' : 'text-blue-500/20'
            }`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              fontSize: `${size}em`,
              transform: 'translate3d(0,0,0)',
              animation: `fall ${duration}s linear ${delay}s infinite`
            }}
          >
            •
          </div>
        ))}
      </div>

      <div 
        className="fixed bottom-4 right-4 px-3 py-1.5 rounded-lg backdrop-blur-sm
                   text-gray-900 dark:text-white font-medium text-sm z-[100] cursor-help
                   bg-white/10 dark:bg-black/10 opacity-50 hover:opacity-100 
                   transition-opacity contain-paint"
        title="2025?"
      >
        Soon... 💍
      </div>
    </>
  );
}