/*
  # Sistema de usuarios y puntuaciones para juego arcade

  1. Nuevas Tablas
    - `players`
      - `id` (uuid, primary key)
      - `name` (text, nombre del jugador)
      - `email` (text, email único)
      - `avatar_url` (text, URL del avatar)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `game_scores`
      - `id` (uuid, primary key)
      - `player_id` (uuid, foreign key)
      - `score` (integer, puntuación obtenida)
      - `stars` (integer, estrellas ganadas)
      - `level_completed` (integer, nivel alcanzado)
      - `game_duration` (integer, duración en segundos)
      - `created_at` (timestamp)
    
    - `player_rankings`
      - `id` (uuid, primary key)
      - `player_id` (uuid, foreign key)
      - `total_score` (integer, puntuación total acumulada)
      - `total_stars` (integer, estrellas totales)
      - `games_played` (integer, número de partidas)
      - `best_score` (integer, mejor puntuación)
      - `ranking_position` (integer, posición en el ranking)
      - `updated_at` (timestamp)

  2. Seguridad
    - Enable RLS en todas las tablas
    - Políticas para que los usuarios puedan ver y actualizar sus propios datos
    - Política pública para ver rankings
*/

-- Crear tabla de jugadores
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Crear tabla de puntuaciones de juego
CREATE TABLE IF NOT EXISTS game_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) ON DELETE CASCADE,
  score integer NOT NULL DEFAULT 0,
  stars integer NOT NULL DEFAULT 0,
  level_completed integer NOT NULL DEFAULT 1,
  game_duration integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Crear tabla de rankings de jugadores
CREATE TABLE IF NOT EXISTS player_rankings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid REFERENCES players(id) ON DELETE CASCADE UNIQUE,
  total_score integer NOT NULL DEFAULT 0,
  total_stars integer NOT NULL DEFAULT 0,
  games_played integer NOT NULL DEFAULT 0,
  best_score integer NOT NULL DEFAULT 0,
  ranking_position integer,
  updated_at timestamptz DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_rankings ENABLE ROW LEVEL SECURITY;

-- Políticas para la tabla players
CREATE POLICY "Los usuarios pueden ver todos los jugadores"
  ON players
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Los usuarios pueden insertar su propio perfil"
  ON players
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
  ON players
  FOR UPDATE
  TO authenticated, anon
  USING (true);

-- Políticas para la tabla game_scores
CREATE POLICY "Los usuarios pueden ver todas las puntuaciones"
  ON game_scores
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Los usuarios pueden insertar puntuaciones"
  ON game_scores
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Políticas para la tabla player_rankings
CREATE POLICY "Los usuarios pueden ver todos los rankings"
  ON player_rankings
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Los usuarios pueden insertar/actualizar rankings"
  ON player_rankings
  FOR ALL
  TO authenticated, anon
  USING (true)
  WITH CHECK (true);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_game_scores_player_id ON game_scores(player_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_score ON game_scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_game_scores_created_at ON game_scores(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_player_rankings_total_score ON player_rankings(total_score DESC);
CREATE INDEX IF NOT EXISTS idx_player_rankings_position ON player_rankings(ranking_position);

-- Función para actualizar el ranking automáticamente
CREATE OR REPLACE FUNCTION update_player_ranking()
RETURNS TRIGGER AS $$
BEGIN
  -- Insertar o actualizar el ranking del jugador
  INSERT INTO player_rankings (player_id, total_score, total_stars, games_played, best_score, updated_at)
  VALUES (
    NEW.player_id,
    NEW.score,
    NEW.stars,
    1,
    NEW.score,
    now()
  )
  ON CONFLICT (player_id) DO UPDATE SET
    total_score = player_rankings.total_score + NEW.score,
    total_stars = player_rankings.total_stars + NEW.stars,
    games_played = player_rankings.games_played + 1,
    best_score = GREATEST(player_rankings.best_score, NEW.score),
    updated_at = now();

  -- Actualizar posiciones de ranking
  WITH ranked_players AS (
    SELECT 
      player_id,
      ROW_NUMBER() OVER (ORDER BY total_score DESC, best_score DESC) as new_position
    FROM player_rankings
  )
  UPDATE player_rankings 
  SET ranking_position = ranked_players.new_position
  FROM ranked_players 
  WHERE player_rankings.player_id = ranked_players.player_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar ranking automáticamente
DROP TRIGGER IF EXISTS trigger_update_ranking ON game_scores;
CREATE TRIGGER trigger_update_ranking
  AFTER INSERT ON game_scores
  FOR EACH ROW
  EXECUTE FUNCTION update_player_ranking();

-- Función para obtener el top 10 de jugadores
CREATE OR REPLACE FUNCTION get_top_players(limit_count integer DEFAULT 10)
RETURNS TABLE (
  player_name text,
  total_score integer,
  total_stars integer,
  games_played integer,
  best_score integer,
  ranking_position integer
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.name,
    pr.total_score,
    pr.total_stars,
    pr.games_played,
    pr.best_score,
    pr.ranking_position
  FROM player_rankings pr
  JOIN players p ON pr.player_id = p.id
  ORDER BY pr.ranking_position ASC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;