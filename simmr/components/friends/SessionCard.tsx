import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CookingSessionsSelect } from "@/types";
import Theme from "@/theme";
import { Ionicons, FontAwesome6, Feather } from "@expo/vector-icons";
import { useAuthContext } from "@/auth/use-auth-context";

type SessionCardProps = {
  session: CookingSessionsSelect;
};

export const SessionCard = ({ session }: SessionCardProps) => {
  const { userData } = useAuthContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.recipeTitle}>Recipe Title</Text>
      <View style={styles.dateRowContainer}>
        <View style={styles.iconTextContainer}>
          <FontAwesome6
            name="calendar"
            size={Theme.sizes.mediumIcon}
            color={Theme.colors.inputDefaultText}
          />
          <Text style={styles.infoText}>{session.session_date}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <Feather
            name="clock"
            size={Theme.sizes.mediumIcon}
            color={Theme.colors.inputDefaultText}
          />
          <Text style={styles.infoText}>{session.session_time}</Text>
        </View>
      </View>

      <View style={styles.iconTextContainer}>
        <Feather
          name="map-pin"
          size={Theme.sizes.mediumIcon}
          color={Theme.colors.inputDefaultText}
        />
        <Text style={styles.infoText}>{session.location}</Text>
      </View>

      {/* TODO: uncomment {userData?.id === session.creator_id && (
       
      )} */}
      <View style={styles.buttonRowContainer}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { backgroundColor: Theme.colors.primary },
          ]}
        >
          <Text
            style={[styles.buttonText, { color: Theme.colors.textSecondary }]}
          >
            See who's coming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer, { justifyContent: "space-between" }]}
        >
          <Text style={styles.buttonText}>Share invite</Text>
          <Feather
            name="send"
            size={Theme.sizes.largeIcon}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Theme.colors.primary,
    padding: 10,
    margin: 10,
  },
  recipeTitle: {
    fontSize: Theme.sizes.mediumText,
    color: Theme.colors.inputDefaultText,
    fontFamily: "Afacad",
    fontWeight: "500",
    marginVertical: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
    color: Theme.colors.text,
    fontFamily: "Afacad",
  },
  dateRowContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  iconTextContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  infoText: {
    fontSize: Theme.sizes.mediumText,
    color: Theme.colors.inputDefaultText,
    fontFamily: "Afacad",
    fontWeight: "500",
  },
  location: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
    fontFamily: "Afacad",
  },
  story_theme: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
    fontFamily: "Afacad",
  },
  invited_friends: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
    fontFamily: "Afacad",
  },
  recipe_id: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
    fontFamily: "Afacad",
  },
  creator_id: {
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
    fontFamily: "Afacad",
  },
  buttonRowContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginRight: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    width: "50%",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: Theme.sizes.mediumText,
    color: Theme.colors.primary,
    fontFamily: "Afacad",
    fontWeight: "500",
  },
});
