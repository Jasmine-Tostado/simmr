import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { ExploreScreen } from "@/screens/Explore";
import { ChatScreen } from "@/screens/Chat";
import { FriendsScreen } from "@/screens/Friends";
import { ProfileScreen } from "@/screens/Profile";
import { StoryLog as StoryLogScreen } from "@/screens/StoryLog";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  FontAwesome5,
} from "@expo/vector-icons";
import Theme from "@/theme";

const Tab = createBottomTabNavigator();

// Screens that should hide the tab bar
const HIDE_TAB_BAR_ROUTES = [
  "BrowseRecipes",
  "RecipeDetails",
  "StoryToneSelection",
  "VoiceAI",
];

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarLabelStyle: {
          fontFamily: "Afacad",
          fontSize: Theme.sizes.tinyText,
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? "ExploreTabs";
          return {
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="explore" color={color} size={size + 3} />
            ),
            tabBarStyle: HIDE_TAB_BAR_ROUTES.includes(routeName)
              ? { display: "none" }
              : undefined,
          };
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={"chatbubble"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="StoryLog"
        component={StoryLogScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name={"book-open"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"user-friends"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} fill={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
