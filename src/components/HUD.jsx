import React from 'react';
import { Volume2, VolumeX, Pause, Flame, Coffee, Users } from 'lucide-react';

export const HUD = ({
  score,
  lives,
  distance,
  speed,
  chaiCount,
  sawaariCount,
  isMuted,
  onToggleMute,
  onPause,
  onSteerLeft,
  onSteerRight,
  onJump,
  onHorn,
  floatingPopups = []
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-3 sm:p-5 z-20">
      {/* Floating Popups */}
      {floatingPopups.map((popup) => (
        <div
          key={popup.id}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bungee text-2xl sm:text-3xl font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] animate-float-up pointer-events-none"
          style={{ color: popup.color }}
        >
          {popup.text}
        </div>
      ))}

      {/* Top Bar */}
      <div className="flex justify-between items-start w-full">
        {/* Lives & Stats */}
        <div className="glass-panel rounded-2xl p-2.5 sm:p-3.5 text-white flex flex-col gap-1.5 shadow-xl pointer-events-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] sm:text-xs font-bold tracking-wider text-amber-300 uppercase">LIVES</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((l) => (
                <svg
                  key={l}
                  className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${
                    l <= lives
                      ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] scale-100'
                      : 'text-stone-600 opacity-25 scale-90 grayscale'
                  }`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 13.5V8.2c0-1-.7-1.9-1.7-2.1L13 5.3V3c0-.6-.4-1-1-1s-1 .4-1 1v2.3L6.7 6.1C5.7 6.3 5 7.2 5 8.2v5.3C3.9 14.2 3 15.5 3 17c0 1.7 1.3 3 3 3h12c1.7 0 3-1.3 3-3 0-1.5-.9-2.8-2-3.5zM6 18c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm12 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Collectible counters */}
          <div className="flex items-center gap-3 pt-1 border-t border-white/10 text-xs sm:text-sm font-semibold">
            <span className="flex items-center gap-1 text-amber-200">
              <Coffee className="w-3.5 h-3.5 text-amber-400" /> {chaiCount}
            </span>
            <span className="flex items-center gap-1 text-emerald-300">
              <Users className="w-3.5 h-3.5 text-emerald-400" /> {sawaariCount}
            </span>
          </div>
        </div>

        {/* Center Live Scoreboard */}
        <div className="glass-panel-accent rounded-2xl px-4 py-2 sm:px-6 sm:py-2.5 text-center shadow-2xl flex flex-col items-center">
          <div className="text-[10px] sm:text-xs font-extrabold tracking-widest text-amber-300 uppercase">SCORE</div>
          <div className="font-bungee text-2xl sm:text-4xl text-white drop-shadow-[0_2px_10px_rgba(255,180,0,0.6)] leading-tight">
            {score}
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-100 font-bold">
            <span>{distance} m</span>
            <span>&bull;</span>
            <span className="text-amber-300 flex items-center gap-0.5">
              <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" /> {speed} km/h
            </span>
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Horn Button */}
          <button
            onClick={onHorn}
            title="Horn (H key)"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center text-amber-300 hover:text-amber-100 hover:scale-105 active:scale-95 transition-all shadow-lg border border-amber-400/40 text-lg sm:text-xl"
          >
            📢
          </button>

          {/* Mute Button */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center text-amber-300 hover:text-amber-100 hover:scale-105 active:scale-95 transition-all shadow-lg border border-amber-400/40"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-amber-400" />}
          </button>

          {/* Pause Button */}
          <button
            onClick={onPause}
            title="Pause Game"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center text-amber-300 hover:text-amber-100 hover:scale-105 active:scale-95 transition-all shadow-lg border border-amber-400/40"
          >
            <Pause className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Controls (Responsive for Touch and Click) */}
      <div className="flex justify-between items-end w-full max-w-2xl mx-auto pb-1 sm:pb-3 pointer-events-auto">
        {/* Left Steer Button */}
        <button
          onMouseDown={(e) => { e.preventDefault(); onSteerLeft(); }}
          onTouchStart={(e) => { e.preventDefault(); onSteerLeft(); }}
          className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 border-2 sm:border-3 border-white text-stone-900 shadow-[0_8px_24px_rgba(0,0,0,0.5)] active:scale-90 transition-transform flex flex-col items-center justify-center select-none"
        >
          <svg className="w-7 h-7 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <span className="font-bungee text-[10px] sm:text-xs tracking-wider">LEFT</span>
        </button>

        {/* Center JUMP Button */}
        <button
          onMouseDown={(e) => { e.preventDefault(); onJump(); }}
          onTouchStart={(e) => { e.preventDefault(); onJump(); }}
          className="w-20 h-20 sm:w-26 sm:h-26 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-orange-500 border-3 sm:border-4 border-white text-stone-950 shadow-[0_10px_30px_rgba(255,160,0,0.6)] active:scale-90 transition-transform flex flex-col items-center justify-center select-none -translate-y-2 sm:-translate-y-4"
        >
          <svg className="w-8 h-8 sm:w-11 sm:h-11 animate-bounce" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
          </svg>
          <span className="font-bungee text-xs sm:text-sm tracking-wider">JUMP</span>
        </button>

        {/* Right Steer Button */}
        <button
          onMouseDown={(e) => { e.preventDefault(); onSteerRight(); }}
          onTouchStart={(e) => { e.preventDefault(); onSteerRight(); }}
          className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 border-2 sm:border-3 border-white text-stone-900 shadow-[0_8px_24px_rgba(0,0,0,0.5)] active:scale-90 transition-transform flex flex-col items-center justify-center select-none"
        >
          <svg className="w-7 h-7 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
          <span className="font-bungee text-[10px] sm:text-xs tracking-wider">RIGHT</span>
        </button>
      </div>
    </div>
  );
};
