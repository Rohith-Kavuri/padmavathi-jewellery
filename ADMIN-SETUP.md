# Admin page (Decap CMS) — setup

The site has an admin page at **/admin/** where you can change the homepage
hero banners, category and product photos, names (English + Telugu), prices, weights, badges and
descriptions — without touching code.

Every **Publish** in the admin saves a commit to GitHub (`main` branch) and
Netlify rebuilds the site automatically, so changes are live in ~1 minute.

---

## 1. Try it on your computer first

Open two terminals in the project folder.

Terminal 1 — the site:

```bash
npm run dev
```

Terminal 2 — the local admin helper:

```bash
npx decap-server
```

Then open **http://localhost:5173/admin/index.html**

- No login is needed locally.
- Changes and uploaded photos are saved straight into your project files
  (`src/content/*.json` and `public/images/uploads/`), so the site at
  http://localhost:5173 shows them immediately.
- When you're happy, commit and push as usual:

```bash
git add -A
git commit -m "Update catalogue photos"
git push
```

---

## 2. Turn on login for the live site (one time, ~10 minutes)

### a. Create a GitHub OAuth app

1. github.com → profile picture → **Settings** → **Developer settings** →
   **OAuth Apps** → **New OAuth App**
2. Fill in:
   - Application name: `Padmavathi Admin`
   - Homepage URL: `https://padmavathijewellery.netlify.app`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
3. **Register application** → copy the **Client ID** → click
   **Generate a new client secret** → copy the secret.

### b. Add it to Netlify

1. app.netlify.com → your site → **Site configuration** →
   **Access & security** → **OAuth**
2. Under **Authentication providers** → **Install provider** → **GitHub**
3. Paste the Client ID and Client secret → **Install**.

### c. Use it

Open **https://padmavathijewellery.netlify.app/admin/** →
**Login with GitHub** → edit → **Publish**.

---

## 3. Letting other people edit

Anyone who logs in needs **write access** to the GitHub repo:
github.com → the repo → **Settings** → **Collaborators** → **Add people**.
They create a free GitHub account and accept the invite.

---

## Changing photos

**Category card photo** (the big cards under "Shop by category"):
Catalogue → Categories → click the category → *Category card photo* →
**Choose an image** (or **Choose different image** to replace, **Remove
image** to go back to the gold icon) → **Publish** → **Publish now**.

**Product photo:** Catalogue → Products → click the product → *Photo* →
same buttons → **Publish**.

**Homepage banners:** Homepage → Hero slides.

The list shows "✓ has photo" / "no photo yet" next to each category and
product, so you can see at a glance what still needs a photo.

## Where things live

| What | File |
|---|---|
| Admin page settings (fields, labels) | `public/admin/config.yml` |
| Categories (name EN/TE, photo) | `src/content/categories.json` |
| Products (all details, photo) | `src/content/products.json` |
| Hero slides (top banner images, order, phone images) | `src/content/hero.json` |
| Uploaded photos | `public/images/uploads/` |

Tips:
- Square photos look best: at least 800 × 800 px for products,
  400 × 400 px for categories. JPG or WebP, under ~500 KB each.
- Leave a photo empty to show the line-drawing icon instead.
- For gold pieces, enter the **22K price** — 18K and 24K are calculated.
- A new product needs a unique **Product number** (use the next number
  after the highest one).
