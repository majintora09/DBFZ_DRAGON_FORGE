# Content Guidelines

Use this file as the quick reference for content cleanup, imported transcript cleanup, and future editor validation.

Current priority: Content Formatting + Editor UX.

Focus:
- Fix imported DBFZ content formatting.
- Clean tags.
- Improve grouped filters.
- Rename Network to Knowledge Map.
- Improve Movie Room structure.
- Begin admin inline editing.

Phase 1 implemented:
- DHC notes render through the shared structured format when source data exists.
- Assist notes render through the shared structured format when source data exists.
- Tags are normalized before they become chips or filters.
- Tags must remain chips only; explanatory text belongs in note sections.

Phase 2 implemented:
- Tag filters use grouped categories instead of a giant flat tag dropdown.
- Public navigation uses `Knowledge Map` instead of `Network`.
- Knowledge Map fallback copy should explain the connection or what data is missing.

## Decision-Oriented Content

FG Lab content should answer a player question, not imitate a wiki entry.

Use this order whenever possible:

1. State the player need or question.
2. Give the recommendation first.
3. Explain why it fits.
4. Name the tradeoffs or failure cases.
5. Give a useful next step, route, partner, Fuse, matchup adjustment, or study link.

Good:
- Pair this character with a neutral assist because the shell already has damage but struggles to start offense.
- Use this Fuse when the duo needs safer tag pressure; choose the alternative when damage matters more than stability.

Bad:
- A raw move list with no team-building purpose.
- A long mechanics explanation that never tells the player what to choose.
- Reference facts presented without a practical recommendation.

Community tech should identify the use case, required character or team, setup, payoff, risk, source, and verification status.

Decision records should use stable IDs to connect games, characters, Fuses, synergies, routes, matchups, sources, and community notes. Keep unverified collections empty rather than filling them with assumptions.

For 2XKO character support, preserve:

- Overview.
- Strengths.
- Weaknesses.
- Recommended partner IDs.
- Recommended Fuse IDs.
- Matchup IDs.
- Route IDs.
- Community note IDs.

These fields support recommendations and relationship tools. They should not be rendered as a giant wiki article.

## Partner Recommendation Format

Each partner recommendation should include:

- Character ID.
- Partner ID.
- Score from 1-10.
- One direct reason.
- Difficulty.
- Short reusable tags.

The card should answer "Why is this partner recommended?" without requiring expansion. Mock or unverified records must carry a visible status label.

## Research Vault Record Format

Required fields:

- Match.
- Teams.
- Timestamp.
- Raw observation.
- Reusable tags.
- Confidence: Low, Medium, or High.
- Review Status: Raw Observation, Needs Review, or Approved for Extraction.

Rules:

- Collection notes are internal evidence, not public guide copy.
- Keep claims attached to their source.
- Do not promote unverified records into recommendation data.
- Tags should describe future uses such as Synergy, Routes, Matchups, Fuses, or a practical team need.
- Do not write directly into synergy files from raw observations.
- Review observations before creating Character Notes, Synergy Files, Route Entries, Fuse Notes, or Matchup Notes.
- Export reviewed extraction candidates before merging anything into static source JSON.

## 2XKO Character Intelligence Format

Use the Noa reasoning order:

1. Character.
2. Identity.
3. Strengths.
4. Weaknesses.
5. Partners.
6. Fuses.
7. Routes.
8. Matchups.
9. Community Tech.

Rules:

- Keep every character file small and manually editable.
- Use the same keys and value types across the roster.
- Leave recommendation arrays empty until reviewed evidence exists.
- Mark unverified prose with `TODO:`.
- Promote evidence from Research Vault only after source and verification review.
- Never add move lists, frame data, commands, controls, or general encyclopedia sections.

## 2XKO Character Decision Page Format

The 2XKO user flow should start from:

- I play this character. What should I do next?

Recommended page order:

1. Who is this character?
2. What does this character want?
3. Who should I pair them with?
4. What Fuses should I consider?
5. What routes should I learn first?
6. Research status.
7. Latest observations.

Rules:

- Separate Verified, Potential, and Research In Progress recommendations.
- Do not present mock or unreviewed research as verified.
- Use Research Vault observations as evidence, not conclusions.
- Show incomplete data as "Research in progress" instead of dumping TODO text.
- Keep the page useful before all data is verified by showing what is known, what is potential, and what still needs review.

## 2XKO Synergy File Format

Use one file per unique unordered pair.

Rules:

- Normalize filenames alphabetically: `ahri-yasuo.json`, regardless of selection order.
- Keep `team` as the same two canonical slugs.
- Leave `rating` and `difficulty` null until verified.
- Keep playstyles, strengths, weaknesses, Fuses, routes, notes, and sources empty until evidence exists.
- Store every supporting source as a separate entry in the `sources` array.
- Keep `verified` false until the complete recommendation has been reviewed.
- Normal generator runs must never overwrite researched pair files.
- Do not add move, frame, command, or matchup encyclopedia content.

## Tags
Good:
- Pressure
- Mix
- Battery
- Grappler
- Beam
- Lockdown
- Neutral
- Setplay
- Meter Build

Bad:
- Characters looking to continue pressure.
- Allows teams to convert neutral wins into stronger rewards.
- Characters that love DHCing into this character.
- Needs assists to cover weak neutral and extend pressure.

Rules:
- Tags should be short concepts.
- Tags should be reusable across multiple characters, assists, teams, and playstyles.
- Tags should work as filters.
- Long explanations belong in notes, not tags.
- Runtime cleanup removes trailing periods, duplicate tags, full sentence tags, comma-heavy fragments, and obvious imported PDF fragments.
- If cleanup removes a phrase, preserve the meaning in `Why`, `Provides`, `Best For`, DHC notes, or regular description text instead of forcing it back into tags.

## DHC Notes Format
Use this structure for character pages, Training Lab sections, and editor forms:

- Who likes DHCing into this:
- Why:
- Who this character likes DHCing into:
- Why:
- Special interactions:

Rules:
- Keep each section short.
- Use bullets when there are multiple examples.
- Explain the practical team-building reason.
- Avoid repeating the character name every sentence.
- Do not paste raw transcript paragraphs.
- Do not put these section headings or their full sentences into tags.

## Assist Format
Use this structure for assist notes and editor forms:

- Provides:
- Best For:
- Why:
- Tags:

Rules:
- `Provides` should explain the assist function.
- `Best For` should identify the team need or archetype.
- `Why` should explain the practical reason.
- `Tags` should stay short and filterable.
- Do not mix assist tags into paragraph copy.
- Do not turn full assist explanations into tags.

## Grouped Filters

Filters should be grouped by purpose:

- Position: Point, Mid, Anchor.
- Playstyle: Rushdown, Neutral, Mix, Setplay, Zoner, Grappler, Defensive, Technical.
- Team Role: Battery, Support, Enabler, Finisher, Anchor, Glue, Generalist, Specialist.
- Assist Type: Beam Assist, Lockdown Assist, Tracking Assist, DP Assist, Combo Extension, Pressure Assist.
- Team Needs: Meter Build, Corner Carry, Reliable Confirms, Neutral Control, Easy Gameplan, High Damage, Beginner Friendly.
- Content Status: Polished, Needs Cleanup, Missing Data.

Rules:
- Filters should combine cleanly.
- Avoid dumping every tag at once.
- Prefer collapsible groups when there are many options.
- Filter labels should be short and readable.
- Grouped filters should use curated concepts first, not every raw imported tag.
- Keep values compatible with normalized tag matching so `Beam Assist` can still find content tagged `Beam`.

## Knowledge Map Naming

Use `Knowledge Map` as the public label.

Avoid:
- Network.

Rules:
- Knowledge Map connections should explain why two things are related.
- Avoid generic copy like "X is connected to Y through character data."

## Movie Room Structure

Movie Room should support:

- Character study.
- Shell study.
- Team study.

Rules:
- Use compact selectors.
- Reuse current Team Builder selections where possible.
- Avoid showing a full roster inside Movie Room unless the user explicitly chooses to change characters.
- Show small portraits/names for selected characters.

## Admin Inline Editing

Inline editing should eventually support:

- Tags.
- Ratings.
- Descriptions.
- Archetypes.
- Partners.
- Assist notes.
- DHC notes.
- Training Lab content.
- Movie Room links.

Rules:
- Keep Admin hidden until auth/roles exist.
- Use forms, not raw JSON editing.
- Add validation hints based on these guidelines.
- Contributors should suggest; Editors/Admins should publish.

Keep descriptions short, structured and easy to scan.

## Research Entry Standard

Research is evidence for later recommendations, not a recommendation by itself.

Research happens in two stages.

Stage 1: Raw Match Observation.

Each raw observation should record:

- Match.
- Teams.
- Timestamp for the relevant video, VOD, message, or observation.
- A factual observation describing what was shown, claimed, or tested.
- Short reusable tags.
- Confidence: Low, Medium, or High.
- Source type and link when available.

Stage 2: Knowledge Extraction.

After review, observations may be converted into:

- Character Notes.
- Synergy Files.
- Route Entries.
- Fuse Notes.
- Matchup Notes.

Approval means the observation is ready for extraction. It does not automatically verify the entire pairing, assign a rating, establish a matchup conclusion, or write into the canonical database. Keep observations separate from conclusions, and retain source metadata during export.
