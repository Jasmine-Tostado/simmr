import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import Theme from "@/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExploreStackParamList, RecipesSelect } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StoryToneTag } from "@/components/StoryToneTag";
import { StoryTone } from "@/types";

type NavigationProp = StackNavigationProp<ExploreStackParamList>;

export const RecipeDetails = () => {
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

  const description = (recipe as any).description ?? "";

  const list = Array.isArray(ingredients) ? ingredients : [];
  const total = list.length;
  const have = list.filter(
    (item) => typeof item !== "string" && (item as any).have
  ).length;
  const percent = total > 0 ? Math.round((have / total) * 100) : 0;

  return (
    <View style={styles.container}>
<ScrollView showsVerticalScrollIndicator={false}>
  <View style={styles.header}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}
    >
      <FontAwesome6 name="chevron-left" size={22} color={Theme.colors.primary} />
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

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <FontAwesome6 name="clock" size={14} color="#444" />
            <Text style={styles.metaText}>{cook_time_minutes} min</Text>
          </View>

          <View style={styles.metaItem}>
            <FontAwesome6 name="users" size={14} color="#444" />
            <Text style={styles.metaText}>{num_servings} servings</Text>
          </View>

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
          {list.map((item, i) => {
            if (typeof item === "string") {
              const [name, amount] = item.split(":");
              return (
                <View key={i} style={styles.ingredientRow}>
                  <Text style={styles.ingredientName}>{name?.trim()}</Text>
                  <Text style={styles.ingredientQty}>
                    {amount?.trim() || ""}
                  </Text>
                </View>
              );
            }

            const ing = item as any;

            return (
              <View key={i} style={styles.ingredientRow}>
                <Text style={styles.ingredientName}>{ing.name}</Text>
                <Text style={styles.ingredientQty}>{ing.amount}</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitleContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  headerTitle: {
    fontSize: Theme.sizes.headerTitle,
    fontWeight: "700",
    textAlign: "center",
    color: Theme.colors.primary,
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
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: 16,
    color: Theme.colors.primary,
    marginTop: 14,
    marginBottom: 4,
  },

  description: {
    fontSize: 15,
    paddingHorizontal: 16,
    color: "#444",
    marginBottom: 18,
  },

  metaRow: {
    flexDirection: "row",
    gap: 22,
    paddingHorizontal: 16,
    marginBottom: 18,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  metaText: {
    fontSize: 14,
    color: "#444",
  },

  tagRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  tagChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#e7e4e4",
    borderRadius: 999,
  },

  tagText: {
    fontSize: 14,
    color: "#444",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 16,
    marginBottom: 8,
    color: Theme.colors.primary,
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
    fontSize: 15,
    color: "#5a3833",
  },

  changeTone: {
    color: Theme.colors.primary,
    fontSize: 15,
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
    color: "#fff",
    fontSize: 18,
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
    fontSize: 16,
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
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2d2c7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ingredientName: {
    fontSize: 15,
    fontWeight: "600",
    flexShrink: 1,
    color: "#3b2b25",
  },

  ingredientQty: {
    fontSize: 15,
    fontWeight: "400",
    color: "#3b2b25",
  },
});
