# Changelog

All notable project changes should be documented here. Newest entries go first.

## 2026-06-22

### Added

- Added Noa-style decision-first intelligence files for Ahri, Braum, Darius, Ekko, Illaoi, Jinx, Yasuo, Senna, and Thresh.
- Added shared Identity, Strengths, Weaknesses, Partners, Fuses, Routes, Matchups, Community Tech, and Questions fields.
- Added explicit TODO placeholders and empty recommendation collections for unverified 2XKO knowledge.
- Added 2XKO intelligence root and file IDs to the shared game config.
- Added an internal 2XKO Research Vault capture form with character, source, link, notes, tags, and verification fields.
- Added local browser persistence and JSON export for research drafts.
- Added vault search plus Source Type, Verification Status, and Tag filters.
- Added source origin, updated-date, and verification tracking on research cards.
- Added dedicated responsive Research Vault JavaScript and CSS modules.
- Added a focused `CLOUDFLARE_PAGES.md` GitHub deployment guide targeting 0 EUR monthly hosting.
- Added `.node-version` to pin Cloudflare builds to Node 20.
- Added a real dependency-free static exporter that writes to `dist`.
- Added physical pages for all 17 current FG Lab routes.
- Added Cloudflare Pages fallback routing in the build output.
- Added GitHub Pages `404.html`, `.nojekyll`, repository base-path support, and deployment workflow.
- Added Cloudflare Pages and GitHub Pages deployment instructions.
- Added `npm run preview` for local testing of the generated site.
- Added the first 2XKO Synergy Engine at `/games/2xko/synergies`.
- Added reusable ranked recommendation cards with score, reason, difficulty, and tags.
- Added mock Yasuo partner recommendations for Ahri, Darius, and Ekko.
- Added compact strengths, weaknesses, Fuse recommendations, route recommendations, and notes.
- Added responsive Synergy Engine layouts for desktop, tablet, and mobile.
- Added a shared decision-support model linking Game, Character, Synergy, Route, Matchup, and Community Note records.
- Added modular empty 2XKO data collections for characters, Fuses, synergies, routes, matchups, and community tech.
- Added per-game data roots, collection paths, and example player questions to the shared game config.
- Added the FG Lab game-selection landing page.
- Added shared game configuration in `data/games.js`.
- Added clean DBFZ and 2XKO game routes with direct `file://` hash fallback.
- Added intentional 2XKO placeholder pages for Characters, Duo Builder, Fuses, Synergies, and Routes.
- Added the 2XKO Research Vault page and local JSON record structure.
- Added an FG Lab four-phase roadmap section.
- Added Netlify SPA redirects and matching local-server route fallback.

### Changed

- Documented the Research Vault -> review -> character intelligence promotion workflow.
- Removed the Research Vault from public 2XKO navigation and public portal callouts.
- Upgraded `public/data/2xko/research-vault.json` to the structured version 2 record format.
- Replaced the conventional `npm start` server hook with the explicitly local-only `npm run dev` command.
- Verified all 17 routes and nine core runtime assets with zero static-preview failures.
- Verified production output excludes `server.js`, package runtime files, and `node_modules`.
- Made platform navigation and local JSON loading deployment-base aware.
- Changed `npm run build` from a no-op into the canonical production build.
- Documented `dist` as the build output folder and production artifact.
- Extended the shared decision model with Fuse entities and directional partner recommendation fields.
- Reframed 2XKO placeholder copy around character decisions, Fuse recommendations, and goal-based route discovery.
- Established FG Lab as a decision-first companion rather than a fighting-game wiki.
- Added the required question -> recommendation -> reasoning -> next action product pattern.
- Defined frame data, move lists, controls, mechanics, and patch notes as supporting references rather than expansion goals.
- Reframed roadmap and task priorities around partner selection, team weakness diagnosis, Fuse recommendations, goal-based routes, matchup decisions, and actionable community tech.
- Wrapped the existing DBFZ experience in the DBFZ game portal without removing working features.
- Updated DBFZ navigation links to game-based routes.
- Preserved old DBFZ hash links by mapping them to the new portal routes.
- Updated project vision, roadmap, features, and tasks for multi-game platform direction.

### Notes

- DBFZ remains Active.
- 2XKO is Planning / Early Build and does not make unverified recommendations yet.
- New platform files were kept small and separate from the DBFZ engine.
- Generated a fresh lean Netlify package at `deploy/fg-lab-netlify.zip`.

## 2026-06-18

### Added

- Added a mobile Knowledge Map drawer so selected node content appears before the browser/filter panel on mobile.
- Added compact mobile Team Builder slot styling so all three selected fighters can remain visible.
- Added `TASKS.md` as the active project work queue.
- Added `TASK_REQUEST.md` as the currently active development request file.
- Added the required PROJECT_DOCS read/update workflow to `ROADMAP.md` and `FEATURES.md`.
- Added Phase 2 Content Formatting + Editor UX implementation for grouped filters and Knowledge Map copy cleanup.
- Added Phase 1 Content Formatting + Editor UX implementation for structured DHC and assist rendering.
- Added `Current Priority: Content Formatting + Editor UX` to the roadmap.
- Added a docs-only task checklist for content formatting, tag cleanup, grouped filters, Knowledge Map naming, Movie Room structure, and admin inline editing.
- Added PROJECT_DOCS system.
- Added roadmap, vision, features and future ideas tracking.
- Added Knowledge Map prototype.
- Added Movie Room prototype.
- Added Team Builder modal improvements.
- Added `CONTENT_GUIDELINES.md` quick reference.
- Merged content guideline rules into Roadmap, Features, Future Ideas, and Vision.

### Changed

- Structured note rendering now displays multiple DHC/assist items as lists instead of merging them into one paragraph.
- Imported note cleanup now repairs common glued label boundaries such as missing separators before `Neutral`, `Control`, `Damage`, `Mix`, `Support`, and similar content headings.
- Mobile Team Builder cards now use compact horizontal cards instead of tall showcase cards.
- Knowledge Map mobile navigation is collapsible while desktop remains open.
- Established `PROJECT_DOCS` as the primary project memory and source of truth instead of chat history.
- Documented how future feature requests should move through `FUTURE_IDEAS.md`, `ROADMAP.md`, `TASKS.md`, and `TASK_REQUEST.md`.
- Replaced giant flat tag dropdown behavior with grouped filter categories:
  - Position.
  - Playstyle.
  - Team Role.
  - Assist Type.
  - Team Needs.
- Renamed the public `Network` tab/label to `Knowledge Map`.
- Improved Knowledge Map empty-state and generic relationship copy so it explains connections or missing data more clearly.
- DHC notes now render as structured blocks instead of raw paragraph dumps when source data exists.
- Assist notes now render as structured blocks with Provides, Best For, Why, and Tags.
- Tags are normalized before rendering as chips or filters, removing duplicates, trailing periods, sentence-like tags, comma-heavy fragments, and obvious imported PDF leftovers.
- Updated `ROADMAP.md`, `FEATURES.md`, and `CONTENT_GUIDELINES.md` to treat Phase 1 formatting as implemented.
- Expanded project docs so they preserve implementation details and planning context.
- Documented tag quality rules:
  - Use short concepts like Pressure, Mix, Battery.
  - Do not use sentence-like tags.
- Documented DHC note structure:
  - Who likes DHCing into this.
  - Why.
  - Who this character likes DHCing into.
  - Why.
  - Special interactions.
- Documented assist note structure:
  - Provides.
  - Best For.
  - Why.
  - Tags.
- Documented grouped filter, Knowledge Map naming, Movie Room structure, and admin inline editing expectations in `CONTENT_GUIDELINES.md`.

### Notes

- Future feature work should update these docs during the same pass.
- `CONTENT_GUIDELINES.md` remains the compact formatting reference.
- The main docs now include the content philosophy so planning and implementation stay aligned.
