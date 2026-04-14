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
  timestamp: string; // Changed to string for better JSON handling across boundaries
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

export interface APIError {
  error: string;
  details?: any;
}
