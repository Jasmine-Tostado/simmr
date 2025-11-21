import React, { useEffect, useState } from "react";
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
import { useNavigation, CommonActions } from "@react-navigation/native";
import { RecipesSelect } from "@/types";
import { StoryToneTag } from "@/components/StoryToneTag";
import { useAuthContext } from "@/auth/use-auth-context";
import db from "@/database";
import { StoryLogWithRecipe } from "@/types";

type LogEntry = {
  recipe: RecipesSelect;
  date: string;
  tone: string;
};

const TABS = ["All", "Kids", "Friends"];

export const StoryLog = () => {
  const [storyLogs, setStoryLogs] = useState<StoryLogWithRecipe[]>([]);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("All");
  const { session } = useAuthContext();

  const fetchStoryLogs = async () => {
    try {
      if (!session) {
        console.error("Failed to fetch story logs: No session found");
        return;
      }
      const { data, error } = await db
        .from("story_logs")
        .select("*, recipes(*)")
        .eq("user_id", session.user.id);
      if (error) {
        console.error("Failed to fetch story logs", error);
        return;
      }
      if (data) {
        const storyLogs = data.map((log: StoryLogWithRecipe) => log);
        setStoryLogs(storyLogs);
        console.log("Story logs fetched successfully", storyLogs);
      }
    } catch {
      console.error("Failed to fetch story logs");
    }
  };

  useEffect(() => {
    fetchStoryLogs();
  }, [session]);

  const filteredLogs = storyLogs.filter((entry: StoryLogWithRecipe) => {
    if (activeTab === "All") return true;

    if (activeTab === "Kids") {
      return entry.recipes.kid_friendly;
    }

    if (activeTab === "Friends") {
      return entry.recipes.category === "Friends";
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
            {entry.dish_image_url && (
              <Image
                source={{ uri: entry.dish_image_url }}
                style={styles.cardImage}
              />
            )}

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{entry.recipes.title}</Text>

              <View style={styles.chip}>
                <StoryToneTag storyTone={entry.recipes.story_tone} />
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
                    {entry.recipes.cook_time_minutes} min
                  </Text>
                </View>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.cardDivider} />

            {/* Cook Again button */}
            <TouchableOpacity
              style={styles.cookButton}
              onPress={() => {
                // Navigate to Explore tab, then to RecipeDetails
                // StoryLog is in TabNavigator, so getParent() should return TabNavigator
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "TabNavigator",
                    params: {
                      screen: "Explore",
                      params: {
                        screen: "RecipeDetails",
                        params: { recipe: entry.recipes },
                      },
                    },
                  })
                );
              }}
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
