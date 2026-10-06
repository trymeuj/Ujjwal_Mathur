import Link from "next/link";
import styles from "./cinematic-nav.module.css";

export default function CinematicNav() {
  return (
    <div className={styles.wrap}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.brand}>
          <span className={styles.mark}>UM</span>
          <span>In progress</span>
        </Link>
        <Link href="/story" className={styles.link}>Story</Link>
        <Link href="/essays" className={styles.link}>Writing</Link>
        <Link href="/#contact" className={styles.link}>Contact</Link>
      </nav>
    </div>
  );
}
