import db from "@/database";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Theme from "@/theme";

async function onSignOutButtonPress() {
  const { error } = await db.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
  }
}

export default function SignOutButton() {
  return (
    <TouchableOpacity style={styles.button} onPress={onSignOutButtonPress}>
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.primary,
    padding: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "80%",
    marginTop: 20,
  },
  buttonText: {
    fontSize: Theme.sizes.headerTitle,
    fontFamily: "Afacad",
    fontWeight: "bold",
    color: Theme.colors.textSecondary,
  },
});
