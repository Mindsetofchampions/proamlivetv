-- Add IVS fields to streams table
ALTER TABLE streams
ADD COLUMN ivs_channel_arn TEXT,
ADD COLUMN ivs_stream_key TEXT,
ADD COLUMN ivs_playback_url TEXT;

-- Add indexes for IVS fields
CREATE INDEX idx_streams_ivs_channel_arn ON streams(ivs_channel_arn);