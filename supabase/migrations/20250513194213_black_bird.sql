/*
  # Video Analytics Schema

  1. New Tables
    - video_analytics
      - Stores detailed analytics data for each video view
    - video_engagement
      - Tracks user interactions like likes, shares
    - viewer_demographics
      - Stores anonymous viewer information
    
  2. Security
    - Enable RLS on all tables
    - Add policies for creators to view their analytics
*/

-- Video Analytics table
CREATE TABLE IF NOT EXISTS video_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  viewer_id uuid REFERENCES users(id) ON DELETE SET NULL,
  watch_duration integer NOT NULL,
  watch_percentage numeric(5,2) NOT NULL,
  watched_at timestamptz DEFAULT now(),
  device_type text,
  browser text,
  country text,
  region text
);

-- Video Engagement table
CREATE TABLE IF NOT EXISTS video_engagement (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  engagement_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Viewer Demographics table
CREATE TABLE IF NOT EXISTS viewer_demographics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid REFERENCES videos(id) ON DELETE CASCADE,
  age_range text,
  gender text,
  device_category text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE video_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_engagement ENABLE ROW LEVEL SECURITY;
ALTER TABLE viewer_demographics ENABLE ROW LEVEL SECURITY;

-- Policies for video analytics
CREATE POLICY "Creators can view their video analytics"
  ON video_analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_analytics.video_id
      AND videos.creator_id = auth.uid()
    )
  );

-- Policies for video engagement
CREATE POLICY "Creators can view their video engagement"
  ON video_engagement FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_engagement.video_id
      AND videos.creator_id = auth.uid()
    )
  );

-- Policies for viewer demographics
CREATE POLICY "Creators can view their viewer demographics"
  ON viewer_demographics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = viewer_demographics.video_id
      AND videos.creator_id = auth.uid()
    )
  );

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_video_analytics_video_id ON video_analytics(video_id);
CREATE INDEX IF NOT EXISTS idx_video_engagement_video_id ON video_engagement(video_id);
CREATE INDEX IF NOT EXISTS idx_viewer_demographics_video_id ON viewer_demographics(video_id);