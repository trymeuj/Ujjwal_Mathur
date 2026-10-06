import type { Metadata } from "next";
import Image from "next/image";
import PublicShell from "@/components/PublicShell";
import { peopleSections } from "@/lib/people-data";
import styles from "./people.module.css";

export const metadata: Metadata = { title: "People I Follow" };

export default function PeoplePage() {
  return (
    <PublicShell
      eyebrow="The intellectual cast"
      title="People I Follow"
      intro="Here are some interesting people I follow and learn from:"
    >
      <div className={styles.sections}>
        {peopleSections.map((section) => (
          <section key={section.title}>
            <div className={styles.sectionHeader}>
              <h2>{section.title}</h2>
              <span>{section.people.length} {section.people.length === 1 ? "person" : "people"}</span>
            </div>
            <div className={styles.grid}>
              {section.people.map((person) => (
                <article key={person.name} className={styles.card}>
                  <div className={styles.core}>
                    <div className={styles.imageWrap}>
                      <Image src={person.image} alt={person.name} fill sizes="(max-width: 620px) 90vw, (max-width: 920px) 45vw, 30vw" className={styles.image} />
                    </div>
                    <div className={styles.copy}>
                      <h3 className={styles.name}>{person.name}</h3>
                      <p className={styles.text}>{person.text}</p>
                      <div className={styles.links}>
                        {person.links.map((link) => <a key={link.href} className={styles.link} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PublicShell>
  );
}
