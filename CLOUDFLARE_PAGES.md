# Cloudflare Pages: GitHub Deployment

FG Lab can deploy from GitHub to Cloudflare Pages for 0 EUR per month using the free `pages.dev` domain.

## One-Time Setup

1. Push the project to a GitHub repository.
2. Sign in to Cloudflare and open **Workers & Pages**.
3. Choose **Create application -> Pages -> Connect to Git**.
4. Select the FG Lab GitHub repository.
5. Configure the build:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: leave blank
   - Node version: `20`
6. Leave environment variables empty.
7. Choose **Save and Deploy**.

Cloudflare will install the project, run the static build, and publish only `dist`.

## Future Deployments

Push changes to `main`. Cloudflare Pages automatically rebuilds and deploys the new `dist` output.

## Routing

The build creates physical pages for every current FG Lab route and copies `_redirects` into `dist`:

```text
/* /index.html 200
```

This allows direct links and browser refreshes without a production server.

## Production Boundaries

- `server.js` is not included in `dist`.
- No Cloudflare Functions are required.
- No Workers are required.
- No database is required.
- No paid Cloudflare feature is required.
- No custom domain purchase is required; the generated `*.pages.dev` address is free.

## Verify Before Pushing

```powershell
npm install
npm run build
npm run preview
```

Open `http://127.0.0.1:4173`, test the main routes, then stop the local preview. The preview server is only a local check and is never used by Cloudflare Pages.
