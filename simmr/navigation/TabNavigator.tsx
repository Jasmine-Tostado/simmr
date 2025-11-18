import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExploreScreen } from "@/screens/Explore";
import { ChatScreen } from "@/screens/Chat";
import { FriendsScreen } from "@/screens/Friends";
import { ProfileScreen } from "@/screens/Profile";
import { StoryLogScreen } from "@/screens/StoryLog";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome6,
  FontAwesome5,
} from "@expo/vector-icons";
import Theme from "@/theme";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Theme.colors.primary,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerShown: false,          
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="explore" color={color} size={size} />
          ),
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
