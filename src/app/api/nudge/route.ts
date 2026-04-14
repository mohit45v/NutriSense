import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { recentScores, timeOfDay } = await req.json();

    const model = getGeminiModel();
    const prompt = `
      User recently had meals with these health scores: ${recentScores.join(', ')}.
      It is currently ${timeOfDay}.
      Generate a short, encouraging "health nudge" tip for their next meal.
      Return ONLY valid JSON with this exact structure:
      {
        "message": "string (short & punchy)",
        "type": "tip|warning|celebration",
        "timeContext": "breakfast|lunch|dinner|snack|general"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const nudge = JSON.parse(jsonStr);

    return NextResponse.json(nudge);
  } catch (error) {
    console.error('Nudge generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate nudge' },
      { status: 500 }
    );
  }
}
