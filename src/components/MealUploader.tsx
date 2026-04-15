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
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Max 5MB allowed.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

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
      <div className="flex space-x-2 mb-6" role="tablist">
        <button
          onClick={() => setActiveTab('photo')}
          role="tab"
          aria-selected={activeTab === 'photo'}
          aria-controls="photo-panel"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'photo' ? 'bg-[#00ff88] text-black font-bold' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          <Camera size={20} aria-hidden="true" />
          <span>Photo</span>
        </button>
        <button
          onClick={() => setActiveTab('text')}
          role="tab"
          aria-selected={activeTab === 'text'}
          aria-controls="text-panel"
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'text' ? 'bg-[#00ff88] text-black font-bold' : 'text-gray-400 hover:bg-white/5'
          }`}
        >
          <Type size={20} aria-hidden="true" />
          <span>Description</span>
        </button>
      </div>

      {activeTab === 'photo' ? (
        <div 
          id="photo-panel"
          role="tabpanel"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          className="relative border-2 border-dashed border-white/10 rounded-xl overflow-hidden text-center cursor-pointer hover:border-[#00ff88]/50 transition-all group focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:border-transparent min-h-[200px] flex items-center justify-center"
          aria-label="Upload meal photo"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
            aria-hidden="true"
          />
          
          {preview ? (
            <div className="w-full h-full min-h-[200px] relative">
              <img 
                src={preview} 
                alt="Meal Preview" 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-bold">Replace Image</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 p-12">
              <div className="p-4 bg-[#00ff88]/10 rounded-full group-hover:scale-110 transition-transform">
                <Upload className="text-[#00ff88]" size={32} aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-medium">Click or Drag Image</p>
                <p className="text-sm text-gray-500">Fast, accurate AI analysis</p>
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="absolute inset-0 bg-[#0e0e0e]/80 flex flex-col items-center justify-center z-10">
              <Loader2 className="animate-spin text-[#00ff88] mb-2" size={32} />
              <p className="text-[#00ff88] text-sm font-bold uppercase tracking-widest">Neural Analysis</p>
            </div>
          )}
        </div>
      ) : (
        <div 
          id="text-panel"
          role="tabpanel"
          className="space-y-4"
        >
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What are you eating? e.g. 'Grilled salmon with quinoa and broccoli'"
            aria-label="Meal description"
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-[#00ff88] transition-all"
          />
          <button
            onClick={() => analyzeMeal()}
            disabled={!description || isLoading}
            aria-label={isLoading ? "Analyzing meal..." : "Analyze meal description"}
            className="w-full py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:bg-[#00dd77] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader2 className="animate-spin" aria-hidden="true" /> : <span>Analyse Meal</span>}
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
