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
import { RecipesSelect, FriendsStackParamList, RecipeCategory } from "@/types";
import Theme from "@/theme";
import { getCategoryTitle } from "@/utils/recipeCategories";
import { TopActionButton } from "./TopActionButton";

type NavigationProp = StackNavigationProp<FriendsStackParamList>;

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

      <Text style={styles.sectionTitle}>Upcoming sessions</Text>

      <Text style={styles.sectionTitle}>Past sessions</Text>
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
    fontSize: Theme.sizes.mediumText,
    fontWeight: "500",
    paddingHorizontal: 16,
    color: Theme.colors.text,
    fontFamily: "Afacad",
    marginTop: 18,
  },
});
