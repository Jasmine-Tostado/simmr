import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { ExploreStackParamList } from "@/types";
import Theme from "@/theme";

import { VoiceAI } from "@/components/VoiceAI";
import { RecipesList } from "@/components/RecipesList";
import { Pantry } from "@/components/Pantry";
import { BrowseRecipes } from "@/components/BrowseRecipes";
import { RecipeDetails } from "@/components/RecipeDetails";
import { VoiceSummary } from "@/components/VoiceSummary"; // adjust path if needed
import { StoryToneSelection } from "@/components/StoryToneSelection";

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator<ExploreStackParamList>();

const ExploreTabs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>simmr</Text>
      </View>
      <TopTab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: Theme.colors.primary,
          },
          tabBarLabelStyle: {
            fontFamily: "Afacad",
            fontSize: Theme.sizes.smallIcon,
          },
        }}
      >
        <TopTab.Screen name="Recipes" component={RecipesList} />
        <TopTab.Screen name="Pantry" component={Pantry} />
      </TopTab.Navigator>
    </View>
  );
};

export const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <Stack.Navigator>
        <Stack.Screen
          name="ExploreTabs"
          component={ExploreTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BrowseRecipes"
          component={BrowseRecipes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeDetails"
          component={RecipeDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VoiceAI"
          component={VoiceAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VoiceSummary"
          component={VoiceSummary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StoryToneSelection"
          component={StoryToneSelection}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.background,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: Theme.colors.primary,
    fontFamily: "Agbalumo",
  },
  recipeCard: {
    padding: 10,
  },
  ingredientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
