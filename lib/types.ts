export interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  url: string;
  homepage: string | null;
  pushedAt: string;
  archived: boolean;
}

export interface Profile {
  name: string;
  login: string;
  bio: string | null;
  avatar: string;
  followers: number;
  following: number;
  publicRepos: number;
  location: string | null;
  blog: string | null;
  url: string;
}

export interface PortfolioData {
  profile: Profile;
  repos: Repo[];
  totalStars: number;
  languages: { name: string; count: number }[];
}
