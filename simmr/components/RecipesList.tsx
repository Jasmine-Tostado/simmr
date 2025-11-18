import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import db from "@/database";
import { RecipesSelect, ExploreStackParamList } from "@/types";
import Theme from "@/theme";

type NavigationProp = StackNavigationProp<ExploreStackParamList>;

export const RecipesList = () => {
  const [recipes, setRecipes] = useState<RecipesSelect[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const fetchRecipes = async () => {
    const { data, error } = await db.from("recipes").select("*");
    if (error) {
      console.error(error);
    } else {
      const recipes = data.map((recipe: RecipesSelect) => recipe);
      setRecipes(recipes);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.browseRecipesButton}
        onPress={() => navigation.navigate("BrowseRecipes")}
      >
        <Text>Browse Recipes</Text>
      </TouchableOpacity>
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id}
        style={styles.recipeFlatList}
      />
    </View>
  );
};

const RecipeCard = ({ recipe }: { recipe: RecipesSelect }) => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate("RecipeDetails", { recipe })}
    >
      <Text>Ttile: {recipe.title}</Text>
      <Text>Cook Time: {recipe.cook_time_minutes}</Text>
      <Text>Difficulty: {recipe.difficulty}</Text>
      <Text>Kid Friendly: {recipe.kid_friendly}</Text>
      <Text>Num Servings: {recipe.num_servings}</Text>
      <Text>Restriction: {recipe.restriction}</Text>
      <Text>Story Tone: {recipe.story_tone}</Text>
      <IngredientsList ingredients={recipe.ingredients} />
    </TouchableOpacity>
  );
};

const IngredientsList = ({ ingredients }: { ingredients: string[] }) => {
  return (
    <View>
      <Text>Ingredients</Text>
      {ingredients.map((ingredient, index) => {
        const ingredientName = ingredient.split(":")[0];
        const ingredientAmount = ingredient.split(":")[1];
        return (
          <View style={styles.ingredientContainer} key={index}>
            <Text>{ingredientName}</Text>
            <Text>{ingredientAmount}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Theme.colors.background,
  },
  recipeFlatList: {},
  recipeCard: {
    padding: 10,
    backgroundColor: Theme.colors.secondaryBackground,
    borderRadius: 10,
    marginVertical: 10,
  },
  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  browseRecipesButton: {
    padding: 10,
    backgroundColor: Theme.colors.primary,
    borderRadius: 5,
  },
});
