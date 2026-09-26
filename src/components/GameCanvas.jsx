import React, { useEffect, useRef } from 'react';
import { GameEngine } from '../game/GameEngine';

export const GameCanvas = ({
  gameState,
  engineRef,
  onScore,
  onLives,
  onDistance,
  onSpeed,
  onChai,
  onSawaari,
  onGameOver,
  onHit,
  onPopup,
  onHorn,
  onTogglePause
}) => {
  const containerRef = useRef(null);
  const touchStartPos = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Create GameEngine
    const engine = new GameEngine(containerRef.current, {
      onScore,
      onLives,
      onDistance,
      onSpeed,
      onChai,
      onSawaari,
      onGameOver,
      onHit,
      onPopup,
      onHorn
    });

    if (engineRef) {
      engineRef.current = engine;
    }

    // Keyboard controls
    const handleKeyDown = (e) => {
      // Don't intercept if typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'KeyP' || e.code === 'Escape') {
        if (onTogglePause) onTogglePause();
        return;
      }

      if (gameState !== 'PLAYING') return;

      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          e.preventDefault();
          engine.steerLeft();
          break;
        case 'ArrowRight':
        case 'KeyD':
          e.preventDefault();
          engine.steerRight();
          break;
        case 'Space':
        case 'ArrowUp':
        case 'KeyW':
          e.preventDefault();
          engine.jump();
          break;
        case 'KeyH':
          e.preventDefault();
          engine.blowHorn();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      engine.destroy();
      if (engineRef) engineRef.current = null;
    };
  }, []);

  // Touch Swipe & Tap Listeners on Canvas
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
    }
  };

  const handleTouchEnd = (e) => {
    if (gameState !== 'PLAYING' || !engineRef?.current) return;
    if (e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartPos.current.x;
      const dy = e.changedTouches[0].clientY - touchStartPos.current.y;
      const dt = Date.now() - touchStartPos.current.time;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // Swipe Detection
      if (absDx > 35 && absDx > absDy) {
        if (dx < 0) engineRef.current.steerLeft();
        else engineRef.current.steerRight();
      } else if (dy < -35 && absDy > absDx) {
        engineRef.current.jump();
      } else if (absDx < 15 && absDy < 15 && dt < 280) {
        // Tap to Jump
        engineRef.current.jump();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
    />
  );
};
