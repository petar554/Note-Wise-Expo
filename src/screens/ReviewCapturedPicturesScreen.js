import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import useGetThumbnails from "../hooks/useGetThumbnails";
import useNotesGeneration from "../hooks/useNotesGeneration";
import Icon from "react-native-vector-icons/FontAwesome";
import CameraIcon from "../../assets/camera.png";
import DeleteIcon from "../../assets/delete.png";
import Menu from "../components/Menu";

const ReviewCapturedPicturesScreen = ({ route, navigation }) => {
  const { notesId } = route.params;
  const { getThumbnails, getFullImage, deleteImage } = useGetThumbnails();
  const { startProcessingNotes } = useNotesGeneration();
  const [thumbnails, setThumbnails] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [fullImageUri, setFullImageUri] = useState(null);

  useEffect(() => {
    const fetchThumbnails = async () => {
      setLoading(true);
      try {
        const response = await getThumbnails(notesId);
        setThumbnails(response.thumbnails);
      } catch (error) {
        Alert.alert("Error", "Failed to retrieve thumbnails. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchThumbnails();
  }, [notesId]);

  const handleThumbnailPress = async (imageId) => {
    try {
      const uri = await getFullImage(imageId);
      setFullImageUri(uri);
      setImageId(imageId);
    } catch (error) {
      Alert.alert("Error", "Failed to load image. Please try again.");
    }
  };
  
  const handleDeleteImage = async (imageId) => {
    Alert.alert(
      "Delete Image",
      "Are you sure you want to delete this image?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteImage(imageId); 
              setThumbnails((prevThumbnails) =>
                prevThumbnails.filter((thumbnail) => thumbnail.image_id !== imageId)
              );
            } catch (error) {
              Alert.alert("Error", "Failed to delete the image. Please try again.");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleGenerateNotes = async () => {
    try {
      const response = await startProcessingNotes(notesId);
      if (response.status === "Processing started.") {
        navigation.navigate("GeneratingNotesScreen", { notesId });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to start note processing. Please try again.");
    }
  };

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <View style={styles.container}>
        {fullImageUri && (
        <View style={styles.fullImageContainer}>
            <Image source={{ uri: fullImageUri }} style={styles.fullImage} />
            <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDeleteImage(imageId)}>
                <Image source={DeleteIcon} style={styles.deleteIconImage} />
            </TouchableOpacity> 

            <TouchableOpacity style={styles.closeButton} onPress={() => setFullImageUri(null)}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
        )}

      <ScrollView horizontal contentContainerStyle={styles.thumbnailContainer}>
        {thumbnails.map((thumbnail) => (
          <TouchableOpacity key={thumbnail.image_id} style={styles.thumbnailWrapper} onPress={() => handleThumbnailPress(thumbnail.image_id)}>
            <Image source={{ uri: `data:image/jpeg;base64,${thumbnail.thumbnail_image}` }} style={styles.thumbnail}/>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => navigation.navigate("CaptureImagesScreen", { notesId })}
        >
          <Image source={CameraIcon} style={styles.cameraIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateNotes}>
            <Text style={styles.generateText}>Generate Notes</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
        <Icon name="bars" size={24} color="#000" />
       </TouchableOpacity>
       <Menu isOpen={menuOpen} onClose={closeMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  thumbnailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  thumbnailWrapper: {
    marginRight: 10,
    marginTop: 600, // #todo
    position: "relative",
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  deleteIcon: { // #todo
    position: "absolute",
    alignSelf: "flex-end", 
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 5,
    transform: [{ translateX: -50 }, { translateY: 180 }],
  },
  deleteIconImage: {
    width: 20,
    height: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 25,
    padding: 16,
  },
  cameraButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    width: 50,
    height: 50,
  },
  generateButton: {
    flex: 1,
    marginRight: 40,
    marginLeft: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
  },
  generateText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
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
  fullImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1,
  },
  fullImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  closeButton: {
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default ReviewCapturedPicturesScreen;