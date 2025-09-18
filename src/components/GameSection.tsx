import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface Player {
  x: number;
  y: number;
  velocityY: number;
  isJumping: boolean;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const GameSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('geometryHighScore') || '0'));
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  
  const gameSpeed = useRef(8);
  const player = useRef<Player>({ x: 100, y: 300, velocityY: 0, isJumping: false });
  const obstacles = useRef<Obstacle[]>([]);
  const lastObstacle = useRef(0);
  const keys = useRef({ space: false });

  const motivationalMessages = [
    "¡La INTEGRIDAD es nuestro fundamento!",
    "¡HONESTIDAD en cada decisión!",
    "¡La TRANSPARENCIA nos distingue!",
    "¡RESPETO hacia todos siempre!",
    "¡La RESPONSABILIDAD nos impulsa!",
    "¡COMPROMISO con la excelencia!",
    "¡ÉTICA en cada acción!",
    "¡Los VALORES nos definen!",
    "¡PRINCIPIOS sólidos siempre!",
    "¡INTEGRIDAD CORP, valores del futuro!"
  ];

  // Audio context for sounds
  const playSound = useCallback((frequency: number, duration: number) => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  }, [soundEnabled]);

  const showMotivationalMessage = useCallback(() => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    setMotivationalMessage(randomMessage);
    setShowMessage(true);
    playSound(880, 0.3);
    
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }, [playSound]);

  const resetGame = useCallback(() => {
    player.current = { x: 100, y: 300, velocityY: 0, isJumping: false };
    obstacles.current = [];
    lastObstacle.current = 0;
    gameSpeed.current = 8;
    setScore(0);
    setShowMessage(false);
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameState('playing');
  }, [resetGame]);

  const gameOver = useCallback(() => {
    setGameState('gameOver');
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('geometryHighScore', score.toString());
    }
    playSound(220, 0.8);
  }, [score, highScore, playSound]);

  const jump = useCallback(() => {
    if (player.current.y >= 300 && !player.current.isJumping) {
      player.current.velocityY = -15;
      player.current.isJumping = true;
      playSound(440, 0.15);
      
      // Show motivational message on jump occasionally
      if (Math.random() < 0.3) {
        showMotivationalMessage();
      }
    }
  }, [playSound, showMotivationalMessage]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'playing') {
          jump();
        } else if (gameState === 'menu' || gameState === 'gameOver') {
          startGame();
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        keys.current.space = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        keys.current.space = false;
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, jump, startGame]);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    if (gameState === 'playing') {
      // Update player physics
      player.current.velocityY += 1; // gravity
      player.current.y += player.current.velocityY;

      // Ground collision
      if (player.current.y >= 300) {
        player.current.y = 300;
        player.current.velocityY = 0;
        player.current.isJumping = false;
      }

      // Generate obstacles
      if (canvas.width - lastObstacle.current > 250 + Math.random() * 150) {
        obstacles.current.push({
          x: canvas.width,
          y: 320,
          width: 40,
          height: 60 + Math.random() * 30
        });
        lastObstacle.current = canvas.width;
      }

      // Update obstacles
      obstacles.current = obstacles.current.filter(obstacle => {
        obstacle.x -= gameSpeed.current * 0.7;
        return obstacle.x > -obstacle.width;
      });

      // Check collisions
      const playerRect = { x: player.current.x, y: player.current.y, width: 40, height: 40 };
      for (const obstacle of obstacles.current) {
        if (
          playerRect.x < obstacle.x + obstacle.width &&
          playerRect.x + playerRect.width > obstacle.x &&
          playerRect.y < obstacle.y + obstacle.height &&
          playerRect.y + playerRect.height > obstacle.y
        ) {
          gameOver();
          return;
        }
      }

      // Update score and speed
      const newScore = Math.floor((Date.now() - (performance.now() - score * 100)) / 100);
      setScore(prev => {
        const current = prev + 1;
        
        // Show motivational message every 200 points
        if (current % 200 === 0 && current > 0) {
          showMotivationalMessage();
        }
        
        return current;
      });
      
      gameSpeed.current = Math.min(10, 5 + score * 0.005);
      lastObstacle.current -= gameSpeed.current * 0.7;
    }

    // Draw ground
    const gradient = ctx.createLinearGradient(0, 340, 0, canvas.height);
    gradient.addColorStop(0, '#00ffff');
    gradient.addColorStop(1, '#9f00ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 340, canvas.width, canvas.height - 340);

    // Draw player
    ctx.save();
    ctx.translate(player.current.x + 20, player.current.y + 20);
    ctx.rotate((player.current.velocityY * 0.1));
    
    const playerGradient = ctx.createLinearGradient(-20, -20, 20, 20);
    playerGradient.addColorStop(0, '#00ffff');
    playerGradient.addColorStop(0.5, '#ffffff');
    playerGradient.addColorStop(1, '#9f00ff');
    
    ctx.fillStyle = playerGradient;
    ctx.fillRect(-20, -20, 40, 40);
    
    // Glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00ffff';
    ctx.fillRect(-20, -20, 40, 40);
    
    ctx.restore();

    // Draw obstacles
    obstacles.current.forEach(obstacle => {
      const obstacleGradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x + obstacle.width, obstacle.y + obstacle.height);
      obstacleGradient.addColorStop(0, '#ff0080');
      obstacleGradient.addColorStop(1, '#8000ff');
      
      ctx.fillStyle = obstacleGradient;
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      
      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ff0080';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    ctx.shadowBlur = 0;

    if (gameState === 'playing') {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
  }, [gameState, score, gameOver, showMotivationalMessage]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoop();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState, gameLoop]);

  return (
    <section id="juego" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            INTEGRIDAD ADVENTURE GAME
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Supera obstáculos mientras fortaleces tus valores corporativos. ¡Cada salto es un paso hacia la integridad!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-6">
            {/* Game Stats */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">{score}</div>
                  <div className="text-sm text-gray-400">PUNTUACIÓN</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{highScore}</div>
                  <div className="text-sm text-gray-400">RÉCORD</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 bg-amber-500/20 hover:bg-amber-500/30 rounded-lg transition-colors duration-300"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5 text-amber-400" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
                </button>
                
                {gameState === 'playing' && (
                  <button
                    onClick={() => setGameState('menu')}
                    className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg transition-colors duration-300"
                  >
                    <Pause className="w-5 h-5 text-yellow-400" />
                  </button>
                )}
                
                <button
                  onClick={resetGame}
                  className="p-2 bg-gray-500/20 hover:bg-gray-500/30 rounded-lg transition-colors duration-300"
                >
                  <RotateCcw className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Game Canvas */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full border-2 border-amber-500/50 rounded-lg bg-black cursor-pointer"
                onClick={() => {
                  if (gameState === 'playing') {
                    jump();
                  } else {
                    startGame();
                  }
                }}
              />

              {/* Game Overlay */}
              {gameState !== 'playing' && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    {gameState === 'menu' ? (
                      <div>
                        <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                          ¡BIENVENIDO A INTEGRIDAD CORP!
                        </h3>
                        <p className="text-gray-300 mb-6">Presiona ESPACIO o haz clic para saltar</p>
                        <button
                          onClick={startGame}
                          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                        >
                          <Play className="w-5 h-5" />
                          <span>INICIAR</span>
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-4xl font-bold text-red-400 mb-2">¡GAME OVER!</h3>
                        <p className="text-xl text-gray-300 mb-2">Puntuación: {score}</p>
                        {score === highScore && (
                          <p className="text-yellow-400 mb-4">¡NUEVO RÉCORD!</p>
                        )}
                        <button
                          onClick={startGame}
                          className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                        >
                          <Play className="w-5 h-5" />
                          <span>REINTENTAR</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Motivational Message */}
              {showMessage && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500/90 to-yellow-500/90 backdrop-blur-sm text-black px-6 py-3 rounded-full border border-white/30 animate-bounce">
                  <div className="text-center font-bold">{motivationalMessage}</div>
                </div>
              )}
            </div>

            {/* Game Instructions */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-2">
                🎮 <span className="text-amber-400">ESPACIO</span> o <span className="text-amber-400">CLIC</span> para saltar
              </p>
              <p className="text-sm text-gray-500">
                Cada 200 puntos recibirás un mensaje motivacional sobre los valores de Integridad Corp
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;