// VoiceSummary.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import Theme from "@/theme";
import { RecipesSelect } from "@/types";

type RouteParams = {
  recipe: RecipesSelect;
};

export const VoiceSummary = () => {
  const route = useRoute();
  const { recipe } = route.params as RouteParams;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You finished {recipe.title}! 🎉</Text>
      <Text style={styles.body}>
        How did that feel? Take a moment to check in with yourself before you
        move on.
      </Text>
      {/* you can add buttons to save to StoryLog, rate, share, etc. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: Theme.sizes.mediumText,
    fontWeight: "600",
    color: Theme.colors.primary,
    textAlign: "center",
    marginBottom: 16,
  },
  body: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
    textAlign: "center",
    lineHeight: 20,
  },
});
