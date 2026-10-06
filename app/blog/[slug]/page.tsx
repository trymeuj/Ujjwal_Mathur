import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import blogData from "@/blog-data.json";

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
  return { title: posts[slug]?.title ?? "Essay Not Found" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div className="container">
      <div className="nav-sidebar">
        <nav aria-label="Main navigation">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/essays">Essays</Link></li>
            <li><Link href="/books">Books</Link></li>
            <li><Link href="/notes">Notes</Link></li>
            <li><Link href="/journal">Journal</Link></li>
            <li><Link href="/people">People</Link></li>
            <li><a href="/Ujjwal_Resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
          </ul>
        </nav>
      </div>
      <main>
        <div className="essay-content">
          <h1>{post.heading}</h1>
          {post.credits && <p className="credits">{post.credits}</p>}
          <div>
            {post.content.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
