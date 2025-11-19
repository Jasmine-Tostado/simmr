import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import { RecipesSelect } from "@/types";

import { BrowseRecipeCard } from "./BrowseRecipeCard";

export const BrowseRecipes = () => {
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<RecipesSelect[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { recipes } = route.params as { recipes: RecipesSelect[] };
  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  const handleSearch = (search: string) => {
    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(filteredRecipes);
  };

  let headerTitle = "";
  const category = recipes[0].category;
  switch (category) {
    case "Browse":
      headerTitle = "Browse recipes for you";
      break;
    case "Friends":
      headerTitle = "Cooking with friends";
      break;
    case "Kids":
      headerTitle = "Cooking with kids";
      break;
    case "TikTok":
      headerTitle = "Trending on TikTok";
      break;
    case "Challenge":
      headerTitle = "Challenge recipes";
      break;
    case "ThreeBites":
      headerTitle = "3 Ingredient bites ";
      break;
    case "Sweets":
      headerTitle = "Sweet cravings";
      break;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6
            name="chevron-left"
            size={Theme.sizes.largeIcon}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>
      </View>

      {/*Search Bar*/}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search recipes"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => handleSearch(search)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleSearch(search)}
        >
          <Ionicons
            name="search-outline"
            size={Theme.sizes.largeIcon}
            color={Theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        {/* AI Chat Button */}
        <Text style={styles.chatSectionTitle}>
          Want to design your own recipe?
        </Text>
        <TouchableOpacity
          style={styles.startChatButton}
          onPress={() => navigation.navigate("Chat" as never)}
        >
          <Ionicons
            name="chatbubble-outline"
            size={Theme.sizes.largeIcon}
            color={Theme.colors.textSecondary}
          />
          <Text style={styles.startChatButtonText}>Start a Chat</Text>
        </TouchableOpacity>

        {/* Recipes List */}
        {filteredRecipes.map((recipe) => (
          <BrowseRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 10,
  },
  header: {
    padding: 10,
  },
  headerTitleContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  headerTitle: {
    fontSize: Theme.sizes.headerTitle,
    fontWeight: "bold",
    fontFamily: "Afacad",
  },
  searchBarContainer: {
    borderWidth: 1,
    borderColor: Theme.colors.text,
    backgroundColor: Theme.colors.inputBackground,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  searchBar: {
    padding: 10,
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
    fontFamily: "Afacad",
  },
  searchButton: {
    backgroundColor: Theme.colors.primary,
    padding: 10,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  chatSectionTitle: {
    fontSize: Theme.sizes.smallText,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "center",
    fontFamily: "Afacad",
  },
  startChatButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: Theme.colors.primary,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  startChatButtonText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.mediumText,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Afacad",
  },
  scrollView: {
    flex: 1,
  },
});
