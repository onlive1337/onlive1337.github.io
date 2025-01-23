import { memo, useEffect, useState } from 'react';

export const PreciseAge = memo(function PreciseAge() {
 const [age, setAge] = useState('');

 useEffect(() => {
   const calculateAge = () => {
     const birthDate = new Date('2007-06-30');
     const now = new Date();
     const diff = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
     setAge(diff.toFixed(7));
   };

   calculateAge();
   const interval = setInterval(calculateAge, 100);

   return () => clearInterval(interval);
 }, []);

 return (
   <span className="font-mono bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
     {age}
   </span>
 );
});