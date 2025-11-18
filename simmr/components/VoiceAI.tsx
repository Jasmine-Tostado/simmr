import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RecipesSelect } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import Theme from "@/theme";

export const VoiceAI = () => {
  const route = useRoute();
  const { recipe } = route.params as { recipe: RecipesSelect };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome6 name="xmark" size={30} color={Theme.colors.primary} />
      </TouchableOpacity>
      <Text>VoiceAI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 10,
  },
});
