import { Database } from "./database.types";
type RecipesInsert = Database["public"]["Tables"]["recipes"]["Insert"];
type RecipesSelect = Database["public"]["Tables"]["recipes"]["Row"];

type CookingSessionsInsert = Database["public"]["Tables"]["cooking_sessions"]["Insert"];
type CookingSessionsSelect = Database["public"]["Tables"]["cooking_sessions"]["Row"];

type StoryLogsInsert = Database["public"]["Tables"]["story_logs"]["Insert"];
type StoryLogsSelect = Database["public"]["Tables"]["story_logs"]["Row"];