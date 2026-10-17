export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
}

export interface SteamData {
  isPlaying: boolean;
  name?: string;
  gameId?: string;
  imageUrl?: string;
  playTime2Weeks?: number;
}

export interface DiscordData {
  status: "online" | "idle" | "dnd" | "offline";
}

export interface Track {
  name: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  url: string;
  isNowPlaying?: boolean;
}

export interface LastFMData {
  tracks?: Track[];
}

