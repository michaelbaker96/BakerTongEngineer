# BakerTongEngineer

Single-page editorial portfolio for Michael Baker-Tong. The site is built as a recruiter-facing summary of engineering experience, selected projects, and contact links.

GitHub repository: <https://github.com/michaelbaker96/BakerTongEngineer>

## What the site includes

The current public page includes these implemented sections:

- Hero
- Selected Work
- Engineering Highlights
- Work Experience
- Contact

## Stack

- Next.js App Router
- Tailwind CSS 4
- Vitest
- Playwright

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000`.

Optional turbo mode for local development:

```bash
npm run dev:turbo
```

## Available npm scripts

```bash
npm run dev
npm run dev:turbo
npm run build
npm run start
npm run lint
npm run test
npm run test:watch
npm run test:ui
```

## Validation

Use these commands before shipping changes:

```bash
npm run lint
npm run test
npx playwright test
npm run build
```

Notes:

- `npm run test` runs the Vitest suite.
- `npx playwright test` runs the end-to-end browser checks.
- `npm run test:ui` builds the app and then runs Playwright in one command.

## Vercel deployment

This project is ready to import into Vercel from:

<https://github.com/michaelbaker96/BakerTongEngineer>

Recommended setup:

1. Import the repository into Vercel.
2. Use the default Next.js build settings.
3. Set `NEXT_PUBLIC_SITE_URL` to the production site URL.

The app metadata uses `metadataBase` with this fallback order:

1. `NEXT_PUBLIC_SITE_URL`
2. `SITE_URL`
3. `http://localhost:3000`

That ensures canonical and social metadata resolve correctly in production while still working locally if no deployment URL is set.
