'use client';

import React from 'react';
import { Lightbulb, AlertTriangle, PartyPopper } from 'lucide-react';
import { Nudge } from '@/types';

interface NudgeCardProps {
  nudge: Nudge;
}

export default function NudgeCard({ nudge }: NudgeCardProps) {
  const Icon = nudge.type === 'tip' ? Lightbulb : nudge.type === 'warning' ? AlertTriangle : PartyPopper;
  const colorClass = nudge.type === 'tip' ? 'text-blue-400' : nudge.type === 'warning' ? 'text-orange-400' : 'text-[#00ff88]';
  const bgClass = nudge.type === 'tip' ? 'bg-blue-400/10' : nudge.type === 'warning' ? 'bg-orange-400/10' : 'bg-[#00ff88]/10';

  return (
    <div className="w-full max-w-xl mx-auto mt-6 p-5 glass rounded-2xl border-l-4" style={{ borderColor: nudge.type === 'tip' ? '#60a5fa' : nudge.type === 'warning' ? '#fb923c' : '#00ff88' }}>
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${bgClass}`}>
          <Icon className={colorClass} size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
            {nudge.type} • {nudge.timeContext}
          </p>
          <p className="text-gray-200 font-manrope leading-relaxed">
            {nudge.message}
          </p>
        </div>
      </div>
    </div>
  );
}
