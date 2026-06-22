# FG Lab Features

Last updated: 2026-06-22

This file tracks implemented and active features. Do not remove implementation details when expanding this doc.

## Stack

- Plain HTML/CSS/JavaScript static frontend.
- Static build compatible with Cloudflare Pages, GitHub Pages, and Netlify.
- Dependency-free build output in `dist`.
- Local JSON data under `public/data/dbfz`.
- Node scripts for local import/build utilities.
- No Laravel, PHP, Artisan, live browser scraping, or iframe-based frame data.

## Static Deployment

Status: Active

Implemented:

- `npm run build` clears and rebuilds `dist`.
- Runtime JavaScript, CSS, local JSON, backgrounds, and optimized portraits are copied.
- Seventeen supported routes receive physical `index.html` files.
- Cloudflare Pages fallback is emitted as `dist/_redirects`.
- GitHub Pages fallback and Jekyll bypass are emitted as `dist/404.html` and `dist/.nojekyll`.
- `FG_LAB_BASE_PATH` supports GitHub project sites.
- Runtime routing and JSON paths understand the configured deployment base.
- GitHub Actions workflow publishes `dist` for free.
- `npm run preview` serves the built output locally for smoke testing only.

Production does not use `server.js`, Node, a database, or a paid service.

Cloudflare deployment details:

- GitHub-connected Cloudflare Pages project.
- Build command: `npm run build`.
- Output directory: `dist`.
- Framework preset: None.
- Node 20 pinned through `.node-version`.
- No environment variables, Functions, Workers, or paid features required.
- `npm run dev` and `npm run preview` are explicitly local-only helpers.

## Multi-Game Platform

Status: Active Foundation

Implemented:

- FG Lab game-selection landing page.
- Shared game registry in `data/games.js`.
- Clean routes for DBFZ and 2XKO with `file://` hash fallback.
- Netlify `_redirects` support and matching local-server SPA fallback.
- Existing DBFZ app preserved as the active first game portal.
- Legacy DBFZ anchors route to the corresponding DBFZ portal views.
- 2XKO early-build portal with Characters, Duo Builder, Fuses, Synergies, Routes, and Research Vault sections.
- Lightweight 2XKO Research Vault JSON structure.
- Mobile-stacked game cards, roadmap phases, 2XKO navigation, and research records.

Current game status:

- DBFZ: Active.
- 2XKO: Planning / Early Build.

## Decision Support Contract

Status: Active Product Rule

FG Lab helps players make choices instead of acting as a general fighting-game wiki.

Core player jobs:

- Find a partner for a chosen character.
- Diagnose what a team lacks and find suitable fixes.
- Find an easy, technical, defensive, aggressive, or route-focused team.
- Discover shells and routes by practical goal.
- Choose a Fuse for a specific 2XKO duo.
- Understand matchup problems and relevant community tech.

Frame data, move lists, controls, mechanics, and patch notes may support these answers but are not standalone expansion goals.

Implemented data foundation:

- Shared entity contract at `public/data/fg-lab/decision-model.json`.
- Required decision flow: question, context, recommendation, reasons, tradeoffs, next actions.
- Shared relationships from Game to Character, Synergy, Route, Matchup, and Community Note.
- Game config exposes per-game data roots and example player questions.
- Empty 2XKO collections avoid speculative recommendations while giving reviewed content a stable home.

2XKO data files:

- `public/data/2xko/characters.json`
- `public/data/2xko/fuses.json`
- `public/data/2xko/synergies.json`
- `public/data/2xko/routes.json`
- `public/data/2xko/matchups.json`
- `public/data/2xko/community-notes.json`
- `public/data/2xko/research-vault.json`

## 2XKO Synergy Engine

Status: First Prototype

Answers: "Who works well with this character and why?"

Implemented:

- JSON-backed character selection.
- Ranked partner recommendation cards.
- Partner score from 1-10.
- Short reason, difficulty, and reusable tags.
- Selected-character strengths and weaknesses.
- Recommended Fuse and route summaries.
- Compact notes and an explicit Example Data label.
- Responsive three-column, two-column, and one-column layouts.
- Reusable renderer in `synergy-engine.js`.

The prototype uses mock Yasuo, Ahri, Darius, and Ekko records for interface testing. It does not use frame data and does not claim the recommendations are verified.

## 2XKO Research Vault

Status: Internal Collection Tool

Implemented:

- Direct internal route at `/games/2xko/research-vault`.
- Character, Source Type, Source Link, Notes, Tags, and Verification Status fields.
- Local browser persistence for working records.
- Search across characters, sources, notes, and tags.
- Combined Source Type, Verification Status, and Tag filters.
- Source links, seed/local origin, and updated-date tracking.
- JSON export for review and later promotion into synergies, routes, matchups, and Fuse recommendations.
- Responsive two-column and one-column layouts.
- Dedicated `research-vault.js` and `research-vault.css` modules.

The vault is removed from public 2XKO navigation. Static hosting cannot provide real authentication, so the direct route is hidden rather than secured.

## Project Documentation Workflow

Status: Active

`PROJECT_DOCS` is the project source of truth and replaces chat history as primary project memory.

Implemented:

- `VISION.md` defines product direction and principles.
- `ROADMAP.md` tracks project phases, status, and workflow rules.
- `FEATURES.md` tracks implemented and active functionality.
- `FUTURE_IDEAS.md` stores ideas that are not active work yet.
- `CHANGELOG.md` records completed changes.
- `CONTENT_GUIDELINES.md` defines content formatting, tag, DHC, assist, Knowledge Map, Movie Room, and editor rules.
- `TASKS.md` tracks the active project work queue by priority.
- `TASK_REQUEST.md` tracks the currently active implementation request.

Required read order before implementation:

1. `VISION.md`
2. `ROADMAP.md`
3. `FEATURES.md`
4. `CONTENT_GUIDELINES.md`
5. `TASKS.md`
6. `TASK_REQUEST.md`

Required update order after implementation:

1. `CHANGELOG.md`
2. `ROADMAP.md` if status changed.
3. `FEATURES.md` if functionality changed.
4. `TASKS.md` if task priority or completion status changed.

## Team Builder

Status: Active

Fast team creation, recommendations, synergy scoring, team analysis.

Implemented:

- Three-character team slots.
- Click roster portrait to add a character.
- Drag and drop support for team building and reordering.
- Recommended order displayed separately from fixed Point/Mid/Anchor labels.
- Current team choices persist locally in the browser.
- Dark FGC-style visual design with slanted cards, angled panels, portrait art, and game-menu inspiration.
- Bottom roster grid with character portraits.
- Roster filters for role, stat, assist, tag, and note status.
- Roster tag filtering uses grouped categories instead of a giant flat tag list.
- Compact roster inspired by DBFZ character select.
- Character popup opens only from Team Builder context.
- Team Builder modal includes teammate context and synergy rating.
- Team analysis includes Why It Works, Team Synergy grade, Damage, Neutral, Mix, and Support.
- Mobile Team Builder uses compact stacked cards so all three locked fighters can remain visible.

## Training Lab

Status: Active Development

Explains identity, placement, assists, DHC logic, win conditions, why pick, why avoid.

Implemented / planned structure:

- Character Identity.
- What They Contribute.
- Team Placement.
- Partners.
- Assist Analysis.
- DHC Logic.
- Win Conditions.
- Questions.
- Why Pick.
- Why Avoid.
- Final Verdict.

Training Lab should use folder/collapse behavior so users can expand the topic they want instead of scrolling through everything.

## Character Database

Status: Active

Character pages, assists, frame data, strengths, weaknesses and notes.

Implemented:

- Character list and search.
- Character detail page.
- Portrait, name, overview, and tags.
- Strengths and weaknesses.
- Assist cards for A/B/C.
- Recommended positions.
- Synergies.
- Community notes.
- Frame data section.
- Character tab clicks select the character page instead of opening the Team Builder popup.
- TODs/Combos and Matchups placeholders are hidden until real content exists.
- Synergy/DHC notes are formatted into readable sections where possible.
- DHC notes render as structured blocks when source data exists:
  - Who likes DHCing into this character.
  - Why.
  - Who this character likes DHCing into.
  - Why.
  - Special DHC interactions.
- Assist notes render as structured blocks when source data exists:
  - Provides.
  - Best For.
  - Why.
  - Tags.
- Multi-item structured notes render as readable lists instead of merged paragraphs.
- Imported note cleanup repairs common missing separators between content headings.
- Runtime tag cleanup removes duplicate tags, trailing periods, sentence-like tags, and obvious imported PDF fragments.
- Tags are displayed as chips only, not mixed into paragraph text.

Content rules:

- Tags should be short, filterable concepts.
- Long explanation phrases should live in notes, not tags.
- DHC notes should follow the shared DHC format.
- Assist notes should follow the shared assist format.

## Frame Data

Status: Active

Implemented:

- Node Dustloop importer at `scripts/import-dustloop.js`.
- Runnable locally with `npm run import-dustloop`.
- Outputs structured local JSON.
- Saves import report.
- Character pages read frame data from generated local JSON.
- Frame data table supports search and sorting.
- Data source note explains that frame data is imported from Dustloop and stored locally.

Output paths:

- `public/data/dbfz/characters.json`
- `public/data/dbfz/frame-data/*.json`
- `public/data/dbfz/import-report.json`

## Tags, Assists, and Synergies

Status: Active Development

Data files:

- `public/data/dbfz/tags.json`
- `public/data/dbfz/assist-data.json`
- `public/data/dbfz/synergies.json`

Supported ideas:

- Character tags.
- Assist tags.
- Synergy tags.
- Minimum blockstun filters.
- Character-to-character relationship records.
- Optional video links on relationship records.

Required tag style:

- Good: Pressure, Mix, Battery, Grappler, Beam, Lockdown.
- Bad: Characters looking to continue pressure.

Required assist format:

- Provides:
- Best For:
- Why:
- Tags:

Required DHC format:

- Who likes DHCing into this.
- Why.
- Who this character likes DHCing into.
- Why.
- Special interactions.

Current priority work:

- Continue auditing imported DBFZ content now that DHC and assist structured renderers exist.
- Keep tags short and reusable.
- Keep sentence-like tag content in readable note fields.
- Improve grouped filters across characters, assists, synergies, playstyles, and note status.
- Add validation hints for tag length, DHC structure, and assist structure once editor UX begins.

Phase 1 implemented:

- DHC rendering uses the shared structured format.
- Assist rendering uses the shared structured format.
- Character, assist, and synergy tags are normalized before chip/filter use.

Phase 2 implemented:

- Tag dropdowns use grouped categories instead of a raw flat tag dump.
- Grouped categories include Position, Playstyle, Team Role, Assist Type, and Team Needs.
- Assist filter options use curated assist categories such as Beam Assist, Lockdown Assist, Tracking Assist, DP Assist, Combo Extension, and Pressure Assist.
- Filters keep using normalized tag matching so shorter existing tags like Beam can match grouped labels like Beam Assist.

## Knowledge Map

Status: Early Prototype

Connects characters, archetypes, tags, assists, shells and playstyles.

Implemented:

- Connected node system.
- Search and filtering foundation.
- Navigation from related concepts into deeper content.
- Public navigation/page label uses `Knowledge Map`.
- Empty-state and fallback relationship copy explains why links matter where possible.
- Mobile Knowledge Map uses a collapsible browser panel so selected node details appear first.

Needs improvement:

- Connected node types need better scroll/overflow behavior.
- More useful node grouping.
- Shells and full teams should become stronger first-class concepts.
- Connections should explain why items are related, not only say that they are connected.

## Movie Room

Status: Prototype

Character, shell and team study footage.

Implemented / planned:

- Character study pages.
- Shell study pages.
- Team study pages.
- Manually managed links for tournament sets, guides, match footage, and clips.
- Structure ready for future automatic recommendations.

Needs improvement:

- Different visual approach.
- Compact team/shell selectors.
- Cross-save selected team with Team Builder.
- Avoid dumping the full roster inside Movie Room.
- Support clear study modes for character, shell, and full team views.
- Keep selectors compact with small portraits/names rather than rebuilding the roster.

## Playstyle Teams

Status: Active Development

Find teams through preferred fighting game playstyles.

Examples:

- Neutral.
- Footsies.
- Rushdown.
- Mix.
- Setplay.
- Zoning.
- Defensive.
- Beginner Friendly.
- Technical.
- Anchor Focused.

Each playstyle should show recommended characters, shells, example teams, strengths, weaknesses, and neutral explanations.

## Admin Tools

Status: Planned / Early UX Prototype

Inline editing, moderation, contributor workflow.

Current state:

- Admin schema/data structures exist.
- Admin tab is hidden from public navigation.
- Content remains JSON-driven for now.
- Current priority is to begin admin inline editing UX without exposing it publicly.

Future roles:

- Viewer: browse only.
- Contributor: suggest edits.
- Editor: approve and modify character data.
- Admin: full control.

Future editor forms should support:

- Tags.
- Ratings.
- Descriptions.
- Archetypes.
- Partners.
- DHC notes.
- Training Lab content.
- Movie Room links.
- Portrait changes.

Inline editor checklist:

- [ ] Edit buttons visible only to future Editor/Admin roles.
- [ ] Tag editor that encourages short concept tags.
- [ ] DHC editor with fixed sections.
- [ ] Assist editor with Provides, Best For, Why, and Tags fields.
- [ ] Grouped filter editor for role, assist type, tag, note status, and synergy needs.
- [ ] Validation warnings for sentence-like tags and unstructured imported text.
- [ ] Local JSON/export workflow before any real backend exists.

## Data Files

Important current data files:

- `public/data/dbfz/admin-schema.json`
- `public/data/dbfz/assist-data.json`
- `public/data/dbfz/character-content.json`
- `public/data/dbfz/characters.json`
- `public/data/dbfz/frame-data/`
- `public/data/dbfz/guides.json`
- `public/data/dbfz/import-report.json`
- `public/data/dbfz/knowledge-graph.json`
- `public/data/dbfz/movie-room.json`
- `public/data/dbfz/playstyle-teams.json`
- `public/data/dbfz/synergies.json`
- `public/data/dbfz/tags.json`
- `public/data/dbfz/team-building-notes.json`
- `public/data/dbfz/training-lab.json`
- `public/data/dbfz/video-library.json`
