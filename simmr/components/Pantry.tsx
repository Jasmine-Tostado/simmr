import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Theme from "@/theme";

const COMMON_INGREDIENTS: string[] = [
  "Chicken",
  "Beef",
  "Pork",
  "Fish",
  "Shrimp",
  "Tofu",
  "Bacon",
  "Milk",
  "Yogurt",
  "Cream",
  "Sour Cream",
  "Potatoes",
  "Carrots",
  "Broccoli",
  "Spinach",
  "Bell Peppers",
  "Lettuce",
  "Cucumber",
  "Rice",
  "Bread",
  "Flour",
  "Sugar",
  "Salt",
  "Pepper",
  "Olive Oil",
  "Vegetable Oil",
  "Basil",
  "Oregano",
  "Thyme",
  "Rosemary",
  "Paprika",
  "Cumin",
  "Cinnamon",
  "Canned Tomatoes",
  "Beans",
];

export const Pantry = () => {
  const [customIngredient, setCustomIngredient] = useState<string>("");
  const [myIngredients, setMyIngredients] = useState<string[]>([
    "Chicken",
    "Pasta",
    "Eggs",
    "Butter",
    "Garlic",
    "Onions",
    "Tomatoes",
    "Cheese",
  ]);

  const handleAddIngredient = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (myIngredients.includes(trimmed)) return;
    setMyIngredients((prev) => [...prev, trimmed]);
    setCustomIngredient("");
  };

  const handleRemoveIngredient = (name: string) => {
    setMyIngredients((prev) => prev.filter((item) => item !== name));
  };

  const availableIngredients = COMMON_INGREDIENTS.filter(
    (ingredient) => !myIngredients.includes(ingredient)
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.customCard}>
          <Text style={styles.customTitle}>Add Custom Ingredient</Text>
          <View style={styles.customRow}>
            <TextInput
              value={customIngredient}
              onChangeText={setCustomIngredient}
              placeholder="Type ingredient name..."
              placeholderTextColor="#b0b0b0"
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddIngredient(customIngredient)}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          My Ingredients ({myIngredients.length})
        </Text>
        <View style={styles.chipContainer}>
          {myIngredients.map((ingredient) => (
            <TouchableOpacity
              key={ingredient}
              style={styles.myChip}
              onPress={() => handleRemoveIngredient(ingredient)}
            >
              <Text style={styles.myChipText}>{ingredient}</Text>
              <Text style={styles.myChipRemove}>×</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Add Ingredients</Text>
        <View style={styles.chipContainer}>
          {availableIngredients.map((ingredient) => (
            <TouchableOpacity
              key={ingredient}
              style={styles.commonChip}
              onPress={() => handleAddIngredient(ingredient)}
            >
              <Text style={styles.commonChipText}>{ingredient}</Text>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  customCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Theme.colors.secondaryBackground,
    marginBottom: 24,
  },
  customTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  customRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  } as const,
  input: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f4f4f4",
  },
  addButton: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.primary,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  } as const,
  myChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Theme.colors.primary,
  },
  myChipText: {
    color: "#fff",
    fontWeight: "500",
    marginRight: 6,
  },
  myChipRemove: {
    color: "#fff",
    fontSize: 14,
  },
  commonChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    backgroundColor: "#fff",
  },
  commonChipText: {
    fontSize: 14,
    marginRight: 4,
  },
  plus: {
    fontSize: 16,
    fontWeight: "600",
    color: Theme.colors.primary,
  },
});
