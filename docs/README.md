# 🥗 NutriSense — AI Food Intelligence

> Smart food choices, powered by AI. Upload your meal, get an instant health score and personalized tips.

## Live Demo
🔗 [Deployed on Cloud Run](#) ← replace with your URL

## Problem Statement
Individuals struggle to make informed food choices due to lack of real-time nutritional awareness at the point of eating.

## Solution
NutriSense uses Google Gemini Vision AI to analyse meal photos and descriptions, returning instant health scores, macro breakdowns, and actionable improvement tips — building better eating habits through daily tracking and streaks.

## Features
- 📸 **Meal Photo Analysis** — Upload any meal photo, AI identifies food and scores nutrition
- ✍️ **Text Description** — Describe your meal in plain language
- 📊 **Health Score (0-100)** — Instant nutritional assessment
- 💡 **Smart Nudges** — Context-aware tips based on time of day and history
- 🔥 **Streak Tracking** — Daily habit building with visual progress
- 📈 **7-Day Dashboard** — Track improvement over time

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| AI | Google Gemini 1.5 Flash |
| Database | Google Firestore |
| Deployment | Google Cloud Run |
| Testing | Jest + Playwright |

## Google Services Used
- ✅ **Gemini 1.5 Flash** — Meal analysis and nudge generation
- ✅ **Firestore** — Meal history storage
- ✅ **Cloud Run** — Serverless deployment
- ✅ **Artifact Registry** — Container storage

## Setup

### Prerequisites
- Node.js 20+
- GCP project with billing enabled
- Gemini API key from [aistudio.google.com](https://aistudio.google.com)

### Local Development
```bash
git clone https://github.com/yourusername/nutrisense
cd nutrisense
npm install
cp .env.local.example .env.local
# Fill in your API keys in .env.local
npm run dev
```

### Run Tests
```bash
npm test                    # Jest unit tests
npx playwright test         # E2E tests
```

### Deploy to Cloud Run
```bash
chmod +x deploy.sh
./deploy.sh
```

## Architecture
```
User → Next.js Frontend
         ↓
     API Routes (server-side)
         ↓
     Gemini 1.5 Flash API
         ↓
     Firestore (meal history)
         ↓
     Response → UI Score Card
```

## Security
- All API keys server-side only (never exposed to client)
- Input validation and sanitisation on all endpoints
- File size limits (max 5MB)
- Content Security Policy headers
- Rate limiting on API routes

## Accessibility
- WCAG 2.1 AA compliant
- Full keyboard navigation
- Screen reader support (ARIA labels)
- Color + text indicators (not color-only)
- Minimum 4.5:1 contrast ratio

## Team
Built at AMD Slingshot Ideathon — Mumbai 2026
