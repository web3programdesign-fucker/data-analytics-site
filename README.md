# Data Analytics Starter

This repository is a minimal starter for a data analytics site built with Next.js (TypeScript), Tailwind CSS, and Chart.js (react-chartjs-2).

Features included:
- CSV upload page with client-side parsing (PapaParse)
- Simple API route (/api/upload) that echoes received rows
- Dashboard page that loads sample CSV and renders charts with Chart.js
- Tailwind CSS setup

Local development
1. Install pnpm if you don't have it: npm i -g pnpm
2. git clone https://github.com/web3programdesign-fucker/data-analytics-site.git
3. cd data-analytics-site
4. pnpm install
5. pnpm dev
6. Open http://localhost:3000

Deploy to Vercel via GitHub Actions
1. Create a Vercel token (do NOT paste it here): Vercel → Settings → Tokens → Create Token.
2. Get VERCEL_ORG_ID and VERCEL_PROJECT_ID from Vercel Project → Settings → General.
3. Add GitHub Actions secrets in this repo: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID.
4. The repository has a GitHub Actions workflow (.github/workflows/vercel-deploy.yml) that will build with pnpm and deploy to Vercel using those secrets.

Notes
- I replaced Vega with Chart.js to reduce build weight and speed up builds.
- Do NOT commit or paste tokens in this repository or chat. Rotate any tokens you may have exposed.
