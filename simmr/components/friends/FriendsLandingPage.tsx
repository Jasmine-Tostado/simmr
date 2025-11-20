import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import db from "@/database";
import { RecipesSelect, FriendsStackParamList, RecipeCategory } from "@/types";
import Theme from "@/theme";
import { getCategoryTitle } from "@/utils/recipeCategories";
import { TopActionButton } from "./TopActionButton";
import { CookingSessionsSelect } from "@/types";
import { SessionCard } from "./SessionCard";

type NavigationProp = StackNavigationProp<FriendsStackParamList>;

const upcomingSessions: CookingSessionsSelect[] = [
  {
    id: "1",
    title: "Group Cooking Session 1",
    creator_id: "1",
    invited_friends: ["2", "3"],
    location: "123 Main St, Anytown, USA",
    recipe_id: "1",
    session_date: "2025-01-01",
    story_theme: "Family Dinner",
    session_time: "6:00",
  },
  {
    id: "2",
    title: "Group Cooking Session 2",
    creator_id: "2",
    invited_friends: ["3", "4"],
    location: "456 Main St, Anytown, USA",
    recipe_id: "2",
    session_date: "2025-01-02",
    story_theme: "Family Dinner",
    session_time: "7:00",
  },
];

const pastSessions: CookingSessionsSelect[] = [
  {
    id: "3",
    title: "Group Cooking Session 3",
    creator_id: "3",
    invited_friends: ["4", "5"],
    location: "789 Main St, Anytown, USA",
    recipe_id: "3",
    session_date: "2025-01-03",
    story_theme: "Family Dinner",
    session_time: "8:00",
  },
  {
    id: "4",
    title: "Group Cooking Session 4",
    creator_id: "4",
    invited_friends: ["5", "6"],
    location: "101 Main St, Anytown, USA",
    recipe_id: "4",
    session_date: "2025-01-04",
    story_theme: "Family Dinner",
    session_time: "9:00",
  },
];

export const FriendsLandingPage = () => {
  const navigation = useNavigation<NavigationProp>();



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cooking with Friends</Text>
      <Text style={styles.subHeader}>
        Plan group cooking sessions & send invites
      </Text>
      {/* Top Action Buttons */}
      <View style={styles.topActionButtonRow}>
        <TopActionButton
          title="Start group cooking now"
          iconName="user-friends"
          onPress={() => navigation.navigate("CreateGroupSession")}
        />
        <TopActionButton
          title="Plan group cooking session"
          iconName="calendar"
          onPress={() => navigation.navigate("CreateGroupSession")}
        />
        <TopActionButton
          title="View invites"
          subtitle="3 pending"
          iconName="envelope"
          onPress={() => navigation.navigate("ViewInvites")}
        />
      </View>

      <ScrollView>
        <Text style={styles.sectionTitle}>Upcoming sessions</Text>
        {upcomingSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}

        <Text style={styles.sectionTitle}>Past sessions</Text>
        {pastSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
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
  topActionButtonRow: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "500",
    paddingHorizontal: 16,
    color: Theme.colors.text,
    fontFamily: "Afacad",
    marginTop: 18,
  },
});
