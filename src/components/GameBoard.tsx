import React from 'react';
import { Position } from '@/hooks/useSnakeGame';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gridSize: number;
  gameOver: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gridSize, gameOver }) => {
  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;
    
    let cellContent = null;
    let cellClasses = "relative transition-all duration-200 ";

    if (isSnakeHead) {
      cellClasses += "bg-neon-cyan shadow-[0_0_20px_theme(colors.neon.cyan)] animate-pulse-neon rounded-sm";
      cellContent = (
        <div className="absolute inset-0 bg-neon-cyan rounded-sm animate-snake-move">
          <div className="absolute inset-1 bg-game-bg rounded-[2px] opacity-30"></div>
        </div>
      );
    } else if (isSnakeBody) {
      const segmentIndex = snake.findIndex(segment => segment.x === x && segment.y === y);
      const opacity = Math.max(0.3, 1 - (segmentIndex * 0.1));
      cellClasses += `bg-neon-cyan opacity-80 shadow-[0_0_10px_theme(colors.neon.cyan)] rounded-sm`;
      cellContent = (
        <div 
          className="absolute inset-0 bg-neon-cyan rounded-sm"
          style={{ opacity }}
        >
          <div className="absolute inset-1 bg-game-bg rounded-[2px] opacity-20"></div>
        </div>
      );
    } else if (isFood) {
      cellClasses += "bg-neon-magenta shadow-[0_0_25px_theme(colors.neon.magenta)] animate-food-glow rounded-full";
      cellContent = (
        <div className="absolute inset-0 bg-neon-magenta rounded-full animate-food-glow">
          <div className="absolute inset-1 bg-neon-orange rounded-full opacity-60"></div>
          <div className="absolute inset-2 bg-neon-yellow rounded-full opacity-40"></div>
        </div>
      );
    }

    return (
      <div
        key={`${x}-${y}`}
        className={`w-6 h-6 ${cellClasses}`}
      >
        {cellContent}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Game board background with grid effect */}
      <div className="absolute inset-0 bg-game-board rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 bg-gradient-to-br from-game-board/20 to-transparent rounded-lg"></div>
      </div>
      
      {/* Game over overlay */}
      {gameOver && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-destructive mb-2 animate-pulse-neon">GAME OVER</h3>
            <p className="text-muted-foreground">Press Space or click Start to play again</p>
          </div>
        </div>
      )}
      
      {/* Grid */}
      <div 
        className="grid gap-[1px] p-4 relative z-0"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: gridSize }, (_, y) =>
          Array.from({ length: gridSize }, (_, x) => renderCell(x, y))
        )}
      </div>
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-lg border-2 border-primary/30 shadow-[0_0_30px_theme(colors.primary/20)] pointer-events-none"></div>
    </div>
  );
};