# NutriSense — Agent Prompt (Use this in Stitch / Antigravity)

## Master Prompt

Build a Next.js 14 food health tracking app called **NutriSense** with the following exact specifications:

---

## Project Setup

```
npx create-next-app@latest nutrisense --typescript --tailwind --eslint --app --src-dir
cd nutrisense
npm install @google/generative-ai @supabase/supabase-js recharts lucide-react
npm install -D @playwright/test jest @testing-library/react @testing-library/jest-dom
```

---

## File Structure to Generate

```
src/
  app/
    page.tsx                    ← Landing + Dashboard
    layout.tsx                  ← Root layout with metadata
    globals.css                 ← Theme variables
    api/
      analyse/
        route.ts                ← Gemini API call (server-side)
      nudge/
        route.ts                ← Smart nudge generator
  components/
    MealUploader.tsx            ← Photo + text input
    ScoreCard.tsx               ← Health score display
    NudgeCard.tsx               ← Contextual tip card
    MealHistory.tsx             ← Past meals list
    DailyProgress.tsx           ← Chart + streak
  lib/
    gemini.ts                   ← Gemini client
    firestore.ts                ← Firestore client
    scoring.ts                  ← Score calculation logic
    utils.ts                    ← Helper functions
  types/
    index.ts                    ← TypeScript interfaces
__tests__/
  scoring.test.ts               ← Jest unit tests
  analyse.test.ts               ← API route tests
e2e/
  meal-flow.spec.ts             ← Playwright e2e
Dockerfile                      ← Cloud Run deployment
.env.local.example              ← Environment variables template
```

---

## Exact Component Specs

### `src/types/index.ts`
```typescript
export interface MealAnalysis {
  mealName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  healthScore: number; // 0-100
  improvements: string[];
  category: 'excellent' | 'good' | 'fair' | 'poor';
  timestamp: Date;
}

export interface DailyLog {
  date: string;
  meals: MealAnalysis[];
  averageScore: number;
  streak: number;
}

export interface Nudge {
  message: string;
  type: 'warning' | 'tip' | 'celebration';
  timeContext: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'general';
}
```

### `src/app/api/analyse/route.ts`
- Accept POST with { image?: base64string, description?: string }
- Validate input — reject if both empty, reject files > 5MB
- Call Gemini 1.5 Flash with structured prompt
- Return MealAnalysis JSON
- Add rate limiting header (X-RateLimit)
- Try/catch with proper error responses

Gemini prompt to use:
```
Analyse this meal and return ONLY valid JSON with this exact structure:
{
  "mealName": "string",
  "calories": number,
  "protein": number (grams),
  "carbs": number (grams),
  "fat": number (grams),
  "fiber": number (grams),
  "healthScore": number (0-100, based on nutritional balance, whole foods, fiber content),
  "improvements": ["3 specific actionable tips to make this meal healthier"],
  "category": "excellent|good|fair|poor"
}
Be realistic. A burger scores 35-50. A salad with protein scores 75-90.
```

### `src/app/api/nudge/route.ts`
- Accept POST with { recentScores: number[], timeOfDay: string }
- Generate contextual nudge using Gemini
- Return Nudge object

### `src/components/MealUploader.tsx`
- Tab toggle: "Upload Photo" | "Describe Meal"
- Photo tab: drag-drop + file input, compress to max 1MB before sending
- Text tab: textarea with placeholder examples
- Submit button with loading state
- Show error states accessibly (role="alert")
- ARIA labels on all inputs

### `src/components/ScoreCard.tsx`
- Large circular score display (SVG circle progress)
- Color: red <40, orange 40-60, yellow 60-75, green >75
- Show macro bars (protein/carbs/fat)
- List improvements with icons
- Animate score counting up on mount

### `src/components/DailyProgress.tsx`
- Recharts LineChart of last 7 days scores
- Current streak badge
- Today's meal count
- Responsive

### `src/app/page.tsx`
- Top: Daily score summary + streak
- Middle: MealUploader
- On submit → show ScoreCard
- Below: NudgeCard
- Bottom: MealHistory (last 5 meals from localStorage)

---

## Styling Direction
- Dark theme: background #0a0a0a, cards #141414
- Accent: bright green #00ff88 for healthy scores
- Font: use Google Fonts — "DM Sans" for body, "Syne" for headings
- Clean, clinical aesthetic — like a health monitoring dashboard
- Smooth animations on score reveals

---

## Security Requirements (for eval score)
1. All API keys in server-side routes ONLY — never in client components
2. Input sanitisation in API routes — strip HTML, validate types
3. File size validation — reject > 5MB
4. Add Content-Security-Policy header in next.config.js
5. Rate limiting logic in API routes (simple in-memory counter)

## Accessibility Requirements (for eval score)
1. All images have alt text
2. Score colors also have text labels (not color-only)
3. Keyboard navigable tabs in MealUploader
4. Focus management after form submit
5. role="status" on loading states
6. Minimum contrast ratio 4.5:1

## Testing Requirements (for eval score)

### `__tests__/scoring.test.ts`
Write Jest tests for:
- healthScore calculation edge cases (0, 100, middle values)
- category assignment (excellent/good/fair/poor thresholds)
- Input validation (empty strings, oversized files)

### `e2e/meal-flow.spec.ts`
Write Playwright test for:
- Landing page loads
- Switch to text tab
- Type meal description
- Submit and see score card appear

---

## Dockerfile (Cloud Run)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 8080
ENV PORT 8080
CMD ["node", "server.js"]
```

## next.config.js additions
```js
output: 'standalone',
headers: async () => [{
  source: '/(.*)',
  headers: [{
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;"
  }]
}]
```

## .env.local.example
```
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_APP_NAME=NutriSense
FIRESTORE_PROJECT_ID=your_project_id
```
