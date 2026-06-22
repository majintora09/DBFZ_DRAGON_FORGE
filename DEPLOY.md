# Deploying FG Lab

FG Lab builds to a completely static `dist` folder. Production hosting does not need Node, a server, a database, or a paid service.

## Build Locally

```powershell
npm install
npm run build
```

Build output: `dist`

Optional local preview:

```powershell
npm run preview
```

Open `http://127.0.0.1:4173`.

## Cloudflare Pages

Cloudflare Pages can deploy the repository on its free plan.

For the focused GitHub -> Cloudflare walkthrough, see `CLOUDFLARE_PAGES.md`.

1. Push the project to GitHub.
2. In Cloudflare, open **Workers & Pages** and create a Pages project.
3. Connect the GitHub repository.
4. Use these build settings:
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave blank
   - Node version: `20`
5. Deploy.

No environment variables are required for a normal `*.pages.dev` deployment. The generated `_redirects` file provides the static fallback, and physical route pages keep direct links refreshable.

## GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`.

1. Push the repository to GitHub using the `main` branch.
2. Open **Settings -> Pages**.
3. Set **Source** to `GitHub Actions`.
4. Run **Deploy FG Lab to GitHub Pages**, or push to `main`.

The workflow automatically builds with:

```text
FG_LAB_BASE_PATH=/<repository-name>/
```

This keeps scripts, JSON, images, navigation, and direct route refreshes working on GitHub project Pages. The deployment artifact is the `dist` folder.

To build the GitHub Pages version locally in PowerShell:

```powershell
$env:FG_LAB_BASE_PATH = "/YOUR_REPOSITORY_NAME/"
npm run build
Remove-Item Env:FG_LAB_BASE_PATH
```

## Static Route Support

The build generates physical `index.html` files for:

- FG Lab home and roadmap.
- All DBFZ portal routes.
- All current 2XKO portal routes.
- 2XKO Research Vault and Synergy Engine.

It also generates:

- `dist/404.html` for GitHub Pages fallback.
- `dist/_redirects` for Cloudflare Pages fallback.
- `dist/.nojekyll` for GitHub Pages.
- `dist/build-info.json` with the base path and generated route list.

## Deployment Boundaries

- No paid service is required.
- No database is required.
- No production server process is required.
- `server.js` is only a local preview helper.
- Dustloop imports remain a local content preparation step, not live production scraping.
