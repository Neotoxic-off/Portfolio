import type { PortfolioData, Profile, Repo } from "@/lib/types";

const USER = process.env.GITHUB_USER ?? "Neotoxic-off";
const API = "https://api.github.com";

// GitHub data revalidates hourly so the portfolio always stays current.
const REVALIDATE = 3600;

function headers(): HeadersInit {
  const h: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
}

async function getProfile(): Promise<Profile> {
  const res = await fetch(`${API}/users/${USER}`, {
    headers: headers(),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) throw new Error(`GitHub profile ${res.status}`);
  const u = await res.json();
  return {
    name: u.name ?? u.login,
    login: u.login,
    bio: u.bio,
    avatar: u.avatar_url,
    followers: u.followers,
    following: u.following,
    publicRepos: u.public_repos,
    location: u.location,
    blog: u.blog || null,
    url: u.html_url,
  };
}

async function getRepos(): Promise<Repo[]> {
  const res = await fetch(
    `${API}/users/${USER}/repos?per_page=100&sort=pushed`,
    { headers: headers(), next: { revalidate: REVALIDATE } },
  );
  if (!res.ok) throw new Error(`GitHub repos ${res.status}`);
  const data = await res.json();
  return (data as Record<string, unknown>[])
    .filter((r) => !r.fork)
    .map((r): Repo => ({
      id: r.id as number,
      name: r.name as string,
      description: (r.description as string) ?? null,
      language: (r.language as string) ?? null,
      stars: r.stargazers_count as number,
      forks: r.forks_count as number,
      topics: (r.topics as string[]) ?? [],
      url: r.html_url as string,
      homepage: (r.homepage as string) || null,
      pushedAt: r.pushed_at as string,
      archived: Boolean(r.archived),
    }))
    .sort((a, b) =>
      b.stars - a.stars ||
      new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime(),
    );
}

export async function getPortfolio(): Promise<PortfolioData> {
  const [profile, repos] = await Promise.all([getProfile(), getRepos()]);

  const totalStars = repos.reduce((s, r) => s + r.stars, 0);

  const langMap = new Map<string, number>();
  for (const r of repos) {
    if (r.language) langMap.set(r.language, (langMap.get(r.language) ?? 0) + 1);
  }
  const languages = [...langMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return { profile, repos, totalStars, languages };
}
