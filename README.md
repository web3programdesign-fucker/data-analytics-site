# Data Analytics Starter

This repository is a minimal starter for a data analytics site built with Next.js (TypeScript), Tailwind CSS, and Vega-Lite (via react-vega).

Features included:
- CSV upload page with client-side parsing (PapaParse)
- Simple API route (/api/upload) that echoes received rows
- Dashboard page that loads sample CSV and renders a time series and category breakdown
- Tailwind CSS setup

Local development
1. git clone https://github.com/web3programdesign-fucker/data-analytics-site.git
2. cd data-analytics-site
3. npm install
4. npm run dev
5. Open http://localhost:3000

Deploy to Vercel
1. Sign in to vercel.com and connect your GitHub account
2. Import the repository web3programdesign-fucker/data-analytics-site
3. Framework: Next.js (defaults)
4. Environment variables: none for this starter
5. Deploy — Vercel will build and publish the site

Notes
- This is a scaffold intended for prototyping. Add persistent storage, authentication, and CI as needed.
