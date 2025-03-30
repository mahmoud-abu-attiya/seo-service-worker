# SEO-Optimized Page with Service Worker (Next.js 15, App Router, TypeScript)

A Next.js 15 project using the App Router and TypeScript, featuring an SEO-optimized `/about` page with a Service Worker for offline caching.

## Features
- **SEO**: Dynamic metadata (title, description, Open Graph) via the App Router’s `metadata` export.
- **Service Worker**: Caches the `/about` page and shows a fallback message offline.
- **Design**: Built with Tailwind CSS 4, featuring a gradient background and interactive elements.
- **TypeScript**: Fully typed for better developer experience.

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`
4. Visit `http://localhost:3000/about`

## Testing Offline Mode
1. Open DevTools > Application > Service Workers.
2. Check "Offline" and reload the `/about` page.