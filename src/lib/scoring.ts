import { MealAnalysis } from '@/types';

export const calculateCategory = (score: number): MealAnalysis['category'] => {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'fair';
  return 'poor';
};

export const getScoreColor = (score: number): string => {
  if (score >= 75) return '#00ff88'; // Vibrant Green
  if (score >= 60) return '#facc15'; // Yellow
  if (score >= 40) return '#fb923c'; // Orange
  return '#f87171'; // Red
};

export const validateMealInput = (description?: string, image?: string): boolean => {
  if (!description && !image) return false;
  return true;
};
