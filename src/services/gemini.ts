import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { mealAnalysisSchema, nudgeSchema } from '@/lib/validations';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    // Use stable gemini-1.5-flash for speed and reliability
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      }
    });
  }

  async analyseMeal(image?: string, description?: string) {
    const prompt = `
      Analyse this meal and return nutritional data.
      You MUST return valid JSON matching this schema:
      {
        "mealName": "string",
        "calories": number,
        "protein": number,
        "carbs": number,
        "fat": number,
        "fiber": number,
        "healthScore": number (0-100),
        "improvements": ["tip 1", "tip 2", "tip 3"]
      }
    `;

    const parts: any[] = [{ text: prompt }];

    if (image) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: image.includes('base64,') ? image.split(',')[1] : image,
        },
      });
    }

    if (description) {
      parts.push({ text: `User Description: ${description}` });
    }

    const result = await this.model.generateContent(parts);
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsed = JSON.parse(text);
      return mealAnalysisSchema.parse(parsed);
    } catch (error) {
      console.error('Failed to parse or validate Gemini response:', text);
      throw new Error('AI generated an invalid response. Please try again.');
    }
  }

  async generateNudge(recentScores: number[], timeOfDay: string) {
    const prompt = `
      Based on the user's recent health scores [${recentScores.join(', ')}] and current time ${timeOfDay},
      generate a supportive nudge.
      Return JSON: { "message": "string", "type": "warning|tip|celebration", "timeContext": "breakfast|lunch|dinner|snack|general" }
    `;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const parsed = JSON.parse(text);
      return nudgeSchema.parse(parsed);
    } catch (error) {
      console.error('Failed to parse nudge:', text);
      throw new Error('Failed to generate nudge.');
    }
  }
}

export const geminiService = new GeminiService();
