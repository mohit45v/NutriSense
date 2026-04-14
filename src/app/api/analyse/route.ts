import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/services/gemini';
import { calculateCategory } from '@/lib/scoring';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, description } = body;

    // SECURITY: Server-side validation of inputs
    if (!image && !description) {
      return NextResponse.json(
        { error: 'Provide either a photo or a description.' },
        { status: 400 }
      );
    }

    // SECURITY: Basic image format validation if image is present
    if (image) {
      const mimeMatch = image.match(/^data:(image\/\w+);base64,/);
      const mimeType = mimeMatch ? mimeMatch[1] : null;
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (mimeType && !allowedTypes.includes(mimeType)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only JPEG, PNG and WEBP are supported.' },
          { status: 400 }
        );
      }
      
      // Rough size check (Base64 is ~33% larger than binary)
      const buffer = Buffer.from(image.split(',')[1] || image, 'base64');
      if (buffer.length > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'File too large. Max 5MB allowed.' },
          { status: 400 }
        );
      }
    }

    // GOOGLE SERVICES: Use the optimized service layer
    const analysis = await geminiService.analyseMeal(image, description);

    const finalResult = {
      ...analysis,
      category: calculateCategory(analysis.healthScore),
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(finalResult);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyse meal. Please try again.' },
      { status: 500 }
    );
  }
}
