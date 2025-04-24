"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchFromAPI } from "@/utils/api";
import { GithubRepo } from "@/types";

const getTopicColor = (topic: string) => {
  const colors: { [key: string]: string } = {
    typescript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    javascript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    python: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    react: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
    nextjs: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    tailwindcss: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
    node: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    express: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    mongodb: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    postgresql: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    redis: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    docker: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    git: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    vscode: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };
  
  return colors[topic.toLowerCase()] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
};

export function Portfolio() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  const fetchRepos = async () => {
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
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <section id="portfolio" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Portfolio
        </h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-black/40"
              >
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-4" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded" />
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/6" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-black/40 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Unable to load repositories data at this time.
            </p>
          </div>
        ) : repos.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-black/40 text-center">
            <p className="text-gray-600 dark:text-gray-400">No repositories available</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {repos.map((repo) => (
              <Link
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-black/40 dark:hover:bg-black/60"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-500 dark:text-white">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {repo.description}
                    </p>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {repo.topics.map((topic) => (
                    <span
                      key={topic}
                      className={`rounded px-2.5 py-0.5 text-xs font-medium ${getTopicColor(topic)}`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  {repo.language && <span>{repo.language}</span>}
                  <span>★ {repo.stargazers_count}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}