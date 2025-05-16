/*
  # Consolidated Schema for PRO AM LIVE TV

  Combines all previous migrations into a single schema definition.
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role permissions table
CREATE TABLE IF NOT EXISTS role_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(role_id, permission)
);

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT UNIQUE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  is_creator BOOLEAN DEFAULT FALSE,
  creator_level TEXT DEFAULT 'basic',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- add unique email constraint
ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);

-- User roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role_id)
);

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  thumbnail_url TEXT,
  duration INTEGER, -- in seconds
  status TEXT DEFAULT 'PENDING_REVIEW',
  visibility TEXT DEFAULT 'PRIVATE',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  rejection_reason TEXT,
  hls_url TEXT,
  processing_progress INTEGER DEFAULT 0
);

-- Video analytics table
CREATE TABLE IF NOT EXISTS video_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  watch_duration INTEGER NOT NULL,
  watch_percentage NUMERIC(5,2) NOT NULL,
  watched_at TIMESTAMPTZ DEFAULT NOW(),
  device_type TEXT,
  browser TEXT,
  country TEXT,
  region TEXT
);

-- Video engagement table
CREATE TABLE IF NOT EXISTS video_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  engagement_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_hidden BOOLEAN DEFAULT FALSE
);

-- Viewer Demographics table
CREATE TABLE IF NOT EXISTS viewer_demographics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  age_range TEXT,
  gender TEXT,
  device_category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Full system access'),
  ('creator', 'Content creator with video management access'),
  ('moderator', 'Content moderation access'),
  ('viewer', 'Basic viewing access');

-- Insert default permissions
INSERT INTO role_permissions (role_id, permission)
SELECT id, 'manage:users' FROM roles WHERE name = 'admin';

INSERT INTO role_permissions (role_id, permission)
SELECT id, 'manage:videos' FROM roles WHERE name IN ('admin', 'creator');

INSERT INTO role_permissions (role_id, permission)
SELECT id, 'moderate:content' FROM roles WHERE name IN ('admin', 'moderator');

-- Enable Row Level Security
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_engagement ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE viewer_demographics ENABLE ROW LEVEL SECURITY;

-- Policies for roles
CREATE POLICY "Anyone can view roles"
  ON roles FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Only super_admin can manage roles"
  ON roles
  USING (
    auth.jwt() ->> 'role' = 'super_admin'
  );

-- Policies for role_permissions
CREATE POLICY "Admins can manage permissions"
  ON role_permissions
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'admin'
    )
  );

-- Policies for users
CREATE POLICY "Users can read their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_id);

-- Policies for user_roles
CREATE POLICY "Users can view their roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    auth.jwt() ->> 'role' = 'super_admin'
  );

-- Policies for videos
CREATE POLICY "Anyone can view public videos"
  ON videos FOR SELECT
  USING (visibility = 'PUBLIC');

CREATE POLICY "Creators can manage their own videos"
  ON videos FOR ALL
  TO authenticated
  USING (creator_id = (SELECT id FROM users WHERE auth_id = auth.uid()));

-- Policies for video_analytics
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

-- Policies for video_engagement
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

-- Policies for comments
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_videos_creator_id ON videos(creator_id);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_video_analytics_video_id ON video_analytics(video_id);
CREATE INDEX IF NOT EXISTS idx_video_engagement_video_id ON video_engagement(video_id);
CREATE INDEX IF NOT EXISTS idx_comments_video_id ON comments(video_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_viewer_demographics_video_id ON viewer_demographics(video_id);

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
