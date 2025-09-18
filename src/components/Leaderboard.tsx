import React from 'react';
import { Trophy, Star, Target, Clock, Medal } from 'lucide-react';
import { TopPlayer, PlayerRanking } from '../lib/supabase';

interface LeaderboardProps {
  topPlayers: TopPlayer[];
  currentPlayerRanking?: PlayerRanking | null;
  loading: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ 
  topPlayers, 
  currentPlayerRanking, 
  loading 
}) => {
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">#{position}</div>;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1:
        return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/50';
      case 2:
        return 'from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 3:
        return 'from-amber-600/20 to-amber-700/20 border-amber-600/50';
      default:
        return 'from-gray-700/20 to-gray-800/20 border-gray-600/30';
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ranking del jugador actual */}
      {currentPlayerRanking && (
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>TU POSICIÓN</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">
                #{currentPlayerRanking.ranking_position || '?'}
              </div>
              <div className="text-sm text-gray-400">Posición</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {currentPlayerRanking.total_score.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Puntos Totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {currentPlayerRanking.total_stars}
              </div>
              <div className="text-sm text-gray-400">Estrellas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {currentPlayerRanking.games_played}
              </div>
              <div className="text-sm text-gray-400">Partidas</div>
            </div>
          </div>
        </div>
      )}

      {/* Top 10 Jugadores */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center justify-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span>TOP 10 JUGADORES</span>
        </h3>

        {topPlayers.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">¡Sé el primero en aparecer en el ranking!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {topPlayers.map((player, index) => (
              <div
                key={`${player.player_name}-${player.ranking_position}`}
                className={`bg-gradient-to-r ${getRankColor(player.ranking_position)} backdrop-blur-sm border rounded-xl p-4 transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getRankIcon(player.ranking_position)}
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-white text-lg">
                        {player.player_name}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-300">
                        <span className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{player.total_score.toLocaleString()} pts</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{player.total_stars}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{player.games_played} partidas</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-cyan-400">
                      {player.best_score.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Mejor Score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;