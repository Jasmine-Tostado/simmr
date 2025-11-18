export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cooking_sessions: {
        Row: {
          creator_id: string
          id: string
          invited_friends: string[]
          location: string | null
          recipe_id: string | null
          session_date: string
          story_theme: string | null
        }
        Insert: {
          creator_id: string
          id?: string
          invited_friends?: string[]
          location?: string | null
          recipe_id?: string | null
          session_date: string
          story_theme?: string | null
        }
        Update: {
          creator_id?: string
          id?: string
          invited_friends?: string[]
          location?: string | null
          recipe_id?: string | null
          session_date?: string
          story_theme?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friends_cooking_sessions_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friends_cooking_sessions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          category: Database["public"]["Enums"]["RecipeCategory"]
          cook_time_minutes: number
          difficulty: Database["public"]["Enums"]["RecipeDifficulty"]
          id: string
          image_url: string
          ingredients: string[]
          instructions: string | null
          kid_friendly: boolean
          num_servings: string
          restriction: Database["public"]["Enums"]["Restriction"] | null
          story_tone: Database["public"]["Enums"]["StoryTone"]
          title: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["RecipeCategory"]
          cook_time_minutes: number
          difficulty?: Database["public"]["Enums"]["RecipeDifficulty"]
          id?: string
          image_url: string
          ingredients: string[]
          instructions?: string | null
          kid_friendly: boolean
          num_servings: string
          restriction?: Database["public"]["Enums"]["Restriction"] | null
          story_tone?: Database["public"]["Enums"]["StoryTone"]
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["RecipeCategory"]
          cook_time_minutes?: number
          difficulty?: Database["public"]["Enums"]["RecipeDifficulty"]
          id?: string
          image_url?: string
          ingredients?: string[]
          instructions?: string | null
          kid_friendly?: boolean
          num_servings?: string
          restriction?: Database["public"]["Enums"]["Restriction"] | null
          story_tone?: Database["public"]["Enums"]["StoryTone"]
          title?: string
        }
        Relationships: []
      }
      story_logs: {
        Row: {
          dish_image_url: string | null
          id: string
          recipe_id: string
          story_summary: string
          user_id: string
        }
        Insert: {
          dish_image_url?: string | null
          id?: string
          recipe_id: string
          story_summary: string
          user_id: string
        }
        Update: {
          dish_image_url?: string | null
          id?: string
          recipe_id?: string
          story_summary?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cooking_sessions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cooking_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          contacts: string[] | null
          display_name: string | null
          email: string
          id: string
          settings: string | null
        }
        Insert: {
          contacts?: string[] | null
          display_name?: string | null
          email: string
          id?: string
          settings?: string | null
        }
        Update: {
          contacts?: string[] | null
          display_name?: string | null
          email?: string
          id?: string
          settings?: string | null
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
      RecipeCategory:
        | "Browse"
        | "Friends"
        | "Kids"
        | "TikTok"
        | "Challenge"
        | "ThreeBites"
        | "Sweets"
      RecipeDifficulty: "Easy" | "Medium" | "Hard"
      Restriction: "Nut-Free" | "Vegan" | "Vegetarian" | "Gluten-Free" | "None"
      StoryTone:
        | "Cozy"
        | "Romantic"
        | "Adventure"
        | "Educational"
        | "Mystery"
        | "Humorous"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      RecipeCategory: [
        "Browse",
        "Friends",
        "Kids",
        "TikTok",
        "Challenge",
        "ThreeBites",
        "Sweets",
      ],
      RecipeDifficulty: ["Easy", "Medium", "Hard"],
      Restriction: ["Nut-Free", "Vegan", "Vegetarian", "Gluten-Free", "None"],
      StoryTone: [
        "Cozy",
        "Romantic",
        "Adventure",
        "Educational",
        "Mystery",
        "Humorous",
      ],
    },
  },
} as const
