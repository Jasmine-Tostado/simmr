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

type NavigationProp = StackNavigationProp<FriendsStackParamList>;

export const ViewInvites = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text>ViewInvites</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});
