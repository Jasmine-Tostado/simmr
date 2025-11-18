import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import Theme from "@/theme";

export const BrowseRecipes = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome6
          name="chevron-left"
          size={24}
          color={Theme.colors.primary}
        />
      </TouchableOpacity>
      <Text>Browse Recipes</Text>
      <TouchableOpacity
        style={styles.startChatButton}
        onPress={() => navigation.navigate("Chat" as never)}
      >
        <Text style={styles.startChatButtonText}>Start a Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 10,
  },
  startChatButton: {
    padding: 10,
    backgroundColor: Theme.colors.primary,
    borderRadius: 5,
  },
  startChatButtonText: {
    color: Theme.colors.textSecondary,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
