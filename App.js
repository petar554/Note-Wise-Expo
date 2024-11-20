import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import NotesScreen from "./src/screens/NotesScreen";
import CameraScreen from "./src/screens/CameraScreen";
import TestScreen from "./src/screens/TestScreen";
import VerifyAnswerScreen from "./src/screens/VerifyAnswerScreen";
import TestResultScreen from "./src/screens/TestResultScreen";
import CreateNewNoteScreen from "./src/screens/CreateNewNoteScreen";
import CaptureImagesScreen from "./src/screens/CaptureImagesScreen";
import ReviewCapturedPicturesScreen from "./src/screens/ReviewCapturedPicturesScreen";
import GeneratingNotesScreen from "./src/screens/GeneratingNotesScreen";
import NotesPreparedScreen from "./src/screens/NotesPreparedScreen";
import NotesListScreen from "./src/screens/NotesListScreen";
import NotesSummaryScreen from "./src/screens/NotesSummaryScreen";
import { LocalizationProvider } from "./src/context/LocalizationContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { authToken } = useContext(AuthContext);

  return (
    <LocalizationProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {authToken ? (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              {/* <Stack.Screen name="Camera" component={CameraScreen} /> */}
              {/* <Stack.Screen name="CreateNote" component={CreateNote} /> */}
              <Stack.Screen name="CreateNewNoteScreen" component={CreateNewNoteScreen} />
              <Stack.Screen name="CaptureImagesScreen" component={CaptureImagesScreen} />
              <Stack.Screen name="ReviewCapturedPicturesScreen" component={ReviewCapturedPicturesScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="GeneratingNotesScreen" component={GeneratingNotesScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="NotesPreparedScreen" component={NotesPreparedScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="TestScreen" component={TestScreen} />
              <Stack.Screen name="VerifyAnswerScreen" component={VerifyAnswerScreen} />
              <Stack.Screen name="TestResultScreen" component={TestResultScreen} />
              <Stack.Screen name="NotesListScreen" component={NotesListScreen} />
              <Stack.Screen name="NotesSummaryScreen" component={NotesSummaryScreen} />
              {/* Other authenticated screens */}
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              {/* Other unauthenticated screens */}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </LocalizationProvider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
