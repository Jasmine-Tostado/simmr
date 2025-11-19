import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import Theme from "@/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RecipesSelect } from "@/types";

type LogEntry = {
  recipe: RecipesSelect;
  date: string;
  tone: string;
};

const TABS = ["All", "Combos", "Kids", "Friends"];

export const StoryLog = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("All");

  // Replace with real Supabase logs later
  const mockLogs: LogEntry[] = [
    {
      recipe: {
        id: "1",
        title: "Berry Smoothies",
        image_url: "https://images.unsplash.com/photo-1584270354949-1fbb8b2c8e94",
        cook_time_minutes: "20",
        num_servings: "2",
        story_tone: "Educational",
        kid_friendly: false,
      } as unknown as RecipesSelect,
      date: "Apr 9, 2025",
      tone: "Educational",
    },
    {
      recipe: {
        id: "2",
        title: "Creamy Chicken Pasta",
        image_url: "https://images.unsplash.com/photo-1603079847631-e4c1a6fb3c2d",
        cook_time_minutes: "20",
        num_servings: "3",
        story_tone: "Cozy",
        kid_friendly: false,
      } as unknown as RecipesSelect,
      date: "Feb 19, 2025",
      tone: "Cozy",
    },
    {
      recipe: {
        id: "3",
        title: "Chocolate Lava Cake",
        image_url:
          "https://images.unsplash.com/photo-1608568790845-fcb91d5c5115",
        cook_time_minutes: "60",
        num_servings: "4",
        story_tone: "Adventure",
        kid_friendly: true,
      } as unknown as RecipesSelect,
      date: "Jun 16, 2025",
      tone: "Adventure",
    },
  ];

  // Filter logic
  const filteredLogs = mockLogs.filter((entry) => {
    if (activeTab === "All") return true;
    if (activeTab === "Kids") return entry.recipe.kid_friendly;
    if (activeTab === "Friends") return parseInt(entry.recipe.num_servings) >= 4;
    if (activeTab === "Combos") return !entry.recipe.kid_friendly;
    return true;
  });

  return (
    <View style={styles.container}>
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

        {/* Log Cards */}
        {filteredLogs.map((entry, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: entry.recipe.image_url }} style={styles.cardImage} />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{entry.recipe.title}</Text>

              <View style={styles.chip}>
                <Text style={styles.chipText}>{entry.tone}</Text>
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

            {/* Cook Again */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingTop: 16,
  },

  header: {
    fontSize: 32,
    fontWeight: "700",
    paddingHorizontal: 16,
    color: Theme.colors.primary,
  },

  subHeader: {
    fontSize: 16,
    paddingHorizontal: 16,
    color: "#444",
    marginBottom: 20,
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
    fontSize: 14,
    fontWeight: "500",
    color: Theme.colors.primary,
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
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    color: "#3b2b25",
  },

  chip: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#e7e4e4",
    borderRadius: 10,
    marginBottom: 8,
  },

  chipText: {
    fontSize: 13,
    color: "#444",
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
    fontSize: 14,
    color: "#444",
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
  },
});
