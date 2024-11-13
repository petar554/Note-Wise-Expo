// src/screens/CameraScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera"; // Correct import
import useNotes from "../context/useNotes";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomNavigation from "../components/BottomNavigation";
import Menu from "../components/Menu";

const CameraScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const notes_id = route.params?.notes_id;
  const { addImageToNote, loading, error } = useNotes();
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getPermissions();
  }, []);

  const handleAddImageToNote = async (imageUri) => {
    try {
      const responseData = await addImageToNote(notes_id, imageUri);
      console.log("Image Upload Response:", responseData);

      setSuccessMessage(
        `Image uploaded successfully! Image ID: ${responseData.image_id}`
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error uploading image:", err);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        console.log("Photo captured:", photo);

        setCapturedImages((prevImages) => [...prevImages, photo.uri]);

        handleAddImageToNote(photo.uri);
      } catch (err) {
        console.error("Error capturing image:", err);
        Alert.alert("Error", "Failed to capture image. Please try again.");
      }
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.back} // Correct usage
        ref={cameraRef}
      >
        <TouchableOpacity
          onPress={handleClose}
          style={styles.closeButton}
          accessibilityLabel="Close Camera"
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </Camera>

      {successMessage ? (
        <Text style={styles.successMessage}>{successMessage}</Text>
      ) : null}

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

      {selectedImage && (
        <Modal visible={true} transparent={true}>
          <View style={styles.imageViewer}>
            <TouchableOpacity
              onPress={closeImageViewer}
              style={styles.closeImageButton}
              accessibilityLabel="Close Image Viewer"
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}

      <BottomNavigation
        onOpenMenu={handleOpenMenu}
        onCameraCapture={captureImage}
        capturedImages={capturedImages}
        onImageClick={handleImageClick}
      />

      <Menu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 32,
    right: 16,
  },
  successMessage: {
    position: "absolute",
    bottom: 100,
    color: "green",
    textAlign: "center",
    width: "100%",
    zIndex: 10,
  },
  errorMessage: {
    position: "absolute",
    bottom: 100,
    color: "red",
    textAlign: "center",
    width: "100%",
    zIndex: 10,
  },
  imageViewer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  closeImageButton: {
    position: "absolute",
    top: 32,
    right: 16,
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
});
