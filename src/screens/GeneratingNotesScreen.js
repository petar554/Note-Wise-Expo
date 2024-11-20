import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import useNotesGeneration from "../hooks/useNotesGeneration"; 
import Menu from "../components/Menu";

const GeneratingNotesScreen = ({ route, navigation }) => {
  const { notesId } = route.params;
  const { getNoteDetails } = useNotesGeneration(); 
  const [status, setStatus] = useState("Pending");
  const [polling, setPolling] = useState(true);
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const pollStatus = async () => {
      try {
        const response = await getNoteDetails(notesId);
        setStatus(response.status_id);
        if (response.hero_image) setHeroImage(`data:image/jpeg;base64,${response.hero_image}`);

        if (response.status_id === 3) {
            setPolling(false);
            navigation.navigate("NotesPreparedScreen", { noteDetails: response, notesId });
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch note details.");
      }
    };

    if (polling) {
      const interval = setInterval(pollStatus, 3000); 
      return () => clearInterval(interval); // cleanup on unmount
    }
  }, [polling]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generating Notes</Text>
      <Text style={styles.status}>Status: {status === 1 || status === 2 ? "Please wait" : "Completed"}</Text>

      {heroImage && <Image source={{ uri: heroImage }} style={styles.heroImage} />}

      {status !== 3 && <ActivityIndicator size="large" color="#000" style={styles.loader} />}

      <Menu isOpen={false} onClose={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  status: {
    fontSize: 18,
    marginBottom: 16,
  },
  heroImage: {
    width: "80%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 16,
  },
  loader: {
    marginTop: 20,
  },
});

export default GeneratingNotesScreen;
