"use client"
import { useEffect, useState, useCallback, memo } from 'react';
import { Terminal, Loader2 } from 'lucide-react';
import { fetchFromAPI, API_BASE_URL } from '@/utils/api';
import type { AnalyticsData } from '@/types';

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

  const TerminalHeader = () => (
    <div className="flex items-center justify-between px-5 py-3 bg-md-surface-container-high border-b border-md-outline-variant/30 text-md-on-surface-variant select-none">
      <div className="flex items-center gap-2.5">
        <Terminal className="h-4 w-4 text-md-primary" />
        <span className="text-xs font-bold font-display uppercase tracking-wider">Terminal</span>
      </div>
      <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">stats.sh</span>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 pb-8 max-w-4xl">
        <div className="rounded-m3-xl border border-md-outline-variant/30 bg-md-surface-container overflow-hidden shadow-sm">
          <TerminalHeader />
          <div className="p-5 font-mono text-xs sm:text-sm select-none">
            <div className="flex items-center gap-2.5 text-md-on-surface-variant font-medium">
              <Loader2 className="h-4 w-4 text-md-primary animate-spin" />
              <span>Fetching remote statistics...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 pb-8 max-w-4xl">
        <div className="rounded-m3-xl border border-md-outline-variant/30 bg-md-surface-container overflow-hidden shadow-sm">
          <TerminalHeader />
          <div className="p-5 font-mono text-xs sm:text-sm select-none">
            <div className="text-md-error font-medium">
              <p>Error: Analytics service returned an invalid response.</p>
              <p className="opacity-70 mt-1">Please try refreshing the page.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8 max-w-4xl">
      <div className="rounded-m3-xl border border-md-outline-variant/30 bg-md-surface-container overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <TerminalHeader />
        <div className="p-5 font-mono text-xs sm:text-sm">
          <div className="space-y-3">
            <div className="flex items-center text-md-on-surface-variant font-semibold select-none">
              <span className="text-emerald-500 font-bold">$</span>
              <span className="ml-2">stats --get-analytics</span>
            </div>
            <div className="pl-4 space-y-1.5 font-medium border-l-2 border-md-outline-variant/20">
              <p>
                <span className="text-md-primary">total_views:</span> 
                <span className="ml-2 text-md-on-surface">{data?.views?.toLocaleString() ?? 0}</span>
              </p>
              <p>
                <span className="text-md-secondary">unique_visitors:</span> 
                <span className="ml-2 text-md-on-surface">{data?.unique_visitors?.toLocaleString() ?? 0}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
