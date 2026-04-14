'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { MealAnalysis } from '@/types';
import { getScoreColor } from '@/lib/scoring';

interface ScoreCardProps {
  analysis: MealAnalysis;
}

export default function ScoreCard({ analysis }: ScoreCardProps) {
  const { healthScore, calories, protein, carbs, fat, improvements, mealName, category } = analysis;
  const scoreColor = getScoreColor(healthScore);

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-8 glass rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">{mealName}</h2>
        
        {/* SVG Circular Score */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-white/5"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            <circle
              className="transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={2 * Math.PI * 40 * (1 - healthScore / 100)}
              strokeLinecap="round"
              stroke={scoreColor}
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold font-display" style={{ color: scoreColor }}>
              {healthScore}
            </span>
            <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
              Health Score
            </span>
          </div>
        </div>
        
        <div className="mt-4 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider" 
             style={{ backgroundColor: `${scoreColor}20`, color: scoreColor, border: `1px solid ${scoreColor}40` }}>
          {category}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Calories</p>
          <p className="text-xl font-bold">{calories} <span className="text-sm font-normal text-gray-400">kcal</span></p>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Protein</p>
          <p className="text-xl font-bold">{protein}g</p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${Math.min((protein / 50) * 100, 100)}%` }}></div>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Carbs</p>
          <p className="text-xl font-bold">{carbs}g</p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-yellow-500" style={{ width: `${Math.min((carbs / 100) * 100, 100)}%` }}></div>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Fat</p>
          <p className="text-xl font-bold">{fat}g</p>
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-red-500" style={{ width: `${Math.min((fat / 40) * 100, 100)}%` }}></div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#00ff88] flex items-center gap-2">
          <Info size={16} />
          Improvements
        </h3>
        {improvements.map((tip, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-[#00ff88]/30 transition-all">
            <div className="mt-1">
              <CheckCircle2 size={16} className="text-[#00ff88]" />
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-manrope">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
