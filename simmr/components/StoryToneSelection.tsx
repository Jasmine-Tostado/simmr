import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Theme from "@/theme";
import { ExploreStackParamList, StoryTone } from "@/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type StoryToneSelectionProps = {
  storyTone: StoryTone;
  onSaveToneSelection: (newStoryTone: StoryTone) => void;
  buttonText: string;
  isEditingGroupStoryTone?: boolean;
};

type NavigationProp = StackNavigationProp<ExploreStackParamList>;

const storyToneEmojis: Record<StoryTone, string> = {
  Adventure: "🗺️",
  Educational: "📚",
  Humorous: "🤹",
  Mystery: "🔮",
  Romantic: "🌹",
  Cozy: "🕯️",
};

export const StoryToneSelection = () => {
  const [selectedTone, setSelectedTone] = useState<StoryTone | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute();
  const { storyTone, onSaveToneSelection, buttonText } =
    route.params as StoryToneSelectionProps;

  useEffect(() => {
    setSelectedTone(storyTone);
  }, [storyTone]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome6
              name="chevron-left"
              size={Theme.sizes.largeIcon}
              color={Theme.colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Change story tone</Text>
          </View>
        </View>
        {Object.keys(storyToneEmojis).map((tone) => (
          <StoryToneItem
            key={tone}
            storyTone={tone as StoryTone}
            onPress={() => setSelectedTone(tone as StoryTone)}
            isSelected={selectedTone === (tone as StoryTone)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        disabled={!selectedTone}
        onPress={() => onSaveToneSelection(selectedTone ?? "Adventure")}
      >
        <Text style={styles.saveButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const StoryToneItem = ({
  storyTone,
  onPress,
  isSelected,
}: {
  storyTone: StoryTone;
  onPress: () => void;
  isSelected: boolean;
}) => {
  return (
    <TouchableOpacity
      style={[styles.storyToneItem, isSelected && styles.storyToneItemSelected]}
      onPress={onPress}
    >
      <View style={styles.storyToneItemEmojiContainer}>
        <Text style={styles.storyToneItemText}>
          {storyToneEmojis[storyTone]}
        </Text>

        <Text
          style={[
            styles.storyToneItemText,
            isSelected && styles.storyToneItemTextSelected,
          ]}
        >
          {storyTone}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    marginBottom: 10,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: Theme.sizes.headerTitle,
    fontWeight: "700",
    textAlign: "center",
    color: Theme.colors.primary,
  },
  headerButton: {
    padding: 10,
  },
  storyToneItem: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Theme.colors.inputBackground,
    margin: 10,
  },
  storyToneItemEmojiContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  storyToneItemText: {
    fontSize: Theme.sizes.mediumText,
    fontWeight: "600",
  },
  storyToneItemSelected: {
    backgroundColor: Theme.colors.secondaryBackground,
    borderWidth: 3,
    borderColor: Theme.colors.primary,
  },
  storyToneItemTextSelected: {
    color: Theme.colors.text,
    fontSize: Theme.sizes.mediumText,
    fontWeight: "600",
  },
  saveButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Theme.colors.primary,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.mediumText,
    fontWeight: "600",
  },
});
