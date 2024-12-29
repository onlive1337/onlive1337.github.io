export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null | undefined;
  topics: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}