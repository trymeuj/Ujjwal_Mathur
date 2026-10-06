import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CinematicNav from "@/components/CinematicNav";
import { getSeason, seasons } from "@/lib/story-data";
import styles from "../story.module.css";

export function generateStaticParams() {
  return seasons.map((season) => ({ year: season.year }));
}

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const season = getSeason((await params).year);
  return { title: season ? `${season.year}: ${season.title}` : "Season Not Found", description: season?.synopsis };
}

export default async function SeasonPage({ params }: { params: Promise<{ year: string }> }) {
  const season = getSeason((await params).year);
  if (!season) notFound();
  const index = seasons.findIndex((item) => item.year === season.year);
  const previous = seasons[index - 1];
  const next = seasons[index + 1];

  return (
    <div className={styles.page}>
      <CinematicNav />
      <div className={styles.shell}>
        <nav className={styles.topbar}>
          <Link href="/story" className={styles.homeLink}>← All seasons</Link>
          <span className={styles.topbarMeta}>{season.label}</span>
        </nav>

        <header className={styles.seasonHero}>
          <div className={styles.seasonHeroMeta}><span>{season.label}</span><span>{season.episodes.length || "Open"} {season.episodes.length === 1 ? "episode" : season.episodes.length ? "episodes" : "season"}</span></div>
          <p className={styles.giantYear}>{season.year}</p>
          <div className={styles.seasonHeroBottom}><h1>{season.title}</h1><p>{season.synopsis}</p></div>
        </header>

        <main className={styles.episodesSection}>
          <div className={styles.episodesHeader}><h2>Episodes</h2><span>The record, not the résumé</span></div>
          {season.episodes.length ? (
            <div className={styles.episodeList}>
              {season.episodes.map((episode, episodeIndex) => (
                <article key={episode.id} className={styles.episode}>
                  <span className={styles.episodeIndex}>{String(episodeIndex + 1).padStart(2, "0")}</span>
                  <span className={styles.episodeDate}>{episode.date}</span>
                  <div className={styles.episodeText}><h3>{episode.title}</h3><p>{episode.synopsis}</p></div>
                  {episode.outcome && <span className={styles.outcome}>{episode.outcome}</span>}
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>Nothing has been packaged into an episode yet. That is intentional—the year is still allowed to be unresolved.</div>
          )}
        </main>

        <div className={styles.seasonNav}>
          {previous ? <Link className={styles.yearLink} href={`/story/${previous.year}`}>← {previous.year}</Link> : <span />}
          {next ? <Link className={styles.yearLink} href={`/story/${next.year}`}>{next.year} →</Link> : <Link className={styles.yearLink} href="/">Back home →</Link>}
        </div>
      </div>
    </div>
  );
}
