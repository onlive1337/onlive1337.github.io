"use client"
import { memo } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Star, BookOpen, ArrowUpRight } from "lucide-react";
import { fetchFromAPIWithMeta } from "@/utils/api";
import { GithubRepo } from "@/types";
import { Ripple } from "@/components/ui/Ripple";

const fetchRepos = (endpoint: string) => fetchFromAPIWithMeta<GithubRepo[]>(endpoint);

export const Portfolio = memo(function Portfolio() {
  const { data, error: swrError, isLoading } = useSWR('github', fetchRepos, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    errorRetryCount: 2,
  });

  const repos = data?.data ?? [];
  const error = Boolean(swrError || data?.error || (!isLoading && !data?.data));

  return (
    <section id="portfolio" className="py-12 scroll-mt-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="mb-8 text-center type-headline text-md-on-background">
          Portfolio
        </h2>
        
        {isLoading ? (
          <div className="flex flex-col gap-1">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="m3-segmented-item bg-md-surface-container p-6"
              >
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-md-surface-container-highest rounded-full w-1/3" />
                  <div className="h-4 bg-md-surface-container-highest rounded-full w-full" />
                  <div className="h-4 bg-md-surface-container-highest rounded-full w-3/4" />
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 w-16 bg-md-surface-container-highest rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-m3-xl bg-md-surface-container p-8 text-center">
            <p className="text-md-on-surface-variant font-medium">
              Unable to load repositories data at this time.
            </p>
          </div>
        ) : repos.length === 0 ? (
          <div className="rounded-m3-xl bg-md-surface-container p-8 text-center">
            <p className="text-md-on-surface-variant font-medium">No repositories available</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {repos.map((repo) => (
              <Link
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group m3-segmented-item bg-md-surface-container hover:bg-md-surface-container-high p-5 sm:p-6 relative overflow-hidden select-none flex flex-col justify-between"
              >
                <Ripple />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] group-hover:rounded-m3-lg bg-md-primary-container text-md-on-primary-container group-hover:bg-md-primary group-hover:text-md-on-primary shape-morph">
                      <BookOpen className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg type-title text-md-on-surface group-hover:text-md-primary truncate">
                        {repo.name}
                      </h3>
                      {repo.description && (
                        <p className="mt-1 text-sm leading-relaxed text-md-on-surface-variant">
                          {repo.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-md-tertiary-container text-md-on-tertiary-container">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-[18px] group-hover:rounded-xl bg-md-surface-container-highest text-md-on-surface-variant group-hover:bg-md-secondary-container group-hover:text-md-on-secondary-container shape-morph">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    </span>
                  </div>
                </div>

                {(repo.language || repo.topics.length > 0) && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 pl-0 sm:pl-14">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-md-secondary-container text-md-on-secondary-container px-3 py-1 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-md-secondary" />
                        {repo.language}
                      </span>
                    )}
                    {repo.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-lg group-hover:rounded-[14px] px-2.5 py-1 text-xs font-semibold bg-md-surface-container-highest text-md-on-surface-variant select-none shape-morph"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});
