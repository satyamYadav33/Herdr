import React, { useState, useEffect, useRef } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { StartScreen } from './components/StartScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { PauseModal } from './components/PauseModal';
import { sound } from './game/audio';

export default function App() {
  const [gameState, setGameState] = useState('MENU'); // 'MENU', 'PLAYING', 'PAUSED', 'GAMEOVER'
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(36);
  const [chaiCount, setChaiCount] = useState(0);
  const [sawaariCount, setSawaariCount] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [flashRed, setFlashRed] = useState(false);
  const [floatingPopups, setFloatingPopups] = useState([]);
  const [finalStats, setFinalStats] = useState({ distance: 0, chai: 0, sawaari: 0 });

  const engineRef = useRef(null);
  const popupIdRef = useRef(0);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pune_auto_high_score');
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Floating Popup Spawner
  const spawnPopup = (text, color = '#ffeb3b') => {
    const id = ++popupIdRef.current;
    setFloatingPopups((prev) => [...prev, { id, text, color }]);
    setTimeout(() => {
      setFloatingPopups((prev) => prev.filter((p) => p.id !== id));
    }, 850);
  };

  // Start Safari
  const handleStartGame = () => {
    sound.init();
    sound.resume();
    setScore(0);
    setLives(3);
    setDistance(0);
    setChaiCount(0);
    setSawaariCount(0);
    setIsNewRecord(false);
    setGameState('PLAYING');

    if (engineRef.current) {
      engineRef.current.start();
    }
  };

  // Restart Safari
  const handleRestart = () => {
    sound.init();
    sound.resume();
    setScore(0);
    setLives(3);
    setDistance(0);
    setChaiCount(0);
    setSawaariCount(0);
    setIsNewRecord(false);
    setGameState('PLAYING');

    if (engineRef.current) {
      engineRef.current.restart();
    }
  };

  // Toggle Pause
  const handleTogglePause = () => {
    if (gameState === 'PLAYING') {
      setGameState('PAUSED');
      if (engineRef.current) engineRef.current.pause();
    } else if (gameState === 'PAUSED') {
      setGameState('PLAYING');
      if (engineRef.current) engineRef.current.resume();
    }
  };

  // Toggle Audio Mute
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Collision feedback
  const handleHit = () => {
    setIsShaking(true);
    setFlashRed(true);
    setTimeout(() => setFlashRed(false), 200);
    setTimeout(() => setIsShaking(false), 400);
  };

  // Horn trigger
  const handleHorn = () => {
    if (engineRef.current) {
      engineRef.current.blowHorn();
    }
    spawnPopup('PO POH! 📯', '#ffcc00');
  };

  // Game Over Handler
  const handleGameOver = (stats) => {
    setFinalStats(stats);
    setGameState('GAMEOVER');

    if (stats.score > highScore) {
      setIsNewRecord(true);
      setHighScore(stats.score);
      localStorage.setItem('pune_auto_high_score', stats.score.toString());
    }
  };

  return (
    <main
      className={`relative w-full h-full overflow-hidden bg-[#1a0f05] ${
        isShaking ? 'screen-shake' : ''
      }`}
    >
      {/* Red Hit Flash Vignette */}
      <div
        className={`absolute inset-0 z-40 pointer-events-none transition-opacity duration-150 bg-gradient-radial from-red-600/30 to-red-900/70 ${
          flashRed ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3D WebGL Canvas */}
      <GameCanvas
        gameState={gameState}
        engineRef={engineRef}
        onScore={setScore}
        onLives={setLives}
        onDistance={setDistance}
        onSpeed={setSpeed}
        onChai={setChaiCount}
        onSawaari={setSawaariCount}
        onGameOver={handleGameOver}
        onHit={handleHit}
        onPopup={spawnPopup}
        onHorn={handleHorn}
        onTogglePause={handleTogglePause}
      />

      {/* Active Game HUD */}
      {gameState === 'PLAYING' && (
        <HUD
          score={score}
          lives={lives}
          distance={distance}
          speed={speed}
          chaiCount={chaiCount}
          sawaariCount={sawaariCount}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onPause={handleTogglePause}
          onSteerLeft={() => engineRef.current?.steerLeft()}
          onSteerRight={() => engineRef.current?.steerRight()}
          onJump={() => engineRef.current?.jump()}
          onHorn={handleHorn}
          floatingPopups={floatingPopups}
        />
      )}

      {/* Start Screen */}
      {gameState === 'MENU' && (
        <StartScreen highScore={highScore} onStart={handleStartGame} />
      )}

      {/* Paused Screen */}
      {gameState === 'PAUSED' && (
        <PauseModal
          onResume={handleTogglePause}
          onRestart={handleRestart}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* Game Over Screen */}
      {gameState === 'GAMEOVER' && (
        <GameOverScreen
          score={score}
          highScore={highScore}
          isNewRecord={isNewRecord}
          stats={finalStats}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}
