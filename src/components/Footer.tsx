import React from 'react';

export default function Footer() {
  const currentBuild = new Date().getFullYear() + '.' + (new Date().getMonth() + 1).toString().padStart(2, '0');
  
  return (
    <footer 
      className="py-12 px-6 border-t border-white/5 opacity-20 text-center"
      role="contentinfo"
    >
      <p className="text-[10px] uppercase tracking-[0.5em] font-bold">
        NutriSense OS v1.1.0 — Build {currentBuild}
      </p>
    </footer>
  );
}
