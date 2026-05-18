import { getPortfolio } from "@/lib/github";
import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { LanguageBar } from "@/components/language-bar";
import { About } from "@/components/about";
import { Nfo } from "@/components/nfo";
import { ProjectExplorer } from "@/components/project-explorer";
import { SiteFooter } from "@/components/site-footer";

// Statically rendered, revalidated hourly so data stays current.
export const revalidate = 3600;

export default async function Home() {
  const data = await getPortfolio();

  return (
    <main className="relative">
      <Hero profile={data.profile} />
      <div className="space-y-6">
        <StatsBar data={data} />
        <LanguageBar data={data} />
      </div>
      <About />
      <Nfo />
      <ProjectExplorer data={data} />
      <SiteFooter profile={data.profile} />
    </main>
  );
}
