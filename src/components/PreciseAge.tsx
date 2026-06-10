import { memo, useEffect, useState, useCallback, useRef } from 'react';

const BIRTH_DATE = new Date('2007-06-30').getTime();
const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

export const PreciseAge = memo(function PreciseAge() {
 const [age, setAge] = useState(() => {
   const diff = (Date.now() - BIRTH_DATE) / MS_PER_YEAR;
   return diff.toFixed(7);
 });
 const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

 const calculateAge = useCallback(() => {
   const diff = (Date.now() - BIRTH_DATE) / MS_PER_YEAR;
   setAge(diff.toFixed(7));
 }, []);

 useEffect(() => {
   intervalRef.current = setInterval(calculateAge, 250);
   return () => {
     if (intervalRef.current) {
       clearInterval(intervalRef.current);
     }
   };
 }, [calculateAge]);

 return (
   <span
     suppressHydrationWarning
     className="font-mono bg-linear-to-r from-md-primary to-md-tertiary text-transparent bg-clip-text font-semibold"
   >
     {age}
   </span>
 );
});