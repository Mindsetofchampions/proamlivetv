export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          auth_id: string
          email: string
          username: string | null
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          banner_url: string | null
          is_creator: boolean
          creator_level: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_id: string
          email: string
          username?: string | null
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          is_creator?: boolean
          creator_level?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_id?: string
          email?: string
          username?: string | null
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          banner_url?: string | null
          is_creator?: boolean
          creator_level?: string
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          creator_id: string
          title: string
          description: string | null
          url: string | null
          thumbnail_url: string | null
          duration: number | null
          status: VideoStatus
          visibility: Visibility
          published_at: string | null
          created_at: string
          updated_at: string
          rejection_reason: string | null
          hls_url: string | null
          processing_progress: number
          category: string | null
          impressions: number
        }
        Insert: {
          id?: string
          creator_id: string
          title: string
          description?: string | null
          url?: string | null
          thumbnail_url?: string | null
          duration?: number | null
          status?: VideoStatus
          visibility?: Visibility
          published_at?: string | null
          created_at?: string
          updated_at?: string
          rejection_reason?: string | null
          hls_url?: string | null
          processing_progress?: number
          category?: string | null
          impressions?: number
        }
        Update: {
          id?: string
          creator_id?: string
          title?: string
          description?: string | null
          url?: string | null
          thumbnail_url?: string | null
          duration?: number | null
          status?: VideoStatus
          visibility?: Visibility
          published_at?: string | null
          updated_at?: string
          rejection_reason?: string | null
          hls_url?: string | null
          processing_progress?: number
          category?: string | null
          impressions?: number
        }
      }
      video_analytics: {
        Row: {
          id: string
          video_id: string
          viewer_id: string | null
          watch_duration: number
          watch_percentage: number
          watched_at: string
          device_type: string | null
          browser: string | null
          country: string | null
          region: string | null
        }
        Insert: {
          id?: string
          video_id: string
          viewer_id?: string | null
          watch_duration: number
          watch_percentage: number
          watched_at?: string
          device_type?: string | null
          browser?: string | null
          country?: string | null
          region?: string | null
        }
        Update: {
          id?: string
          video_id?: string
          viewer_id?: string | null
          watch_duration?: number
          watch_percentage?: number
          watched_at?: string
          device_type?: string | null
          browser?: string | null
          country?: string | null
          region?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      VideoStatus: 'PENDING_REVIEW' | 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'FAILED' | 'READY'
      Visibility: 'PUBLIC' | 'PRIVATE' | 'UNLISTED'
    }
  }
}

export type VideoStatus = Database['public']['Enums']['VideoStatus']
export type Visibility = Database['public']['Enums']['Visibility']
export type Video = Database['public']['Tables']['videos']['Row']
export type VideoAnalytics = Database['public']['Tables']['video_analytics']['Row']