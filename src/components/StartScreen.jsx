import React from 'react';
import { Play, Trophy, Coffee, Users, AlertTriangle } from 'lucide-react';

export const StartScreen = ({ highScore, onStart }) => {
  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-stone-950/85 via-stone-900/90 to-amber-950/85 backdrop-blur-md">
      <div className="max-w-lg w-full flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3">
          <span>PUNE STREET RACER 3D</span>
        </div>

        {/* Title */}
        <h1 className="font-bungee text-4xl sm:text-6xl text-amber-400 drop-shadow-[0_4px_20px_rgba(255,140,0,0.6)] leading-none mb-1">
          PUNE AUTO RUSH
        </h1>
        <p className="text-amber-200/90 text-sm sm:text-base font-semibold tracking-wide mb-5">
          पुणे ऑटो रश — रफ्तार का जलवा!
        </p>

        {/* Info Box */}
        <div className="glass-panel w-full rounded-2xl p-4 sm:p-6 mb-6 text-left border border-amber-400/30">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <span className="text-xs font-bold tracking-wider text-amber-300 uppercase flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" /> HIGH SCORE
            </span>
            <span className="font-bungee text-xl text-white drop-shadow">{highScore}</span>
          </div>

          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-4">
            Take wheel of the iconic yellow-green Rickshaw on Pune's bustling streets during the golden sunset hour. Dodge stray cows, wrong-side speeding motorbikes, potholes, and police barricades!
          </p>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Coffee className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">Chai Cup</strong>
                <span className="text-amber-300 font-semibold">+10 points</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">Sawaari</strong>
                <span className="text-emerald-300 font-semibold">+50 points</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-white block">Gaaye & Bike</strong>
                <span className="text-red-300 font-semibold">Danger! Dodge</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0 text-base">
                🕳️
              </div>
              <div>
                <strong className="text-white block">Gaddhe / Barrier</strong>
                <span className="text-yellow-300 font-semibold">Jump over!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="font-bungee text-lg sm:text-xl text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 px-8 sm:px-12 py-4 rounded-full border-2 border-white shadow-[0_10px_35px_rgba(255,140,0,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
        >
          <span>START SAFARI</span>
          <Play className="w-5 h-5 fill-current" />
        </button>

        {/* Controls Hint */}
        <div className="mt-4 text-[11px] sm:text-xs text-amber-200/80 leading-relaxed">
          <p className="font-semibold">
            Desktop: <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white">→</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white">A</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white">D</kbd> to Steer &bull; <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white">Space</kbd> to Jump &bull; <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-white">H</kbd> for Horn
          </p>
          <p className="mt-1">Mobile: Swipe Left/Right to steer, Tap or Swipe Up to jump</p>
        </div>
      </div>
    </div>
  );
};
