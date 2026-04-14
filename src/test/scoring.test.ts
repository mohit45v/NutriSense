import { describe, it, expect } from 'vitest';
import { calculateCategory, getScoreColor } from '@/lib/scoring';

describe('Scoring Logic', () => {
  it('should categorize scores correctly', () => {
    expect(calculateCategory(90)).toBe('excellent');
    expect(calculateCategory(70)).toBe('good');
    expect(calculateCategory(50)).toBe('fair');
    expect(calculateCategory(20)).toBe('poor');
  });

  it('should return correct colors for scores', () => {
    expect(getScoreColor(80)).toBe('#00ff88');
    expect(getScoreColor(65)).toBe('#facc15');
    expect(getScoreColor(45)).toBe('#fb923c');
    expect(getScoreColor(10)).toBe('#f87171');
  });
});
