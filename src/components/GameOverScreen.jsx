import React, { useEffect } from 'react';
import { RotateCcw, Trophy, Award, Coffee, Users, Milestone } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GameOverScreen = ({
  score,
  highScore,
  isNewRecord,
  stats,
  onRestart
}) => {
  useEffect(() => {
    if (isNewRecord) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [isNewRecord]);

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-stone-950/90 via-red-950/85 to-stone-900/90 backdrop-blur-md">
      <div className="max-w-md w-full flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
        {/* Banner */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold tracking-widest uppercase mb-2">
          <span>SAFARI KHATAM!</span>
        </div>

        <h2 className="font-bungee text-4xl sm:text-5xl text-red-500 drop-shadow-[0_4px_20px_rgba(239,68,68,0.5)] mb-3">
          GAME OVER
        </h2>

        {isNewRecord && (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-emerald-300 font-extrabold text-xs sm:text-sm tracking-wider uppercase mb-4 animate-bounce">
            <Award className="w-4 h-4 text-emerald-400" /> NAYA RECORD BAN GAYA!
          </div>
        )}

        {/* Score Card */}
        <div className="glass-panel w-full rounded-2xl p-5 sm:p-6 mb-6 border border-amber-400/30">
          <div className="text-[11px] font-bold tracking-widest text-amber-300 uppercase mb-1">FINAL SCORE</div>
          <div className="font-bungee text-4xl sm:text-5xl text-amber-400 drop-shadow mb-4">
            {score}
          </div>

          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 mb-4">
            <div className="flex flex-col items-center">
              <Milestone className="w-4 h-4 text-amber-400 mb-1" />
              <span className="font-bungee text-base sm:text-lg text-white">{stats.distance}m</span>
              <span className="text-[10px] text-stone-400 uppercase font-bold">Distance</span>
            </div>

            <div className="flex flex-col items-center">
              <Coffee className="w-4 h-4 text-amber-300 mb-1" />
              <span className="font-bungee text-base sm:text-lg text-white">{stats.chai}</span>
              <span className="text-[10px] text-stone-400 uppercase font-bold">Chai Cups</span>
            </div>

            <div className="flex flex-col items-center">
              <Users className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="font-bungee text-base sm:text-lg text-white">{stats.sawaari}</span>
              <span className="text-[10px] text-stone-400 uppercase font-bold">Sawaari</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-300">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Trophy className="w-3.5 h-3.5 text-amber-400" /> Best High Score
            </span>
            <span className="font-bold text-amber-300">{highScore}</span>
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="font-bungee text-base sm:text-lg text-stone-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 px-8 sm:px-10 py-3.5 rounded-full border-2 border-white shadow-[0_10px_35px_rgba(255,140,0,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>PHIR SE CHALAO</span>
        </button>
      </div>
    </div>
  );
};
