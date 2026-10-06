import type { Metadata } from "next";
import Link from "next/link";
import PublicShell from "@/components/PublicShell";
import blogData from "@/blog-data.json";
import styles from "../writing.module.css";

export const metadata: Metadata = { title: "Essays" };

export default function EssaysPage() {
  const posts = Object.entries(blogData);

  return (
    <PublicShell
      eyebrow="Notes from the process"
      title="Essays by Ujjwal Mathur"
    >
      <div className={styles.essayList}>
        {posts.map(([slug, post], index) => (
          <Link key={slug} href={`/blog/${slug}`} className={styles.essayCard}>
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
            <div className={styles.cardCopy}>
              <h2>{post.heading}</h2>
              <p>{post.content[0].replace(/<[^>]*>/g, "")}</p>
            </div>
            <span className={styles.arrow}>↗</span>
          </Link>
        ))}
      </div>
    </PublicShell>
  );
}
