// BottomNavigation.js
import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LocalizationContext } from "../context/LocalizationContext";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const BottomNavigation = ({
  onOpenMenu,
  onCameraCapture,
  capturedImages,
  onImageClick,
  onCenterButtonClick,
}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { localization } = useContext(LocalizationContext);

  const currentRoute = route.name;

  const handleCenterButtonClick = () => {
    if (currentRoute.startsWith("Camera")) {
      if (onCameraCapture) {
        onCameraCapture();
      } else {
        console.warn("Camera capture function is not provided");
      }
    } else if (currentRoute === "CreateNote") {
      if (onCenterButtonClick) {
        onCenterButtonClick();
      } else {
        navigation.navigate("Camera");
      }
    } else if (currentRoute === "Notes" || currentRoute.startsWith("Note")) {
      navigation.navigate("CreateNote");
    } else {
      navigation.navigate("Camera");
    }
  };

  let centerButtonContent;
  let centerButtonStyle = [styles.centerButton];

  if (currentRoute.startsWith("Camera")) {
    centerButtonContent = <Ionicons name="camera" size={24} color="white" />;
    centerButtonStyle.push(styles.centerButtonCamera);
  } else if (currentRoute === "Notes" || currentRoute.startsWith("Note")) {
    centerButtonContent = (
      <Text style={styles.centerButtonText}>Create Notes</Text>
    );
    centerButtonStyle.push(styles.centerButtonCreate);
  } else {
    centerButtonContent = (
      <Text style={styles.centerButtonText}>
        {localization.new_note_start_button}
      </Text>
    );
    centerButtonStyle.push(styles.centerButtonDefault);
  }

  return (
    <View style={styles.container}>
      {currentRoute.startsWith("Camera") &&
      capturedImages &&
      capturedImages.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            {capturedImages.map((imageUrl, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onImageClick(imageUrl)}
              >
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.capturedImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={{ width: 48 }} />
      )}

      <TouchableOpacity
        onPress={handleCenterButtonClick}
        style={centerButtonStyle}
        accessibilityLabel="Center Action"
      >
        {centerButtonContent}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log("Burger Menu Clicked");
          onOpenMenu();
        }}
        style={styles.menuButton}
        accessibilityLabel="Open Menu"
      >
        <Ionicons name="menu" size={40} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 80,
    paddingHorizontal: 16,
    zIndex: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 5,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  capturedImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  centerButton: {
    padding: 12,
    borderRadius: 50,
  },
  centerButtonCamera: {
    backgroundColor: "black",
  },
  centerButtonCreate: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
  },
  centerButtonDefault: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    width: 160,
  },
  centerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  menuButton: {},
});
