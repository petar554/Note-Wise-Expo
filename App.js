import "react-native-gesture-handler";
import React from "react";
import { LocalizationProvider } from "./src/context/LocalizationContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotesScreen from "./src/screens/NotesScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <LocalizationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Notes">
          <Stack.Screen
            name="Notes"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateNote"
            component={NotesScreen}
            options={{ headerTitle: "Create Note" }}
          />

          {/* Add other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </LocalizationProvider>
  );
}
