console.disableYellowBox = true; 
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import  {TextField,  FilledTextField, OutlinedTextField,}  from 'react-native-material-textfield';
import ip from '../variables';

import {Button,Input} from 'react-native-elements'

import {connect} from 'react-redux'



import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
function connectSignIn(props) {
  
//Matthieu  http://192.168.1.43
// IP Marion http://192.168.1.25
//IP Ben http://192.168.1.43

const [email,setEmail]=useState('email@email.com')
const [password,setPassword]=useState('')
const [signInEmail, setSignInEmail] = useState('')
const [signInPassword, setSignInPassword] = useState('')
// const [userExists, setUserExists] = useState(false)
const [listErrorsSignin, setErrorsSignin] = useState([])

async function signIn(email,password){
 
    var data = await fetch(`${ip}/sign-in`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `emailFromFront=${email}&passwordFromFront=${password}`
    })
    
    var userExists = false
    var resultServer = await data.json()
    if(resultServer.result == true){
      userExists = true
    }  else {
      setErrorsSignin(resultServer.error)
    }
  
  if(userExists){

    var storageUser = {
                    "email":resultServer.user.email,
                    "idSpotify":resultServer.user.musicAccounts[0].platfornUserID,
                    "namePlatform":resultServer.user.musicAccounts[0].namePlatform,
                    "id":resultServer.user._id
                  }

      AsyncStorage.setItem("user",JSON.stringify(storageUser))
 
    return props.navigation.navigate("Home")
  }
  }
  
return (
<View>
  
    <View style={styles.input}>
      <Text style={{marginTop:50, fontFamily:'PermanentMarker'}}> Connect To Your Playdio Account</Text>
      
  
      <TextField
      label={email}
      tintColor="#26a69a"
      onChangeText={(value)=>setEmail(value)}
      />

      <TextField

      label={'Password'}
      tintColor="#26a69a"
      secureTextEntry={true}
      onChangeText={(value)=>setPassword(value)}
      />

      <Button           
      buttonStyle={{
              backgroundColor:"#00838F",
          }}
      title="Sign in"
      type="solid"
      titleStyle={
        {fontFamily:'Roboto'}
      }
      onPress={()=>signIn(email,password)}
      />
      </View>

</View>

  );
}

const styles = StyleSheet.create({
  container: {
  display:"flex",
  flex:1,
  backgroundColor: '#fff',   
    },

  form:{
   display:"flex",
   flex:1,
   justifyContent:'flex-end',
    marginBottom:wp("15%"),
  },

input:{
  marginRight:wp('10%'),
  marginLeft:wp('10%'),
  marginBottom:wp('10%'),
  
  },  


paramPlaylist:{  
  backgroundColor: "#26a69a",
  marginRight:wp('7%'),
  marginLeft:wp('7%'),
  marginBottom:wp('70%'),
  
},


button:{
  backgroundColor: "#26a69a",
 marginRight:wp('10%'),
 marginLeft:wp('10%'),
},

});


function mapStateToProps(state) {
  return { emailStore : state.email }
}

export default connect(
  mapStateToProps,
  null
)(connectSignIn)