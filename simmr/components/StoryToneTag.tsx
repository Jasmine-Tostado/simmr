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
        { backgroundColor: color || Theme.colors.grayTagBackground },
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
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: Theme.sizes.smallText,
    fontWeight: "600",
    fontFamily: "Afacad",
  },
});
