// VoiceSummary.tsx
import React, { useEffect, useRef, useState } from "react";
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
import Theme from "@/theme";
import { RecipesSelect } from "@/types";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
} from "expo-camera";

type RouteParams = {
  recipe: RecipesSelect;
};

export const VoiceSummary = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { recipe } = route.params as RouteParams;

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [cameraVisible, setCameraVisible] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  // auto-request permission once when this screen mounts
  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const openCameraPopup = () => {
    setCameraVisible(true);
  };

  const closeCameraPopup = () => {
    setCameraVisible(false);
  };

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });
    setPhotoUri(photo.uri);
    setCameraVisible(false);
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
        onRequestClose={closeCameraPopup}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCameraCard}>
            {!permission || permission.granted === false ? (
              <View style={[styles.cameraPreview, styles.permissionFallback]}>
                <Text style={styles.permissionText}>
                  We need camera permission to capture your dish.
                </Text>
                <TouchableOpacity
                  style={styles.permissionButton}
                  onPress={requestPermission}
                >
                  <Text style={styles.permissionButtonText}>Grant access</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <CameraView
                style={styles.cameraPreview}
                facing={"back" as CameraType}
                ref={cameraRef}
              />
            )}

            <View style={styles.modalControlsRow}>
              {/* Cancel button */}
              <TouchableOpacity onPress={closeCameraPopup}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              {/* Shutter button */}
              <TouchableOpacity
                style={styles.shutterButtonOuter}
                onPress={takePhoto}
                disabled={!permission?.granted}
              >
                <View style={styles.shutterButtonInner} />
              </TouchableOpacity>

              {/* Spacer */}
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
  modalControlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  modalCancelText: {
    color: Theme.colors.text,
    fontSize: 14,
  },
  
  // big round shutter button
  shutterButtonOuter: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: Theme.colors.primary,   // visible outline
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.background,
  },
  shutterButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.primary, // filled primary circle
  },
  // modalControlsRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  // modalCancelText: {
  //   color: Theme.colors.text,
  //   fontSize: 14,
  // },
  // shutterButtonOuter: {
  //   width: 64,
  //   height: 64,
  //   borderRadius: 32,
  //   borderWidth: 4,
  //   borderColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // shutterButtonInner: {
  //   width: 44,
  //   height: 44,
  //   borderRadius: 22,
  //   backgroundColor: "#fff",
  // },

  // permission fallback in camera area
  permissionFallback: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  permissionText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 12,
  },
  permissionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  permissionButtonText: {
    color: "#000",
    fontWeight: "600",
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
//   Modal,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { FontAwesome6 } from "@expo/vector-icons";
// import Theme from "@/theme";
// import { RecipesSelect } from "@/types";
// import {
//   CameraView,
//   CameraType,
//   useCameraPermissions,
// } from "expo-camera";

// type RouteParams = {
//   recipe: RecipesSelect;
// };

// export const VoiceSummary = () => {
//   const navigation = useNavigation<any>();
//   const route = useRoute();
//   const { recipe } = route.params as RouteParams;

//   const [photoUri, setPhotoUri] = useState<string | null>(null);
//   const [cameraVisible, setCameraVisible] = useState(false);

//   const [permission, requestPermission] = useCameraPermissions();
//   const cameraRef = useRef<CameraView | null>(null);

//   // auto-request permission once when this screen mounts
//   useEffect(() => {
//     if (!permission) return;
//     if (!permission.granted) {
//       requestPermission();
//     }
//   }, [permission, requestPermission]);

//   const openCameraPopup = () => {
//     setCameraVisible(true);
//   };

//   const closeCameraPopup = () => {
//     setCameraVisible(false);
//   };

//   const takePhoto = async () => {
//     if (!cameraRef.current) return;
//     const photo = await cameraRef.current.takePictureAsync();
//     setPhotoUri(photo.uri);
//     setCameraVisible(false);
//   };

//   const handleRetake = () => {
//     openCameraPopup();
//   };

//   const handleDone = () => {
//     // go to StoryLog tab/screen – change "StoryLog" if your route name is different
//     navigation.navigate("StoryLog");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <FontAwesome6
//             name="xmark"
//             size={Theme.sizes.largeIcon}
//             color={Theme.colors.primary}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.headerDoneButton} onPress={handleDone}>
//           <Text style={styles.headerDoneText}>Done</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Photo card */}
//       <View style={styles.photoCard}>
//         {photoUri ? (
//           <>
//             <Image source={{ uri: photoUri }} style={styles.photo} />
//             <TouchableOpacity style={styles.photoButton} onPress={handleRetake}>
//               <Text style={styles.photoButtonText}>Retake Photo</Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <>
//             <View style={styles.placeholder}>
//               <FontAwesome6
//                 name="camera"
//                 size={32}
//                 color={Theme.colors.primary}
//               />
//               <Text style={styles.optionalText}>Optional</Text>
//             </View>
//             <TouchableOpacity
//               style={styles.photoButton}
//               onPress={openCameraPopup}
//             >
//               <Text style={styles.photoButtonText}>Capture your dish</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>

//       {/* Story summary */}
//       <View style={styles.summarySection}>
//         <Text style={styles.summaryTitle}>Story summary:</Text>
//         <Text style={styles.summaryBody}>
//           A cozy night in: breathing, slowing down, seasoning with intention.
//           Today we cooked a delicious {recipe.title}! You didn&apos;t just cook,
//           you slowed down, breathed, and treated yourself with care. Small acts
//           count. They always have.
//         </Text>
//       </View>

//       {/* Camera popup */}
//       <Modal
//         visible={cameraVisible}
//         animationType="fade"
//         transparent
//         onRequestClose={closeCameraPopup}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalCameraCard}>
//             {!permission || permission.granted === false ? (
//               <View style={[styles.cameraPreview, styles.permissionFallback]}>
//                 <Text style={styles.permissionText}>
//                   We need camera permission to capture your dish.
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.permissionButton}
//                   onPress={requestPermission}
//                 >
//                   <Text style={styles.permissionButtonText}>Grant access</Text>
//                 </TouchableOpacity>
//               </View>
//             ) : (
//               <CameraView
//                 style={styles.cameraPreview}
//                 facing={"back" as CameraType}
//                 ref={cameraRef}
//               />
//             )}

//             <View style={styles.modalControlsRow}>
//               <TouchableOpacity onPress={closeCameraPopup}>
//                 <Text style={styles.modalCancelText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.shutterButtonOuter}
//                 onPress={takePhoto}
//                 disabled={!permission?.granted}
//               >
//                 <View style={styles.shutterButtonInner} />
//               </TouchableOpacity>

//               {/* spacer */}
//               <View style={{ width: 50 }} />
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const CARD_RADIUS = 24;

// const styles = StyleSheet.create({
//   cameraPreview: {
//     width: "100%",
//     height: 280,
//     borderRadius: 24,
//     overflow: "hidden",
//     marginBottom: 18,
//   },

//   container: {
//     flex: 1,
//     backgroundColor: Theme.colors.background,
//     paddingHorizontal: 24,
//     paddingTop: 20,
//   },

//   // header
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   headerDoneButton: {
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     borderRadius: 999,
//     backgroundColor: Theme.colors.primary,
//   },
//   headerDoneText: {
//     color: Theme.colors.textSecondary,
//     fontWeight: "600",
//     fontSize: Theme.sizes.smallText,
//   },

//   // photo card
//   photoCard: {
//     borderRadius: CARD_RADIUS,
//     backgroundColor: "#FFEDE0",
//     overflow: "hidden",
//     marginBottom: 24,
//   },
//   placeholder: {
//     height: 210,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   optionalText: {
//     marginTop: 8,
//     fontSize: 14,
//     color: "#E1A87A",
//   },
//   photo: {
//     width: "100%",
//     height: 230,
//     resizeMode: "cover",
//   },
//   photoButton: {
//     backgroundColor: Theme.colors.primary,
//     paddingVertical: 14,
//     alignItems: "center",
//   },
//   photoButtonText: {
//     color: Theme.colors.textSecondary,
//     fontSize: Theme.sizes.smallText,
//     fontWeight: "600",
//   },

//   // story summary
//   summarySection: {
//     marginTop: 4,
//   },
//   summaryTitle: {
//     fontWeight: "700",
//     fontSize: 16,
//     marginBottom: 6,
//     color: Theme.colors.text,
//   },
//   summaryBody: {
//     fontSize: 14,
//     lineHeight: 20,
//     color: Theme.colors.text,
//   },

//   // modal camera
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.35)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalCameraCard: {
//     width: "80%",
//     borderRadius: 32,
//     backgroundColor: Theme.colors.background,
//     paddingVertical: 24,
//     paddingHorizontal: 16,
//   },
//   modalControlsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   modalCancelText: {
//     color: Theme.colors.text,
//     fontSize: 14,
//   },
//   shutterButtonOuter: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     borderWidth: 4,
//     borderColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   shutterButtonInner: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "#fff",
//   },

//   // permission fallback in camera area
//   permissionFallback: {
//     backgroundColor: "#000",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 16,
//   },
//   permissionText: {
//     color: "#fff",
//     textAlign: "center",
//     marginBottom: 12,
//   },
//   permissionButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 16,
//     backgroundColor: "#fff",
//   },
//   permissionButtonText: {
//     color: "#000",
//     fontWeight: "600",
//   },
// });