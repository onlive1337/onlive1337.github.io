"use client"
import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { Star, BookOpen } from "lucide-react";
import { fetchFromAPI } from "@/utils/api";
import { GithubRepo } from "@/types";
import { Ripple } from "@/components/ui/Ripple";

export const Portfolio = memo(function Portfolio() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const fetchRepos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const data = await fetchFromAPI<GithubRepo[]>('github');
      if (data) {
        setRepos(data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Error fetching repositories:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchRepos();
  }, [fetchRepos]);

  return (
    <section id="portfolio" className="py-16 scroll-mt-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="mb-10 text-center type-headline text-md-on-background">
          Portfolio
        </h2>
        
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="rounded-m3-xl border border-md-outline-variant/30 bg-md-surface-container p-6 shadow-sm"
              >
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-md-surface-variant rounded-full w-1/4" />
                  <div className="h-4 bg-md-surface-variant rounded-full w-full" />
                  <div className="h-4 bg-md-surface-variant rounded-full w-3/4" />
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 w-16 bg-md-surface-variant rounded-full" />
                    ))}
                  </div>
                  <div className="h-4 bg-md-surface-variant rounded-full w-1/6 pt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-m3-xl border border-md-outline-variant/30 bg-md-surface-container p-8 shadow-sm text-center">
            <p className="text-md-on-surface-variant font-medium">
              Unable to load repositories data at this time.
            </p>
          </div>
        ) : repos.length === 0 ? (
          <div className="rounded-m3-xl border border-md-outline-variant/30 bg-md-surface-container p-8 shadow-sm text-center">
            <p className="text-md-on-surface-variant font-medium">No repositories available</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {repos.map((repo) => (
              <Link
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-m3-xl hover:rounded-m3-2xl border border-md-outline-variant/30 bg-md-surface-container p-6 shadow-sm hover:shadow-lg hover:scale-[1.01] shape-morph relative overflow-hidden select-none flex flex-col justify-between"
              >
                <Ripple />
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5 text-md-primary">
                    <BookOpen className="w-5 h-5" />
                    <h3 className="text-xl type-title text-md-on-surface group-hover:text-md-primary transition-colors duration-200">
                      {repo.name}
                    </h3>
                  </div>
                  {repo.description && (
                    <p className="mt-2 text-sm leading-relaxed text-md-on-surface-variant">
                      {repo.description}
                    </p>
                  )}
                </div>

                <div className="mt-5 mb-4 flex flex-wrap gap-2">
                  {repo.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-md-outline-variant/20 px-3 py-1 text-xs font-semibold bg-md-secondary-container/60 text-md-on-secondary-container select-none shadow-sm transition-transform duration-200 hover:scale-102"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5 text-xs font-semibold text-md-on-surface-variant pt-2 border-t border-md-outline-variant/10">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-md-primary" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                    {repo.stargazers_count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});
