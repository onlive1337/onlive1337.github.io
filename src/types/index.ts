export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
}

export interface Message {
  id: string;
  content: string;
  created_at: string;
}

export interface CreateMessageRequest {
  content: string;
}

export interface CreateMessageResponse {
  error?: string;
  data?: Message;
}

export interface YandexTrack {
  name: string;
  artists: string;
  album: string;
  albumImageUrl: string;
  url: string;
  isPlaying: boolean;
  progressMs: number;
  durationMs: number;
  explicit: boolean;
  platform: string;
}