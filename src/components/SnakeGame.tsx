import React, { useEffect } from 'react';
import { useSnakeGame, Direction } from '@/hooks/useSnakeGame';
import { GameBoard } from '@/components/GameBoard';
import { GameUI } from '@/components/GameUI';
import { toast } from 'sonner';

export const SnakeGame: React.FC = () => {
  const {
    snake,
    food,
    gameOver,
    gameStarted,
    score,
    gridSize,
    changeDirection,
    startGame,
    pauseGame,
    resetGame,
  } = useSnakeGame();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();
      
      switch (event.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          changeDirection('UP');
          break;
        case 'arrowdown':
        case 's':
          changeDirection('DOWN');
          break;
        case 'arrowleft':
        case 'a':
          changeDirection('LEFT');
          break;
        case 'arrowright':
        case 'd':
          changeDirection('RIGHT');
          break;
        case ' ':
          if (!gameStarted || gameOver) {
            startGame();
          } else {
            pauseGame();
          }
          break;
        case 'r':
          resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [changeDirection, startGame, pauseGame, resetGame, gameStarted, gameOver]);

  useEffect(() => {
    if (gameOver) {
      toast.error('Game Over!', {
        description: `Final Score: ${score}`,
        duration: 3000,
      });
    }
  }, [gameOver, score]);

  useEffect(() => {
    if (score > 0 && score % 50 === 0) {
      toast.success('Level Up!', {
        description: `Score: ${score}`,
        duration: 2000,
      });
    }
  }, [score]);

  return (
    <div className="min-h-screen bg-game-bg flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-magenta/5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-violet/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon-cyan/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-neon-magenta/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-violet bg-clip-text text-transparent mb-4 animate-pulse-neon">
            CYBER SNAKE
          </h1>
          <p className="text-muted-foreground text-lg">
            Navigate the neon grid and consume the glowing orbs!
          </p>
        </div>

        {/* Game Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Game Board */}
          <div className="lg:col-span-3 flex justify-center">
            <GameBoard
              snake={snake}
              food={food}
              gridSize={gridSize}
              gameOver={gameOver}
            />
          </div>
          
          {/* Game UI */}
          <div className="lg:col-span-1">
            <GameUI
              score={score}
              gameStarted={gameStarted}
              gameOver={gameOver}
              onStart={startGame}
              onPause={pauseGame}
              onReset={resetGame}
            />
          </div>
        </div>

        {/* Footer Instructions */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Use Arrow Keys or WASD to move • Space to start/pause • R to reset</p>
        </div>
      </div>
    </div>
  );
};