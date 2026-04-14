import { z } from 'zod';

export const mealAnalysisSchema = z.object({
  mealName: z.string().min(1, "Meal name is required"),
  calories: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  fat: z.number().nonnegative(),
  fiber: z.number().nonnegative(),
  healthScore: z.number().min(0).max(100),
  improvements: z.array(z.string()).length(3, "Exactly 3 improvements are required"),
});

export type MealAnalysisInput = z.infer<typeof mealAnalysisSchema>;

export const nudgeSchema = z.object({
  message: z.string().min(10),
  type: z.enum(['warning', 'tip', 'celebration']),
  timeContext: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'general']),
});
