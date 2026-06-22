# Task Request

Status:
Completed on 2026-06-22.

## Objective

Turn the 2XKO Research Vault into a practical internal content collection system.

## Scope

- Capture Character, Source Type, Source Link, Notes, Tags, and Verification Status.
- Persist working records locally in the browser.
- Search records and filter by source, status, and tag.
- Track source links and record dates.
- Export the combined vault as JSON for review and later data promotion.
- Keep the direct internal route while removing it from public 2XKO navigation.
- Keep the implementation static, modular, and small.

## Out Of Scope

- No public wiki presentation.
- No backend, account system, database, or cloud write API.
- No automatic promotion into recommendations.
- No public submission workflow.
- No DBFZ changes.

## Success Criteria

- Internal users can add and retain research records locally.
- Search and combined filters update results immediately.
- Tags are normalized into reusable chips.
- Source links and verification states remain visible.
- Exported JSON can become the reviewed source for synergies, routes, matchups, and Fuse recommendations.
- The vault is not linked from public 2XKO navigation.

## Notes

The direct route is hidden, not authenticated. Real access control requires a future backend and role system.
