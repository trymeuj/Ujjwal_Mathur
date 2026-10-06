"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./home.module.css";

type Filter = "All" | "AI" | "Privacy" | "Open source";
type Project = { id: string; number: string; categories: readonly Exclude<Filter, "All">[]; title: string; copy: string; image: string; href: string };

const projects: readonly Project[] = [
  { id: "voxie", number: "01", categories: ["AI", "Open source"], title: "Voxie", copy: "voice agents that speak your caller's language: 17 languages, real barge-in, open source.", image: "/images/project-voxie-rUPdn12M.webp", href: "https://voxieai.vercel.app/" },
  { id: "rex", number: "02", categories: ["AI"], title: "REX by Softknock", copy: "follows up every failed payment, by email, text and a friendly call, in your customer's own language.", image: "/images/project-rex-DrbByc31.webp", href: "https://softknockai.vercel.app/" },
  { id: "screenmesh", number: "03", categories: ["Privacy", "Open source"], title: "ScreenMesh", copy: "move work between your devices without moving it through an app you don't trust. local-first, end-to-end encrypted.", image: "/images/project-screenmesh-Cr_ES70b.webp", href: "https://screenmesh.vercel.app/" },
] as const;

const curiosities = [
  ["/images/obj3d-laptop-Bevq9GJR.webp", "laptop"], ["/images/obj3d-camera-Bv9DFlmu.webp", "camera"], ["/images/obj3d-cat-YJfcW-No.webp", "cat"], ["/images/obj3d-keys-DhJa-O4p.webp", "keys"], ["/images/obj3d-badminton-BPy_8b3q.webp", "badminton"], ["/images/obj3d-climber-Dqlv6Lre.webp", "climber"],
] as const;

function Scribble() { return <svg aria-hidden="true" className={styles.scribble} viewBox="250 100 550 600"><path d={scribblePath} /></svg>; }
function Arrow() { return <span className={styles.arrow} aria-hidden="true">↗</span>; }
const storyPath = "M569 199 C607.5 262.5 731.5 529.8 800 580 C868.5 630.2 930 523.3 980 500 C1030 476.7 1072.6 463.3 1100 440 C1127.4 416.7 1144.4 386.7 1144.4 360 C1144.4 333.3 1114.8 280 1100 280 C1085.2 280 1051.9 331.3 1055.6 360 C1059.3 388.7 1098.1 402 1122.2 452 C1146.3 502 1167 622 1200 660 C1233 698 1283.3 680 1320 680 C1356.7 680 1397.8 653.3 1420 660 C1442.2 666.7 1453.3 700 1453.3 720 C1453.3 740 1431.1 780 1420 780 C1408.9 780 1383.9 741.5 1386.7 720 C1389.4 698.5 1416.1 677.7 1436.7 651 C1457.2 624.3 1489.4 601.8 1510 560 C1530.6 518.2 1538.3 445 1560 400 C1581.7 355 1615 301.7 1640 290 C1665 278.3 1692.5 319 1710 330 C1727.5 341 1728.3 341 1745 356 C1761.7 371 1790.8 376 1810 420 C1829.2 464 1831.7 576.7 1860 620 C1888.3 663.3 1948.3 670 1980 680 C2011.7 690 2020 710 2050 680 C2080 650 2120 556.7 2160 500 C2200 443.3 2261.7 340 2290 340 C2318.3 340 2295 460 2330 500 C2365 540 2451.7 546.7 2500 580 C2548.3 613.3 2583.3 650 2620 700 C2656.7 750 2670 906.7 2720 880 C2770 853.3 2866.7 606.7 2920 540 C2973.3 473.3 2990 485 3040 480 C3090 475 3160 503.3 3220 510 C3280 516.7 3340 521.7 3400 520 C3460 518.3 3520 510 3580 500 C3640 490 3700 471.7 3760 460 C3820 448.3 3883.3 430 3940 430 C3996.7 430 4053.3 431.7 4100 460 C4146.7 488.3 4170 560 4220 600 C4270 640 4340 681.7 4400 700 C4460 718.3 4523.3 710 4580 710 C4636.7 710 4697.6 730 4740 700 C4782.4 670 4834.4 586.7 4834.4 530 C4834.4 473.3 4771.5 360 4740 360 C4708.5 360 4637.7 469.1 4645.6 530 C4653.4 590.9 4734.8 687.2 4787.2 725.5 C4839.6 763.8 4901.2 750.9 4960 760 C5018.8 769.1 5086.7 790 5140 780 C5193.3 770 5241.7 731.7 5280 700 C5318.3 668.3 5355 608.3 5370 590";
const scribblePath = "M412 441 C515 397 634 254 612 324 C514 323 496 516 405 384 C462 554 503 411 563 536 C550 451 352 221 429 252 C463 251 542 590 592 462 C722 444 518 320 633 498 C733 324 559 351 502 325 C451 436 535 231 665 369 C653 189 542 154 453 252 C356 135 579 427 545 447 C580 505 551 553 468 379 C518 265 542 377 549 499 C417 489 679 300 622 421 C560 362 446 473 393 465 C424 562 372 482 401 372 C511 215 515 477 398 393 C299 375 474 580 439 424 C406 450 754 502 668 389 C754 375 628 135 588 240 C647 360 527 578 489 496 C412 647 637 651 506 469 C517 579 481 408 530 253 C626 196 462 257 574 279 C588 381 649 162 652 341 C736 176 676 270 595 393 C551 502 511 179 608 312 C612 397 708 447 616 375 C736 373 748 312 627 469 C552 479 478 362 535 275 C572 284 689 483 596 461 C546 415 740 502 646 350 C568 483 705 479 578 470 C598 357 572 439 563 438 C591 259 667 301 541 295 C514 408 442 336 425 339 C477 175 577 532 566 565 C690 668 539 510 601 520 C501 495 679 640 594 488 C588 419 456 553 539 509 C654 369 727 177 651 357 C569 254 524 516 473 584 C434 629 437 615 543 528 C442 532 526 141 593 255 C601 231 606 485 639 519 C647 390 459 557 538 507 C576 518 628 307 533 264 C629 164 569 587 504 469 C613 399 567 642 617 482 C541 668 630 423 525 561 C455 646 384 347 449 499 C539 470 700 212 622 354 C596 424 286 189 397 302 C446 458 674 337 547 482 C549 579 634 356 633 287 C549 135 414 322 520 498 C534 503 529 135 511 184 C425 135 660 668 568 590 C683 437 488 449 606 279 C596 379 420 421 467 434 C471 407 689 259 661 443 C716 574 443 556 529 573 C594 538 432 461 514 588 C517 405 556 436 450 322 C505 459 612 520 577 556 C604 558 721 555 590 440 C525 596 458 425 392 320 C477 284 564 456 457 313 C510 414 656 303 584 339 C645 177 559 393 602 405 C470 350 507 466 470 418 C398 587 607 453 562 514 C605 541 471 310 462 352 C597 406 484 646 429 547 C559 367 672 461 640 371 C574 334 357 135 479 238 C445 135 484 601 551 447 C565 450 754 442 661 416 C754 468 560 135 476 191 C502 289 516 578 638 416 C547 405 304 412 394 413 C423 246 578 558 458 588 C465 625 583 385 619 466 C661 489 450 271 508 189 C453 135 441 135 510 212 C417 308 529 344 558 194 C625 135 578 668 446 536 C331 668 614 267 632 276 C754 178 412 653 405 488 C465 476 724 388 594 268 C622 135 486 278 453 295 C373 135 426 166 418 308 C403 372 613 387 625 476 C647 446 734 396 660 384 C754 555 570 156 507 255 C403 404 586 275 509 227 C471 141 443 489 393 465 C418 515 700 369 632 486 C564 668 746 567 634 424 C510 258 381 378 443 406 C476 256 497 135 486 246 C374 313 426 307 413 257 C379 248 440 397 518 456 C584 584 366 418 481 562 C565 608 613 381 540 489 C520 398 704 245 621 295 C662 479 342 484 389 465 C455 624 444 499 463 549 C354 668 438 372 552 530 C569 524 619 135 569 199";

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>("All");
  const storyRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGCircleElement>(null);
  const shown = useMemo(() => projects.filter((project) => filter === "All" || project.categories.includes(filter)), [filter]);
  useEffect(() => { const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.setAttribute("data-shown", "")), { threshold: .12 }); document.querySelectorAll(`.${styles.reveal}`).forEach((element) => observer.observe(element)); return () => observer.disconnect(); }, []);
  useEffect(() => {
    const story = storyRef.current;
    const track = trackRef.current;
    if (!story || !track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.innerWidth <= 760) {
        track.style.transform = "";
        return;
      }
      const distance = story.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, (window.scrollY - story.offsetTop) / distance));
      const travel = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-travel * progress}px, 0, 0)`;
      const draw = Math.min(1, progress * 1.18);
      track.style.setProperty("--story-progress", String(draw));
      if (routeRef.current && tipRef.current) {
        const point = routeRef.current.getPointAtLength(routeRef.current.getTotalLength() * draw);
        tipRef.current.setAttribute("cx", String(point.x));
        tipRef.current.setAttribute("cy", String(point.y));
        tipRef.current.style.opacity = draw > 0 && draw < 1 ? "1" : "0";
      }
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); window.cancelAnimationFrame(frame); };
  }, []);
  const goToBrain = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.innerWidth <= 760 || !storyRef.current) return;
    event.preventDefault();
    const story = storyRef.current;
    window.scrollTo({ top: story.offsetTop + (story.offsetHeight - window.innerHeight) * .21, behavior: "smooth" });
  };
  return <main className={styles.page}>
    <header className={styles.nav}><a href="#top" className={styles.wordmark}>Nidhi</a><nav aria-label="Primary navigation"><a href="#brain" onClick={goToBrain}>brain</a><a href="#work">work</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">linkedin</a><a href="#hi">let&apos;s talk</a></nav></header>
    <section ref={storyRef} className={styles.storyScroll} aria-label="Nidhi's story"><div className={styles.storySticky}><div ref={trackRef} className={styles.storyTrack}>
    <svg aria-hidden="true" className={styles.storyThread} viewBox="0 0 5700 1000" preserveAspectRatio="none"><path ref={routeRef} className={styles.threadRoute} pathLength="1" d={storyPath} /><path className={styles.threadScribble} pathLength="1" d={scribblePath} /><circle ref={tipRef} className={styles.threadTip} r="9" cx="569" cy="199" /></svg>
    <section id="top" className={styles.hero}><div className={styles.heroMap}><Scribble /><p className={styles.mapNote}><span>↙</span> an almost accurate map of<br />everything on my mind.</p></div><div className={styles.heroBottom}><h1>the<br />anatomy of a<br /><em>curious developer.</em></h1><div className={styles.heroCtas}><p>or do i say, welcome to my portfolio :)</p><div><a className={styles.outlineButton} href="#work">view work</a><a className={styles.darkButton} href="#hi">let&apos;s talk</a></div></div></div></section>
    <section id="brain" className={styles.brain}><div className={styles.brainHeading}><p>i tinker with a lot of stuff.</p><h2>a jack of all trades</h2><p>what a cool way to say i fall down rabbit holes.</p></div><div className={styles.objectField} aria-label="Things that spark Nidhi's curiosity">{curiosities.map(([image, name]) => <img key={name} src={image} alt="" className={`${styles.object} ${styles[name]}`} />)}</div><div className={styles.heartHeading}><h2>but few things have my heart.</h2></div><div className={styles.heartCards}><article className={`${styles.heartCard} ${styles.reveal}`}><img src="/images/obj3d-globe-CSak7GsE.webp" alt="a globe wrapped in orbits" /><p><strong>web3 came first.</strong><br />got curious about systems that don&apos;t need one person in charge.</p></article><article className={`${styles.heartCard} ${styles.reveal}`}><img src="/images/obj3d-headphones-0PX8Junf.webp" alt="a pair of headphones" /><p><strong>turns out, i like people too.</strong><br />explaining things is pretty fun too.</p></article><article className={`${styles.heartCard} ${styles.reveal}`}><img src="/images/obj3d-brain-CivWsef6.webp" alt="a brain" /><p><strong>and now, AI.</strong><br />half engineer. half “what if?”</p></article></div></section>
    <section className={styles.timelineSection} aria-label="Timeline, 2021 to 2026"><div className={styles.timeline}><svg aria-hidden="true" className={styles.timelineLine} viewBox="0 0 1200 1000" preserveAspectRatio="none"><path pathLength="1" d="M0 545 C110 450 160 455 250 510 S400 595 510 495 S670 400 760 510 S920 600 1010 470 S1130 400 1200 490" /></svg>{[["started a company at 17.", "Alphonse Esports — tournaments, teams, and a lot of learning on the job, mid-COVID.", "2021"], ["went back to school.", "computer science at SMVIT. kept building things on the side.", "2022"], ["found web3.", "the tech was weird. naturally, i stayed.", "2023"], ["started shipping.", "smart contracts, hackathons, open-source experiments.", "2024"], ["brought people along.", "workshops, mentoring, and a few ambassador badges.", "2025"], ["then, AI happened.", "now keeping AI agents reliable in production.", "2026"]].map(([title, copy, year], index) => <article key={year} className={`${styles.timelineEntry} ${index % 2 ? styles.right : styles.left} ${styles.reveal}`}><span className={styles.dot} /><div><h3>{title}</h3><p>{copy}</p><time>{year}</time></div></article>)}</div></section>
    <section className={styles.ownership}><p>somehow, i keep ending up...</p><h2>taking <em>ownership.</em></h2><div className={styles.ownershipCopy}><p>most things i got curious about, i ended up building.</p><p>most things i built, i ended up looking after.</p><p>apparently, i don&apos;t know how to leave things alone.</p><ol><li>notice it.</li><li>understand it.</li><li>build it.</li><li>hand it over.</li><li>repeat.</li></ol></div><div className={styles.workTransition}><p>enough autobiography.</p><h2>let&apos;s look at what came out of it.</h2><a href="#work" className={styles.textLink}>see the work ↓</a></div></section>
    </div></div></section>
    <section id="work" className={styles.work}><div className={styles.workLabel}>WORKS</div><div className={styles.workHeader}><div><p>selected work / 2022—now</p><h2>a few things,<br /><em>chosen on purpose.</em></h2></div><p>AI, privacy, and open source, built end to end.</p></div><div className={styles.filters} role="group" aria-label="Filter projects"><span>show me</span>{(["All", "AI", "Privacy", "Open source"] as Filter[]).map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? styles.activeFilter : ""}>{item}</button>)}</div><div className={styles.projects}>{shown.map((project) => <a key={project.id} className={`${styles.project} ${styles.reveal}`} href={project.href} target="_blank" rel="noreferrer"><div className={styles.projectCopy}><p>{project.number} / {project.categories.join(" · ")}</p><h3>{project.title}</h3><span>{project.copy}</span></div><div className={styles.projectImage}><img src={project.image} alt={`${project.title} website`} /><Arrow /></div></a>)}</div><p className={styles.more}>interested? there&apos;s more. <a href="#hi">more rabbit holes →</a></p></section>
    <section id="hi" className={styles.contact}><div className={styles.contactString}>✦</div><div className={styles.contactQuote}><p>same girl...</p><h2>just more<br /><em>ideas now.</em></h2><p>still figuring<br />this out...<br />and probably<br />always will.</p></div><div className={styles.contactGrid}><div><p>who made this?</p><h2>oh, hi.<br />i&apos;m <em>nidhi</em>.</h2><p>still curious.<br />still building.<br />still opening tabs.</p><h3>let&apos;s build something<br /><em>the internet hasn&apos;t seen yet.</em></h3><a className={styles.email} href="mailto:nidhiyp05@gmail.com">nidhiyp05@gmail.com</a><div className={styles.socials}><a href="https://linkedin.com">linkedin</a><a href="https://github.com">github</a><a href="https://x.com">x</a></div></div><div className={styles.person}><img src="/images/me-tZAtwA0f.webp" alt="nidhi, one hand up in a peace sign" /><div className={styles.funFact}>fun fact:<br />i wanted to be<br />an astronaut.<img src="/images/obj3d-astronaut-BotGRd0z.webp" alt="a small astronaut holding a star" /></div></div></div></section>
    <footer className={styles.footer}><a href="#top">© 2026 nidhi · back to top ↑</a></footer>
  </main>;
}
