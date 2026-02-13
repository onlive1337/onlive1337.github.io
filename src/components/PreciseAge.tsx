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
   <span className="font-mono bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
     {age}
   </span>
 );
});