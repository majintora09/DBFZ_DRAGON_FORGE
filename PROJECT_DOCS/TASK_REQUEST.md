# Task Request

Status:
Completed on 2026-06-23.

## Objective

Redesign the 2XKO player experience around "I play X. What should I do next?" instead of exposing architecture/modules.

## Scope

- Replace the 2XKO overview module grid with an "I play..." champion selector.
- Use all currently tracked 2XKO champions.
- Clicking a champion opens a character decision page.
- Character pages show identity, playstyle, difficulty, archetypes, needs, likes, partner buckets, Fuse buckets, routes, research status, and latest observations.
- Pull latest observations from Research Vault records.
- Keep DBFZ stable and do not rebuild the whole app.

## Out Of Scope

- No AI APIs or generated gameplay conclusions.
- No external services, database, authentication system, or production server.
- No wiki-style 2XKO pages.
- No frame data, command lists, or move lists.
- No speculative verified recommendations.
- No public Research Vault navigation.

## Success Criteria

- `/games/2xko` immediately asks the player who they play.
- Champion selector includes Ahri, Akali, Blitzcrank, Braum, Caitlyn, Darius, Ekko, Illaoi, Jinx, Senna, Teemo, Thresh, Vi, Warwick, and Yasuo.
- `/games/2xko/characters/{champion}` renders a decision page.
- Character pages show Verified, Potential, and Research In Progress buckets for partners and Fuses.
- Research status counts observations, verified synergies, verified routes, and community notes.
- Latest observations render directly from Research Vault data.
- Mobile layout stacks without horizontal overflow.
- Static build includes physical character decision routes.

## Notes

Unverified and mock records must be labeled as potential or research, never as verified gameplay conclusions.
