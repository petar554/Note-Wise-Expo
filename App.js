// App.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import NotesScreen from "./src/screens/NotesScreen";
import CameraScreen from "./src/screens/CameraScreen";
import CreateNote from "./src/screens/CreateNote";
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
              <Stack.Screen name="Notes" component={NotesScreen} />
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen name="CreateNote" component={CreateNote} />
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
