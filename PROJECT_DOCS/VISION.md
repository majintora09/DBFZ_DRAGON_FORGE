# FG Lab Vision

Last updated: 2026-06-22

FG Lab explains WHY fighting game teams and systems work, not just WHAT to play.

The platform supports multiple game-specific labs without flattening every game into the same tool. Dragon Ball FighterZ remains the active first lab. 2XKO begins as a research-led early build.

## Decision-First Product Rule

FG Lab is a decision tool, not a wiki.

Existing resources already cover frame data, move lists, controls, basic mechanics, and patch notes. FG Lab may use those facts as supporting evidence, but reproducing them is not the product goal.

The north-star interaction is:

**Player question -> clear recommendation -> practical reasoning -> next action.**

Examples:

- I play Yasuo. Who should I pair with?
- My team struggles against zoners. What should I change?
- I want an easy team. What fits?
- I want high-damage tag routes. Which shell supports that?
- What Fuse should I use with Ahri + Ekko?

Every future feature should help answer a real player decision. A feature that only displays more reference information is not enough.

## What Team Lab Is

- A multi-game fighting game knowledge platform.
- Team Builder.
- Training Lab.
- Character Database.
- Knowledge Map.
- Movie Room.
- Playstyle Teams.
- A DBFZ companion app and interactive strategy guide.

Each game keeps its own identity, terminology, data, and feature maturity while sharing navigation and platform foundations.

## What Team Lab Is Not

- A tier list website.
- A generic AI recommendation engine.
- A combo database first.
- A spreadsheet with portraits.
- A place for raw transcript dumps.
- A replacement for frame-data, move-list, controls, mechanics, or patch-note resources.
- A content archive that displays information without helping the player choose or act.

## North Star

A player should leave understanding who to pair a character with, what the team lacks, and what to study next.

The long-term promise is: **Tell me what works together and why.**

More specifically, a player should be able to answer:

- What does this character give my team?
- What does this character need from teammates?
- What order should this team use?
- What assists make the plan stable?
- What DHC routes or shell ideas matter?
- What playstyle does this team support?
- Why would I pick this shell over another shell?
- What am I giving up by choosing this team?

## Core Belief

Good team building is not just picking strong characters. It is understanding how characters solve each other's problems.

The site should make team logic visible:

- Neutral coverage.
- Pressure continuation.
- Mix support.
- Meter build.
- Cashout.
- DHC routes.
- Defensive stability.
- Anchor value.

## Product Pillars

### Fast Team Building

The Team Builder should stay quick, visual, and low-friction.

Players should be able to:

- Pick a character.
- See recommended partners.
- Build a 3-character team.
- Reorder the team.
- Understand the team identity.
- Get a readable synergy grade.

This part should not become a wall of text.

### Deep Training Lab

The Training Lab explains the reasoning behind recommendations.

It should cover:

- Character identity.
- What each character contributes.
- Team placement.
- Shell structures.
- Assist logic.
- DHC logic.
- Win conditions.
- Why pick.
- Why avoid.
- Final verdicts.

### Character Decision Support

Character content should help players decide:

- Who pairs well with this character and why.
- What team problems this character solves or creates.
- Which position, assist, Fuse, or shell fits the intended plan.
- Which route goals and matchup problems the character supports.
- Why to pick or avoid the character for a specific player need.
- What community tech is relevant and how to use it.

Reference data may support those answers, but it should not become the centerpiece of the page.

### Connected Knowledge Map

Characters should not feel isolated.

Tags, assists, playstyles, shells, archetypes, and teams should connect together so users can explore relationships like:

- Base Vegeta -> Battery -> Cashout -> Adult Gohan.
- Android 18 -> Lockdown -> Barrier Safety -> Mix teams.
- Kid Buu A -> High Blockstun -> Enables 50/50.
- DBZ Broly -> Grappler -> Anchor -> Defensive shells.

Clicking a concept should lead to related content.

## Content Philosophy

The site should avoid fake certainty and avoid messy transcript-style writing.

Content should be:

- Practical.
- Clearly sourced when possible.
- Easy to scan.
- Written like a player explaining useful concepts to another player.
- Structured into sections rather than raw paragraphs.
- Neutral when describing playstyles or community opinions.

Tags should be short concepts:

- Good: Pressure, Mix, Battery.
- Bad: Characters looking to continue pressure.

DHC notes should be structured:

- Who likes DHCing into this.
- Why.
- Who this character likes DHCing into.
- Why.
- Special interactions.

Assist notes should be structured:

- Provides.
- Best For.
- Why.
- Tags.

Descriptions should stay short, structured, and easy to scan.

AI can help summarize and structure information, but trusted human reasoning and community review should remain the foundation.

## Visual Direction

The site should feel like a modern fighting game tool, not a spreadsheet.

Visual goals:

- Dark premium UI.
- FGC menu energy.
- Slanted cards and angled panels.
- Big readable character portraits.
- Clean visual hierarchy.
- Strong roster presentation.
- Minimal clutter.
- Functional first, stylish second.

Reference feeling:

- DBFZ character select.
- Riot client.
- Mobalytics.
- Dustloop usefulness.
- Street Fighter 6 / Tekken 8 menu energy.

The design target is:

- 40% visual showcase.
- 60% functional team-building tool.

## Deployment Philosophy

Current deployment is fully static and compatible with Netlify, Cloudflare Pages, and GitHub Pages.

That means:

- No Laravel.
- No PHP.
- No Artisan.
- No live scraping in the browser.
- No iframe dependency for frame data.
- Local JSON should power the site.
- Node scripts can import/build data locally before deployment.
- Production hosting should only publish the generated `dist` folder.
- No production server or database is required.

Future backend/database work is possible, but it should be planned deliberately and not assumed during normal feature work.
