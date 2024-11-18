import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import CameraComponent from "../components/CameraComponent";
import useAddImageToNote from "../hooks/useAddImageToNote";
import Icon from "react-native-vector-icons/FontAwesome";
import CameraIcon from "../../assets/camera.png";

const CaptureImagesScreen = ({ route }) => {
  const { notesId } = route.params;
  const { addImageToNote } = useAddImageToNote();
  const [thumbnail, setThumbnail] = useState(null);
  const [imageCount, setImageCount] = useState(0);
  const [showCamera, setShowCamera] = useState(false);

  const handleCapture = async (imageUri) => {
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

  return (
    <View style={styles.container}>
      {showCamera ? (
        <CameraComponent onCapture={handleCapture} />
      ) : (
        <View style={styles.main}>
          {thumbnail && (
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
              <Text style={styles.imageCount}>{imageCount}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.cameraButton} onPress={() => setShowCamera(true)}>
            <Image source={CameraIcon} style={styles.cameraIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <Icon name="bars" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailContainer: {
    position: "absolute",
    bottom: 80,
    left: 20,
  },
  thumbnail: {
    width: 50,
    height: 50,
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
    bottom: 20,
    alignSelf: "center",
  },
  cameraIcon: {
    width: 60,
    height: 60,
  },
  menuButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default CaptureImagesScreen;
