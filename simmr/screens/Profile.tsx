import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "@/theme";
import { useAuthContext } from "@/auth/use-auth-context";
import SignOutButton from "@/components/auth/SignOutButton";

export const ProfileScreen = () => {
  const { userData } = useAuthContext();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.header}>Profile</Text>
      <ScrollView style={styles.content}>
        <Text style={styles.email}>Email: {userData?.email}</Text>
        <View style={styles.signOutButtonContainer}>
          <SignOutButton />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    fontSize: Theme.sizes.headerTitle,
    fontWeight: "700",
    paddingHorizontal: 16,
    color: Theme.colors.primary,
    fontFamily: "Agbalumo",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  email: {
    fontSize: Theme.sizes.mediumText,
    fontFamily: "Afacad",
    fontWeight: "bold",
    marginVertical: 10,
  },
  signOutButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
