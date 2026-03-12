# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta] - 2026-03-08

### Added
- **Infrastructure**: Established a high-performance "Edge-First" stack combining Cloudflare Workers with Hono API, seamlessly integrated with a Vite-powered React frontend for sub-millisecond global latency.
- **Database**: Full Cloudflare D1 (SQLite) integration using Drizzle ORM. Implemented type-safe schema management, Drizzle Studio for data exploration, and automated migration workflows. Core tables created: `users`, `progress`, `feedback`, and `error_logs`.
- **Authentication**: End-to-end Firebase Google Authentication. Developed backend synchronization logic that automatically provisions and hydrates user records in the D1 database upon their first secure login.
- **Curriculum Engine**: Engineered a decoupled, JSON-based dynamic track loading system. Successfully launched initial schemas for the Moroccan 2 Bac (Math/Physics) and US AP Calculus tracks, allowing for instantaneous subject switching.
- **UI/UX**: Launched a responsive, unified Design System featuring a sticky Top Header, a persistent Course Sidebar with a mobile-optimized off-canvas drawer, and a visually intuitive interactive Roadmap for progress visualization.
- **Learning Experience**: Implemented a sophisticated Markdown + LaTeX rendering engine (`MathContent`) for high-fidelity academic content. Introduced the first wave of interactive learning games, including the "Derivative Tangent Game" and "Conjugate Method Challenge."
- **Gamification**: Introduced a Global Leaderboard with real-time rank highlighting and competitive student profiles. Designed conceptual mockups for the "Infinite Dojo" and "Exam Simulator" to drive retrieval practice.
- **Error Handling**: Deployed a robust Global Error Boundary. Features include silent global tracking, a user-facing reporting interface, and intelligent database upsert deduplication based on error signatures.
- **i18n**: Implemented a tri-lingual UI shell support (Arabic, French, English) with automatic browser language detection and persistent caching. Engineered dynamic RTL (Right-to-Left) and LTR layout flipping to ensure optimal readability for Arabic speakers.
- **SEO**: Integrated `react-helmet-async` for optimized meta tags, dynamic page titles, and search engine crawling performance. Developed a reusable `<SEO>` component for granular route-based head management.
- **Routing**: Implemented deep-linking for sub-pages (Roadmap, Leaderboard) within the Dashboard to support dynamic SEO and improved navigation.

### Security & Performance
- **Token Verification**: Implemented custom API middleware to extract, decode, and verify Firebase JWT tokens, ensuring all protected endpoints are strictly accessible to authenticated users only.
- **Deduplication Logic**: Introduced client-side error signature caching via a persistent `Set` to prevent logging spam and reduce unnecessary API overhead during edge-case crashes.
- **Optimized Assets**: Optimized SVG icons and font delivery to maintain a "Perfect 100" Lighthouse score for the initial load.

---
*Classnect Beta Release: Defining the future of visual mathematics.*
