import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import db from "@/database";
import { UsersInsert } from "@/types";
import Theme from "@/theme";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [madeSelection, setMadeSelection] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonPress = (isSignup: boolean) => {
    setMadeSelection(true);
    setIsSignup(isSignup);
  };

  const handleToggleSelection = () => {
    setMadeSelection(true);
    setIsSignup(!isSignup);
  };

  const handleSignup = async () => {
    console.log("Sign up");
    try {
      setIsLoading(true);
      const { data, error } = await db.auth.signUp({
        email,
        password,
      });
      if (error) {
        console.log("Sign up error", error);
        Alert.alert("Failed to sign up", error.message);
        setIsLoading(false);
        return;
      }
      console.log("Sign up data", data);
      if (data.user) {
        saveUserToDatabase(data.user.id, data.user.email ?? email);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    console.log("Login");
    try {
      const { data, error } = await db.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.log("Login error: ", error);
        Alert.alert("Failed to login", error.message);
      }
      console.log("Login data: ", data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const saveUserToDatabase = async (uid: string, email: string) => {
    try {
      const user: UsersInsert = {
        id: uid,
        email,
      };
      const { data, error } = await db.from("users").insert(user);
      if (error) {
        console.log("Save user to database error", error);
        Alert.alert("We are unable to create your account", "Please try again");
      }
      console.log("Save user to database data: ", data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("We are unable to create your account", "Please try again");
      setIsLoading(false);
    }
  };

  if (!madeSelection) {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>simmr</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Theme.colors.primary }]}
          onPress={() => handleButtonPress(true)}
        >
          <Text
            style={[styles.buttonText, { color: Theme.colors.textSecondary }]}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Theme.colors.background }]}
          onPress={() => handleButtonPress(false)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>simmr</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.passwordTitleContainer}>
          <Text style={styles.inputLabel}>Password:</Text>
          <TouchableOpacity
            style={styles.passwordViewButton}
            onPress={() => setViewPassword(!viewPassword)}
          >
            <Text style={styles.passwordViewButtonText}>
              {viewPassword ? "Hide" : "Show"}
            </Text>
            <Ionicons
              name={viewPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!viewPassword}
        />
        {isSignup && (
          <View style={styles.passwordInfoContainer}>
            <View style={styles.checkmarkContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color={
                  password.length >= 6 ? "green" : Theme.colors.inputDefaultText
                }
              />
            </View>
            <Text style={styles.passwordInfoText}>
              Password must be at least 6 characters long
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={isSignup ? handleSignup : handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={Theme.colors.textSecondary} />
        ) : (
          <Text style={styles.confirmButtonText}>
            {isSignup ? "Sign up" : "Login"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleToggleSelection}>
        <Text style={styles.switchSelectionText}>
          {isSignup ? "Already have an account? Login" : "New here? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Theme.colors.secondaryBackground,
  },
  logo: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 80,
    fontFamily: "Agbalumo",
    color: Theme.colors.primary,
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  button: {
    padding: 10,
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
  },
  inputContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: Theme.sizes.largeText,
    fontFamily: "Afacad",
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.inputDefaultText,
    backgroundColor: Theme.colors.background,
    fontFamily: "Afacad",
    fontSize: Theme.sizes.mediumText,
  },
  confirmButton: {
    padding: 5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    marginTop: 20,
    backgroundColor: Theme.colors.primary,
  },
  confirmButtonText: {
    fontSize: Theme.sizes.headerTitle,
    fontFamily: "Afacad",
    fontWeight: "bold",
    color: Theme.colors.textSecondary,
  },
  switchSelectionText: {
    fontSize: Theme.sizes.smallText,
    fontFamily: "Afacad",
    fontWeight: "bold",
    marginTop: 10,
    color: Theme.colors.primary,
  },
  passwordTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  passwordViewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  passwordViewButtonText: {
    fontSize: Theme.sizes.smallText,
    fontFamily: "Afacad",
    color: Theme.colors.text,
  },
  passwordInfoText: {
    fontSize: Theme.sizes.smallText,
    fontFamily: "Afacad",
    color: Theme.colors.inputDefaultText,
    marginTop: 5,
  },
  passwordInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  checkmarkContainer: {
    marginTop: 7,
  },
});
