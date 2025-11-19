import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RecipesSelect } from "@/types";
import Theme from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExploreStackParamList } from "@/types";
import { StoryToneTag } from "./StoryToneTag";
import { RecipeTime } from "./RecipeTime";

export const BrowseRecipeCard = ({ recipe }: { recipe: RecipesSelect }) => {
  const navigation =
    useNavigation<StackNavigationProp<ExploreStackParamList>>();

  // Show up to 5 ingredients, then "..." if there are more
  const maxVisibleIngredients = 4;
  const visibleIngredients = recipe.ingredients.slice(0, maxVisibleIngredients);
  const hasMoreIngredients = recipe.ingredients.length > maxVisibleIngredients;

  return (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate("RecipeDetails", { recipe })}
    >
      <View style={styles.recipeImageContainer}>
        <Image source={{ uri: recipe.image_url }} style={styles.recipeImage} />
        <View style={styles.ingredientsContainer}>
          {visibleIngredients.map((ingredient, index) => {
            const ingredientName = ingredient.split(":")[0];
            return (
              <View style={styles.ingredientItem} key={index}>
                <View style={styles.bulletPoint}>
                  <Ionicons
                    name="ellipse"
                    size={Theme.sizes.tinyIcon}
                    color={Theme.colors.text}
                  />
                </View>
                <Text
                  key={index}
                  style={styles.ingredientText}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {ingredientName}
                </Text>
              </View>
            );
          })}
          {hasMoreIngredients && <Text style={styles.ellipsisText}>...</Text>}
        </View>
      </View>

      <View style={styles.recipeInfoContainer}>
        <Text style={styles.recipeTitle}>{recipe.title}</Text>
        <View style={styles.recipeTagsContainer}>
          <RecipeTime time={recipe.cook_time_minutes} />
          <StoryToneTag storyTone={recipe.story_tone} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
  },
  recipeImageContainer: {
    flexDirection: "row",
    backgroundColor: Theme.colors.secondaryBackground,
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 10,
    overflow: "hidden",
  },
  recipeImage: {
    width: "70%",
    height: 170,
    resizeMode: "cover",
  },

  ingredientItem: {
    flexDirection: "row",
    gap: 4,
  },
  ingredientsContainer: {
    flex: 1,
    padding: 10,
    maxWidth: "30%",
    height: 150,
  },
  bulletPoint: {
    marginTop: 6,
  },
  ingredientText: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
    marginBottom: 4,
  },
  ellipsisText: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
  },
  recipeTitle: {
    fontSize: Theme.sizes.smallText,
    fontWeight: "bold",
    color: Theme.colors.text,
  },
  recipeInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  recipeTagsContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
