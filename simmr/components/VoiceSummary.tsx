//import React, { useState } from "react";

//import { useNavigation, useRoute } from "@react-navigation/native";
//import { FontAwesome6 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
//import Theme from "@/theme";
//import { RecipesSelect } from "@/types";

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import Theme from "@/theme";
// import { RecipesSelect } from "@/types";
// import type { NavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExploreStackParamList, RecipesSelect } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type NavigationProp = StackNavigationProp<ExploreStackParamList>;

type RouteParams = {
  recipe: RecipesSelect;
  storySummary: string;
};

export const VoiceSummary = () => {
  //const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { recipe, storySummary } = route.params as RouteParams;

  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handleDone = () => {
    // e.g. navigate to StoryLog, Explore, etc.
    navigation.goBack();
  };

  const handleCapturePress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required to capture your dish.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const captureButtonLabel = photoUri ? "Retake Photo" : "Capture your dish";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6
            name="xmark"
            size={Theme.sizes.largeIcon}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerDoneButton} onPress={handleDone}>
          <Text style={styles.headerDoneText}>Done</Text>
        </TouchableOpacity>
      </View>

      {/* Capture card */}
      <View style={styles.captureCard}>
        {/* Photo area */}
        <View style={styles.photoArea}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photoImage} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <FontAwesome6
                name="camera"
                size={32}
                color={Theme.colors.primary}
              />
              <Text style={styles.optionalText}>Optional</Text>
            </View>
          )}
        </View>

        {/* Capture / Retake button bar */}
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleCapturePress}
        >
          <Text style={styles.captureButtonText}>{captureButtonLabel}</Text>
        </TouchableOpacity>
      </View>

      {/* Story summary */}
      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Story summary:</Text>
        <Text style={styles.summaryBody}>{storySummary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerDoneButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  headerDoneText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.smallText,
    fontWeight: "600",
  },

  captureCard: {
    marginTop: 4,
    borderRadius: 24,
    backgroundColor: Theme.colors.secondaryBackground,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
    overflow: "hidden",
  },
  photoArea: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  photoPlaceholder: {
    height: 180,
    borderRadius: 16,
    backgroundColor: "#FFE4CF",
    justifyContent: "center",
    alignItems: "center",
  },
  optionalText: {
    marginTop: 8,
    color: Theme.colors.primary,
    fontSize: 12,
  },
  photoImage: {
    height: 220,
    borderRadius: 16,
    width: "100%",
  },
  captureButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 12,
    alignItems: "center",
  },
  captureButtonText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.smallText,
    fontWeight: "600",
  },

  summarySection: {
    marginTop: 24,
  },
  summaryTitle: {
    fontSize: Theme.sizes.smallText,
    fontWeight: "700",
    marginBottom: 8,
    color: Theme.colors.text,
  },
  summaryBody: {
    fontSize: SMALLER_TEXT,
    color: Theme.colors.text,
    lineHeight: 20,
  },
});

const SMALLER_TEXT = 14;
