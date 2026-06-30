# Covenant Renewers — CR Church Website

Next.js 14 · TypeScript · Tailwind CSS · Framer Motion

---

## Fonts Used (NOT generic AI fonts)

| Role | Font | Why |
|------|------|-----|
| Display headlines | **Anybody** (variable width) | Condensed/expanded muscle — totally distinct from Bebas |
| Italic / quotes | **DM Serif Display** | High-contrast old-style serif, editorial edge |
| Labels / mono | **Azeret Mono** | Wide, modern — not Space Mono |

---

## Local Setup

```bash
# 1. Install
npm install

# 2. Dev server
npm run dev
# → http://localhost:3000
```

---

## Deploy to Vercel (5 minutes)

### Option A — Vercel CLI
```bash
npm i -g vercel
vercel
# Follow prompts — auto-detects Next.js
```

### Option B — GitHub → Vercel (recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repo → **Deploy**
4. Done. Auto-deploys on every push.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       ← Fonts + metadata
│   ├── page.tsx         ← Assembles all sections
│   └── globals.css      ← Design tokens, animations, cursor
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx      ← Sticky nav + mobile drawer
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx        ← Halo, grid floor, staggered reveal
│   │   ├── About.tsx       ← Hexagon, orbit rings, pillars
│   │   ├── Departments.tsx ← 8 dept cards, featured layout
│   │   ├── Youth.tsx       ← 3D cube, orbital rings
│   │   ├── Events.tsx      ← Event cards with categories
│   │   ├── Store.tsx       ← Product grid, cart, filter
│   │   └── Connect.tsx     ← Pathway cards + join form
│   │
│   └── ui/
│       ├── Cursor.tsx   ← Custom gold cursor + ring
│       ├── Ticker.tsx   ← Scrolling announcement bar
│       └── CartFab.tsx  ← Floating cart button
```

---

## Customisation

### Colours — `globals.css`
```css
:root {
  --gold: #b8933a;       /* main gold */
  --ember: #d63010;      /* red/youth */
  --neon: #00d48a;       /* community green */
  --cobalt: #1a35d4;     /* blue accent */
}
```

### Content
- **Events** → `src/components/sections/Events.tsx` (events array)
- **Departments** → `src/components/sections/Departments.tsx` (depts array)
- **Products** → `/admin/store` or `data/products.json`
- **Service times** → `src/components/ui/Ticker.tsx`

### Store Backend
- Public products API: `GET /api/products`
- Admin editor: `/admin/store`
- Local development token: `cr-admin`
- Production token: set `ADMIN_STORE_TOKEN` in the hosting environment
- Product records include `externalPriceId` for checkout/payment integrations such as Stripe, Square, Shopify, or a future store provider.

The current backend writes to `data/products.json`, which is useful for local/admin setup. For production on Vercel, swap the storage layer in `src/lib/products.ts` for a database or CMS because serverless filesystems are not persistent.

### Fonts — `src/app/layout.tsx`
The 3 fonts are imported from Google Fonts via `next/font/google` — no extra config needed.

---

## Next Steps to Add

- [ ] Sermons/Media page with video embed cards
- [ ] Cart slide-out drawer with `useContext`
- [ ] Stripe integration for store checkout
- [ ] Sanity CMS for events + departments
- [ ] Give/Donate section with Stripe
- [ ] Location map + service countdown timer
