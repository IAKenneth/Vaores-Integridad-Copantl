import React, { useState } from 'react';
import { Lock, Star, Trophy, Zap, Shield, Heart } from 'lucide-react';

interface Level {
  id: number;
  name: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil' | 'Extremo';
  unlocked: boolean;
  completed: boolean;
  stars: number;
  value: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

const LevelSelector = () => {
  const [selectedWorld, setSelectedWorld] = useState<'integrity' | 'ethics' | 'respect'>('integrity');

  const worlds = {
    integrity: {
      name: 'MUNDO DE LA INTEGRIDAD',
      color: 'from-cyan-500 to-blue-500',
      levels: [
        { id: 1, name: 'Transparencia Inicial', difficulty: 'Fácil' as const, unlocked: true, completed: true, stars: 3, value: 'Transparencia', description: 'Aprende los fundamentos de la honestidad', color: 'bg-cyan-500', icon: <Shield className="w-8 h-8" /> },
        { id: 2, name: 'Honestidad Pura', difficulty: 'Medio' as const, unlocked: true, completed: true, stars: 2, value: 'Honestidad', description: 'Demuestra tu compromiso con la verdad', color: 'bg-blue-500', icon: <Star className="w-8 h-8" /> },
        { id: 3, name: 'Responsabilidad Total', difficulty: 'Difícil' as const, unlocked: true, completed: false, stars: 0, value: 'Responsabilidad', description: 'Asume las consecuencias de tus acciones', color: 'bg-purple-500', icon: <Trophy className="w-8 h-8" /> },
        { id: 4, name: 'Confianza Suprema', difficulty: 'Extremo' as const, unlocked: false, completed: false, stars: 0, value: 'Confianza', description: 'El nivel más desafiante de integridad', color: 'bg-pink-500', icon: <Zap className="w-8 h-8" /> },
      ]
    },
    ethics: {
      name: 'MUNDO DE LA ÉTICA',
      color: 'from-purple-500 to-pink-500',
      levels: [
        { id: 5, name: 'Justicia Básica', difficulty: 'Fácil' as const, unlocked: false, completed: false, stars: 0, value: 'Justicia', description: 'Equilibra la balanza de lo correcto', color: 'bg-purple-400', icon: <Shield className="w-8 h-8" /> },
        { id: 6, name: 'Equidad Avanzada', difficulty: 'Medio' as const, unlocked: false, completed: false, stars: 0, value: 'Equidad', description: 'Trata a todos con imparcialidad', color: 'bg-purple-600', icon: <Heart className="w-8 h-8" /> },
        { id: 7, name: 'Moral Profesional', difficulty: 'Difícil' as const, unlocked: false, completed: false, stars: 0, value: 'Moral', description: 'Mantén tus principios bajo presión', color: 'bg-pink-500', icon: <Trophy className="w-8 h-8" /> },
        { id: 8, name: 'Ética Suprema', difficulty: 'Extremo' as const, unlocked: false, completed: false, stars: 0, value: 'Ética', description: 'El desafío ético definitivo', color: 'bg-pink-600', icon: <Zap className="w-8 h-8" /> },
      ]
    },
    respect: {
      name: 'MUNDO DEL RESPETO',
      color: 'from-green-500 to-teal-500',
      levels: [
        { id: 9, name: 'Cortesía Inicial', difficulty: 'Fácil' as const, unlocked: false, completed: false, stars: 0, value: 'Cortesía', description: 'Aprende las bases del trato cordial', color: 'bg-green-400', icon: <Heart className="w-8 h-8" /> },
        { id: 10, name: 'Tolerancia Media', difficulty: 'Medio' as const, unlocked: false, completed: false, stars: 0, value: 'Tolerancia', description: 'Acepta las diferencias con gracia', color: 'bg-green-500', icon: <Shield className="w-8 h-8" /> },
        { id: 11, name: 'Empatía Profunda', difficulty: 'Difícil' as const, unlocked: false, completed: false, stars: 0, value: 'Empatía', description: 'Comprende y siente con otros', color: 'bg-teal-500', icon: <Heart className="w-8 h-8" /> },
        { id: 12, name: 'Respeto Universal', difficulty: 'Extremo' as const, unlocked: false, completed: false, stars: 0, value: 'Respeto', description: 'El nivel maestro del respeto', color: 'bg-teal-600', icon: <Trophy className="w-8 h-8" /> },
      ]
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400';
      case 'Medio': return 'text-yellow-400';
      case 'Difícil': return 'text-orange-400';
      case 'Extremo': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const currentWorld = worlds[selectedWorld];

  return (
    <section id="niveles" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            SELECTOR DE MUNDOS
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora diferentes mundos de valores. Cada mundo presenta desafíos únicos para fortalecer tu carácter.
          </p>
        </div>

        {/* World Selector */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* World Tabs */}
          <div className="lg:w-1/3">
            <div className="space-y-4">
              {Object.entries(worlds).map(([key, world]) => (
                <button
                  key={key}
                  onClick={() => setSelectedWorld(key as any)}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedWorld === key
                      ? `bg-gradient-to-r ${world.color} border-white text-black`
                      : 'bg-gray-800/50 border-gray-600 hover:border-gray-400 text-white'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{world.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-75">
                      {world.levels.filter(l => l.completed).length}/{world.levels.length} Completado
                    </span>
                    <div className="flex">
                      {[...Array(3)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < world.levels.reduce((acc, level) => acc + level.stars, 0) / world.levels.length
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Level Grid */}
          <div className="lg:w-2/3">
            <div className={`bg-gradient-to-r ${currentWorld.color} p-1 rounded-2xl mb-6`}>
              <div className="bg-black rounded-xl p-6">
                <h3 className="text-3xl font-bold text-white mb-2">{currentWorld.name}</h3>
                <p className="text-gray-300">Selecciona un nivel para comenzar tu aventura de valores</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentWorld.levels.map((level) => (
                <div
                  key={level.id}
                  className={`relative group ${
                    level.unlocked
                      ? 'cursor-pointer hover:scale-105'
                      : 'cursor-not-allowed opacity-50'
                  } transition-all duration-300`}
                >
                  <div className={`${level.color} p-1 rounded-xl ${level.unlocked ? 'hover:shadow-2xl hover:shadow-cyan-500/30' : ''}`}>
                    <div className="bg-black rounded-lg p-6">
                      {/* Level Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 ${level.color} rounded-lg`}>
                          {level.unlocked ? level.icon : <Lock className="w-8 h-8 text-gray-400" />}
                        </div>
                        <div className="flex">
                          {[...Array(3)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < level.stars
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Level Info */}
                      <h4 className="text-xl font-bold text-white mb-2">{level.name}</h4>
                      <p className="text-sm text-gray-400 mb-3">{level.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                          level.unlocked ? getDifficultyColor(level.difficulty) : 'text-gray-500'
                        } bg-gray-800`}>
                          {level.difficulty}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          {level.value}
                        </span>
                      </div>

                      {/* Completion Badge */}
                      {level.completed && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-black rounded-full p-2">
                          <Trophy className="w-4 h-4" />
                        </div>
                      )}

                      {/* Play Button */}
                      {level.unlocked && (
                        <button className="absolute inset-0 bg-cyan-500/0 hover:bg-cyan-500/10 rounded-xl transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* External Game Reference */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                GEOMETRY JUMP CLÁSICO
              </h3>
              <p className="text-gray-300 mb-6">
                ¿Quieres más desafío? Prueba el juego original Geometry Jump para una experiencia clásica.
              </p>
            </div>
            
            <div className="bg-black/50 rounded-xl p-6 border border-purple-500/30">
              <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-400">Juego Geometry Jump Original</p>
                </div>
              </div>
              
              <div className="text-center">
                <a
                  href="https://www.juegosjuegos.com/jugar-juego/geometry-jump.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Zap className="w-5 h-5" />
                  <span>JUGAR GEOMETRY JUMP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelSelector;