console.disableYellowBox = true; 
import React,{useState,useEffect} from 'react';
import {ImageBackground,StyleSheet,View, AsyncStorage} from 'react-native';

import {Button,Text,Icon,} from 'react-native-elements'
import * as AuthSession from 'expo-auth-session';
import getAuthorizationCode from '../screens/components/getAuthorizationCode';
import getTokens from '../screens/components/getTokens';
import ip from '../variables';

/* import * as Font from 'expo-font'; */

// import police from '../screens/components/font'

import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {connect} from 'react-redux'

function connectAPP({navigation,saveEmailUser}) {

  AsyncStorage.getItem('user',function(error,data){
                  var userData = JSON.parse(data)
                  if (userData !== null) {
      // We have data!!
     navigation.navigate("Home")
    }

                })
 
  // var fontPermanentMarker =''
  // var fontRoboto =''
  // const [font,setFont]= useState(false)

// useEffect( ()=>{
//   police()
//   setFont(true);
//     if(font ==true){ 
//     fontPermanentMarker = 'PermanentMarker'
//     fontRoboto = 'Roboto'
//   }
// },[])
async function autoriseSpotify(){

  var infoClientID = await fetch (`${ip}/autorisation`)
  

// ip matthieu http://192.168.1.43
// IP Marion http://192.168.1.25
// IP Ben http://192.168.1.43
// IP Dim http://192.168.0.25

  var reponse = await infoClientID.json()
  
  var infoUser =await getTokens(reponse.clientId,reponse.redirectURI,reponse.clientSecret)
  
  saveEmailUser(infoUser.userInfo.email)
  navigation.navigate("SignUp")
}
let [fontsLoaded] = useFonts({
    PermanentMarker: require("../assets/fonts/PermanentMarker-Regular.ttf"),
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });
   if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
    <ImageBackground source={require('../assets/image_connection.jpg')} style={styles.container}>
      <Text style={styles.title} >Playdio</Text>
      <Text style={styles.text}>Connect with your favorite platform to enjoy your friends your entire library</Text>
      <Button 
      title="continuer vers la Home"
      type="solid"
      onPress={()=>{navigation.navigate("Home")} }
      />
      <Button
      iconRight
      icon={<Icon
      name="spotify"
      size={40}
      color="#1DB954"
      type='font-awesome'
      
      />}
      
      color="#000"
      buttonStyle={styles.button}
      color="fff"
      title="Sign up with Spotify"
      onPress={()=>{ autoriseSpotify()}}
      titleStyle={
        {color:"black",
        fontSize:20,
        fontFamily:'Roboto'}
      }
      
      />{/* <Button
      buttonStyle={styles.button}
      title="Sign up with Deezer"
      type="solid"
      titleStyle={
        {color:"black",
        fontSize:20}
      }
      /> */}
      <Text style={styles.connectEmail}>Or do it later</Text>
      <Button
      buttonStyle={styles.button}
      title="Sign up with email"
      type="solid"
      titleStyle={
        {color:"black",
        fontSize:20, fontFamily:'Roboto'}

      }
      onPress={()=>navigation.navigate("SignUp")}
      />

      <Text style={styles.connectEmail}>Sign In</Text>
      <Button
      buttonStyle={styles.button}
      title="Sign in with email"
      type="solid"
      titleStyle={
        {color:"black",
        fontSize:20, fontFamily:'Roboto'}

      }
      onPress={()=>navigation.navigate("SignIn")}
      />
    </ImageBackground>
  );

}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title:{
    marginTop:hp('15%'),
    marginBottom:hp('15%'),
    marginLeft:wp('25%'),
    color:"#fff",
    fontSize:wp('15%'),
    fontFamily: 'PermanentMarker'
  },
  text:{
    color:"#fff",
    marginLeft:wp('7%'),
    marginRight:wp('7%'),
    fontSize:wp('4%'),
    marginBottom:hp('2%'),
    fontFamily:'Roboto',

  },
  connectEmail:{
    color:"#fff",
    marginRight:wp('7%'),
    fontSize:wp('4%'),
    marginBottom:hp('2%'),
    marginLeft:wp('7%'),
    fontFamily:'Roboto',
  },
  button:{
    backgroundColor: "#fff",
    marginBottom:hp('5%'),
    marginRight:wp('7%'),
    marginLeft:wp('7%'),
    borderRadius:wp('2%'),
    height:hp('6.5%'),
  } 
  
});

function mapDispatchToProps(dispatch) {
  return {
    saveEmailUser: function(email) { 
      dispatch( {type: 'saveEmailUser', email: email }) 
    }
  }
}


export default connect(
  null,
  mapDispatchToProps
)(connectAPP)



