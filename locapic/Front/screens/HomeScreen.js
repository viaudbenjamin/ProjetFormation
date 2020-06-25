import React, {useState,useEffect} from 'react';
import { StyleSheet, ImageBackground,AsyncStorage,Text } from 'react-native';

import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';

function HomeScreen({ navigation, onSubmitPseudo }) {
    const [pseudo, setPseudo] = useState('');
    function savePseudoLocal(pseudo){
      AsyncStorage.setItem("pseudo",pseudo)
    }
    useEffect(()=>{
      AsyncStorage.getItem("pseudo",function(error,data){
        setPseudo(data)
      })
      
    },[])
    console.log(pseudo)
    var login 
    if(pseudo){
      login = <Text style={styles.text} >Welcome back {pseudo} !!!</Text>
    }else{
      login =<Input
      containerStyle = {{marginBottom: 25, width: '70%'}}
      inputStyle={{marginLeft: 10}}      
      leftIcon={
          <Icon
          name='user'
          size={24}
          color="#eb4d4b"
          />
      }
      onChangeText={(val) => setPseudo(val)}
  />
    }


    return (
    <ImageBackground source={require('../assets/home.jpg')} style={styles.container}>

        
                {login}
        <Button
            icon={
                <Icon
                name="arrow-right"
                size={20}
                color="#eb4d4b"
                />
            }

            title="Go to Map"
            type="solid"
            onPress={() => {onSubmitPseudo(pseudo); navigation.navigate('Map');savePseudoLocal(pseudo)}}
        />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    text:{
    fontSize:25,
    marginBottom:25
    }
});


function mapDispatchToProps(dispatch) {
    return {
      onSubmitPseudo: function(pseudo) { 
        dispatch( {type: 'savePseudo', pseudo: pseudo }) 
      }
    }
  }
  
  export default connect(
      null, 
      mapDispatchToProps
  )(HomeScreen);