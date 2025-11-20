import { View, Text, StyleSheet } from "react-native";
import Theme from "../theme";
import { Ionicons } from "@expo/vector-icons";

export const RecipeTime = ({ time }: { time: number }) => {
  return (
    <View style={styles.recipeTimeContainer}>
      <Ionicons
        name="time-outline"
        size={Theme.sizes.smallIcon}
        color={Theme.colors.inputDefaultText}
      />
      <Text style={styles.recipeTimeText}>{time} min</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  recipeTimeContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  recipeTimeText: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.inputDefaultText,
    fontWeight: "bold",
    fontFamily: "Afacad",
  },
});