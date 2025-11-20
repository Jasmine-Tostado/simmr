import { RecipeCategory, Restriction } from "@/types";
import { ImageSourcePropType } from "react-native";

/**
 * Maps recipe category enum values to their display titles
 */
export const getCategoryTitle = (category: RecipeCategory): string => {
  const categoryTitles: Record<RecipeCategory, string> = {
    Browse: "Browse recipes for you",
    Friends: "Cooking with friends",
    Kids: "Cooking with kids",
    TikTok: "Trending on TikTok",
    Challenge: "Challenge recipes",
    ThreeBites: "3 Ingredient bites",
    Sweets: "Sweet cravings",
  };

  return categoryTitles[category] || category;
};

export const getRestrictionImage = (
  restriction: Restriction
): ImageSourcePropType => {
  const restrictionIcons: Record<Restriction, string> = {
    "Nut-Free": require("@/assets/restriction-images/nut-free.png"),
    Vegan: require("@/assets/restriction-images/vegan.png"),
    Vegetarian: require("@/assets/restriction-images/vegetarian.png"),
    "Gluten-Free": require("@/assets/restriction-images/gluten-free.png"),
    None: require("@/assets/restriction-images/none.png"),
  };
  return (
    restrictionIcons[restriction] || require("@/assets/restriction-images/none.png")
  );
};
