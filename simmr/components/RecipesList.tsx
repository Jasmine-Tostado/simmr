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
import { RecipesSelect, ExploreStackParamList, RecipeCategory } from "@/types";
import Theme from "@/theme";
import { getCategoryTitle } from "@/utils/recipeCategories";
import { StoryToneTag } from "./StoryToneTag";

const RECIPE_CATEGORIES: RecipeCategory[] = [
  "Browse",
  "Friends",
  "Kids",
  "TikTok",
  "Challenge",
  "ThreeBites",
  "Sweets",
];

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

  const getRecipesByCategory = (category: RecipeCategory): RecipesSelect[] => {
    return recipes.filter((recipe) => recipe.category === category);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {RECIPE_CATEGORIES.map((category) => {
          const categoryRecipes = getRecipesByCategory(category);
          return (
            <View key={category}>
              <SectionHeader
                title={getCategoryTitle(category)}
                onPress={() =>
                  navigation.navigate("BrowseRecipes", {
                    recipes: categoryRecipes,
                  })
                }
              />
              <RecipesCarousel
                data={categoryRecipes}
                emptyLabel={`No ${getCategoryTitle(
                  category
                ).toLowerCase()} yet.`}
              />
            </View>
          );
        })}
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
      size={Theme.sizes.smallIcon}
      color={Theme.colors.primary}
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

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <FontAwesome6 name="clock" size={14} color="#444" />
            <Text style={styles.metaText}>{recipe.cook_time_minutes} min</Text>
          </View>
          <View style={styles.metaDot} />
          <View style={styles.metaItem}>
            <FontAwesome6 name="users" size={14} color="#444" />
            <Text style={styles.metaText}>{recipe.num_servings} servings</Text>
          </View>
        </View>

        <View style={styles.badgeRow}>
          <StoryToneTag
            storyTone={recipe.story_tone}
            color="#f1e6df"
            textColor={Theme.colors.text}
          />
          {recipe.kid_friendly && recipe.category !== "Kids" && (
            <StoryToneTag
              storyTone="Kid-Friendly"
              color={Theme.colors.primary}
              textColor={Theme.colors.textSecondary}
            />
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
    fontSize: Theme.sizes.largeText,
    fontWeight: "600",
    lineHeight: 28,
    fontFamily: "Afacad",
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
    fontSize: Theme.sizes.mediumText,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Afacad",
  },
  recipeMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  metaText: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.accentGray,
    fontFamily: "Afacad",
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
    fontSize: Theme.sizes.smallText,
    fontFamily: "Afacad",
  },

  metaRow: {
    flexDirection: "row",
    marginBottom: 6,
    alignItems: "center",
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
