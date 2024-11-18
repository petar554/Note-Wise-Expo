import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Alert } from "react-native";
import { CameraView, CameraType, useCameraPermissions, PermissionResponse } from "expo-camera";

type CameraComponentProps = {
  onCapture: (uri: string) => void;
};

export default function CameraComponent({ onCapture }: CameraComponentProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    (async () => {
      const [permission] = await useCameraPermissions(); // extract permission object
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

  const toggleCameraType = () => {
    setCameraType((prevType) => (prevType === "back" ? "front" : "back"));
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting camera permissions...</Text>;
  // }

  // if (!hasPermission) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={cameraType}
        ref={(ref) => (cameraRef.current = ref)} // assign camera reference
        onCameraReady={() => console.log("Camera is ready")}
      >
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCapture}>
            <Text style={styles.text}>Capture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
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
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
});
