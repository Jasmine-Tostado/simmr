// VoiceSummary.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Theme from "@/theme";
import { RecipesSelect } from "@/types";
import { Camera, CameraType } from "expo-camera";

type RouteParams = {
  recipe: RecipesSelect;
};

export const VoiceSummary = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { recipe } = route.params as RouteParams;

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [cameraVisible, setCameraVisible] = useState(false);

  const [cameraRef, setCameraRef] = useState<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // ask for camera permission once
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (!cameraRef) return;
    const photo = await cameraRef.takePictureAsync();
    setPhotoUri(photo.uri);
    setCameraVisible(false);
  };
  // Ask for camera permission once
  // useEffect(() => {
  //   (async () => {
  //     await ImagePicker.requestCameraPermissionsAsync();
  //   })();
  // }, []);

  const openCameraPopup = () => {
    setCameraVisible(true);
  };

  const closeCameraPopup = () => {
    setCameraVisible(false);
  };

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      cameraType: ImagePicker.CameraType.back,
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
      setCameraVisible(false);
    }
  };

  const handleRetake = () => {
    openCameraPopup();
  };

  const handleDone = () => {
    // go to StoryLog tab/screen – change "StoryLog" if your route name is different
    navigation.navigate("StoryLog");
  };

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

      {/* Photo card */}
      <View style={styles.photoCard}>
        {photoUri ? (
          <>
            <Image source={{ uri: photoUri }} style={styles.photo} />
            <TouchableOpacity style={styles.photoButton} onPress={handleRetake}>
              <Text style={styles.photoButtonText}>Retake Photo</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.placeholder}>
              <FontAwesome6
                name="camera"
                size={32}
                color={Theme.colors.primary}
              />
              <Text style={styles.optionalText}>Optional</Text>
            </View>
            <TouchableOpacity
              style={styles.photoButton}
              onPress={openCameraPopup}
            >
              <Text style={styles.photoButtonText}>Capture your dish</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Story summary */}
      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>Story summary:</Text>
        <Text style={styles.summaryBody}>
          A cozy night in: breathing, slowing down, seasoning with intention.
          Today we cooked a delicious {recipe.title}! You didn&apos;t just cook,
          you slowed down, breathed, and treated yourself with care. Small acts
          count. They always have.
        </Text>
      </View>

      {/* Camera popup */}
      <Modal
        visible={cameraVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setCameraVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCameraCard}>
            {hasPermission === false ? (
              <Text>No access to camera</Text>
            ) : (
              <Camera
                style={styles.cameraPreview}
                type={CameraType.back}
                ref={(ref) => setCameraRef(ref)}
              />
            )}

            <View style={styles.modalControlsRow}>
              <TouchableOpacity onPress={() => setCameraVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shutterButtonOuter}
                onPress={takePhoto}
              >
                <View style={styles.shutterButtonInner} />
              </TouchableOpacity>

              <View style={{ width: 50 }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CARD_RADIUS = 24;

const styles = StyleSheet.create({
  cameraPreview: {
    width: "100%",
    height: 280,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 18,
  },  
  
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  // header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerDoneButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: Theme.colors.primary,
  },
  headerDoneText: {
    color: Theme.colors.textSecondary,
    fontWeight: "600",
    fontSize: Theme.sizes.smallText,
  },

  // photo card
  photoCard: {
    borderRadius: CARD_RADIUS,
    backgroundColor: "#FFEDE0",
    overflow: "hidden",
    marginBottom: 24,
  },
  placeholder: {
    height: 210,
    alignItems: "center",
    justifyContent: "center",
  },
  optionalText: {
    marginTop: 8,
    fontSize: 14,
    color: "#E1A87A",
  },
  photo: {
    width: "100%",
    height: 230,
    resizeMode: "cover",
  },
  photoButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 14,
    alignItems: "center",
  },
  photoButtonText: {
    color: Theme.colors.textSecondary,
    fontSize: Theme.sizes.smallText,
    fontWeight: "600",
  },

  // story summary
  summarySection: {
    marginTop: 4,
  },
  summaryTitle: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 6,
    color: Theme.colors.text,
  },
  summaryBody: {
    fontSize: 14,
    lineHeight: 20,
    color: Theme.colors.text,
  },

  // modal camera
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCameraCard: {
    width: "80%",
    borderRadius: 32,
    backgroundColor: Theme.colors.background,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  fakeCameraView: {
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    height: 280,
    overflow: "hidden",
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  fakeCameraText: {
    color: "#fff",
    fontSize: 14,
  },
  modalControlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalCancelText: {
    color: Theme.colors.text,
    fontSize: 14,
  },
  shutterButtonOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
  },
});


// // VoiceSummary.tsx
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

// type RouteParams = {
//   recipe: RecipesSelect;
// };

// export const VoiceSummary = () => {
//   const route = useRoute();
//   const { recipe } = route.params as RouteParams;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>You finished {recipe.title}! 🎉</Text>
//       <Text style={styles.body}>
//         How did that feel? Take a moment to check in with yourself before you
//         move on.
//       </Text>
//       {/* you can add buttons to save to StoryLog, rate, share, etc. */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Theme.colors.background,
//     padding: 24,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: Theme.sizes.mediumText,
//     fontWeight: "600",
//     color: Theme.colors.primary,
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   body: {
//     fontSize: Theme.sizes.smallText,
//     color: Theme.colors.text,
//     textAlign: "center",
//     lineHeight: 20,
//   },
// });
