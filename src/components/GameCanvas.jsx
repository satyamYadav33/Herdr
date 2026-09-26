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

    return () => {
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
