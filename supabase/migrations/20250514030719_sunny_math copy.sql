/*
  # Stream Tables Migration

  1. New Tables
    - `streams`
      - `id` (uuid, primary key)
      - `creator_id` (uuid, references users)
      - `title` (text)
      - `status` (text)
      - `viewer_count` (integer)
      - `started_at` (timestamptz)
      - `ended_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `stream_viewers`
      - `id` (uuid, primary key)
      - `stream_id` (uuid, references streams)
      - `user_id` (uuid, references users)
      - `joined_at` (timestamptz)
      - `left_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for stream management and viewing
*/

-- Create streams table
CREATE TABLE IF NOT EXISTS streams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'offline',
  viewer_count INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create stream_viewers table
CREATE TABLE IF NOT EXISTS stream_viewers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stream_id UUID REFERENCES streams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ,
  UNIQUE(stream_id, user_id)
);

-- Enable RLS
ALTER TABLE streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE stream_viewers ENABLE ROW LEVEL SECURITY;

-- Policies for streams
CREATE POLICY "Anyone can view live streams"
  ON streams FOR SELECT
  USING (status = 'live');

CREATE POLICY "Creators can manage their streams"
  ON streams FOR ALL
  USING (creator_id = auth.uid());

-- Policies for stream_viewers
CREATE POLICY "Creators can view their stream viewers"
  ON stream_viewers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM streams
      WHERE streams.id = stream_viewers.stream_id
      AND streams.creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own viewer records"
  ON stream_viewers FOR ALL
  USING (user_id = auth.uid());

-- Create updated_at trigger for streams
CREATE TRIGGER update_streams_updated_at
    BEFORE UPDATE ON streams
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Create indexes
CREATE INDEX idx_streams_creator_id ON streams(creator_id);
CREATE INDEX idx_streams_status ON streams(status);
CREATE INDEX idx_stream_viewers_stream_id ON stream_viewers(stream_id);
CREATE INDEX idx_stream_viewers_user_id ON stream_viewers(user_id);