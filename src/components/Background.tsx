"use client"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const createPoints = (count: number) => {
 return Array.from({ length: count }, () => ({
   left: Math.random() * 100,
   top: Math.random() * 100,
   size: Math.random() * 0.5 + 0.8,
   duration: Math.random() * 15 + 25,
   delay: Math.random() * -30
 }));
};

export function Background() {
 const { theme } = useTheme();
 const [mounted, setMounted] = useState(false);

 useEffect(() => setMounted(true), []);
 if (!mounted) return null;

 const points = createPoints(300);

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
             animationDuration: `${point.duration}s`
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