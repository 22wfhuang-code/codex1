# amazon-store-data-analyzer

A production-ready Next.js (App Router) project for Amazon store CSV analysis with bilingual (ZH/EN) UI, rule-based diagnosis, and a 7-day optimization plan.

## Features

- Next.js App Router + TypeScript + Tailwind CSS
- Upload CSV and analyze instantly
- Sample data flow: no upload needed
- Bilingual language switch (ZH/EN), persisted in localStorage
- `/api/analyze` Node.js runtime route handler
- CSV parser supports:
  - quoted fields
  - comma-separated values
  - blank lines
  - trim handling
- Auto header mapping (synonym tolerant):
  - orders: `orders`, `Orders`, `order_count`
  - gmv: `gmv`, `GMV`, `sales`, `revenue`
  - adSpend: `ad_spend`, `adSpend`, `ad cost`, `ads`
  - sessions: `sessions`, `traffic`
  - profit: `profit`, `net_profit`
  - cogs: `cogs`, `cost`, `product_cost`

## API

### `POST /api/analyze`

Request:

```json
{
  "csv": "Date,Orders,GMV,...",
  "lang": "zh"
}
```

Response shape:

```json
{
  "ok": true,
  "metrics": {
    "orders": 0,
    "gmv": 0,
    "adSpend": 0,
    "sessions": 0,
    "profit": 0,
    "cogs": 0,
    "roi": 0,
    "conversionRate": 0,
    "profitMargin": 0
  },
  "diagnosis": {
    "summary": "string",
    "bullets": ["string"]
  },
  "plan7d": [
    { "day": 1, "title": "string", "actions": ["string"] }
  ]
}
```

## Metrics and Rules

- `ROI = GMV / AdSpend` (if AdSpend=0 then null and UI shows `-`)
- `ConversionRate = Orders / Sessions` (if Sessions=0 then null and UI shows `-`)
- `ProfitMargin = Profit / GMV` (if GMV=0 then null and UI shows `-`)

Rules implemented:

- ProfitMargin < 0: loss, prioritize COGS/pricing/ads
- ROI < 2: low ad efficiency
- ConversionRate < 0.02: weak conversion
- High Sessions + low Orders: funnel issue
- If none hit: stable growth guidance

## Local Development

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this project to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Keep default settings (no env vars needed).
4. Deploy.

The app is configured for zero-config Vercel deployment.

## Example Data

- `public/sample.csv`
- Use **使用示例数据 / Use Sample Data** button on Home, Upload, or Report fallback area.
