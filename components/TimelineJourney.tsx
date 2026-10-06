"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./timeline-journey.module.css";

type TimelineItem = { date: string; text: string; detail: string };

export default function TimelineJourney({ items }: { items: readonly TimelineItem[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let visible = false;
    let frame = 0;
    const update = () => {
      if (visible) {
        const rect = section.getBoundingClientRect();
        const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
        const first = track.firstElementChild as HTMLElement | null;
        const last = track.lastElementChild as HTMLElement | null;

        if (first && last) {
          const firstCenter = first.offsetLeft + first.offsetWidth / 2;
          const lastCenter = last.offsetLeft + last.offsetWidth / 2;
          const target = firstCenter + (lastCenter - firstCenter) * progress;
          section.style.setProperty("--timeline-shift", `${window.innerWidth / 2 - target}px`);
        }

        const nextIndex = Math.min(items.length - 1, Math.round(progress * (items.length - 1)));
        setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
      }
      frame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(section);
    frame = window.requestAnimationFrame(update);
    return () => { observer.disconnect(); window.cancelAnimationFrame(frame); };
  }, [items.length]);

  return (
    <section ref={sectionRef} id="now" className={styles.journey} aria-label="Ujjwal's timeline from 2023 to 2026">
      <div className={styles.stickyFrame}>
        <div className={styles.playhead} aria-hidden="true"><i /></div>
        <ol ref={trackRef} className={styles.track}>
          {items.map((item, index) => (
            <li key={`${item.date}-${item.text}`} className={`${styles.milestone} ${index === activeIndex ? styles.active : ""}`} aria-current={index === activeIndex ? "step" : undefined}>
              <div className={styles.copy}><span className={styles.date}>{item.date}</span><h2>{item.text}</h2><p>{item.detail}</p></div>
              <span className={styles.marker} aria-hidden="true" />
            </li>
          ))}
        </ol>
        <div className={styles.position} aria-hidden="true"><span>{String(activeIndex + 1).padStart(2, "0")}</span><i /><span>{String(items.length).padStart(2, "0")}</span></div>
      </div>
    </section>
  );
}
