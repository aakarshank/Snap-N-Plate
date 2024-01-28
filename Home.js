import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CameraComponent from './CameraComponent';

const HomeScreen  = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Image source={require('./logo.png')}  style={styles.border} />
      <Text style={styles.welcomeText}>Welcome To Snap N' Plate!</Text>
      <Text style={styles.description}>Take a photo of any ingredients and we'll tell you three recipes you can make with those ingredients: an easy, medium, and hard one.</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#faedd9', // Replace with the actual background color of your screen
  },
  description: {
      textAlign:'center',
  },
  
  border: {
    width:200,
    height:200,
    borderWidth:2,
    borderColor: 'black',
    borderRadius:20,
  },
  
  welcomeText: {
    fontSize: 25,
    marginBottom: 20,
    marginTop: 20,
    color: '#283618', // Replace with the actual color of your text
    // Add font styling as per your design
  },
  button: {
    backgroundColor: '#A0522D', // Replace with the actual button color of your design
    marginTop: 20,
    padding: 10,
    borderRadius: 20,
    // Add shadow and other styling as per your design
  },
  buttonText: {
    color: '#FFF',
    // Add font styling as per your design
  },
});

export default HomeScreen;