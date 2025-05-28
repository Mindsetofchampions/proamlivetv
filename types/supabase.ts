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
          status: string
          visibility: string
          published_at: string | null
          created_at: string
          updated_at: string
          rejection_reason: string | null
          hls_url: string | null
          processing_progress: number
        }
        Insert: {
          id?: string
          creator_id: string
          title: string
          description?: string | null
          url?: string | null
          thumbnail_url?: string | null
          duration?: number | null
          status?: string
          visibility?: string
          published_at?: string | null
          created_at?: string
          updated_at?: string
          rejection_reason?: string | null
          hls_url?: string | null
          processing_progress?: number
        }
        Update: {
          id?: string
          creator_id?: string
          title?: string
          description?: string | null
          url?: string | null
          thumbnail_url?: string | null
          duration?: number | null
          status?: string
          visibility?: string
          published_at?: string | null
          updated_at?: string
          rejection_reason?: string | null
          hls_url?: string | null
          processing_progress?: number
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
      [_ in never]: never
    }
  }
}