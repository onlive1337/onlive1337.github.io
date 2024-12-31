"use client"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const createPoints = (isMobile: boolean) => {
  const count = isMobile ? 100 : 300;
  
  return Array.from({ length: count }, () => ({
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
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  const points = createPoints(isMobile);
 
  return (
    <>
      <div className="fixed inset-0 -z-10 min-h-screen w-full">
        <div className={`fixed inset-0 min-h-screen w-full ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} />
      </div>

      <div className="fixed inset-0 z-40 overflow-hidden pointer-events-none">
        {points.map((point, i) => (
          <div 
            key={i} 
            className={`falling-light ${theme === 'dark' ? 'light-dark' : 'light-light'}`}
            style={{
              left: `${point.left}%`,
              top: `${point.top}%`,
              fontSize: `${point.size}em`,
              animationDelay: `${point.delay}s`,
              animationDuration: `${point.duration}s`,
              transform: 'translate3d(0,0,0)',
              willChange: 'transform'
            }}
          >
            •
          </div>
        ))}
      </div>

      <div 
        className="fixed bottom-4 right-4 opacity-30 hover:opacity-100 transition-opacity cursor-help text-sm z-[100]"
        title="2025?"
      >
        Soon... 💍
      </div>
    </>
  );
}