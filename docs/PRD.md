# NutriSense — Product Requirements Document

## Overview
NutriSense is an AI-powered food intelligence app that helps users make better food choices through meal photo analysis, real-time nutrition scoring, and personalized habit nudges.

## Problem Statement
Individuals struggle to make informed food choices due to lack of real-time nutritional awareness and contextual guidance at the point of eating.

## Solution
A web app where users:
1. Upload a meal photo OR describe their meal
2. AI analyses nutritional content and gives a health score (0-100)
3. Get personalized suggestions to improve the meal
4. Track daily habits and streaks
5. Receive contextual nudges based on time of day and history

## Core Features (MVP — 2hr build)

### F1: Meal Analyser
- Upload photo or text description
- AI returns: calories estimate, macro breakdown, health score, 3 improvement tips
- Uses Gemini Vision API (Google Service ✓)

### F2: Health Score Dashboard
- Daily score aggregation
- Streak tracking (localStorage + Firestore)
- Visual progress chart
- Uses Google Charts or Recharts

### F3: Smart Nudges
- Time-aware suggestions (breakfast/lunch/dinner context)
- Based on user's recent meal history
- Displayed as notification cards

### F4: Meal History Log
- Stores past meals with scores
- Firestore database (Google Service ✓)

## Evaluation Score Strategy

| Criteria | Implementation |
|---|---|
| Code Quality | TypeScript strict, ESLint, clean components |
| Security | API keys server-side only, input sanitisation, rate limiting |
| Efficiency | Image compression before upload, debounced inputs, lazy loading |
| Testing | Jest unit tests for scoring logic, Playwright e2e |
| Accessibility | ARIA labels, keyboard nav, color contrast AA |
| Google Services | Gemini API + Firestore + Cloud Run deployment |

## Tech Stack
- Frontend: Next.js 14 (App Router) + Tailwind CSS
- Backend: Next.js API Routes (serverless)
- AI: Google Gemini 1.5 Flash (vision + text)
- DB: Firestore
- Auth: None (localStorage for MVP, keeps build simple)
- Deploy: Cloud Run via Docker

## User Flow
1. Land on app → See today's health score (starts at 0)
2. Click "Log Meal" → Upload photo or type meal name
3. AI analyses → Shows score card with breakdown
4. Score added to daily total → Streak updated
5. Nudge card appears with improvement tip

## Out of Scope (MVP)
- User authentication
- Social features
- Barcode scanning
- Restaurant API integration
