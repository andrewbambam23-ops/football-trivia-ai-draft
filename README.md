# Football Trivia & AI Draft

This repository contains a scaffold for a Full-stack Football Trivia & AI Draft Game built with Next.js (App Router), Tailwind CSS, Prisma (Postgres), Redis, and OpenAI.

What I pushed in branch `feature/initial-scaffold`:
- Next.js app skeleton (app/page.tsx)
- App Router API route skeletons for draft search & evaluate
- lib/llm adapter (OpenAI) and prompts JSON files
- Prisma schema and environment example
- Dockerfile + vercel.json + railway.json example

Quick start (local):
1. Copy `.env.example` to `.env` and set DATABASE_URL, REDIS_URL, OPENAI_API_KEY.
2. npm install
3. npx prisma generate
4. npm run dev

Deployment:
- Vercel: this is a Next.js App Router app — deploy using the Vercel dashboard and set environment vars.
- Railway: use the provided Dockerfile or set up a Node environment and set env vars (DATABASE_URL, REDIS_URL, OPENAI_API_KEY).

Files of interest:
- src/app/page.tsx — basic landing page
- src/app/api/draft/search/route.ts — autocomplete + validation route skeleton
- src/app/api/draft/evaluate/route.ts — roster evaluation route skeleton
- src/lib/llm.ts — OpenAI adapter wrapper
- prompts/*.json — prompt templates (dynamic validation, popularity generation, roster grading)

Next steps I will take if you want me to continue:
- Implement the Search Modal UI and integrate the search API
- Add Prisma migrations and Redis caching logic
- Wire Socket.io for real-time matches
- Add CI workflow and Vercel preview configuration

