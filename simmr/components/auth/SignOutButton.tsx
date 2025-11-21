import db from "@/database";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Theme from "@/theme";
import { FontAwesome6 } from "@expo/vector-icons";

async function onSignOutButtonPress() {
  const { error } = await db.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
  }
}

export default function SignOutButton() {
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={onSignOutButtonPress}>
      <FontAwesome6
        name="right-from-bracket"
        size={18}
        color="#B3261E"
      />
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

    backgroundColor: "#FDECEC", // light red background
    paddingVertical: 18,
    borderRadius: 18,

    marginHorizontal: 16,
    marginBottom: 40,
  },

  logoutText: {
    color: "#B3261E", // red text
    fontSize: Theme.sizes.largeText,
    fontFamily: "Afacad",
    fontWeight: "600",
  },
});
