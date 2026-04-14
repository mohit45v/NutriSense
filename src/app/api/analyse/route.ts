import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';
import { calculateCategory } from '@/lib/scoring';

export async function POST(req: NextRequest) {
  try {
    const { image, description } = await req.json();

    if (!image && !description) {
      return NextResponse.json(
        { error: 'Provide either a photo or a description.' },
        { status: 400 }
      );
    }

    const model = getGeminiModel();
    const prompt = `
      Analyse this meal and return ONLY valid JSON with this exact structure:
      {
        "mealName": "string",
        "calories": number,
        "protein": number (grams),
        "carbs": number (grams),
        "fat": number (grams),
        "fiber": number (grams),
        "healthScore": number (0-100, based on nutritional balance, whole foods, fiber content),
        "improvements": ["3 specific actionable tips to make this meal healthier"]
      }
      Be realistic. A burger scores 35-50. A salad with protein scores 75-90.
    `;

    let result;
    if (image) {
      // Handle image + optional text
      const parts = [
        { text: prompt },
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: image.split(',')[1] || image,
          },
        },
      ];
      if (description) parts.push({ text: `Context: ${description}` });
      result = await model.generateContent(parts);
    } else {
      // Handle text only
      result = await model.generateContent([prompt, description]);
    }

    const response = await result.response;
    const text = response.text();
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const analysis = JSON.parse(jsonStr);

    // Add metadata
    const finalResult = {
      ...analysis,
      category: calculateCategory(analysis.healthScore),
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(finalResult, {
      headers: {
        'X-RateLimit': '10/min', // Generic placeholder for rate limiting header
      },
    });
  } catch (error) {
    console.error('Gemini analysis failed:', error);
    return NextResponse.json(
      { error: 'Failed to analyse meal. Please try again.' },
      { status: 500 }
    );
  }
}
