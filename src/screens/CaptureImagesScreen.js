import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import CameraComponent from "../components/CameraComponent";
import useAddImageToNote from "../hooks/useAddImageToNote";
import commonStyles from "../styles/commonStyles";
import CameraIcon from "../../assets/camera.png";
import Menu from "../components/Menu";
import { useNavigation } from "@react-navigation/native";

const CaptureImagesScreen = ({ route }) => {
  const { notesId } = route.params;
  const { addImageToNote } = useAddImageToNote();
  const [thumbnail, setThumbnail] = useState(null);
  const [lastCapturedImage, setLastCapturedImage] = useState(null); // store full image
  const [imageCount, setImageCount] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();

  const handleCapture = async (imageUri) => {
    setLastCapturedImage(imageUri); // save last captured image
    try {
      const response = await addImageToNote(notesId, imageUri);
      setThumbnail(`data:image/jpeg;base64,${response.thumbnail_image}`);
      setImageCount(response.number_of_images);
    } catch (error) {
      Alert.alert("Error", "Failed to upload image. Please try again.");
    } finally {
      setShowCamera(false);
    }
  };

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <View style={styles.container}>
      {showCamera ? (
        <CameraComponent onCapture={handleCapture} />
      ) : (
        <View style={styles.main}>
          {lastCapturedImage && (
            <View style={styles.lastCapturedImageContainer}>
                <Image
                source={{ uri: lastCapturedImage }}
                style={styles.lastCapturedImage}
                />
            </View>
            )}
          {thumbnail && (
            
            <View style={styles.thumbnailContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("ReviewCapturedPicturesScreen", { notesId })}>
                <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
                <Text style={styles.imageCount}>{imageCount}</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.cameraButton} onPress={() => setShowCamera(true)}>
            <View style={styles.cameraButtonCircle}>
              <Image source={CameraIcon} style={styles.cameraIcon} />
            </View>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
        <Image source={require("../../assets/noun-menu.png")} style={commonStyles.menuIcon} />
      </TouchableOpacity>
      <Menu isOpen={menuOpen} onClose={closeMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  main: {
    flex: 1
  },
  lastCapturedImage: {
    width: "100%",
    height: "100%",
    paddingBottom: 150, // #todo: fix this
    resizeMode: "contain",
  },  
  thumbnailContainer: {
    position: "absolute",
    bottom: 70,
    left: 20,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  imageCount: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#1F2937",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 6,
    fontSize: 12,
  },
  cameraButton: {
    position: "absolute",
    bottom: 70,
    alignSelf: "center",
  },
  cameraButtonCircle: {
    backgroundColor: "#000",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    width: 40,
    height: 40,
    tintColor: "#FFFFFF",
  },
  menuButton: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 25,
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default CaptureImagesScreen;
