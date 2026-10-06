# Ujjwal Mathur's website

The site runs on Next.js using the App Router. Its original content and visual structure are preserved while routes, metadata, essay rendering, navigation, and private-page access are handled by Next.js.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Private pages

Notes and Journal require these server-side environment variables:

```text
SITE_PASSWORD=your-password
SITE_ACCESS_TOKEN=a-long-random-token
```

`SITE_ACCESS_TOKEN` becomes an HTTP-only cookie after a successful login. Set both variables in the deployment environment; `.env.local` is ignored by Git.

## Verification

```bash
npm run check
npm run build
```

Old `.html` URLs redirect to their new routes, including essay URLs such as `blog.html?post=whyblogs`.
