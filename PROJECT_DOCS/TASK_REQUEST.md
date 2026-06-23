# Task Request

Status:
Completed on 2026-06-23.

## Objective

Update the Research Vault into a two-stage workflow that separates raw match observations from reviewed knowledge extraction.

## Scope

- Stage 1 stores raw match observations with match, teams, timestamp, observation, tags, and confidence.
- Stage 2 marks reviewed observations as extraction candidates for Character Notes, Synergy Files, Route Entries, Fuse Notes, or Matchup Notes.
- Update the Vault UI copy, form fields, filters, review controls, and exports to match the two-stage workflow.
- Add reusable JSON schemas for research, synergy, route, and matchup entries.
- Keep data local JSON only.

## Out Of Scope

- No AI APIs or generated gameplay conclusions.
- No external services, database, authentication system, or production server.
- No direct writing into synergy files from raw observations.
- No automatic overwrite of repository synergy, route, Fuse, matchup, or character-note files from the browser.
- No public navigation link for the internal Research Vault.

## Success Criteria

- Raw observations persist locally as JSON in browser storage and can be exported.
- Existing v1/v2 local entries migrate into the new normalized observation schema.
- Review stage changes persist locally.
- Only reviewed/approved observations can be exported as extraction candidates.
- Exports keep extracted Character Notes, Synergy Files, Route Entries, Fuse Notes, and Matchup Notes empty until manually filled.
- Search and filters work across match, teams, source, review stage, confidence, tags, and extraction targets.
- Reusable schemas exist for `research-entry.json`, `synergy-entry.json`, `route-entry.json`, and `matchup-entry.json`.
- The Vault remains responsive and absent from public 2XKO navigation.

## Notes

The browser cannot safely write into the repository. The Vault now exports reviewed extraction candidates, not final gameplay conclusions. A human should convert those candidates into canonical character notes, synergy files, routes, Fuse notes, or matchup notes.
