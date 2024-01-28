import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState} from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';
import OpenAI from 'openai';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import CameraComponent from './CameraComponent';
import RecipeScreen from './Recipe';
import SplashScreen from './SplashScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Splash" component = {SplashScreen} options= {{headerShown: false}} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={CameraComponent} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );


}