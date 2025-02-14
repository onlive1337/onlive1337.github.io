"use client"
import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import type { AnalyticsData } from '@/types/analytics';

export function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function updateAnalytics() {
      try {
        await fetch('https://portfolio-api-taupe-theta.vercel.app/api/analytics', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const response = await fetch('https://portfolio-api-taupe-theta.vercel.app/api/analytics');
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
        <div className="rounded-xl border border-gray-800 bg-black overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Terminal</span>
            </div>
            <span className="text-xs text-gray-500">stats</span>
          </div>
          <div className="p-4 font-mono text-sm animate-pulse">
            <div className="h-4 bg-gray-800 rounded w-1/4 mb-2" />
            <div className="h-4 bg-gray-800 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="rounded-xl border border-gray-800 bg-black overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900/50 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Terminal</span>
          </div>
          <span className="text-xs text-gray-500">stats</span>
        </div>
        <div className="p-4 font-mono text-sm">
          <div className="space-y-2">
            <div className="flex items-center text-gray-400">
              <span className="text-green-500">$</span>
              <span className="ml-2">stats --get-analytics</span>
            </div>
            <div className="pl-4 space-y-1">
              <p>
                <span className="text-blue-500 dark:text-blue-400">total_views:</span> 
                <span className="ml-2 text-gray-300">{data?.views?.toLocaleString() ?? 0}</span>
              </p>
              <p>
                <span className="text-green-500 dark:text-green-400">unique_visitors:</span> 
                <span className="ml-2 text-gray-300">{data?.unique_visitors?.toLocaleString() ?? 0}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}