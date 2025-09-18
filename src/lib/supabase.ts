import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos TypeScript para las tablas
export interface Player {
  id: string;
  name: string;
  email?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface GameScore {
  id: string;
  player_id: string;
  score: number;
  stars: number;
  level_completed: number;
  game_duration: number;
  created_at: string;
}

export interface PlayerRanking {
  id: string;
  player_id: string;
  total_score: number;
  total_stars: number;
  games_played: number;
  best_score: number;
  ranking_position: number;
  updated_at: string;
}

export interface TopPlayer {
  player_name: string;
  total_score: number;
  total_stars: number;
  games_played: number;
  best_score: number;
  ranking_position: number;
}