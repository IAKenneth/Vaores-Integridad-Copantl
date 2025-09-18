import { useState, useEffect } from 'react';
import { supabase, Player, GameScore, PlayerRanking, TopPlayer } from '../lib/supabase';

export const useGameData = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [topPlayers, setTopPlayers] = useState<TopPlayer[]>([]);
  const [playerRanking, setPlayerRanking] = useState<PlayerRanking | null>(null);
  const [loading, setLoading] = useState(false);

  // Crear o obtener jugador
  const createOrGetPlayer = async (name: string, email?: string): Promise<Player | null> => {
    try {
      setLoading(true);
      
      // Primero intentar encontrar por nombre
      let { data: existingPlayer, error: findError } = await supabase
        .from('players')
        .select('*')
        .eq('name', name)
        .single();

      if (existingPlayer && !findError) {
        setCurrentPlayer(existingPlayer);
        return existingPlayer;
      }

      // Si no existe, crear nuevo jugador
      const { data: newPlayer, error: createError } = await supabase
        .from('players')
        .insert([
          {
            name,
            email,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
          }
        ])
        .select()
        .single();

      if (createError) {
        console.error('Error creating player:', createError);
        return null;
      }

      setCurrentPlayer(newPlayer);
      return newPlayer;
    } catch (error) {
      console.error('Error in createOrGetPlayer:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Guardar puntuación del juego
  const saveGameScore = async (
    playerId: string,
    score: number,
    stars: number,
    levelCompleted: number,
    gameDuration: number
  ): Promise<boolean> => {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('game_scores')
        .insert([
          {
            player_id: playerId,
            score,
            stars,
            level_completed: levelCompleted,
            game_duration: gameDuration
          }
        ]);

      if (error) {
        console.error('Error saving game score:', error);
        return false;
      }

      // Actualizar ranking del jugador actual
      await fetchPlayerRanking(playerId);
      // Actualizar top players
      await fetchTopPlayers();

      return true;
    } catch (error) {
      console.error('Error in saveGameScore:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Obtener top jugadores
  const fetchTopPlayers = async (limit: number = 10) => {
    try {
      const { data, error } = await supabase
        .rpc('get_top_players', { limit_count: limit });

      if (error) {
        console.error('Error fetching top players:', error);
        return;
      }

      setTopPlayers(data || []);
    } catch (error) {
      console.error('Error in fetchTopPlayers:', error);
    }
  };

  // Obtener ranking del jugador
  const fetchPlayerRanking = async (playerId: string) => {
    try {
      const { data, error } = await supabase
        .from('player_rankings')
        .select('*')
        .eq('player_id', playerId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching player ranking:', error);
        return;
      }

      setPlayerRanking(data);
    } catch (error) {
      console.error('Error in fetchPlayerRanking:', error);
    }
  };

  // Obtener historial de puntuaciones del jugador
  const getPlayerScores = async (playerId: string, limit: number = 10): Promise<GameScore[]> => {
    try {
      const { data, error } = await supabase
        .from('game_scores')
        .select('*')
        .eq('player_id', playerId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching player scores:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getPlayerScores:', error);
      return [];
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    fetchTopPlayers();
  }, []);

  return {
    currentPlayer,
    topPlayers,
    playerRanking,
    loading,
    createOrGetPlayer,
    saveGameScore,
    fetchTopPlayers,
    fetchPlayerRanking,
    getPlayerScores
  };
};