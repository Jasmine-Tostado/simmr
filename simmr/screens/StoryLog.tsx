import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "@/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RecipesSelect } from "@/types";
import { StoryToneTag } from "@/components/StoryToneTag";

type LogEntry = {
  recipe: RecipesSelect;
  date: string;
  tone: string;
};

const TABS = ["All", "Combos", "Kids", "Friends"];

export const StoryLog = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("All");

  // Local mock logs with your images
  const mockLogs: LogEntry[] = [
    {
      recipe: {
        id: "smoothie",
        title: "Berry Smoothies",
        image_url: require("@/assets/storylog/smoothie.png"),
        cook_time_minutes: "10",
        num_servings: "1",
        story_tone: "Educational",
        kid_friendly: true,
      } as unknown as RecipesSelect,
      date: "Apr 10, 2025",
      tone: "Educational",
    },
    {
      recipe: {
        id: "tacos",
        title: "Fish Tacos",
        image_url: require("@/assets/storylog/tacos.png"),
        cook_time_minutes: "25",
        num_servings: "4",
        story_tone: "Adventure",
        kid_friendly: false,
      } as unknown as RecipesSelect,
      date: "Nov 1, 2025",
      tone: "Adventure",
    },
    {
      recipe: {
        id: "cake",
        title: "Chocolate Lava Cake",
        image_url: require("@/assets/storylog/cake.png"),
        cook_time_minutes: "45",
        num_servings: "4",
        story_tone: "Cozy",
        kid_friendly: false,
      } as unknown as RecipesSelect,
      date: "Jun 16, 2025",
      tone: "Cozy",
    },
    {
      recipe: {
        id: "wings",
        title: "Spicy Wings",
        image_url: require("@/assets/storylog/wings.png"),
        cook_time_minutes: "30",
        num_servings: "4",
        story_tone: "Adventure",
        kid_friendly: false,
      } as unknown as RecipesSelect,
      date: "Sep 15, 2025",
      tone: "Adventure",
    },
  ];

  // Filtering rules you requested
  const filteredLogs = mockLogs.filter((entry) => {
    if (activeTab === "All") return true;

    if (activeTab === "Combos") {
      return entry.recipe.id === "tacos" || entry.recipe.id === "cake";
    }

    if (activeTab === "Kids") {
      return entry.recipe.id === "smoothie";
    }

    if (activeTab === "Friends") {
      return (
        entry.recipe.id === "tacos" ||
        entry.recipe.id === "wings" ||
        entry.recipe.id === "cake"
      );
    }

    return true;
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>Story Log</Text>
        <Text style={styles.subHeader}>Your cooking journey</Text>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Cards */}
        {filteredLogs.map((entry, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={entry.recipe.image_url} // IMPORTANT FIX
              style={styles.cardImage}
            />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{entry.recipe.title}</Text>

              <View style={styles.chip}>
                <StoryToneTag storyTone={entry.recipe.story_tone} />
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={16}
                    color="#444"
                  />
                  <Text style={styles.metaText}>{entry.date}</Text>
                </View>

                <View style={styles.metaItem}>
                  <FontAwesome6 name="clock" size={14} color="#444" />
                  <Text style={styles.metaText}>
                    {entry.recipe.cook_time_minutes} min
                  </Text>
                </View>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.cardDivider} />

            {/* Cook Again button */}
            <TouchableOpacity
              style={styles.cookButton}
              onPress={() =>
                (navigation as any).navigate(
                  "RecipeDetails" as never,
                  { recipe: entry.recipe } as never
                )
              }
            >
              <Text style={styles.cookButtonText}>Cook Again</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  header: {
    fontSize: Theme.sizes.headerTitle,
    fontWeight: "700",
    paddingHorizontal: 16,
    color: Theme.colors.primary,
    fontFamily: "Agbalumo",
  },

  subHeader: {
    fontSize: Theme.sizes.smallText,
    paddingHorizontal: 16,
    color: "#444",
    marginBottom: 20,
    fontFamily: "Afacad",
  },

  tabsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  tabButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    backgroundColor: "#fff",
  },

  activeTabButton: {
    backgroundColor: Theme.colors.primary,
  },

  tabText: {
    fontSize: Theme.sizes.tinyText,
    fontWeight: "500",
    color: Theme.colors.primary,
    fontFamily: "Afacad",
  },

  activeTabText: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#faf6f3",
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d9c8c0",
    marginBottom: 28,
    overflow: "hidden",
  },

  cardImage: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  cardContent: {
    padding: 16,
  },

  cardTitle: {
    fontWeight: "700",
    marginBottom: 6,
    color: "#3b2b25",
    fontFamily: "Afacad",
    fontSize: Theme.sizes.mediumText,
  },

  chip: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    marginBottom: 8,
  },

  metaRow: {
    flexDirection: "row",
    gap: 20,
    marginTop: 6,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  metaText: {
    color: "#444",
    fontFamily: "Afacad",
    fontSize: Theme.sizes.smallText,
  },

  cardDivider: {
    height: 1,
    backgroundColor: "#d6cfc9",
    marginHorizontal: 16,
    marginTop: 12,
  },

  cookButton: {
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 16,
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    backgroundColor: "#fff",
  },

  cookButtonText: {
    color: Theme.colors.primary,
    fontWeight: "600",
    fontFamily: "Afacad",
    fontSize: Theme.sizes.smallText,
  },
});
