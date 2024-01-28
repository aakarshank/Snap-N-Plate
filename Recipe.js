// screens/RecipeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView} from 'react-native';

const RecipeScreen = ({ route }) => {
  const { prompt } = route.params;

  function splitRecipesByDifficulty(responseString) {
    // Regular expressions to find the keywords
    const easyRegex = /easy/i;
    const mediumRegex = /medium/i;
    const hardRegex = /hard/i; // or /difficult/i if that's the word used
  
    // Splitting the string into parts
    const parts = responseString.split(/(easy|medium|hard)/i);
  
    let easyRecipes = [];
    let mediumRecipes = [];
    let hardRecipes = [];
  
    for (let i = 0; i < parts.length; i++) {
      if (easyRegex.test(parts[i])) {
        easyRecipes.push(parts[i + 1]); // Assuming the recipe text follows the keyword
      } else if (mediumRegex.test(parts[i])) {
        mediumRecipes.push(parts[i + 1]);
      } else if (hardRegex.test(parts[i])) {
        hardRecipes.push(parts[i + 1]);
      }
    }
  
    return { easyRecipes, mediumRecipes, hardRecipes };
  }

  let recipes = splitRecipesByDifficulty(prompt);
  return (

    <ScrollView style={styles.textContainer}>
        <View style={{padding:10,backgroundColor:'#faedd9'}}>
      <Text style={styles.title}>Recipe Screen</Text>
      <View>
        <Text style={styles.recipe_title}>Easy Recipe</Text>
        {recipes.easyRecipes.map((recipe, index) => <Text key={index} style={styles.recipe}>{recipe}</Text>)}
      </View>
      <View>
        <Text style={styles.recipe_title}>Medium Recipe</Text>
        {recipes.mediumRecipes.map((recipe, index) => <Text key={index} style={styles.recipe}>{recipe}</Text>)}
      </View>
      <View>
        <Text style={styles.recipe_title}>Hard Recipe</Text>
        {recipes.hardRecipes.map((recipe, index) => <Text key={index} style={styles.recipe}>{recipe}</Text>)}
      </View>
      </View>
    </ScrollView>
  );
};

// Add your styles here
const styles = StyleSheet.create({
    title:{
        fontSize: 40,
        textAlign:'center'
    },
    textContainer:{

        flex:1,
    },
    recipe_title : {
        fontSize:30,
        fontWeight: 'bold',
        textAlign:'center',
    },
    recipe:{
        textAlign:'center',
    }
})
export default RecipeScreen;
