import { Database } from "./database.types";
export type RecipesInsert = Database["public"]["Tables"]["recipes"]["Insert"];
export type RecipesSelect = Database["public"]["Tables"]["recipes"]["Row"];

export type CookingSessionsInsert = Database["public"]["Tables"]["cooking_sessions"]["Insert"];
export type CookingSessionsSelect = Database["public"]["Tables"]["cooking_sessions"]["Row"];

export type StoryLogsInsert = Database["public"]["Tables"]["story_logs"]["Insert"];
export type StoryLogsSelect = Database["public"]["Tables"]["story_logs"]["Row"];

export type ExploreStackParamList = {
  ExploreTabs: undefined;
  BrowseRecipes: undefined;
  RecipeDetails: { recipe: RecipesSelect };
  VoiceAI:  { recipe: RecipesSelect };
};