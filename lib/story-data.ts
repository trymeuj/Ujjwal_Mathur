export type Episode = {
  id: string;
  date: string;
  title: string;
  synopsis: string;
  kind: "beginning" | "decision" | "ending" | "milestone";
  outcome?: string;
};

export type Season = {
  year: string;
  label: string;
  title: string;
  synopsis: string;
  accent: string;
  episodes: Episode[];
};

export const seasons: Season[] = [
  {
    year: "2023",
    label: "Season 01",
    title: "The First Attempt",
    synopsis: "The year an idea stopped being hypothetical and became something I had to try.",
    accent: "amber",
    episodes: [
      {
        id: "starting-svar",
        date: "August 2023",
        title: "Starting Svar",
        synopsis: "I started building a speech-therapy product and entered the part of my life where ideas had consequences.",
        kind: "beginning",
        outcome: "Started",
      },
    ],
  },
  {
    year: "2024",
    label: "Season 02",
    title: "Knowing When to Leave",
    synopsis: "Continuing is a decision. So is stopping. This season was about learning the difference.",
    accent: "blue",
    episodes: [
      {
        id: "leaving-svar",
        date: "August 2024",
        title: "Leaving Svar",
        synopsis: "A year after starting Svar, I quit—and had to decide what the attempt meant after it ended.",
        kind: "ending",
        outcome: "Ended",
      },
    ],
  },
  {
    year: "2025",
    label: "Season 03",
    title: "Everything, All at Once",
    synopsis: "Graduation, a new company, a shutdown, and the beginning of full-time work in four months.",
    accent: "coral",
    episodes: [
      {
        id: "graduating-iit-delhi",
        date: "May 2025",
        title: "Graduating from IIT Delhi",
        synopsis: "I finished my computer science degree. The structured chapter ended; the less predictable one began.",
        kind: "milestone",
        outcome: "Completed",
      },
      {
        id: "starting-aiva",
        date: "June 2025",
        title: "Starting Aiva",
        synopsis: "I started Aiva while joining Material Kart part-time—two bets on the person I wanted to become.",
        kind: "beginning",
        outcome: "Started",
      },
      {
        id: "shutting-down-aiva",
        date: "August 2025",
        title: "Shutting Down Aiva",
        synopsis: "Two months later, I shut it down. A short chapter can still leave a long list of lessons.",
        kind: "ending",
        outcome: "Shut down",
      },
      {
        id: "material-kart-full-time",
        date: "September 2025",
        title: "Joining Material Kart Full-time",
        synopsis: "I chose to commit full-time and entered a season focused on learning technology and sales from inside the work.",
        kind: "decision",
        outcome: "Committed",
      },
    ],
  },
  {
    year: "2026",
    label: "Season 04",
    title: "Currently Being Written",
    synopsis: "No polished retrospective yet. The useful part is happening before I know what the story will become.",
    accent: "green",
    episodes: [],
  },
];

export const shows = [
  {
    slug: "trajectory",
    eyebrow: "The main story",
    title: "The Trajectory",
    description: "The chronological version: decisions, transitions, projects, and the space between them.",
    meta: "2023 — present",
    className: "trajectory",
    href: "/story",
  },
  {
    slug: "attempts",
    eyebrow: "Not just the wins",
    title: "Attempts",
    description: "Things I seriously tried, including what ended, failed, changed shape, or taught me to stop.",
    meta: "Svar · Aiva · what comes next",
    className: "attempts",
    href: "/story#attempts",
  },
  {
    slug: "influences",
    eyebrow: "The intellectual cast",
    title: "People Who Shaped Me",
    description: "Not a list of impressive people—a record of the ideas and decisions they changed in me.",
    meta: "Influences, not idols",
    className: "influences",
    href: "/people",
  },
  {
    slug: "writing",
    eyebrow: "Notes from the process",
    title: "Writing",
    description: "Essays written at different points in the story. Some still represent me; some show how I changed.",
    meta: "12 essays and counting",
    className: "writing",
    href: "/essays",
  },
] as const;

export function getSeason(year: string) {
  return seasons.find((season) => season.year === year);
}
