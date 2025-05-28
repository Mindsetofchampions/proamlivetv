-- Create live_event_sponsors table
CREATE TABLE IF NOT EXISTS live_event_sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  live_event_id UUID REFERENCES streams(id) ON DELETE CASCADE,
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  placement_type TEXT NOT NULL,
  time_offset INTEGER,
  ad_manifest_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add indexes
CREATE INDEX idx_live_event_sponsors_event_id ON live_event_sponsors(live_event_id);
CREATE INDEX idx_live_event_sponsors_sponsor_id ON live_event_sponsors(sponsor_id);

-- Enable RLS
ALTER TABLE live_event_sponsors ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Creators can manage their event sponsors"
  ON live_event_sponsors
  USING (
    EXISTS (
      SELECT 1 FROM streams
      WHERE streams.id = live_event_sponsors.live_event_id
      AND streams.creator_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view event sponsors"
  ON live_event_sponsors FOR SELECT
  USING (true);