import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PublicShell from "@/components/PublicShell";
import blogData from "@/blog-data.json";
import styles from "../../writing.module.css";

type BlogPost = {
  title: string;
  heading: string;
  credits?: string;
  content: string[];
};

const posts = blogData as Record<string, BlogPost>;

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  return { title: post?.heading ?? "Essay Not Found" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <PublicShell eyebrow="An essay" title={post.heading} intro={post.credits}>
      <article className={styles.article}>
        <aside className={styles.articleAside}>Essay</aside>
        <div className={styles.articleBody}>
          {post.content.map((paragraph, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
          <Link href="/essays" className={styles.back}>← All essays</Link>
        </div>
      </article>
    </PublicShell>
  );
}
