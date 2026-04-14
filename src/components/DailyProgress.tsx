'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Target, Calendar } from 'lucide-react';

interface DailyProgressProps {
  data: { date: string; score: number }[];
  streak: number;
}

export default function DailyProgress({ data, streak }: DailyProgressProps) {
  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 glass rounded-3xl">
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-[#00ff88]/10 rounded-2xl border border-[#00ff88]/20 flex items-center space-x-4">
          <div className="p-3 bg-[#00ff88] rounded-xl">
            <Flame className="text-black" size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Current Streak</p>
            <p className="text-2xl font-bold font-display text-[#00ff88]">{streak} Days</p>
          </div>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center space-x-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <Target className="text-white" size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Avg. Health</p>
            <p className="text-2xl font-bold font-display">84%</p>
          </div>
        </div>
      </div>

      <div className="h-48 w-full mt-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
          <Calendar size={16} />
          7-Day Performance
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#666" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              hide 
              domain={[0, 100]} 
            />
            <Tooltip
              contentStyle={{ background: '#1a1919', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ color: '#00ff88' }}
              labelStyle={{ color: '#999' }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#00ff88"
              strokeWidth={3}
              dot={{ r: 4, fill: '#00ff88', strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
