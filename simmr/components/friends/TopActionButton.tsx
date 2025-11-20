import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { FriendsStackParamList } from "@/types";
import Theme from "@/theme";

type NavigationProp = StackNavigationProp<FriendsStackParamList>;

type TopActionButtonProps = {
  title: string;
  subtitle?: string;
  iconName: string;
  onPress: () => void;
};
export const TopActionButton = ({
  title,
  subtitle,
  iconName,
  onPress,
}: TopActionButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {iconName === "calendar" ? (
        <FontAwesome6
          name={iconName}
          size={24}
          color={Theme.colors.primary}
          fill={Theme.colors.primary}
        />
      ) : (
        <FontAwesome5 name={iconName} size={24} color={Theme.colors.primary} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.secondaryBackground,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: Theme.colors.primary,
    alignItems: "flex-start",
    height: 120,
    paddingHorizontal: 5,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: Theme.sizes.mediumText,
    lineHeight: Theme.sizes.mediumText * 1.05,
    color: Theme.colors.text,
    fontFamily: "Afacad",
    fontWeight: "600",
    marginTop: 14,
  },
  headerSubtitle: {
    fontSize: Theme.sizes.smallText,
    textAlign: "center",
    color: Theme.colors.text,
    fontFamily: "Afacad",
  },
});
