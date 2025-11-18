import { View, Text, StyleSheet } from "react-native";
import Theme from "../theme";

export const StoryToneTag = ({ storyTone }: { storyTone: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{storyTone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: Theme.colors.inputBackground,
  },
  text: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
    fontWeight: "bold",
  },
});
