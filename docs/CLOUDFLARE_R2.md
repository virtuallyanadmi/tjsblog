# Cloudflare R2 + Worker for Sanity image caching

This document explains how to create an R2 bucket and a Cloudflare Worker that proxies Sanity CDN images, stores them in R2, and serves them from a custom domain (e.g., `images.thejonathanstewart.com`).

## Overview
- Worker receives requests like `https://images.thejonathanstewart.com/<path-to-sanity-asset>`
- Worker checks R2 (binding `IMAGES`) for the object key
- If present, returns it with long `Cache-Control`
- If missing, fetches from Sanity CDN (`https://cdn.sanity.io/...`), saves to R2, then returns

## Files added
- `cloudflare/r2-worker/worker.js` — worker script
- `cloudflare/r2-worker/wrangler.toml` — wrangler config template

## Steps
1. Create an R2 bucket
   - In Cloudflare dashboard -> R2 -> Create bucket (e.g., `tjsblog-images`)

2. Install Wrangler (Cloudflare CLI)

```bash
npm install -g @cloudflare/wrangler
# or add to dev deps
npm install --save-dev wrangler
```

3. Configure `wrangler.toml`
- Open `cloudflare/r2-worker/wrangler.toml`
- Set `account_id` to your Cloudflare Account ID
- (Optional) set `routes` or configure a custom domain in the dashboard
- The R2 bucket binding is already declared as `IMAGES` -> `tjsblog-images`

4. Bind the bucket and deploy

```bash
# login once (if not already authenticated)
wrangler login
# deploy the worker from its folder
cd cloudflare/r2-worker
wrangler deploy
```

- Add a custom domain for the Worker (recommended):
  1. Dashboard -> Workers -> Your Worker -> Add route -> `images.thejonathanstewart.com/*`.
  2. In Cloudflare DNS for `thejonathanstewart.com`, create a CNAME record:
     - **Name**: `images`
     - **Target**: the `*.workers.dev` subdomain shown for your Worker (e.g. `tjsblog-images-proxy.going2timbuktu.workers.dev`).
     - Enable proxying (orange cloud) to ensure TLS and routing.

6. Set `PUBLIC_IMAGE_CDN_URL` in your Astro host to `https://images.thejonathanstewart.com`
- Vercel/Netlify/Cloudflare Pages: add env var in project settings
- Rebuild and redeploy the Astro site

7. Verify
- Open a page with images; confirm `img[src]` points to `https://images.thejonathanstewart.com/...` and the Worker returns images with `Cache-Control: public, max-age=31536000, immutable`.

## Notes
- The Worker stores objects under the requested path. If you want a different key format, update `worker.js` key calculation.
- R2 object lifecycle: consider adding a cleanup policy or lifecycle rules for stale objects.
- The Worker script provided is a basic example; consider adding more robust error handling, logging, or image transforms if needed.

If you'd like, I can:
- Create a `wrangler` publish script in `package.json`.
- Generate a Cloudflare Pages + Worker configuration if you're deploying Astro to Cloudflare.
- Add signed URL support or TTL controls for the proxy.
