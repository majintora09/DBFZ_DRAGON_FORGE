# Task Request

Status:
Completed on 2026-06-22.

## Objective

Prepare FG Lab for a 0 EUR GitHub-to-Cloudflare Pages deployment.

## Scope

- Keep `npm run build` as a complete static export to `dist`.
- Remove any production-facing dependency on `server.js`.
- Verify all generated routes and runtime assets.
- Preserve `_redirects` in the production output.
- Add exact Cloudflare Pages GitHub deployment instructions.
- Pin the Cloudflare build environment to Node 20.

## Out Of Scope

- No paid services.
- No database, Workers, Functions, or production server.
- No visual or content changes.
- No custom domain requirement.

## Success Criteria

- Cloudflare publishes only `dist`.
- `dist` contains no `server.js`, package scripts, or server runtime.
- Every known route has a physical page and static fallback.
- Instructions describe the GitHub -> Cloudflare Pages flow.
- Monthly hosting cost can remain 0 EUR.

## Notes

`server.js` may remain as an explicitly local-only `dev` and `preview` helper.
