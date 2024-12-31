"use client"
import { useEffect, useState } from 'react';
import type { AnalyticsData } from '@/types/analytics';
import { Terminal } from 'lucide-react';

const API_URL = 'https://portfolio-api-taupe-theta.vercel.app/api';

export function Analytics() {
 const [data, setData] = useState<AnalyticsData | null>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   async function updateAnalytics() {
     try {
       await fetch(`${API_URL}/analytics`, { 
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         }
       });
       const response = await fetch(`${API_URL}/analytics`);
       const analyticsData = await response.json();
       setData(analyticsData);
     } catch (error) {
       console.error('Failed to fetch analytics:', error);
     } finally {
       setLoading(false);
     }
   }

   updateAnalytics();
 }, []);

 if (loading) {
   return (
     <div className="container mx-auto px-4 pb-8">
       <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md">
         <div className="animate-pulse flex items-start gap-4">
           <Terminal className="h-5 w-5 mt-1 text-gray-400" />
           <div className="space-y-2 flex-1">
             <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
             <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
             <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
           </div>
         </div>
       </div>
     </div>
   );
 }

 return (
   <div className="container mx-auto px-4 pb-8">
     <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-black/30 backdrop-blur-md">
       <div className="flex items-start gap-4">
         <Terminal className="h-5 w-5 mt-1 text-gray-400" />
         <div className="space-y-2 font-mono text-sm">
           <p className="text-gray-500 dark:text-gray-400">
             $ stats --get-analytics
           </p>
           <div className="pl-4 space-y-1">
             <p>
               <span className="text-blue-500 dark:text-blue-400">total_views:</span> 
               <span className="ml-2 text-gray-700 dark:text-gray-300">{data?.views?.toLocaleString() ?? 0}</span>
             </p>
             <p>
               <span className="text-green-500 dark:text-green-400">unique_visitors:</span> 
               <span className="ml-2 text-gray-700 dark:text-gray-300">{data?.unique_visitors?.toLocaleString() ?? 0}</span>
             </p>
             <p>
               <span className="text-purple-500 dark:text-purple-400">last_visit:</span> 
               <span className="ml-2 text-gray-700 dark:text-gray-300">
                 {data?.last_visited ? new Date(data.last_visited).toLocaleString('en-US', {
                   year: 'numeric',
                   month: 'short',
                   day: 'numeric',
                   hour: '2-digit',
                   minute: '2-digit',
                   timeZone: 'Asia/Tashkent'
                 }) : 'N/A'}
               </span>
             </p>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}