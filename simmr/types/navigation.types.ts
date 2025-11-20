import { StoryTone, RecipesSelect } from ".";

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

export type FriendsStackParamList = {
  FriendsLandingPage: undefined;
  ViewInvites: undefined;
  CreateGroupSession: undefined;
  ViewRsvps: undefined;
  
};

