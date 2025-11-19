import { View, Text, StyleSheet } from "react-native";
import Theme from "../theme";

type StoryToneTagProps = {
  storyTone: string;
  color?: string;
  textColor?: string;
};
export const StoryToneTag = ({
  storyTone,
  color,
  textColor,
}: StoryToneTagProps) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color || Theme.colors.inputBackground },
      ]}
    >
      <Text style={[styles.text, { color: textColor || Theme.colors.text }]}>
        {storyTone}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  text: {
    fontSize: Theme.sizes.smallText,
    fontWeight: "600",
  },
});
