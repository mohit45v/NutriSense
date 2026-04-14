'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React, { useState, useEffect } from 'react';
import MealUploader from '@/components/MealUploader';
import ScoreCard from '@/components/ScoreCard';
import DailyProgress from '@/components/DailyProgress';
import NudgeCard from '@/components/NudgeCard';
import { MealAnalysis, Nudge } from '@/types';
import { Apple } from 'lucide-react';

export default function Home() {
  const [analysis, setAnalysis] = useState<MealAnalysis | null>(null);
  const [nudge, setNudge] = useState<Nudge | null>(null);
  const [history, setHistory] = useState<{ date: string; score: number }[]>([
    { date: 'Mon', score: 65 },
    { date: 'Tue', score: 72 },
    { date: 'Wed', score: 85 },
    { date: 'Thu', score: 78 },
    { date: 'Fri', score: 92 },
    { date: 'Sat', score: 88 },
    { date: 'Sun', score: 84 },
  ]);

  useEffect(() => {
    // Generate initial nudge
    fetchInitialNudge();
  }, [history]);

  const fetchInitialNudge = async () => {
    try {
      const res = await fetch('/api/nudge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recentScores: history.map(h => h.score),
          timeOfDay: new Date().toLocaleTimeString(),
        }),
      });
      const data = await res.json();
      setNudge(data);
    } catch (err) {
      console.error('Failed to fetch nudge:', err);
    }
  };

  const handleAnalysisComplete = (newAnalysis: MealAnalysis) => {
    setAnalysis(newAnalysis);
    // Add to history (simple logic for MVP)
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    setHistory(prev => [...prev.slice(1), { date: today, score: newAnalysis.healthScore }]);
  };

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white selection:bg-[#00ff88]/30">
      <Header />

      {/* Content */}
      <div className="pt-28 pb-12 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Logging & Dashboard */}
          <div className="space-y-8">
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 display-font">Meal Intelligence</h2>
                <p className="text-gray-500 font-manrope">Analyse your meal photo or description for instant nutritional scoring.</p>
              </div>
              <MealUploader onAnalysisComplete={handleAnalysisComplete} />
            </section>

            {nudge && (
              <section className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
                <NudgeCard nudge={nudge} />
              </section>
            )}

            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <DailyProgress data={history} streak={12} />
            </section>
          </div>

          {/* Right Column: Analysis Output */}
          <div className="lg:sticky lg:top-28">
            {analysis ? (
              <ScoreCard analysis={analysis} />
            ) : (
              <div className="w-full aspect-square max-w-xl mx-auto glass rounded-3xl border-dashed border-2 border-white/5 flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <Apple className="text-white/20" size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white/40 font-display">No Analysis Active</h3>
                <p className="text-gray-600 max-w-xs font-manrope">
                  Log a meal to see your real-time breakdown and health performance.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
