import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { TabNavigator } from "@/navigation/TabNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    Afacad: require("./assets/fonts/Afacad/Afacad-VariableFont_wght.ttf"),
    Agbalumo: require("./assets/fonts/Agbalumo/Agbalumo-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
