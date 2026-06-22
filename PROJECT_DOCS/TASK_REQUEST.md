# Task Request

Status:
Completed on 2026-06-22.

## Objective

Create the initial decision-first 2XKO character intelligence records using the Noa/DBFZ reasoning order.

## Scope

- Add one small JSON file for Ahri, Braum, Darius, Ekko, Illaoi, Jinx, Yasuo, Senna, and Thresh.
- Use the same character intelligence structure in every file.
- Preserve Identity -> Strengths -> Weaknesses -> Partners -> Fuses -> Routes -> Matchups -> Community Tech.
- Mark every unverified conclusion as TODO instead of inventing advice.
- Keep recommendation arrays ready for future reviewed records.
- Include the files in the existing static build.

## Out Of Scope

- No move lists, commands, frame data, controls, or encyclopedia content.
- No speculative partners, Fuses, routes, or matchup claims.
- No new public character interface.
- No DBFZ data changes.

## Success Criteria

- All nine requested files exist under `data/games/2xko`.
- Every file uses the same keys and value types.
- TODO content is clearly unverified.
- No wiki-style fields are introduced.
- `npm run build` copies the records into `dist`.

## Notes

Research Vault evidence should be reviewed before replacing any TODO value.
