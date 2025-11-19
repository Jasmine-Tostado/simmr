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

const VOICE_RING = require("@/assets/voice-steps/voice-ring.png");

// 🔹 All the steps for this Voice flow
const VOICE_STEPS = [
  {
    id: 1,
    instruction: "Boil a pot of water with a pinch of salt for your pasta.",
    image: require("@/assets/voice-steps/step1.png"),
    story:
      "As the water begins to warm, take\na long breath in… and a slow\nbreath out.\n\nSelf-care often starts like this pot;\nsmall, quiet, subtle beginnings.",
  },
  {
    id: 2,
    instruction:
      "Slice your chicken and season with salt, pepper, and a little garlic.",
    image: require("@/assets/voice-steps/step2.png"),
    story:
      "Every step has intention. Self-care is the same; not grand, not dramatic, just small choices that say ‘I’m worth taking care of.’",
  },
  {
    id: 3,
    instruction: "Sear the chicken in a pan with butter or oil until golden.",
    image: require("@/assets/voice-steps/step3.png"),
    story:
      "When things heat up, remember: pressure doesn’t mean you’re failing. Like the pan, a little heat creates flavor and change.",
  },
  {
    id: 4,
    instruction: "Pour in your heavy cream (1 cup) and stir gently.",
    image: require("@/assets/voice-steps/step4.png"),
    story:
      "Cream brings everything together: rich, soft, smooth. Think of this as the moment you soften too. Our inner voice doesn’t need to be sharp. Tonight it can be gentle.",
  },
  {
    id: 5,
    instruction:
      "Add the pasta, a splash of pasta water, and stir until it all comes together.",
    image: require("@/assets/voice-steps/step5.png"),
    story:
      "Some days feel messy or separate — thoughts scattered, energy low. But like this dish, everything can come back together with a little warmth and movement. You don’t need perfection, just presence.",
  },
];

export const VoiceAI = () => {
  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { recipe } = route.params as { recipe: RecipesSelect };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPauseModal, setShowPauseModal] = useState(false);

  const currentStep = VOICE_STEPS[currentIndex];
  const totalSteps = VOICE_STEPS.length;

  const progressPercent = (currentIndex + 1) / totalSteps;

  // pulsing animation for the ring
  const pulse = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.06,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const handleNext = () => {
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      navigation.goBack();
    }
  };

  // ✅ navigate to VoiceSummary by route *name*, not component
  // const handleDone = () => {
  //   navigation.navigate(
  //     "VoiceSummary" as never,
  //     {
  //       recipe,
  //       story: currentStep.story,
  //     } as never
  //   );
  // };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleRepeat = () => {
    // later: restart audio here
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSteps - 1;

  return (
    <View style={styles.container}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6
            name="xmark"
            size={Theme.sizes.largeIcon}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Progress bar + labels */}
      <View style={styles.progressSection}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progressPercent * 100}%` },
            ]}
          />
        </View>

        <View style={styles.progressLabelsRow}>
          <View style={styles.progressLabelColumn}>
            <Text style={styles.progressLabel}>
              {isFirst ? "" : '"last step"'}
            </Text>
          </View>

          <View style={styles.progressLabelColumn}>
            <Text style={styles.progressLabel}>"repeat step"</Text>
          </View>

          <View style={styles.progressLabelColumn}>
            <Text style={styles.progressLabel}>
              {isLast ? "" : '"next step"'}
            </Text>
          </View>
        </View>
      </View>

      {/* Arrows row */}
      <View style={styles.controlsRow}>
        {!isFirst ? (
          <TouchableOpacity style={styles.controlButton} onPress={handlePrev}>
            <FontAwesome6
              name="arrow-left-long"
              size={Theme.sizes.mediumIcon}
              color={Theme.colors.primary}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.controlButtonPlaceholder} />
        )}

        <TouchableOpacity style={styles.controlButton} onPress={handleRepeat}>
          <FontAwesome6
            name="rotate-left"
            size={Theme.sizes.mediumIcon}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>

        {!isLast ? (
          <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
            <FontAwesome6
              name="arrow-right-long"
              size={Theme.sizes.mediumIcon}
              color={Theme.colors.primary}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.controlButtonPlaceholder} />
        )}
      </View>

      {/* Instruction text */}
      <Text style={styles.instructionText}>"{currentStep.instruction}"</Text>

      {/* Pulsing voice ring + step image */}
      <Animated.View
        style={[styles.pulseContainer, { transform: [{ scale: pulse }] }]}
      >
        <ImageBackground
          source={VOICE_RING}
          style={styles.ringBackground}
          imageStyle={styles.ringImage}
        >
          <View style={styles.innerImageWrapper}>
            <Image source={currentStep.image} style={styles.innerImage} />
          </View>
        </ImageBackground>
      </Animated.View>

      {/* Story / mindfulness card */}
      {!isLast && (
        <View style={styles.storyCard}>
          <Text style={styles.storyText}>{currentStep.story}</Text>
        </View>
      )}

      {/* Bottom: pause OR Done button */}
      {isLast ? (
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate("VoiceSummary", { recipe })}
        >
          <Text style={styles.doneButtonText}>Done!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.pauseButton}
          onPress={() => setShowPauseModal(true)}
        >
          <FontAwesome6
            name="pause"
            size={Theme.sizes.smallIcon}
            color={Theme.colors.textSecondary}
          />
        </TouchableOpacity>
      )}

      {/* Pause popup */}
      {showPauseModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Paused</Text>
            <Text style={styles.modalBody}>
              Take a breath… your cooking story will resume when you&apos;re
              ready.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowPauseModal(false)}
            >
              <Text style={styles.modalButtonText}>Resume</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const SMALLER_TEXT = 14;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: "center",
  },
  headerRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  progressSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBarBackground: {
    width: "75%",
    height: 10,
    borderRadius: 999,
    backgroundColor: Theme.colors.secondaryBackground,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: Theme.colors.primary,
  },
  progressLabelsRow: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  progressLabelColumn: {
    flex: 1,
    alignItems: "center",
  },
  progressLabel: {
    fontSize: SMALLER_TEXT,
    color: Theme.colors.text,
    textAlign: "center",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 12,
    marginTop: 4,
  },
  controlButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  controlButtonPlaceholder: {
    width: Theme.sizes.mediumIcon,
  },
  instructionText: {
    textAlign: "center",
    fontSize: Theme.sizes.smallText,
    color: Theme.colors.text,
    marginHorizontal: 16,
    marginBottom: 18,
  },

  // ring + image
  pulseContainer: {
    marginBottom: 5,
  },
  ringBackground: {
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  ringImage: {
    borderRadius: 130,
    resizeMode: "cover",
    zIndex: 2,
  },
  innerImageWrapper: {
    width: 180,
    height: 180,
    borderRadius: 90,
    overflow: "hidden",
    marginTop: -12,
    zIndex: 1,
  },
  innerImage: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  storyCard: {
    backgroundColor: Theme.colors.secondaryBackground,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E2CBBF",
    marginBottom: 12,
    alignSelf: "stretch",
  },
  storyText: {
    fontSize: SMALLER_TEXT,
    color: Theme.colors.text,
    textAlign: "center",
    lineHeight: 20,
  },

  // square-ish pause button
  pauseButton: {
    marginTop: 4,
    width: 50,
    height: 38,
    borderRadius: 12,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  doneButton: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 999,
    backgroundColor: Theme.colors.primary,
  },
  doneButtonText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.smallText,
    fontWeight: "600",
  },

  // pause modal styles
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    borderRadius: 24,
    backgroundColor: Theme.colors.background,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    paddingVertical: 28,
    paddingHorizontal: 24,
  },
  modalTitle: {
    fontSize: Theme.sizes.mediumText,
    color: Theme.colors.primary,
    textAlign: "center",
    marginBottom: 12,
  },
  modalBody: {
    fontSize: SMALLER_TEXT,
    color: Theme.colors.text,
    textAlign: "center",
    marginBottom: 24,
  },
  modalButton: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 18,
    backgroundColor: Theme.colors.primary,
  },
  modalButtonText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.smallText,
    fontWeight: "600",
  },
});


// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Animated,
//   ImageBackground,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { FontAwesome6 } from "@expo/vector-icons";
// import Theme from "@/theme";
// import { RecipesSelect } from "@/types";

// const VOICE_RING = require("@/assets/voice-steps/voice-ring.png");

// // 🔹 All the steps for this Voice flow
// const VOICE_STEPS = [
//   {
//     id: 1,
//     instruction: "Boil a pot of water with a pinch of salt for your pasta.",
//     image: require("@/assets/voice-steps/step1.png"),
//     story:
//       "As the water begins to warm, take\na long breath in… and a slow\nbreath out.\n\nSelf-care often starts like this pot;\nsmall, quiet, subtle beginnings.",
//   },
//   {
//     id: 2,
//     instruction:
//       "Slice your chicken and season with salt, pepper, and a little garlic.",
//     image: require("@/assets/voice-steps/step2.png"),
//     story:
//       "Every step has intention. Self-care is the same; not grand, not dramatic, just small choices that say ‘I’m worth taking care of.’",
//   },
//   {
//     id: 3,
//     instruction: "Sear the chicken in a pan with butter or oil until golden.",
//     image: require("@/assets/voice-steps/step3.png"),
//     story:
//       "When things heat up, remember: pressure doesn’t mean you’re failing. Like the pan, a little heat creates flavor and change.",
//   },
//   {
//     id: 4,
//     instruction: "Pour in your heavy cream (1 cup) and stir gently.",
//     image: require("@/assets/voice-steps/step4.png"),
//     story:
//       "Cream brings everything together: rich, soft, smooth. Think of this as the moment you soften too. Our inner voice doesn’t need to be sharp. Tonight it can be gentle.",
//   },
//   {
//     id: 5,
//     instruction:
//       "Add the pasta, a splash of pasta water, and stir until it all comes together.",
//     image: require("@/assets/voice-steps/step5.png"),
//     story:
//       "Some days feel messy or separate — thoughts scattered, energy low. But like this dish, everything can come back together with a little warmth and movement. You don’t need perfection, just presence.",
//   },
// ];

// export const VoiceAI = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { recipe } = route.params as { recipe: RecipesSelect };

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showPauseModal, setShowPauseModal] = useState(false);

//   const currentStep = VOICE_STEPS[currentIndex];
//   const totalSteps = VOICE_STEPS.length;

//   const progressPercent = (currentIndex + 1) / totalSteps;

//   // pulsing animation for the ring
//   const pulse = useRef(new Animated.Value(1)).current;
//   useEffect(() => {
//     const loop = Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulse, {
//           toValue: 1.06,
//           duration: 800,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulse, {
//           toValue: 1,
//           duration: 800,
//           useNativeDriver: true,
//         }),
//       ])
//     );
//     loop.start();
//     return () => loop.stop();
//   }, [pulse]);

//   const handleNext = () => {
//     if (currentIndex < totalSteps - 1) {
//       setCurrentIndex((i) => i + 1);
//     } else {
//       navigation.goBack(); // last step
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((i) => i - 1);
//     }
//   };

//   const handleRepeat = () => {
//     // later: restart audio here
//   };

//   const isFirst = currentIndex === 0;
//   const isLast = currentIndex === totalSteps - 1;

//   return (
//     <View style={styles.container}>
//       {/* Header row */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <FontAwesome6
//             name="xmark"
//             size={Theme.sizes.largeIcon}
//             color={Theme.colors.primary}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Progress bar + labels */}
//       <View style={styles.progressSection}>
//         <View style={styles.progressBarBackground}>
//           <View
//             style={[
//               styles.progressBarFill,
//               { width: `${progressPercent * 100}%` },
//             ]}
//           />
//         </View>

//         <View style={styles.progressLabelsRow}>
//           <View style={styles.progressLabelColumn}>
//             <Text style={styles.progressLabel}>
//               {isFirst ? "" : '"last step"'}
//             </Text>
//           </View>

//           <View style={styles.progressLabelColumn}>
//             <Text style={styles.progressLabel}>"repeat step"</Text>
//           </View>

//           <View style={styles.progressLabelColumn}>
//             <Text style={styles.progressLabel}>
//               {isLast ? "" : '"next step"'}
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Arrows row */}
//       <View style={styles.controlsRow}>
//         {!isFirst ? (
//           <TouchableOpacity style={styles.controlButton} onPress={handlePrev}>
//             <FontAwesome6
//               name="arrow-left-long"
//               size={Theme.sizes.mediumIcon}
//               color={Theme.colors.primary}
//             />
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.controlButtonPlaceholder} />
//         )}

//         <TouchableOpacity style={styles.controlButton} onPress={handleRepeat}>
//           <FontAwesome6
//             name="rotate-left"
//             size={Theme.sizes.mediumIcon}
//             color={Theme.colors.primary}
//           />
//         </TouchableOpacity>

//         {!isLast ? (
//           <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
//             <FontAwesome6
//               name="arrow-right-long"
//               size={Theme.sizes.mediumIcon}
//               color={Theme.colors.primary}
//             />
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.controlButtonPlaceholder} />
//         )}
//       </View>

//       {/* Instruction text */}
//       <Text style={styles.instructionText}>"{currentStep.instruction}"</Text>

//       {/* Pulsing voice ring + step image */}
//       <Animated.View
//         style={[styles.pulseContainer, { transform: [{ scale: pulse }] }]}
//       >
//         <ImageBackground
//           source={VOICE_RING}
//           style={styles.ringBackground}
//           imageStyle={styles.ringImage}
//         >
//           <View style={styles.innerImageWrapper}>
//             <Image source={currentStep.image} style={styles.innerImage} />
//           </View>
//         </ImageBackground>
//       </Animated.View>

//       {/* Story / mindfulness card */}
//       {!isLast && (
//         <View style={styles.storyCard}>
//           <Text style={styles.storyText}>{currentStep.story}</Text>
//         </View>
//       )}

//       {/* Bottom: pause OR Done button */}
//       {isLast ? (
//         <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
//           <Text style={styles.doneButtonText}>Done!</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity
//           style={styles.pauseButton}
//           onPress={() => setShowPauseModal(true)}
//         >
//           <FontAwesome6
//             name="pause"
//             size={Theme.sizes.smallIcon}
//             color={Theme.colors.textSecondary}
//           />
//         </TouchableOpacity>
//       )}

//       {/* Pause popup */}
//       {showPauseModal && (
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalCard}>
//             <Text style={styles.modalTitle}>Paused</Text>
//             <Text style={styles.modalBody}>
//               Take a breath… your cooking story will resume when you&apos;re
//               ready.
//             </Text>

//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() => setShowPauseModal(false)}
//             >
//               <Text style={styles.modalButtonText}>Resume</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// const SMALLER_TEXT = 14;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Theme.colors.background,
//     paddingHorizontal: 24,
//     paddingTop: 20,
//     alignItems: "center",
//   },
//   headerRow: {
//     alignSelf: "stretch",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   progressSection: {
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   progressBarBackground: {
//     width: "75%",
//     height: 10,
//     borderRadius: 999,
//     backgroundColor: Theme.colors.secondaryBackground,
//     overflow: "hidden",
//   },
//   progressBarFill: {
//     height: "100%",
//     borderRadius: 999,
//     backgroundColor: Theme.colors.primary,
//   },
//   progressLabelsRow: {
//     width: "80%",
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 16,
//   },
//   progressLabelColumn: {
//     flex: 1,
//     alignItems: "center",
//   },
//   progressLabel: {
//     fontSize: SMALLER_TEXT,
//     color: Theme.colors.text,
//     textAlign: "center",
//   },
//   controlsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "60%",
//     marginBottom: 12,
//     marginTop: 4,
//   },
//   controlButton: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   controlButtonPlaceholder: {
//     width: Theme.sizes.mediumIcon,
//   },
//   instructionText: {
//     textAlign: "center",
//     fontSize: Theme.sizes.smallText,
//     color: Theme.colors.text,
//     marginHorizontal: 16,
//     marginBottom: 18,
//   },

//   // ring + image
//   pulseContainer: {
//     marginBottom: 5,
//   },
//   ringBackground: {
//     width: 250,
//     height: 250,
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 2,
//   },
//   ringImage: {
//     borderRadius: 130,
//     resizeMode: "cover",
//     zIndex: 2,
//   },
//   innerImageWrapper: {
//     width: 180,
//     height: 180,
//     borderRadius: 90,
//     overflow: "hidden",
//     marginTop: -12,
//     zIndex: 1,
//   },
//   innerImage: {
//     width: "100%",
//     height: "100%",
//     zIndex: 1,
//   },

//   storyCard: {
//     backgroundColor: Theme.colors.secondaryBackground,
//     borderRadius: 16,
//     paddingVertical: 18,
//     paddingHorizontal: 18,
//     borderWidth: 1,
//     borderColor: "#E2CBBF",
//     marginBottom: 12,
//     alignSelf: "stretch",
//   },
//   storyText: {
//     fontSize: SMALLER_TEXT,
//     color: Theme.colors.text,
//     textAlign: "center",
//     lineHeight: 20,
//   },

//   // square-ish pause button
//   pauseButton: {
//     marginTop: 4,
//     width: 50,
//     height: 38,
//     borderRadius: 12,
//     backgroundColor: Theme.colors.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   doneButton: {
//     marginTop: 16,
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 999,
//     backgroundColor: Theme.colors.primary,
//   },
//   doneButtonText: {
//     color: Theme.colors.textSecondary,
//     fontSize: Theme.sizes.smallText,
//     fontWeight: "600",
//   },

//   // pause modal styles
//   modalOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.15)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalCard: {
//     width: "80%",
//     borderRadius: 24,
//     backgroundColor: Theme.colors.background,
//     borderWidth: 2,
//     borderColor: Theme.colors.primary,
//     paddingVertical: 28,
//     paddingHorizontal: 24,
//   },
//   modalTitle: {
//     fontSize: Theme.sizes.mediumText,
//     color: Theme.colors.primary,
//     textAlign: "center",
//     marginBottom: 12,
//   },
//   modalBody: {
//     fontSize: SMALLER_TEXT,
//     color: Theme.colors.text,
//     textAlign: "center",
//     marginBottom: 24,
//   },
//   modalButton: {
//     alignSelf: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 40,
//     borderRadius: 18,
//     backgroundColor: Theme.colors.primary,
//   },
//   modalButtonText: {
//     color: Theme.colors.textSecondary,
//     fontSize: Theme.sizes.smallText,
//     fontWeight: "600",
//   },
// });


// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Animated,
//   ImageBackground,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { FontAwesome6 } from "@expo/vector-icons";
// import Theme from "@/theme";
// import { RecipesSelect } from "@/types";

// const VOICE_RING = require("@/assets/voice-steps/voice-ring.png");




// // 🔹 All the steps for this Voice flow
// // (replace these with real data later or load from `recipe`)
// const VOICE_STEPS = [
//   {
//     id: 1,
//     instruction: "Boil a pot of water with a pinch of salt for your pasta.",
//     image: require("@/assets/voice-steps/step1.png"),
//     story:
//       "As the water begins to warm, take\na long breath in… and a slow\nbreath out.\n\nSelf-care often starts like this pot;\nsmall, quiet, subtle beginnings.",
//   },
//   {
//     id: 2,
//     instruction: "Slice your chicken and season with salt, pepper, and a little garlic.",
//     image: require("@/assets/voice-steps/step2.png"),
//     story:
//       "Every step has intention. Self-care is the same; not grand, not dramatic, just small choices that say ‘I’m worth taking care of.’",
//   },
//   {
//     id: 3,
//     instruction: "Sear the chicken in a pan with butter or oil until golden.",
//     image: require("@/assets/voice-steps/step3.png"),
//     story:
//       "When things heat up, remember: pressure doesn’t mean you’re failing. Like the pan, a little heat creates flavor and change.",
//   },
//   {
//     id: 4,
//     instruction: "Pour in your heavy cream (1 cup) and stir gently.",
//     image: require("@/assets/voice-steps/step4.png"),
//     story:
//       "Cream brings everything together: rich, soft, smooth. Think of this as the moment you soften too. Our inner voice doesn’t need to be sharp. Tonight it can be gentle.",
//   },
//   {
//     id: 5,
//     instruction:
//       "Add the pasta, a splash of pasta water, and stir until it all comes together.",
//     image: require("@/assets/voice-steps/step5.png"),
//     story:
//       "Some days feel messy or separate — thoughts scattered, energy low. But like this dish, everything can come back together with a little warmth and movement. You don’t need perfection, just presence.",
//   },
// ];

// export const VoiceAI = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { recipe } = route.params as { recipe: RecipesSelect };

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const currentStep = VOICE_STEPS[currentIndex];
//   const totalSteps = VOICE_STEPS.length;

//   const progressPercent = (currentIndex + 1) / totalSteps;

//   // pulsing animation for the ring
//   const pulse = useRef(new Animated.Value(1)).current;
//   useEffect(() => {
//     const loop = Animated.loop(
//       Animated.sequence([
//         Animated.timing(pulse, {
//           toValue: 1.06,
//           duration: 800,
//           useNativeDriver: true,
//         }),
//         Animated.timing(pulse, {
//           toValue: 1,
//           duration: 800,
//           useNativeDriver: true,
//         }),
//       ])
//     );
//     loop.start();
//     return () => loop.stop();
//   }, [pulse]);

//   const handleNext = () => {
//     if (currentIndex < totalSteps - 1) {
//       setCurrentIndex((i) => i + 1);
//     } else {
//       // last step "Done"
//       navigation.goBack(); // or navigate to StoryLog / summary
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((i) => i - 1);
//     }
//   };

//   const handleRepeat = () => {
//     // later: restart audio here
//     // for now you can just keep the same index
//   };

//   const isFirst = currentIndex === 0;
//   const isLast = currentIndex === totalSteps - 1;

//   const leftLabel = isFirst ? '"repeat step"' : '"last step"';
//   const middleLabel = isFirst ? "" : '"repeat step"';
//   const rightLabel = isLast ? "" : '"next step"';

//   return (
//     <View style={styles.container}>
//       {/* Header row */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <FontAwesome6
//             name="xmark"
//             size={Theme.sizes.largeIcon}
//             color={Theme.colors.primary}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Progress bar + labels */}
//       <View style={styles.progressSection}>
//         <View style={styles.progressBarBackground}>
//           <View
//             style={[
//               styles.progressBarFill,
//               { width: `${progressPercent * 100}%` },
//             ]}
//           />
//         </View>

//         <View style={styles.progressLabelsRow}>
//           <View style={styles.progressLabelColumn}>
//             <Text style={styles.progressLabel}>
//               {isFirst ? "" : '"last step"'}
//             </Text>
//           </View>

//           <View style={styles.progressLabelColumn}>
//             <Text style={styles.progressLabel}>
//               {isFirst ? '"repeat step"' : '"repeat step"'}
//             </Text>
//           </View>

//           <View style={styles.progressLabelColumn}>
//             <Text style={styles.progressLabel}>
//               {isLast ? "" : '"next step"'}
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Arrows row */}
//       <View style={styles.controlsRow}>
//         {!isFirst ? (
//           <TouchableOpacity style={styles.controlButton} onPress={handlePrev}>
//             <FontAwesome6
//               name="arrow-left-long"
//               size={Theme.sizes.mediumIcon}
//               color={Theme.colors.primary}
//             />
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.controlButtonPlaceholder} />
//         )}

//         <TouchableOpacity style={styles.controlButton} onPress={handleRepeat}>
//           <FontAwesome6
//             name="rotate-left"
//             size={Theme.sizes.mediumIcon}
//             color={Theme.colors.primary}
//           />
//         </TouchableOpacity>

//         {!isLast ? (
//           <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
//             <FontAwesome6
//               name="arrow-right-long"
//               size={Theme.sizes.mediumIcon}
//               color={Theme.colors.primary}
//             />
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.controlButtonPlaceholder} />
//         )}
//       </View>

//       {/* Instruction text */}
//       <Text style={styles.instructionText}>"{currentStep.instruction}"</Text>

//       {/* Pulsing voice ring + step image */}
//       <Animated.View
//         style={[
//           styles.pulseContainer,
//           { transform: [{ scale: pulse }] },
//         ]}
//       >
//         <ImageBackground
//           source={VOICE_RING}
//           style={styles.ringBackground}
//           imageStyle={styles.ringImage}
//         >
//           <View style={styles.innerImageWrapper}>
//             <Image source={currentStep.image} style={styles.innerImage} />
//           </View>
//         </ImageBackground>
//       </Animated.View>

//       {/* Story / mindfulness card */}
//       {!isLast && (
//         <View style={styles.storyCard}>
//           <Text style={styles.storyText}>{currentStep.story}</Text>
//         </View>
//       )}

//       {/* Bottom: pause OR Done button */}
//       {isLast ? (
//         <TouchableOpacity style={styles.doneButton} onPress={handleNext}>
//           <Text style={styles.doneButtonText}>Done!</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity style={styles.pauseButton}>
//           <FontAwesome6
//             name="pause"
//             size={Theme.sizes.smallIcon}
//             color={Theme.colors.textSecondary}
//           />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const SMALLER_TEXT = 14;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Theme.colors.background,
//     paddingHorizontal: 24,
//     paddingTop: 20,
//     alignItems: "center",
//   },
//   headerRow: {
//     alignSelf: "stretch",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   progressSection: {
//     width: "100%",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   progressBarBackground: {
//     width: "75%",
//     height: 10,
//     borderRadius: 999,
//     backgroundColor: Theme.colors.secondaryBackground,
//     overflow: "hidden",
//   },
//   progressBarFill: {
//     height: "100%",
//     borderRadius: 999,
//     backgroundColor: Theme.colors.primary,
//   },
//   // progressLabelsRow: {
//   //   width: "80%",
//   //   flexDirection: "row",
//   //   justifyContent: "space-between",
//   //   marginTop: 16,
//   // },
//   progressLabelsRow: {
//     width: "80%",
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 16,
//   },
//   progressLabelColumn: {
//     flex: 1,              // each column takes equal space
//     alignItems: "center", // center the text in each column
//   },
//   progressLabel: {
//     fontSize: SMALLER_TEXT,
//     color: Theme.colors.text,
//     textAlign: "center",
//   },
//   controlsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "60%",
//     marginBottom: 12,
//     marginTop: 4,
//   },
//   controlButton: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   controlButtonPlaceholder: {
//     width: Theme.sizes.mediumIcon, // keeps layout from jumping
//   },
//   instructionText: {
//     textAlign: "center",
//     fontSize: Theme.sizes.smallText,
//     color: Theme.colors.text,
//     marginHorizontal: 16,
//     marginBottom: 18,
//   },

//   // ring + image
//   pulseContainer: {
//     marginBottom: 5,
//   },
  
//   ringBackground: {
//     width: 250,
//     height: 250,
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 2,
//   },
  
//   ringImage: {
//     borderRadius: 130,
//     resizeMode: "cover",
//     zIndex: 2,
//   },
  
//   innerImageWrapper: {
//     width: 180,
//     height: 180,
//     borderRadius: 90,
//     overflow: "hidden",
//     marginTop: -12, // tweak to center pot in ring
//     zIndex: 1,
//   },
  
//   innerImage: {
//     width: "100%",
//     height: "100%",
//     zIndex: 1,
//   },
  
//   // pulseContainer: {
//   //   marginBottom: 20,
//   // },
//   // ringContainer: {
//   //   width: 240,
//   //   height: 240,
//   //   alignItems: "center",
//   //   justifyContent: "center",
//   //   position: "relative",
//   //   zIndex: 2,
//   // },
//   // ringOverlay: {
//   //   position: "absolute",
//   //   width: 240,
//   //   height: 240,
//   //   resizeMode: "contain",
//   //   zIndex: 2,
//   // },
//   // innerImageWrapper: {
//   //   width: 200,
//   //   height: 200,
//   //   borderRadius: 100,
//   //   overflow: "hidden",
//   //   zIndex: 1,
//   //   marginTop: -10, // tweak to center pot in ring
//   // },
//   // innerImage: {
//   //   width: "100%",
//   //   height: "100%",
//   //   zIndex: 1,
//   // },

//   storyCard: {
//     backgroundColor: Theme.colors.secondaryBackground,
//     borderRadius: 16,
//     paddingVertical: 18,
//     paddingHorizontal: 18,
//     borderWidth: 1,
//     borderColor: "#E2CBBF",
//     marginBottom: 12,
//     alignSelf: "stretch",
//   },
//   storyText: {
//     fontSize: SMALLER_TEXT,
//     color: Theme.colors.text,
//     textAlign: "center",
//     lineHeight: 20,
//   },

//   pauseButton: {
//     marginTop: 4,
//     width: 50,
//     height: 38,
//     borderRadius: 12,
//     backgroundColor: Theme.colors.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   doneButton: {
//     marginTop: 16,
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 999,
//     backgroundColor: Theme.colors.primary,
//   },
//   doneButtonText: {
//     color: Theme.colors.textSecondary,
//     fontSize: Theme.sizes.smallText,
//     fontWeight: "600",
//   },
// });
