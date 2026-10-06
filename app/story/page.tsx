import type { Metadata } from "next";
import Link from "next/link";
import CinematicNav from "@/components/CinematicNav";
import { seasons } from "@/lib/story-data";
import styles from "./story.module.css";

export const metadata: Metadata = {
  title: "The Story So Far",
  description: "A chronological account of Ujjwal Mathur's decisions, projects, attempts, and changes of direction.",
};

export default function StoryPage() {
  return (
    <div className={styles.page}>
      <CinematicNav />
      <div className={styles.shell}>
        <nav className={styles.topbar}>
          <Link href="/" className={styles.homeLink}>← Ujjwal, in progress</Link>
          <span className={styles.topbarMeta}>The chronological cut</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.eyebrow}>The main story · 2023—present</span>
          <div>
            <h1 className={styles.title}>The story<em>so far.</em></h1>
            <p className={styles.intro}>A chronology of beginnings, endings, commitments, and the moments that only became meaningful in hindsight.</p>
          </div>
        </header>

        <main className={styles.timeline}>
          {seasons.map((season) => (
            <section key={season.year} className={styles.season}>
              <div className={styles.seasonYear}>
                <span className={styles.seasonNumber}>{season.label}</span>
                <strong>{season.year}</strong>
              </div>
              <div className={styles.seasonCopy}>
                <h2>{season.title}</h2>
                <p>{season.synopsis}</p>
                {season.episodes.length ? (
                  <div className={styles.episodeList}>
                    {season.episodes.map((episode, index) => (
                      <article key={episode.id} className={styles.episode}>
                        <span className={styles.episodeIndex}>{String(index + 1).padStart(2, "0")}</span>
                        <span className={styles.episodeDate}>{episode.date}</span>
                        <div className={styles.episodeText}><h3>{episode.title}</h3><p>{episode.synopsis}</p></div>
                        {episode.outcome && <span className={styles.outcome}>{episode.outcome}</span>}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className={styles.empty}>This season is being lived before it is edited.</div>
                )}
                <Link href={`/story/${season.year}`} className={styles.seasonCta}>Open {season.label} →</Link>
              </div>
            </section>
          ))}
        </main>

        <section id="attempts" className={styles.attempts}>
          <h2>Attempts,<br />including the endings.</h2>
          <div className={styles.attemptsCopy}>
            <p>I do not want the failed or unfinished work edited out of the biography. An attempt is evidence of judgment, energy, timing—and sometimes misjudgment.</p>
            <div className={styles.attemptCard}><strong>Svar</strong><span>Started 2023 · Left 2024</span></div>
            <div className={styles.attemptCard}><strong>Aiva</strong><span>Started June 2025 · Shut down August 2025</span></div>
          </div>
        </section>
      </div>
    </div>
  );
}
