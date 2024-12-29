"use client"
import { useState, useEffect } from "react";
import { GithubRepo } from "@/types";
import Link from "next/link";

interface GithubTopic {
 topic: {
   name: string;
 };
}

interface GithubRepoNode {
 name: string;
 description: string | null;
 url: string;
 stargazerCount: number;
 primaryLanguage: {
   name: string;
 } | null;
 repositoryTopics: {
   nodes: GithubTopic[];
 };
}

interface GithubApiResponse {
 data: {
   user: {
     pinnedItems: {
       nodes: GithubRepoNode[];
     };
   };
 };
}

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

const PINNED_REPOS_QUERY = `
 query {
   user(login: "onlive1337") {
     pinnedItems(first: 6, types: REPOSITORY) {
       nodes {
         ... on Repository {
           name
           description
           url
           stargazerCount
           primaryLanguage {
             name
           }
           repositoryTopics(first: 10) {
             nodes {
               topic {
                 name
               }
             }
           }
         }
       }
     }
   }
 }
`;

export function Portfolio() {
 const [repos, setRepos] = useState<GithubRepo[]>([]);

 useEffect(() => {
   async function fetchPinnedRepos() {
     try {
       const res = await fetch('https://api.github.com/graphql', {
         method: 'POST',
         headers: {
           'Authorization': `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ query: PINNED_REPOS_QUERY }),
       });
       
       const response = (await res.json()) as GithubApiResponse;
       const pinnedRepos = response.data.user.pinnedItems.nodes.map((node: GithubRepoNode) => ({
         name: node.name,
         description: node.description,
         html_url: node.url,
         stargazers_count: node.stargazerCount,
         language: node.primaryLanguage?.name || null,
         topics: node.repositoryTopics.nodes.map((topicNode: GithubTopic) => topicNode.topic.name)
       }));
       
       setRepos(pinnedRepos);
     } catch (error) {
       console.error('Error fetching pinned repos:', error);
     }
   }

   fetchPinnedRepos();
 }, []);

 return (
   <section id="portfolio" className="py-16">
     <div className="container mx-auto px-4">
       <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
         Portfolio
       </h2>
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
     </div>
   </section>
 );
}