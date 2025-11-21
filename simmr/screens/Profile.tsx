import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "@/theme";
import { useAuthContext } from "@/auth/use-auth-context";
import SignOutButton from "@/components/auth/SignOutButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";

export const ProfileScreen = () => {
  const { userData } = useAuthContext();

  const [allowSubstitutions, setAllowSubstitutions] = useState(true);
  const [kidMode, setKidMode] = useState(false);

  const displayName =
    userData?.display_name ||
    "Your Profile";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>Settings</Text>

        {/* User Info */}
        <View style={styles.profileRow}>
          <View style={styles.profileIcon}>
            <FontAwesome6 name="user" size={30} color={Theme.colors.primary} />
          </View>
          <View>
            <Text style={styles.profileName}>{displayName}</Text>
            <Text style={styles.memberSince}>Member since Oct 2025</Text>
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.sectionHeaderRow}>
          <FontAwesome6 name="utensils" size={18} color={Theme.colors.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Preferences</Text>
        </View>

        {/* Allow Substitutions */}
        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleTitle}>Allow Substitutions</Text>
            <Text style={styles.toggleSubtitle}>
              Find recipes even if you're missing ingredients
            </Text>
          </View>

          <Switch
            value={allowSubstitutions}
            onValueChange={() => setAllowSubstitutions(!allowSubstitutions)}
            trackColor={{ false: "#ccc", true: Theme.colors.primary }}
            thumbColor="#fff"
          />
        </View>

        {/* Kid Mode */}
        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleTitle}>Kid Mode</Text>
            <Text style={styles.toggleSubtitle}>
              Show family-friendly content only
            </Text>
          </View>

          <Switch
            value={kidMode}
            onValueChange={() => setKidMode(!kidMode)}
            trackColor={{ false: "#ccc", true: Theme.colors.primary }}
            thumbColor="#fff"
          />
        </View>

        {/* Boxed settings below */}
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Dietary Restrictions</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Budget Settings</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Voice & Audio */}
        <View style={styles.sectionHeaderRow}>
          <FontAwesome6 name="volume-high" size={18} color={Theme.colors.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Voice and Audio</Text>
        </View>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Voice Speed</Text>
          <Text style={styles.settingSubLabel}>Normal</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Narrator Voice</Text>
          <Text style={styles.settingSubLabel}>Chef</Text>
        </TouchableOpacity>

        {/* Account */}
        <View style={styles.sectionHeaderRow}>
          <FontAwesome6 name="user" size={18} color={Theme.colors.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Account</Text>
        </View>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Edit Profile</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Notification Settings</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Connected Services */}
        <View style={styles.sectionHeaderRow}>
          <FontAwesome6 name="plug" size={18} color={Theme.colors.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Connected Services</Text>
        </View>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Grocery Integration</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>Smart Speaker</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.sectionDivider} />

        {/* Legal & Safety */}
        <View style={styles.sectionHeaderRow}>
          <FontAwesome6 name="shield-halved" size={18} color={Theme.colors.primary} style={styles.sectionIcon} />
          <Text style={styles.sectionTitle}>Legal & Safety</Text>
        </View>

        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            AI stories are fictionalized for entertainment. Always follow proper food safety guidelines when cooking.
          </Text>
        </View>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Privacy Policy</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Terms of Service</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>Cooking Safety Tips</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.sectionDivider} />

        {/* Log Out */}
        <View style={styles.logoutWrapper}>
          <SignOutButton />
        </View>

        <View style={{ height: 50 }} />
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
    paddingTop: 10,
    marginBottom: 10,
    color: Theme.colors.primary,
    fontFamily: "Agbalumo",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  profileIcon: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: "#fae9e7",
    justifyContent: "center",
    alignItems: "center",
  },

  profileName: {
    fontSize: Theme.sizes.largeText,
    fontFamily: "Afacad",
    fontWeight: "600",
    color: Theme.colors.primary,
  },

  memberSince: {
    fontSize: Theme.sizes.smallText,
    fontFamily: "Afacad",
    color: "#666",
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 6,
  },

  sectionIcon: {
    marginRight: 8,
  },

  sectionTitle: {
    fontSize: Theme.sizes.mediumText,
    fontWeight: "700",
    fontFamily: "Afacad",
    color: "#2d2927",
  },

  /* Toggle Rows */
  toggleRow: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  toggleTitle: {
    fontSize: Theme.sizes.mediumText,
    fontFamily: "Afacad",
    fontWeight: "600",
    color: "#2d2927",
  },

  toggleSubtitle: {
    fontSize: Theme.sizes.smallText,
    fontFamily: "Afacad",
    color: "#6a6a6a",
    marginTop: 2,
  },

  /* Boxed Buttons */
  settingRow: {
    backgroundColor: "#f6f4f2",
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  settingText: {
    fontSize: Theme.sizes.mediumText,
    fontFamily: "Afacad",
    color: "#2d2927",
  },

  settingSubLabel: {
    fontSize: Theme.sizes.mediumText,
    fontFamily: "Afacad",
    color: "#8a8583",
  },

  arrow: {
    fontSize: 20,
    color: "#8a8583",
  },

  noticeBox: {
    backgroundColor: "#faefe1",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },

  noticeText: {
    fontSize: Theme.sizes.smallText,
    color: "#6a5f57",
    fontFamily: "Afacad",
  },

  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  linkText: {
    fontSize: Theme.sizes.mediumText,
    fontFamily: "Afacad",
    color: "#201a17",
  },

  sectionDivider: {
    height: 1,
    backgroundColor: "#e5e1de",
    marginVertical: 20,
    marginHorizontal: 16,
  },

  logoutWrapper: {
    marginHorizontal: 16,
    marginTop: 10,
  },
});
