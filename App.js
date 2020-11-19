import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen.js";
import PartnersScreen from "./screens/PartnersScreen.js";
import CreatePartnerScreen from './screens/CreaPartnerScreen.js';


const Stack = createStackNavigator();
export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  renderNavigator() {
    return (
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="black"></StatusBar>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Login",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "transparent"
              },
              headerTitleAlign: "center",
              headerTintColor: "#007dfe",
            }}
          />
          <Stack.Screen
            name="Partners"
            component={PartnersScreen}
            options={{
              title: "Partners",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "transparent"
              },
              headerTitleAlign: "center",
              headerTintColor: "#007dfe",
            }}
          />
          <Stack.Screen
            name="CreaPartner"
            component={CreatePartnerScreen}
            options={{
              title: "Crea Partner",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "transparent"
              },
              headerTitleAlign: "center",
              headerTintColor: "#007dfe",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  componentDidMount() {
  }

  render() {
    return this.renderNavigator(); //render your child components tree
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
