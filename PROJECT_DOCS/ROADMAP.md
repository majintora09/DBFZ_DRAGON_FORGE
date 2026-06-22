# FG Lab Roadmap

Last updated: 2026-06-22

This folder is the project planning source of truth. Future planning should use these docs instead of relying on chat history.

When major features are added or changed, update:

- `ROADMAP.md`
- `FEATURES.md`
- `FUTURE_IDEAS.md`
- `VISION.md`
- `CHANGELOG.md`
- `TASKS.md`
- `TASK_REQUEST.md`

`CONTENT_GUIDELINES.md` remains the quick reference for how character, assist, DHC, and tag content should be written.

## Product Gate

FG Lab is not a wiki. Before promoting work into the roadmap, answer:

1. What player question does this solve?
2. What recommendation or decision does the player receive?
3. What reasoning or evidence supports the answer?
4. What useful next action can the player take?

Work that only duplicates frame data, move lists, controls, basic mechanics, or patch notes should not become a product priority. Reference data is supporting evidence for recommendations, not the destination.

Current `PROJECT_DOCS` structure:

- `ROADMAP.md`
- `FEATURES.md`
- `FUTURE_IDEAS.md`
- `CHANGELOG.md`
- `VISION.md`
- `CONTENT_GUIDELINES.md`
- `TASKS.md`
- `TASK_REQUEST.md`

## Development Workflow

`PROJECT_DOCS` is the project memory and source of truth. Do not rely on chat history for project direction.

Before implementing work, read these files in order:

1. `VISION.md`
2. `ROADMAP.md`
3. `FEATURES.md`
4. `CONTENT_GUIDELINES.md`
5. `TASKS.md`
6. `TASK_REQUEST.md`

After implementation:

1. Update `CHANGELOG.md`.
2. Update `ROADMAP.md` if project status changed.
3. Update `FEATURES.md` if functionality changed.
4. Update `TASKS.md` if task priority or completion status changed.

Use `TASK_REQUEST.md` for the currently active request. Overwrite it whenever a new implementation request starts.

Use `TASKS.md` as the active project work queue.

## Completed

- Internal 2XKO Research Vault collection workspace.
- Local draft persistence, search, source/status/tag filters, and JSON export.
- Research Vault removed from public 2XKO navigation.
- GitHub -> Cloudflare Pages 0 EUR deployment handoff.
- Production output verified without `server.js` or any server runtime.
- Real dependency-free static build output in `dist`.
- Physical route generation for Cloudflare Pages and GitHub Pages.
- Configurable GitHub project-site base path.
- Free Cloudflare Pages and GitHub Pages deployment documentation.
- 2XKO Synergy Engine v1 with ranked partner reasoning.
- Reusable recommendation cards backed by local decision data.
- Shared FG Lab decision-support data contract.
- Modular 2XKO character, Fuse, synergy, route, matchup, and community-note collections.
- Game-config links to decision prompts and per-game data roots.
- FG Lab game-selection landing page.
- Shared game configuration and game-based routing.
- DBFZ portal routing with legacy hash compatibility.
- 2XKO early-build portal and placeholder sections.
- 2XKO Research Vault local data structure.
- Netlify/local-server SPA route fallback.
- Team Builder.
- Character Database.
- Training Lab Prototype.
- Knowledge Map Prototype.
- Movie Room Prototype.
- Playstyle Teams foundation.
- Dustloop frame-data importer and local JSON frame-data pipeline.
- Static/Netlify-friendly data structure.
- Hidden Admin foundation.
- Project documentation system.
- Active task queue and task request workflow.
- Mobile Team Builder all-slot visibility fix.
- Mobile Knowledge Map drawer usability fix.
- Structured DHC/assist list rendering cleanup.

## In Progress

- 2XKO research collection and source verification.
- Character Modal.
- Better Filters.
- Admin Inline Editing.
- Mobile Polish.
- Character page formatting cleanup.
- Training Lab folder/collapse structure.
- Movie Room visual redesign.
- Knowledge Map relationship copy cleanup.
- Team Builder panel clipping and spacing polish.

## Current Priority: Content Formatting + Editor UX

Fix imported DBFZ content formatting, clean tags, improve grouped filters, rename Network to Knowledge Map, improve Movie Room structure, and begin admin inline editing.

This priority is planning-only until implementation starts. The goal is to make the existing content easier to read, easier to filter, and easier to maintain without rebuilding the current visual design.

### Task Checklist

- [ ] Audit imported character content for raw transcript-style formatting.
- [x] Clean DHC notes into the shared structured format.
- [x] Clean assist notes into the shared structured format.
- [x] Move long explanation phrases out of tags and into notes.
- [x] Keep tags short, reusable, and filter-friendly.
- [x] Improve grouped filters for characters, assists, synergies, playstyles, and notes.
- [x] Group filters visually so users can scan by role, assist type, tag, content status, and matchup/team needs.
- [x] Rename the `Network` navigation/page label to `Knowledge Map`.
- [ ] Keep Knowledge Map as the connected-content system for characters, tags, assists, shells, teams, archetypes, and playstyles.
- [x] Improve Knowledge Map relationship copy so it explains the connection instead of using generic text.
- [ ] Improve Movie Room structure for character, shell, and team study views.
- [ ] Make Movie Room selectors compact and synced with the Team Builder team where appropriate.
- [ ] Avoid full roster clutter inside Movie Room.
- [ ] Begin admin inline editing as a controlled editor UX prototype.
- [ ] Keep the public Admin tab hidden until auth/roles are real.
- [ ] Add visual editor forms for tags, ratings, descriptions, partners, DHC notes, Training Lab content, and Movie Room links.
- [ ] Add validation hints based on `CONTENT_GUIDELINES.md`.
- [ ] Update `FEATURES.md`, `CONTENT_GUIDELINES.md`, and `CHANGELOG.md` as each part is implemented.

## Next Up

- Knowledge Map Expansion.
- Movie Room Expansion.
- Question-driven partner and team recommendations.
- Team weakness diagnosis, including anti-zoner and ease-of-use needs.
- 2XKO duo and Fuse recommendation foundations based on verified research.
- Character Editor Prototype.
- PDF Cleanup Pass.
- Full character content polish pass.
- Deeper audit of imported character content for raw transcript-style formatting.
- Grouped filters for characters, assists, synergies, playstyles, and note status.
- Admin/editor validation rules for structured DHC notes, assist notes, and tags.

## Future

- AI Coach.
- Replay Analyzer.
- Auto Clip Discovery.
- Tournament Statistics.
- Community Intelligence.
- Role-based accounts.
- Contributor/editor/admin moderation flow.
- Database-backed admin system if the project moves beyond static JSON.

## Product Direction

FG Lab is a multi-game fighting game companion platform. Each game receives its own lab while sharing game selection, routing, mobile foundations, and future community systems.

Current game portals:

- Dragon Ball FighterZ: active and feature-complete enough for team-building use.
- 2XKO: planning/early build, focused on research collection before recommendations.

The DBFZ Lab continues evolving from a simple Team Builder into a DBFZ companion app:

- Team Builder: quick recommendations and team assembly.
- Training Lab: deep reasoning behind shells, assists, DHCs, archetypes, and win conditions.
- Character Database: structured per-character knowledge, frame data, tags, assists, and notes.
- Playstyle Teams: discovery based on how someone likes to play fighting games.
- Movie Room: curated study resources for characters, shells, and teams.
- Knowledge Map: connected navigation through characters, tags, assists, shells, archetypes, and playstyles.

## FG Lab Platform Phases

### Phase 1: Platform Foundation

- [x] Game selection landing page.
- [x] Shared game config.
- [x] Game-based routing.
- [x] Mobile-first game cards and portal navigation.
- [x] Keep DBFZ stable and preserve legacy hashes.

### Phase 2: DBFZ Completion

- [ ] Complete character pages.
- [ ] Complete assist and team-role data.
- [ ] Complete synergy tags and routes.

### Phase 3: 2XKO Expansion

- [x] Decision-support data foundation.
- [x] Mock character recommendation flow.
- [x] Ranked duo recommendation prototype.
- [ ] Fuse explanations.
- [ ] Tag routes and matchup notes.

### Phase 4: Community Features

- [ ] Submit tech and routes.
- [ ] Upvotes.
- [ ] Creator/player profiles.

## Roadmap Priorities

### 1. Team Builder Stability

- Preserve the current desktop visual design.
- Keep the roster visible and fast to use.
- Keep character popup behavior limited to Team Builder.
- Show teammate context and synergy rating in the modal.
- Keep Strengths, Why It Works, and Synergy panels from clipping content.
- Keep the vertical FGC-style "fighters locked" label, but avoid oversized text.

### 2. Character Database Polish

- Make character pages readable without opening the Team Builder modal.
- Clean character Synergies and DHC notes into sections.
- Avoid raw transcript-style text.
- Keep TODs/Combos and Matchups hidden until real content exists.
- Show tags, but do not flood pages with long tag walls.
- Keep DBZ Broly tagged as Grappler.

### 3. Training Lab Content Structure

Training Lab should explain why teams work and why they fail. It should use the PDF/team-building notes as the primary reasoning source where available.

Core sections:

- Character Identity.
- What They Contribute.
- Team Placement.
- Assist Analysis.
- DHC Synergy.
- Team Archetypes.
- Win Conditions.
- Team Building Questions.
- Why Pick.
- Why Avoid.
- Final Verdict.

Content should be grouped into expandable folders so users do not scroll through every character/topic at once.

### 4. Content Cleanup Standard

Merge the rules from `CONTENT_GUIDELINES.md` into all future content work.

Phase 1 implemented:

- DHC notes render in structured fields when source data exists.
- Assist notes render in structured fields when source data exists.
- Runtime tag cleanup removes duplicates, periods, sentence-like tags, and obvious PDF fragments before tags become chips or filters.
- Tags are displayed as chips only; explanatory copy belongs in structured notes.

Phase 2 implemented:

- The giant flat tag dropdown has been replaced with grouped filter categories.
- Public navigation uses `Knowledge Map` instead of `Network`.
- Knowledge Map empty and fallback relationship copy now explains why links matter instead of using generic database wording.

Grouped filter categories:

- Position: Point, Mid, Anchor.
- Playstyle: Rushdown, Neutral, Mix, Setplay, Zoner, Grappler, Defensive, Technical.
- Team Role: Battery, Support, Enabler, Finisher, Anchor, Glue, Generalist, Specialist.
- Assist Type: Beam Assist, Lockdown Assist, Tracking Assist, DP Assist, Combo Extension, Pressure Assist.
- Team Needs: Meter Build, Corner Carry, Reliable Confirms, Neutral Control, Easy Gameplan, High Damage, Beginner Friendly.

Tags should be short concepts, not sentences.

Good tags:

- Pressure.
- Mix.
- Battery.
- Grappler.
- Lockdown.
- Beam.

Bad tags:

- Characters looking to continue pressure.
- Allows teams to convert neutral wins into stronger rewards.
- Characters that love DHCing into this character.

DHC notes should use:

- Who likes DHCing into this.
- Why.
- Who this character likes DHCing into.
- Why.
- Special interactions.

Assist notes should use:

- Provides.
- Best For.
- Why.
- Tags.

Keep descriptions short, structured, and easy to scan.

Focused bugfix pass completed:

- DHC and assist sections support multi-item list rendering.
- Imported notes repair common glued headings before rendering.
- Mobile Team Builder uses compact cards so all three fighters remain visible.
- Mobile Knowledge Map collapses the browser panel so selected node content is visible sooner.

### 5. Data and Import Systems

- Keep Dustloop imports local and static-site friendly.
- Store imported frame data as JSON under `public/data/dbfz/frame-data`.
- Improve Dustloop slug coverage.
- Improve move ordering and grouping.
- Keep local JSON editable until a real admin/database layer exists.

### 6. Mobile and Responsive Work

- Do not shrink the desktop site into mobile.
- Build dedicated responsive layouts.
- Mobile order should prioritize:
  - Team Builder.
  - Team Synergy Grade.
  - Why It Works.
  - Selected/Modal details.
  - Roster.
- Avoid horizontal page scrolling except inside frame-data tables when unavoidable.
- Keep tap targets at least 44px.

## Deployment Constraint

FG Lab deploys as a static `dist` folder to free hosting.

Do not assume:

- Laravel.
- PHP.
- Artisan commands.
- Server database.
- Live browser scraping.
- Iframe frame-data embeds.

Current workflow:

```bash
npm install
npm run import-dustloop
npm run build
```

Build output: `dist`.

Supported free hosts:

- Cloudflare Pages.
- GitHub Pages.
- Netlify static upload.

No runtime server or database is required.
