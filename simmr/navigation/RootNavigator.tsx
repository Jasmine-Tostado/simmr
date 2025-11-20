import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreenController } from "@/components/auth/SplashScreenController";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { useAuthContext } from "@/auth/use-auth-context";
import AuthProvider from "@/auth/auth-provider";
import { TabNavigator } from "./TabNavigator";
import LoginScreen from "@/components/auth/Login";

const Stack = createStackNavigator();

// Separate RootNavigator so we can access the AuthContext
function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext();

  // Show loading indicator while checking auth state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Afacad: require("../assets/fonts/Afacad/Afacad-VariableFont_wght.ttf"),
    Agbalumo: require("../assets/fonts/Agbalumo/Agbalumo-Regular.ttf"),
  });

  if (!fontsLoaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
