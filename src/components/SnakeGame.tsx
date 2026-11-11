/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X, RotateCcw, Trophy } from 'lucide-react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID = 16;
const CELL_SIZE = 20;
const BOARD_SIZE = GRID * CELL_SIZE; // 320x320

export default function SnakeGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Snake State
  const snakeRef = useRef<Position[]>([
    { x: 8, y: 8 },
    { x: 8, y: 9 },
    { x: 8, y: 10 },
  ]);
  const currentDirRef = useRef<Direction>('UP');
  const nextDirRef = useRef<Direction>('UP');
  const foodRef = useRef<Position>({ x: 8, y: 4 });

  // Touch tracking
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Load High Score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('swastik_snake_best');
      if (saved) setHighScore(parseInt(saved, 10) || 0);
    } catch {
      // ignore
    }
  }, []);

  // Spawn Food
  const spawnFood = useCallback(() => {
    let next: Position;
    let collision: boolean;
    let attempts = 0;
    do {
      next = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID),
      };
      collision = snakeRef.current.some((seg) => seg.x === next.x && seg.y === next.y);
      attempts++;
    } while (collision && attempts < 250);

    foodRef.current = next;
  }, []);

  // Direction changer with reversal guard
  const requestDirection = useCallback((newDir: Direction) => {
    const cur = currentDirRef.current;
    if (
      (newDir === 'UP' && cur === 'DOWN') ||
      (newDir === 'DOWN' && cur === 'UP') ||
      (newDir === 'LEFT' && cur === 'RIGHT') ||
      (newDir === 'RIGHT' && cur === 'LEFT')
    ) {
      return;
    }
    nextDirRef.current = newDir;
  }, []);

  // Restart / Init
  const restartGame = useCallback(() => {
    snakeRef.current = [
      { x: 8, y: 8 },
      { x: 8, y: 9 },
      { x: 8, y: 10 },
    ];
    currentDirRef.current = 'UP';
    nextDirRef.current = 'UP';
    spawnFood();
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  }, [spawnFood]);

  // Open modal triggers instant fresh game
  useEffect(() => {
    if (isOpen) {
      restartGame();
    } else {
      setIsPlaying(false);
    }
  }, [isOpen, restartGame]);

  // Keyboard controls (WASD & Arrows)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (e.key === ' ' || e.key === 'Enter') {
        if (isGameOver) {
          e.preventDefault();
          restartGame();
          return;
        }
      }

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        requestDirection('UP');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        requestDirection('DOWN');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        requestDirection('LEFT');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        requestDirection('RIGHT');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isGameOver, restartGame, requestDirection]);

  // Universal Touch & Pointer Handling (Instant directional swipe and tap-to-steer)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isOpen) return;

    let isDown = false;

    const onPointerDown = (e: PointerEvent) => {
      isDown = true;
      pointerStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown || !pointerStartRef.current) return;

      const dx = e.clientX - pointerStartRef.current.x;
      const dy = e.clientY - pointerStartRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Trigger direction as soon as a 14px gesture threshold is reached
      if (dist > 14) {
        if (Math.abs(dx) > Math.abs(dy)) {
          requestDirection(dx > 0 ? 'RIGHT' : 'LEFT');
        } else {
          requestDirection(dy > 0 ? 'DOWN' : 'UP');
        }
        // Continuous steering without lifting finger/mouse
        pointerStartRef.current = {
          x: e.clientX,
          y: e.clientY,
          time: Date.now(),
        };
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDown || !pointerStartRef.current) return;
      isDown = false;
      const start = pointerStartRef.current;
      pointerStartRef.current = null;

      if (isGameOver) {
        restartGame();
        return;
      }

      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      const elapsed = Date.now() - start.time;

      // Quick tap/click: steer according to quadrant relative to board center
      if (Math.abs(dx) < 12 && Math.abs(dy) < 12 && elapsed < 350) {
        const rect = container.getBoundingClientRect();
        const clickX = e.clientX - (rect.left + rect.width / 2);
        const clickY = e.clientY - (rect.top + rect.height / 2);

        if (Math.abs(clickX) > Math.abs(clickY)) {
          requestDirection(clickX > 0 ? 'RIGHT' : 'LEFT');
        } else {
          requestDirection(clickY > 0 ? 'DOWN' : 'UP');
        }
      }
    };

    const onPointerCancel = () => {
      isDown = false;
      pointerStartRef.current = null;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
    };
  }, [isOpen, isGameOver, restartGame, requestDirection]);

  // Game Logic Tick Loop: Starts slower (135ms), progressively speeds up, and wraps around walls
  useEffect(() => {
    if (!isOpen || !isPlaying || isGameOver) return;

    // Slower starting speed (135ms), gradually accelerating with score down to 70ms
    const tickSpeed = Math.max(70, 135 - score * 3.5);

    const interval = setInterval(() => {
      currentDirRef.current = nextDirRef.current;
      const snake = [...snakeRef.current];
      const head = { ...snake[0] };

      switch (currentDirRef.current) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Screen Wrap-Around: Snake goes across square and comes back from the opposite side
      if (head.x < 0) head.x = GRID - 1;
      else if (head.x >= GRID) head.x = 0;

      if (head.y < 0) head.y = GRID - 1;
      else if (head.y >= GRID) head.y = 0;

      // Self collision only
      if (snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        setIsGameOver(true);
        setIsPlaying(false);
        return;
      }

      snake.unshift(head);

      // Check food
      const food = foodRef.current;
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => {
          const next = prev + 1;
          setHighScore((best) => {
            if (next > best) {
              try {
                localStorage.setItem('swastik_snake_best', next.toString());
              } catch {
                // ignore
              }
              return next;
            }
            return best;
          });
          return next;
        });
        spawnFood();
      } else {
        snake.pop();
      }

      snakeRef.current = snake;
    }, tickSpeed);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, isGameOver, score, spawnFood]);

  // Ambient Canvas Render Loop with Smooth Glow
  useEffect(() => {
    if (!isOpen) return;

    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(render);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dark field
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

      // Minimal ambient grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, BOARD_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(BOARD_SIZE, i * CELL_SIZE);
        ctx.stroke();
      }

      // Food
      const food = foodRef.current;
      const foodX = food.x * CELL_SIZE + CELL_SIZE / 2;
      const foodY = food.y * CELL_SIZE + CELL_SIZE / 2;

      // Ambient radial food glow
      const halo = ctx.createRadialGradient(foodX, foodY, 2, foodX, foodY, CELL_SIZE * 0.9);
      halo.addColorStop(0, 'rgba(52, 211, 153, 0.95)');
      halo.addColorStop(0.45, 'rgba(16, 185, 129, 0.4)');
      halo.addColorStop(1, 'transparent');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(foodX, foodY, CELL_SIZE * 0.9, 0, Math.PI * 2);
      ctx.fill();

      // Food core
      ctx.fillStyle = '#6EE7B7';
      ctx.beginPath();
      ctx.arc(foodX, foodY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Snake
      const snake = snakeRef.current;
      snake.forEach((seg, i) => {
        const x = seg.x * CELL_SIZE;
        const y = seg.y * CELL_SIZE;
        const isHead = i === 0;

        if (isHead) {
          // Head with ambient green lighting aura
          ctx.shadowColor = '#10B981';
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#34D399';
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4, 5);
          ctx.fill();
          ctx.shadowBlur = 0;

          // Head eye accents
          ctx.fillStyle = '#064E3B';
          ctx.beginPath();
          ctx.arc(x + CELL_SIZE / 2, y + CELL_SIZE / 2, 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Trailing body with progressive fade
          const alpha = Math.max(0.3, 1 - i / (snake.length + 4));
          ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.beginPath();
          ctx.roundRect(x + 2.5, y + 2.5, CELL_SIZE - 5, CELL_SIZE - 5, 4);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isOpen]);

  return (
    <>
      {/* Just a pure, minimal Symbol of Fun at Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          className="liquid-glass rounded-full w-12 h-12 text-white/90 hover:text-emerald-300 border border-white/20 bg-black/80 backdrop-blur-xl shadow-[0_0_24px_rgba(16,185,129,0.3)] flex items-center justify-center cursor-pointer transition-all duration-300 group"
          aria-label="Play"
          title="Play"
        >
          {/* Subtle breathing ambient green back-glow */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/15 animate-ping opacity-60 pointer-events-none" />
          <Gamepad2 className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
        </motion.button>
      </div>

      {/* Simplified, Minimal Game Overlay with Ambient Lighting */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
            {/* Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Centered Minimal Game Module */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 liquid-glass rounded-3xl p-5 border border-white/15 bg-neutral-950/90 shadow-[0_0_60px_rgba(16,185,129,0.18)] flex flex-col items-center max-w-[360px] w-full"
            >
              {/* Minimal Top Bar: Score & Best */}
              <div className="w-full flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="text-white/40 uppercase tracking-wider text-[11px]">Score</span>
                    <span className="font-bold tabular-nums text-sm">{score}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/50">
                    <Trophy className="w-3 h-3 text-amber-400/80" />
                    <span className="font-bold tabular-nums text-xs">{highScore}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="liquid-glass rounded-full p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Responsive Ambient Canvas Playfield */}
              <div
                ref={containerRef}
                className="relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] aspect-square w-full max-w-[320px] max-h-[320px] touch-none cursor-pointer flex items-center justify-center"
              >
                <canvas
                  ref={canvasRef}
                  width={BOARD_SIZE}
                  height={BOARD_SIZE}
                  className="w-full h-full block"
                />

                {/* Subtle Ambient Vignette Lighting Overlay */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_20px_rgba(16,185,129,0.12)] border border-emerald-500/10" />

                {/* Game Over Ambient Card */}
                {isGameOver && (
                  <div
                    onClick={restartGame}
                    className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center cursor-pointer select-none"
                  >
                    <p className="text-white text-xl font-medium tracking-tight mb-1 font-instrument">
                      Game Over
                    </p>
                    <p className="text-white/60 text-xs font-mono mb-4">
                      Score: <span className="text-emerald-400 font-bold">{score}</span>
                    </p>
                    <button
                      type="button"
                      onClick={restartGame}
                      className="liquid-glass rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors flex items-center gap-1.5 font-bold cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Play Again</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
