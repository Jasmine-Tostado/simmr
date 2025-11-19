import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import Theme from "@/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExploreStackParamList, RecipesSelect } from "@/types";

type NavigationProp = StackNavigationProp<ExploreStackParamList>;

export const RecipeDetails = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>();
  const { recipe } = route.params as { recipe: RecipesSelect };

  const {
    title,
    description,
    image_url,
    cook_time_minutes,
    num_servings,
    kid_friendly,
    educational,
    story_tone,
    ingredients,
  } = recipe;

  const list = Array.isArray(ingredients) ? ingredients : [];
  const total = list.length;
  const have = list.filter(i => i.have).length;
  const percent = total > 0 ? Math.round((have / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6
            name="chevron-left"
            size={Theme.sizes.largeIcon}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>

        {/* Top Image */}
        <Image
          source={{ uri: image_url }}
          style={styles.headerImage}
          resizeMode="cover"
        />

        {/* Title */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Meta Row */}
        <View style={styles.metaRow}>
          <Text style={styles.metaItem}>{cook_time_minutes} min</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaItem}>{num_servings} servings</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaItem}>Easy</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagRow}>
          {educational && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>Educational</Text>
            </View>
          )}
          {kid_friendly && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>Kid Friendly</Text>
            </View>
          )}
        </View>

        {/* Story Tone */}
        <Text style={styles.sectionTitle}>Story Tone</Text>
        <View style={styles.storyBox}>
          <Text style={styles.storyText}>“{story_tone}”</Text>
        </View>

        {/* Ingredient Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>
            You have {have} of {total} ingredients
          </Text>
          <Text style={styles.progressPercent}>{percent}%</Text>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${percent}%` }]} />
          </View>
        </View>

        {/* Ingredient List */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsList}>
          {list.map((item, index) => (
            <View key={index} style={styles.ingredientRow}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.ingredientQty}>{item.amount}</Text>
            </View>
          ))}
        </View>

        {/* Add Missing Items */}
        {have < total && (
          <View style={styles.missingBox}>
            <Text style={styles.missingText}>
              Add {total - have} missing item to grocery list
            </Text>
          </View>
        )}

        {/* Start Cooking Button */}
        <TouchableOpacity
          style={styles.startCookingButton}
          onPress={() => navigation.navigate("VoiceAI", { recipe })}
        >
          <Text style={styles.startCookingButtonText}>
            Start Cooking
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 6,
    borderRadius: 20,
  },
  headerImage: {
    width: "100%",
    height: 260,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    color: "#444",
    paddingHorizontal: 16,
    marginTop: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  metaItem: {
    fontSize: 14,
    color: "#555",
  },
  metaDot: {
    fontSize: 14,
    color: "#999",
  },
  tagRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  tag: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    color: "#444",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 22,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  storyBox: {
    backgroundColor: "#f8f1ed",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  storyText: {
    fontSize: 15,
    color: "#444",
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginTop: 22,
  },
  progressLabel: {
    fontSize: 16,
  },
  progressPercent: {
    fontSize: 16,
    color: Theme.colors.primary,
    marginTop: 2,
  },
  progressBar: {
    height: 8,
    borderRadius: 6,
    backgroundColor: "#e2d7ce",
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Theme.colors.primary,
    borderRadius: 6,
  },
  ingredientsList: {
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f4ebe6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  ingredientName: {
    fontSize: 15,
  },
  ingredientQty: {
    fontSize: 15,
    color: "#444",
  },
  missingBox: {
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 26,
  },
  missingText: {
    textAlign: "center",
    color: Theme.colors.primary,
    fontSize: 15,
  },
  startCookingButton: {
    backgroundColor: Theme.colors.primary,
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 50,
  },
  startCookingButtonText: {
    textAlign: "center",
    color: Theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: "600",
  },
});
