import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "@/theme";
import { FriendsStackParamList } from "@/types";
import { createStackNavigator } from "@react-navigation/stack";

import { FriendsLandingPage } from "@/components/friends/FriendsLandingPage";
import { ViewInvites } from "@/components/friends/ViewInvites";
import { CreateGroupSession } from "@/components/friends/CreateGroupSession";
import { ViewRsvps } from "@/components/friends/ViewRsvps";

const Stack = createStackNavigator<FriendsStackParamList>();

export const FriendsScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="FriendsLandingPage"
          component={FriendsLandingPage}
        />
        <Stack.Screen name="ViewInvites" component={ViewInvites} />
        <Stack.Screen
          name="CreateGroupSession"
          component={CreateGroupSession}
        />
        <Stack.Screen name="ViewRsvps" component={ViewRsvps} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});
