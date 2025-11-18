import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RecipesSelect } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import Theme from "@/theme";
import { ExploreStackParamList } from "@/types";
import { StackNavigationProp } from "@react-navigation/stack";

type NavigationProp = StackNavigationProp<ExploreStackParamList>;

export const RecipeDetails = () => {
  const route = useRoute();
  const { recipe } = route.params as { recipe: RecipesSelect };
  const navigation = useNavigation<NavigationProp>();
 
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome6
          name="chevron-left"
          size={Theme.sizes.largeIcon}
          color={Theme.colors.primary}
        />
      </TouchableOpacity>
      <Text>Recipe Details: {recipe.title}</Text>
      <TouchableOpacity
        style={styles.startCookingButton}
        onPress={() => navigation.navigate("VoiceAI", { recipe })}
      >
        <Text style={styles.startCookingButtonText}>Start Cooking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 10,
  },
  startCookingButton: {
    padding: 10,
    backgroundColor: Theme.colors.primary,
    borderRadius: 5,
  },
  startCookingButtonText: {
    color: Theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
