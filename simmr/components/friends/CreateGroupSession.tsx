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

export const CreateGroupSession = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesome6
            name="arrow-left"
            size={22}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Create Group Cooking Session</Text>
        </View>
      </View>

      
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
  topActionButtonRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    // paddingHorizontal: 16,
  },
});
