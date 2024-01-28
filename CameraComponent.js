import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import { useEffect, useRef, useState} from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';
import axios from 'axios';
import OpenAI from 'openai';
const CameraComponent = ({navigation}) => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [answer,setAnswer] = useState();
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);




  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    const analyzeImage = async (imageBase64) => {
      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      const PAT = 'fd3787f8e73141c0a56047fe5b74cf0a';
      // Specify the correct user_id/app_id pairings
      // Since you're making inferences outside your app's scope
      const USER_ID = 'clarifai';       
      const APP_ID = 'main';
      // Change these to whatever model and image URL you want to use
      const MODEL_ID = 'food-item-recognition';
      const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044';    
      const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "base64": photo.base64
                    }
                }
            }
        ]
    });
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.text())
    .then(result => {
      queryChatGPT(result)
    })
    .catch(error => console.log('error', error));
    };
    async function queryChatGPT(food) {
      const openai = new OpenAI({apiKey:"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"});
      const prompt = "Look at this json data and grab the ingredients, and give me three recipes I can make using these ingredients, one easy recipe, one medium recipe, and one hard recipe, without using easy, medium, or hard more than once in the response. Also, give me 1 paragraph per recipe, and also give me estimated calorie counts for a normal portion: ";
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt.concat(" ",food)}],
        model: "gpt-3.5-turbo",
      }).then((response)=>{
        //setAnswer(response.choices[0]);
        navigation.navigate('Recipe',{prompt: response.choices[0].message.content})
      });
      
  }
  
  // Usage example
  const apiKey = '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'; // Replace with your actual API key
  
    let savePhoto = async () => {
      const formData = new FormData();
      //console.log('formm',formData)
      /*formData.append('image',{
        uri:photo.uri,
        type:'image/jpeg',
        name:'image.jpg',
      })*/  
      analyzeImage();

        
      /*MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });*/
    };

    
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        {hasMediaLibraryPermission ? <Button title="Create Recipe!" onPress={savePhoto} color='#A0522D'/> : undefined}
        <Button title="Retake Photo" color='#A0522D' onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>   
      <View style={styles.container}>
        <Button title="Click to Take Picture" onPress={takePic} color='#A0522D' />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'end',
    justifyContent: 'flex-end',

  },
  
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // Diameter of the circle
    height: 50, // Diameter of the circle
    color: '#A0522D',
    backgroundColor: '#A0522D', // Button color
    borderRadius: 25, // Half of the width/height to make it a circle,
    margin: 0,
  },
  
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});

export default CameraComponent;