import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "@/theme";

export const FriendsScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text>Friends</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});
