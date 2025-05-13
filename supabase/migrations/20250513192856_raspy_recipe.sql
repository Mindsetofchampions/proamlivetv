/*
  # Initial Schema Setup for PRO AM LIVE TV

  1. New Tables
    - users
      - Extended user profile for creators
    - videos
      - Core video content table
    - video_stats
      - Analytics and engagement metrics
    - earnings
      - Creator revenue tracking
    - comments
      - Video comments and interactions

  2. Security
    - RLS policies for each table
    - Secure access patterns for creators

  3. Changes
    - Initial schema creation
    - Basic indexes for performance
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  display_name text,
  bio text,
  avatar_url text,
  banner_url text,
  is_creator boolean DEFAULT false,
  creator_level text DEFAULT 'basic',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  url text,
  thumbnail_url text,
  duration integer, -- in seconds
  status text DEFAULT 'PENDING_REVIEW',
  visibility text DEFAULT 'PRIVATE',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  rejection_reason text,
  hls_url text,
  processing_progress integer DEFAULT 0
);

-- Video stats table
CREATE TABLE IF NOT EXISTS video_stats (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  shares integer DEFAULT 0,
  watch_time integer DEFAULT 0, -- in seconds
  avg_watch_duration numeric(10,2) DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

-- Earnings table
CREATE TABLE IF NOT EXISTS earnings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id uuid REFERENCES users(id) ON DELETE CASCADE,
  video_id uuid REFERENCES videos(id) ON DELETE SET NULL,
  amount numeric(10,2) NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'PENDING',
  created_at timestamptz DEFAULT now(),
  paid_at timestamptz
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  is_pinned boolean DEFAULT false,
  is_hidden boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_id);

-- Videos policies
CREATE POLICY "Anyone can view public videos"
  ON videos FOR SELECT
  USING (visibility = 'PUBLIC');

CREATE POLICY "Creators can manage their own videos"
  ON videos FOR ALL
  TO authenticated
  USING (creator_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Video stats policies
CREATE POLICY "Public stats are viewable by anyone"
  ON video_stats FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos 
      WHERE videos.id = video_stats.video_id 
      AND videos.visibility = 'PUBLIC'
    )
  );

CREATE POLICY "Creators can view their video stats"
  ON video_stats FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos 
      WHERE videos.id = video_stats.video_id 
      AND videos.creator_id = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );

-- Earnings policies
CREATE POLICY "Creators can view their earnings"
  ON earnings FOR SELECT
  TO authenticated
  USING (creator_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Comments policies
CREATE POLICY "Anyone can read public video comments"
  ON comments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM videos 
      WHERE videos.id = comments.video_id 
      AND videos.visibility = 'PUBLIC'
    )
  );

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM videos 
      WHERE videos.id = comments.video_id 
      AND videos.visibility = 'PUBLIC'
    )
  );

CREATE POLICY "Users can manage their own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_videos_creator_id ON videos(creator_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_video_stats_video_id ON video_stats(video_id);
CREATE INDEX IF NOT EXISTS idx_earnings_creator_id ON earnings(creator_id);
CREATE INDEX IF NOT EXISTS idx_comments_video_id ON comments(video_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
    BEFORE UPDATE ON videos
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();