import CinematicNav from "./CinematicNav";
import styles from "./public-shell.module.css";

type Props = {
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  intro?: string;
  legacy?: boolean;
};

export default function PublicShell({ children, eyebrow, title, intro, legacy = false }: Props) {
  return (
    <div className={styles.page}>
      <CinematicNav />
      <div className={styles.shell}>
        {title && (
          <header className={styles.header}>
            <span className={styles.eyebrow}>{eyebrow}</span>
            <div>
              <h1 className={styles.title}>{title}</h1>
              {intro && <p className={styles.intro}>{intro}</p>}
            </div>
          </header>
        )}
        <main className={`${styles.content} ${legacy ? styles.legacy : ""}`}>{children}</main>
      </div>
    </div>
  );
}
