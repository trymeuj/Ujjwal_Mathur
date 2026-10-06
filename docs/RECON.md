# Reconnaissance — Somehow Living

## Mode

`clone`: full visual and behavioral reconstruction of the approved reference at `https://www.somehowliving.tech/`.

## Stack and visual system

- Reference: React app with Tailwind-generated CSS.
- Fonts: DM Sans, Newsreader, Patrick Hand.
- Palette: warm near-white paper (`oklch(97.5% .003 85)`), near-black ink (`oklch(13% .005 70)`), muted gray, signal blue.
- Motion: custom CSS keyframes and intersection-based reveal; no GSAP, Framer Motion, or Lenis detected.
- Assets: 14 locally downloaded approved reference assets under `public/images`.

## Page structure

1. Fixed masthead and full-screen, illustrated hero.
2. “Curiosity” visual field with floating objects and a stitched timeline.
3. Ownership/working-method interlude.
4. Selected-work index with category filters and project previews.
5. Dark contact section with portrait, social links, and astronaut detail.
6. Footer/back-to-top action.

## Interaction model

- Header anchors smoothly scroll to named sections.
- Hero calls-to-action scroll to work or contact.
- Work filters update the project list in place.
- Illustration assets float with CSS animation.
- Section content reveals once as it enters the viewport.
- Desktop header becomes a compact mobile header below 768px.

## Build decisions

- Rebuild in the existing Next.js App Router project with a focused client page for filters and reveal state.
- Retire the existing homepage components from the rendered route; preserve old files only as unreferenced source until a later cleanup.
- Use local approved images and original implementation, not remote embeds.
- Capture desktop/tablet/mobile reference renders in `docs/screenshots` and use `docs/qa/styles.json` as the token source.

## Current extraction limitation

The skill's Scrapling prerequisite is unavailable, and its documented manual fallback file is absent. Playwright extraction supplied the computed tokens, local asset inventory, page text, and responsive captures used for this build.
