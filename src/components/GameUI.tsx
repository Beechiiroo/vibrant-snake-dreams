import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GameUIProps {
  score: number;
  gameStarted: boolean;
  gameOver: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  score,
  gameStarted,
  gameOver,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="space-y-6">
      {/* Score Display */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-[0_0_30px_theme(colors.primary/10)]">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-muted-foreground mb-2">SCORE</h2>
          <div className="text-4xl font-bold text-neon-cyan animate-score-pop">
            {score.toString().padStart(4, '0')}
          </div>
        </div>
      </Card>

      {/* Game Controls */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 shadow-[0_0_30px_theme(colors.primary/10)]">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center text-foreground">CONTROLS</h3>
          
          <div className="flex flex-col gap-3">
            {!gameStarted && !gameOver && (
              <Button
                onClick={onStart}
                className="w-full bg-neon-cyan hover:bg-neon-cyan/80 text-background font-bold py-3 shadow-[0_0_20px_theme(colors.neon.cyan/50)] hover:shadow-[0_0_30px_theme(colors.neon.cyan/70)] transition-all duration-200"
              >
                START GAME
              </Button>
            )}
            
            {gameStarted && !gameOver && (
              <Button
                onClick={onPause}
                variant="outline"
                className="w-full border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-background font-bold py-3 shadow-[0_0_15px_theme(colors.neon.magenta/30)] transition-all duration-200"
              >
                PAUSE
              </Button>
            )}
            
            {gameOver && (
              <Button
                onClick={onStart}
                className="w-full bg-neon-green hover:bg-neon-green/80 text-background font-bold py-3 shadow-[0_0_20px_theme(colors.neon.green/50)] hover:shadow-[0_0_30px_theme(colors.neon.green/70)] transition-all duration-200"
              >
                PLAY AGAIN
              </Button>
            )}
            
            <Button
              onClick={onReset}
              variant="outline"
              className="w-full border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-background font-bold py-3 shadow-[0_0_15px_theme(colors.neon.orange/30)] transition-all duration-200"
            >
              RESET
            </Button>
          </div>
        </div>
      </Card>

      {/* Instructions */}
      <Card className="p-6 bg-card/30 backdrop-blur-sm border-primary/10">
        <h3 className="text-sm font-semibold text-center text-muted-foreground mb-3">HOW TO PLAY</h3>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Move:</span>
            <span className="text-neon-cyan">Arrow Keys / WASD</span>
          </div>
          <div className="flex justify-between">
            <span>Start/Pause:</span>
            <span className="text-neon-cyan">Space Bar</span>
          </div>
          <div className="flex justify-between">
            <span>Reset:</span>
            <span className="text-neon-cyan">R Key</span>
          </div>
        </div>
      </Card>
    </div>
  );
};