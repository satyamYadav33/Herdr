import React from 'react';
import { Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';

export const PauseModal = ({ onResume, onRestart, isMuted, onToggleMute }) => {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="glass-panel max-w-xs w-full rounded-2xl p-6 flex flex-col items-center text-center animate-in fade-in zoom-in-95">
        <h3 className="font-bungee text-2xl text-amber-400 mb-6">GAME PAUSED</h3>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onResume}
            className="w-full font-bungee py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 flex items-center justify-center gap-2 hover:scale-102 active:scale-98 transition shadow-lg cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" /> RESUME
          </button>

          <button
            onClick={onRestart}
            className="w-full font-bungee py-3 rounded-full bg-white/10 hover:bg-white/15 text-white flex items-center justify-center gap-2 transition border border-white/20 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> RESTART
          </button>

          <button
            onClick={onToggleMute}
            className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 flex items-center justify-center gap-2 text-xs font-bold transition border border-white/10 cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            {isMuted ? 'UNMUTE AUDIO' : 'MUTE AUDIO'}
          </button>
        </div>
      </div>
    </div>
  );
};
