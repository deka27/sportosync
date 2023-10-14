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
      event: {
        Row: {
          created_at: string
          date: string | null
          event_name: string
          id: number
          location: string | null
          refree: number | null
          score_A: number | null
          score_B: number | null
          sport: string
          status: string
          team_A: string
          team_B: string
          time: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          event_name: string
          id?: number
          location?: string | null
          refree?: number | null
          score_A?: number | null
          score_B?: number | null
          sport: string
          status: string
          team_A: string
          team_B: string
          time?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          event_name?: string
          id?: number
          location?: string | null
          refree?: number | null
          score_A?: number | null
          score_B?: number | null
          sport?: string
          status?: string
          team_A?: string
          team_B?: string
          time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_refree_fkey"
            columns: ["refree"]
            referencedRelation: "player"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_sport_fkey"
            columns: ["sport"]
            referencedRelation: "sport"
            referencedColumns: ["sport_name"]
          },
          {
            foreignKeyName: "event_status_fkey"
            columns: ["status"]
            referencedRelation: "status"
            referencedColumns: ["status_name"]
          },
          {
            foreignKeyName: "event_team_a_fkey"
            columns: ["team_A"]
            referencedRelation: "team"
            referencedColumns: ["team_name"]
          },
          {
            foreignKeyName: "event_team_b_fkey"
            columns: ["team_B"]
            referencedRelation: "team"
            referencedColumns: ["team_name"]
          }
        ]
      }
      player: {
        Row: {
          created_at: string
          id: number
          player_name: string
          team: string | null
          village: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          player_name: string
          team?: string | null
          village?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          player_name?: string
          team?: string | null
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_team_fkey"
            columns: ["team"]
            referencedRelation: "team"
            referencedColumns: ["team_name"]
          }
        ]
      }
      sport: {
        Row: {
          created_at: string
          id: number
          sport_name: string
        }
        Insert: {
          created_at?: string
          id?: number
          sport_name: string
        }
        Update: {
          created_at?: string
          id?: number
          sport_name?: string
        }
        Relationships: []
      }
      status: {
        Row: {
          created_at: string
          id: number
          status_name: string
        }
        Insert: {
          created_at?: string
          id?: number
          status_name: string
        }
        Update: {
          created_at?: string
          id?: number
          status_name?: string
        }
        Relationships: []
      }
      team: {
        Row: {
          created_at: string
          id: number
          team_name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          team_name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          team_name?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
