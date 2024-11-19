import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Alert } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import CameraIcon from "../../assets/camera.png";

type CameraComponentProps = {
  onCapture: (uri: string) => void;
};

export default function CameraComponent({ onCapture }: CameraComponentProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    (async () => {
      const [permission] = await useCameraPermissions();
      setHasPermission(permission?.status === "granted");
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          onCapture(photo.uri); // pass captured image URI to the parent component
        } else {
          throw new Error("Failed to capture image");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to capture image.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={cameraType}
        ref={(ref) => (cameraRef.current = ref)}
        onCameraReady={() => console.log("Camera is ready")}
      />
      <View style={styles.controls}>
        <TouchableOpacity style={styles.cameraButtonCircle} onPress={handleCapture}>
          <Image source={CameraIcon} style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  controls: {
    position: "absolute",
    bottom: 70,
    width: "100%",
    alignItems: "center",
  },
  cameraButtonCircle: {
    backgroundColor: "#000",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIcon: {
    width: 60,
    height: 40,
  },
});
