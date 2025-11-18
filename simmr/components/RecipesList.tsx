import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome6 } from "@expo/vector-icons";
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
      return;
    }
    const normalized = (data ?? []).map((recipe: RecipesSelect) => recipe);
    setRecipes(normalized);
  };

  useEffect(() => {
    void fetchRecipes();
  }, []);

  const kidsRecipes = recipes.filter((recipe) => recipe.kid_friendly);

  const friendsRecipes = recipes.filter((recipe) => {
    if (recipe.kid_friendly) return false;
    const servings = parseInt(recipe.num_servings, 10);
    return !Number.isNaN(servings) && servings >= 4;
  });

  const recommendedRecipes = recipes.filter((recipe) => {
    const isKid = recipe.kid_friendly;
    const servings = parseInt(recipe.num_servings, 10);
    const isFriends = !Number.isNaN(servings) && !isKid && servings >= 4;
    return !isKid && !isFriends;
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SectionHeader
          title="Recipes for you"
          onPress={() => navigation.navigate("BrowseRecipes")}
        />
        <RecipesCarousel
          data={recommendedRecipes}
          emptyLabel="No recipes yet – add some to get started!"
        />

        <SectionHeader
          title="Cooking with kids"
          onPress={() => navigation.navigate("BrowseRecipes")}
        />
        <RecipesCarousel
          data={kidsRecipes}
          emptyLabel="No kid-friendly recipes yet."
        />

        <SectionHeader
          title="Cooking with friends"
          onPress={() => navigation.navigate("BrowseRecipes")}
        />
        <RecipesCarousel
          data={friendsRecipes}
          emptyLabel="No group recipes yet."
        />
      </ScrollView>
    </View>
  );
};

const SectionHeader = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.sectionHeader} onPress={onPress}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FontAwesome6
      name="chevron-right"
      size={16}
      color={Theme.colors.primary}
      style={styles.chevronIcon}
    />
  </TouchableOpacity>
);

const RecipesCarousel = ({
  data,
  emptyLabel,
}: {
  data: RecipesSelect[];
  emptyLabel: string;
}) => {
  if (data.length === 0) {
    return <Text style={styles.emptyText}>{emptyLabel}</Text>;
  }

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      contentContainerStyle={styles.carouselContent}
    />
  );
};

const RecipeCard = ({ recipe }: { recipe: RecipesSelect }) => {
  const navigation = useNavigation<NavigationProp>();

  const servings = recipe.num_servings;
  const cookTime = `${recipe.cook_time_minutes} min`;

  return (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate("RecipeDetails", { recipe })}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: recipe.image_url }}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={styles.recipeInfo}>
        <Text numberOfLines={1} style={styles.recipeTitle}>
          {recipe.title}
        </Text>
        <View style={styles.recipeMetaRow}>
          <Text style={styles.metaText}>{cookTime}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.metaText}>{recipe.story_tone}</Text>
        </View>
        <View style={styles.badgeRow}>
          {recipe.kid_friendly && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Kid friendly</Text>
            </View>
          )}
          {!!servings && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Serves {servings}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 28,
  },

  chevronIcon: {
    marginTop: 4,
  },
  emptyText: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    fontSize: 14,
    color: "#242424ff",
  },
  carouselContent: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  recipeCard: {
    width: 220,
    borderRadius: 16,
    backgroundColor: Theme.colors.secondaryBackground,
    marginHorizontal: 4,
    overflow: "hidden",
  },
  recipeImage: {
    width: "100%",
    height: 140,
  },
  recipeInfo: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  recipeMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metaText: {
    fontSize: 12,
    color: "#2c2828ff",
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#999",
    marginHorizontal: 6,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#f1e6df",
  },
  badgeText: {
    fontSize: 11,
  },
});
