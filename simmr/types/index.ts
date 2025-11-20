import { Database } from "./database.types";
export type RecipesInsert = Database["public"]["Tables"]["recipes"]["Insert"];
export type RecipesSelect = Database["public"]["Tables"]["recipes"]["Row"];

export type CookingSessionsInsert =
  Database["public"]["Tables"]["cooking_sessions"]["Insert"];
export type CookingSessionsSelect =
  Database["public"]["Tables"]["cooking_sessions"]["Row"];

export type StoryLogsInsert =
  Database["public"]["Tables"]["story_logs"]["Insert"];
export type StoryLogsSelect = Database["public"]["Tables"]["story_logs"]["Row"];

export type UsersInsert = Database["public"]["Tables"]["users"]["Insert"];
export type UsersSelect = Database["public"]["Tables"]["users"]["Row"];

export type RecipeCategory = Database["public"]["Enums"]["RecipeCategory"];
export type RecipeDifficulty = Database["public"]["Enums"]["RecipeDifficulty"];
export type Restriction = Database["public"]["Enums"]["Restriction"];
export type StoryTone = Database["public"]["Enums"]["StoryTone"];

export type ExploreStackParamList = {
  ExploreTabs: undefined;
  StoryToneSelection: {
    storyTone: StoryTone;
    onSaveToneSelection: (newStoryTone: StoryTone) => void;
    buttonText: string;
  };
  BrowseRecipes: { recipes: RecipesSelect[] };
  RecipeDetails: { recipe: RecipesSelect };
  VoiceAI: { recipe: RecipesSelect };
  VoiceSummary: { recipe: RecipesSelect };
};
