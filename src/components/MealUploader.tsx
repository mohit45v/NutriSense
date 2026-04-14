'use client';

import React, { useState, useRef } from 'react';
import { Camera, Type, Loader2, Upload } from 'lucide-react';
import { MealAnalysis } from '@/types';

interface MealUploaderProps {
  onAnalysisComplete: (analysis: MealAnalysis) => void;
}

export default function MealUploader({ onAnalysisComplete }: MealUploaderProps) {
  const [activeTab, setActiveTab] = useState<'photo' | 'text'>('photo');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Max 5MB allowed.');
      return;
    }

    await analyzeMeal(file);
  };

  const analyzeMeal = async (file?: File) => {
    setIsLoading(true);
    setError(null);

    try {
      let imageBase64 = '';
      if (file) {
        imageBase64 = await convertToBase64(file);
      }

      const res = await fetch('/api/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageBase64,
          description: activeTab === 'text' ? description : '',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');

      onAnalysisComplete(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto glass p-6 rounded-2xl shadow-2xl">
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('photo')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'photo' ? 'bg-[#00ff88] text-black font-bold' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          <Camera size={20} />
          <span>Photo</span>
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'text' ? 'bg-[#00ff88] text-black font-bold' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          <Type size={20} />
          <span>Description</span>
        </button>
      </div>

      {activeTab === 'photo' ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center cursor-pointer hover:border-[#00ff88]/50 transition-all group"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-[#00ff88]/10 rounded-full group-hover:scale-110 transition-transform">
              <Upload className="text-[#00ff88]" size={32} />
            </div>
            <div>
              <p className="text-lg font-medium">Click or Drag Image</p>
              <p className="text-sm text-gray-500">Fast, accurate AI analysis</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What are you eating? e.g. 'Grilled salmon with quinoa and broccoli'"
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#00ff88] transition-all"
          />
          <button
            onClick={() => analyzeMeal()}
            disabled={!description || isLoading}
            className="w-full py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:bg-[#00dd77] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <span>Analyse Meal</span>}
          </button>
        </div>
      )}

      {error && (
        <div role="alert" className="mt-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
