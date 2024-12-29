export interface BlogPost {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  content: string;
  slug?: string;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
}

export type NextPageParams = {
  params: Promise<Record<string, string>>;
  searchParams?: Promise<Record<string, string | string[]>>;
};