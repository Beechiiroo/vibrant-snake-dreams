import { useState, useEffect, useCallback, useRef } from 'react';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Position = { x: number; y: number };

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = 'RIGHT';
const INITIAL_FOOD = { x: 15, y: 15 };
const GAME_SPEED = 150;

export const useSnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lastDirection, setLastDirection] = useState<Direction>(INITIAL_DIRECTION);
  
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setGameStarted(false);
    setScore(0);
    setLastDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  }, []);

  const changeDirection = useCallback((newDirection: Direction) => {
    if (!gameStarted || gameOver) return;

    const opposites: Record<Direction, Direction> = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT',
    };

    if (newDirection !== opposites[lastDirection]) {
      directionRef.current = newDirection;
    }
  }, [gameStarted, gameOver, lastDirection]);

  const moveSnake = useCallback(() => {
    setSnake(currentSnake => {
      const head = currentSnake[0];
      const currentDirection = directionRef.current;
      
      const newHead = { ...head };
      
      switch (currentDirection) {
        case 'UP':
          newHead.y -= 1;
          break;
        case 'DOWN':
          newHead.y += 1;
          break;
        case 'LEFT':
          newHead.x -= 1;
          break;
        case 'RIGHT':
          newHead.x += 1;
          break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        return currentSnake;
      }

      // Check self collision
      if (currentSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return currentSnake;
      }

      const newSnake = [newHead, ...currentSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prevScore => prevScore + 10);
        setFood(generateFood());
        return newSnake;
      }

      // Remove tail if no food eaten
      newSnake.pop();
      return newSnake;
    });
    
    setDirection(directionRef.current);
    setLastDirection(directionRef.current);
  }, [food, generateFood]);

  const startGame = useCallback(() => {
    if (gameOver) {
      resetGame();
    }
    setGameStarted(true);
    
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    
    gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
  }, [gameOver, resetGame, moveSnake]);

  const pauseGame = useCallback(() => {
    setGameStarted(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  }, []);

  useEffect(() => {
    if (gameOver && gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  }, [gameOver]);

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);

  return {
    snake,
    direction,
    food,
    gameOver,
    gameStarted,
    score,
    gridSize: GRID_SIZE,
    changeDirection,
    startGame,
    pauseGame,
    resetGame,
  };
};