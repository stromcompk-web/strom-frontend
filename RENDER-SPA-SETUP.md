# Fix 404 on direct URLs (e.g. /admin, /checkout) on Render

When you open a link like `strom.com.pk/admin` or refresh on `/admin`, the **server** gets the request. It looks for a file at `/admin` and finds nothing, so it returns **404**. When you click "Admin" in the footer, the app is already loaded and **React Router** handles `/admin` in the browser, so it works.

**Fix:** Tell Render to serve `index.html` for all paths (SPA fallback). Then the server always returns your app and React Router can show the right page.

## Option A: Render Dashboard (recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Open your **Static Site** (the frontend for strom.com.pk).
3. Go to **Redirects/Rewrites** (in the left sidebar or Settings).
4. Click **Add Rule** and set:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** **Rewrite** (not Redirect)
5. Save. Redeploy if needed.

After this, direct visits or refresh on `/admin`, `/checkout`, `/cart`, etc. will load the app and show the correct page.

## Option B: Blueprint (render.yaml)

If you use a Render Blueprint, add a `routes` section to your static site with a rewrite. Example (in the service that serves this frontend):

```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

If your Blueprint is in this repo, ensure the static site has `staticPublishPath: ./dist` (Vite default) and the above `routes`.
