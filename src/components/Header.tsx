import React from 'react';
import { Apple } from 'lucide-react';

export default function Header() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between"
      role="banner"
    >
      <div className="flex items-center space-x-3">
        <div 
          className="p-2 bg-[#00ff88] rounded-xl hud-glow"
          aria-hidden="true"
        >
          <Apple className="text-black" size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight display-font">NutriSense</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#00ff88] font-bold">Hyper-Precision Lab</p>
        </div>
      </div>
      <nav className="flex items-center space-x-6" aria-label="Status Indicators">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] uppercase text-gray-500 font-bold">Status</p>
          <p className="text-xs font-bold text-[#00ff88] flex items-center gap-1">
            <span 
              className="w-1.5 h-1.5 rounded-full bg-[#00ff88] pulse"
              aria-hidden="true"
            ></span>
            Synchronized
          </p>
        </div>
      </nav>
    </header>
  );
}
