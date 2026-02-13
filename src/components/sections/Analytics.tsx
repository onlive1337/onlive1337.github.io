"use client"
import { useEffect, useState, useCallback, memo } from 'react';
import { Terminal, Loader2 } from 'lucide-react';
import { fetchFromAPI, API_BASE_URL } from '@/utils/api';
import type { AnalyticsData } from '@/types/analytics';

export const Analytics = memo(function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const updateAnalytics = useCallback(async () => {
    try {
      setError(false);
      
      await fetch(`${API_BASE_URL}/analytics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const analyticsData = await fetchFromAPI<AnalyticsData>('analytics');
      
      if (analyticsData) {
        setData(analyticsData);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void updateAnalytics();
  }, [updateAnalytics]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pb-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400 text-sm">Terminal</span>
            </div>
            <span className="text-xs text-gray-500">stats</span>
          </div>
          <div className="p-4 font-mono text-sm">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 text-gray-500 animate-spin" />
              <span className="text-gray-500">Loading statistics...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pb-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-500 dark:text-gray-400 text-sm">Terminal</span>
            </div>
            <span className="text-xs text-gray-500">stats</span>
          </div>
          <div className="p-4 font-mono text-sm">
            <div className="space-y-2">
              <p className="text-gray-500">Analytics data unavailable</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-500 dark:text-gray-400 text-sm">Terminal</span>
          </div>
          <span className="text-xs text-gray-500">stats</span>
        </div>
        <div className="p-4 font-mono text-sm">
          <div className="space-y-2">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <span className="text-green-600 dark:text-green-500">$</span>
              <span className="ml-2">stats --get-analytics</span>
            </div>
            <div className="pl-4 space-y-1">
              <p>
                <span className="text-blue-600 dark:text-blue-400">total_views:</span> 
                <span className="ml-2 text-gray-600 dark:text-gray-300">{data?.views?.toLocaleString() ?? 0}</span>
              </p>
              <p>
                <span className="text-green-600 dark:text-green-400">unique_visitors:</span> 
                <span className="ml-2 text-gray-600 dark:text-gray-300">{data?.unique_visitors?.toLocaleString() ?? 0}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
