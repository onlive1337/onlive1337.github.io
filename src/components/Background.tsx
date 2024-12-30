"use client"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Background() {
 const { theme } = useTheme();
 const [mounted, setMounted] = useState(false);
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
   setMounted(true);
   const checkMobile = () => {
     setIsMobile(window.innerWidth < 768);
   };
   checkMobile();
   const handler = () => {
     const newIsMobile = window.innerWidth < 768;
     if (newIsMobile !== isMobile) {
       setIsMobile(newIsMobile);
     }
   };
   window.addEventListener('resize', handler);
   return () => window.removeEventListener('resize', handler);
 }, [isMobile]);

 if (!mounted) return null;

 return (
   <>
     <div className="fixed inset-0 -z-10">
       <div 
         className={`absolute inset-0 ${
           theme === 'dark' ? 'bg-gradient-dark' : 'bg-gradient-light'
         } ${isMobile ? 'no-animation' : ''}`}
         style={{ transform: 'translateZ(0)' }}
       />
     </div>
 
     {!isMobile && (
       <>
         <div className="snowflakes" aria-hidden="true">
           {[...Array(6)].map((_, i) => (
             <div 
               key={i} 
               className={`snowflake ${theme === 'dark' ? 'snowflake-dark' : 'snowflake-light'}`}
               style={{
                 transform: 'translateZ(0)',
                 animationDelay: `${i * 0.5}s`,
                 left: `${(i + 1) * 15}%`
               }}
             >
               ❄
             </div>
           ))}
         </div>
         <svg className="fixed opacity-[2] w-4 h-4 bottom-4 right-4" viewBox="0 0 24 24">
           <title>Soon... 💍 2025</title>
           <path
             fill="currentColor"
             d="M12,1.5A10.5,10.5,0,1,0,22.5,12,10.5,10.5,0,0,0,12,1.5Zm0,19A8.5,8.5,0,1,1,20.5,12,8.51,8.51,0,0,1,12,20.5Z"
           />
         </svg>
       </>
     )}
   </>
 );
}