import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome6, Ionicons, FontAwesome } from "@expo/vector-icons";
import Theme from "@/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExploreStackParamList, RecipesSelect } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StoryToneTag } from "@/components/StoryToneTag";
import { StoryTone } from "@/types";
import { getRestrictionImage } from "@/utils/recipeCategories";
import { useAuthContext } from "@/auth/use-auth-context";
import db from "@/database";

type NavigationProp = StackNavigationProp<ExploreStackParamList>;

export const RecipeDetails = () => {
  const [userIngredients, setUserIngredients] = useState<string[]>([]);
  const { userData } = useAuthContext();
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { recipe } = route.params as { recipe: RecipesSelect };

  const {
    title,
    image_url,
    cook_time_minutes,
    num_servings,
    kid_friendly,
    story_tone,
    ingredients,
  } = recipe;

  const total = ingredients.length;
  let have = ingredients.filter((item) => {
    const [name, amount] = item.split(":");
    console.log("ITEM: ", item);
    console.log(userIngredients);
    console.log(userIngredients.includes(item));
    return userIngredients.includes(name);
  }).length;
  let percent = total > 0 ? Math.round((have / total) * 100) : 0;

  // Sync pantry state with userData when it changes
  useEffect(() => {
    fetchUserIngredients();
    have = ingredients.filter((item) => {
      const [name, amount] = item.split(":");
      console.log("ITEM: ", item);
      console.log(userIngredients);
      console.log(userIngredients.includes(item));
      return userIngredients.includes(name);
    }).length;
    percent = total > 0 ? Math.round((have / total) * 100) : 0;
  }, [userData?.pantry]);

  const fetchUserIngredients = async () => {
    try {
      if (!userData) return;
      const { data, error } = await db
        .from("users")
        .select("pantry")
        .eq("id", userData.id);
      if (error) {
        console.error(error);
      }
      if (data) {
        console.log(data);
        setUserIngredients(data[0].pantry || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const description = (recipe as any).description ?? "";

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome6
              name="chevron-left"
              size={22}
              color={Theme.colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Recipe Details</Text>
          </View>
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: image_url }}
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {recipe.restriction && recipe.restriction !== "None" && (
            <Image
              source={getRestrictionImage(recipe.restriction)}
              style={styles.restrictionImage}
            />
          )}
        </View>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <FontAwesome6 name="clock" size={14} color="#444" />
            <Text style={styles.metaText}>{cook_time_minutes} min</Text>
          </View>

          <View style={styles.metaDot} />

          <View style={styles.metaItem}>
            <FontAwesome6 name="users" size={14} color="#444" />
            <Text style={styles.metaText}>{num_servings} servings</Text>
          </View>

          <View style={styles.metaDot} />

          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="chef-hat" size={16} color="#444" />
            <Text style={styles.metaText}>Easy</Text>
          </View>
        </View>

        <View style={styles.tagRow}>
          <StoryToneTag storyTone={story_tone} />
          {kid_friendly && (
            <StoryToneTag
              storyTone="Kid-Friendly"
              color={Theme.colors.primary}
              textColor={Theme.colors.textSecondary}
            />
          )}
        </View>

        <Text style={styles.sectionTitle}>Story Tone</Text>

        <View style={styles.storyBox}>
          <Text style={styles.storyText}>{story_tone}</Text>

          <TouchableOpacity
            style={{ marginTop: 8 }}
            onPress={() =>
              navigation.navigate("StoryToneSelection", {
                storyTone: story_tone,
                onSaveToneSelection: (newStoryTone: StoryTone) => {
                  // TODO: Update the story tone for the voice AI
                  navigation.goBack();
                },
                buttonText: "Save",
              })
            }
          >
            <Text style={styles.changeTone}>Change tone →</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate("VoiceAI", { recipe })}
        >
          <Text style={styles.startButtonText}>Start Cooking</Text>
        </TouchableOpacity>

        <View style={styles.squaredDivider} />

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>
              You have {have} of {total} ingredients
            </Text>
            <Text style={styles.progressPercent}>{percent}%</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${percent}%` }]} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>

        <View style={styles.ingredientsList}>
          {ingredients.map((item, i) => {
            const [name, amount] = item.split(":");
            return (
              <View key={i} style={styles.ingredientRow}>
                <View style={styles.ingredientNameContainer}>
                  <FontAwesome
                    name={
                      userIngredients.includes(name)
                        ? "check-circle"
                        : "circle-thin"
                    }
                    size={20}
                    color={Theme.colors.primary}
                  />
                  <Text style={styles.ingredientName}>{name?.trim()}</Text>
                </View>
                <Text style={styles.ingredientQty}>{amount?.trim() || ""}</Text>
              </View>
            );
          })}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingVertical: 10,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: Theme.sizes.headerTitle,
    textAlign: "center",
    color: Theme.colors.primary,
    fontFamily: "Agbalumo",
  },
  backButton: {
    padding: 8,
    marginTop: 8,
    marginLeft: 16,
  },
  imageWrapper: {
    width: "100%",
    paddingHorizontal: 16,
  },
  headerImage: {
    width: "100%",
    height: 240,
    borderRadius: 10,
  },

  title: {
    fontSize: Theme.sizes.headerTitle,
    fontWeight: "700",
    color: Theme.colors.primary,
    marginBottom: 4,
    fontFamily: "Agbalumo",
  },

  description: {
    fontSize: Theme.sizes.mediumText,
    paddingHorizontal: 16,
    color: Theme.colors.text,
    marginBottom: 10,
    fontFamily: "Afacad",
  },

  metaRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 18,
    alignItems: "center",
    gap: 5,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  metaText: {
    fontSize: Theme.sizes.smallText,
    fontFamily: "Afacad",
    color: Theme.colors.accentGray,
  },

  tagRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: Theme.sizes.largeText,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginBottom: 8,
    color: Theme.colors.primary,
    fontFamily: "Afacad",
  },

  storyBox: {
    backgroundColor: "#faf0ed",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },

  storyText: {
    fontSize: Theme.sizes.mediumText,
    color: Theme.colors.primary,
    fontFamily: "Afacad",
  },

  changeTone: {
    color: Theme.colors.primary,
    fontSize: Theme.sizes.mediumText,
    fontFamily: "Afacad",
    fontWeight: "500",
  },

  startButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 20,
  },

  startButtonText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.largeText,
    fontFamily: "Afacad",
    textAlign: "center",
    fontWeight: "600",
  },

  squaredDivider: {
    height: 1,
    backgroundColor: "#d9d2cd",
    width: "92%",
    alignSelf: "center",
    marginVertical: 24,
  },

  progressCard: {
    backgroundColor: "#faeee4",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f3d5c4",
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressLabel: {
    fontSize: Theme.sizes.mediumText,
    fontFamily: "Afacad",
    fontWeight: "500",
    color: Theme.colors.primary,
  },

  progressPercent: {
    fontSize: 16,
    color: Theme.colors.primary,
    fontWeight: "600",
  },

  progressBar: {
    height: 8,
    backgroundColor: "#e6d6c5",
    borderRadius: 10,
    marginTop: 12,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: Theme.colors.primary,
  },

  ingredientsList: {
    paddingHorizontal: 16,
    gap: 12,
  },

  ingredientRow: {
    backgroundColor: "#faefe6",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2d2c7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ingredientName: {
    fontSize: Theme.sizes.mediumText,
    fontWeight: "600",
    flexShrink: 1,
    color: Theme.colors.primary,
    fontFamily: "Afacad",
  },

  ingredientQty: {
    fontSize: Theme.sizes.mediumText,
    fontWeight: "400",
    color: Theme.colors.accentGray,
    fontFamily: "Afacad",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  restrictionImage: {
    width: 45,
    height: 60,
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#999",
    marginHorizontal: 6,
  },
  ingredientNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
