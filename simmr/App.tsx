import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import RootLayout from "@/navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { TabNavigator } from "@/navigation/TabNavigator";

export default function App() {
  return <RootLayout />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
