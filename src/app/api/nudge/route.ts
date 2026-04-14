import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/services/gemini';

export async function POST(req: NextRequest) {
  try {
    const { recentScores, timeOfDay } = await req.json();

    if (!recentScores || !Array.isArray(recentScores)) {
      return NextResponse.json(
        { error: 'recentScores must be an array of numbers' },
        { status: 400 }
      );
    }

    const nudge = await geminiService.generateNudge(recentScores, timeOfDay || new Date().toLocaleTimeString());

    return NextResponse.json(nudge);
  } catch (error: any) {
    console.error('Nudge generation failed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate nudge' },
      { status: 500 }
    );
  }
}
