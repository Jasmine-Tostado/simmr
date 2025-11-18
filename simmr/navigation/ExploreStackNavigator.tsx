import { createStackNavigator } from "@react-navigation/stack";
import { BrowseRecipes } from "@/components/BrowseRecipes";
import { RecipeDetails } from "@/components/RecipeDetails";

const Stack = createStackNavigator();

export const ExploreStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BrowseRecipes" component={BrowseRecipes} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
    </Stack.Navigator>
  );
};