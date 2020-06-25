import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView, ScrollView ,Switch,AsyncStorage, Share} from 'react-native';
import { ListItem,Button, Header, Avatar,Icon} from 'react-native-elements'
import ListItemSwap, { Separator } from './components/Song';
import Profile from './components/Profile';
import {connect} from 'react-redux';
// import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font'
import * as Linking from 'expo-linking';


import police from '../screens/components/font';

import  {TextField,  FilledTextField, OutlinedTextField,}  from 'react-native-material-textfield';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function CreateRadioValidation(props) {

  
  
let share= async ()=>{
        try {
            const result = await Share.share({
              message: `Join me on playdio` 
            });
      
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                // shared with activity type of result.activityType
              } else {
                // shared
              }
            } else if (result.action === Share.dismissedAction) {
              // dismissed
            }
          } catch (error) {
            alert(error.message);
          }
    } 
    
let CreationLien=()=>{

  props.addRadioId(props.playlistUser.urlPlaylist)
  
  props.navigation.navigate(`Playlist`)
}


  return (
<View style={styles.container}>

  <Profile navigation={props.navigation}/>  


    <View style={styles.form}>

 
            <ScrollView >

                {/*  "#c2185b" */}
        
                  
                    <View style={styles.input}> 
                    <Text style={styles.categoryTitle}> Your Radio is on Air</Text>
                    
                    </View>
               
            

                    <View style={styles.paramPlaylist}> 

                    <Text> Congrats  ! Your radio is on air</Text>
                    <Text> You can share it using the following links </Text>

                    <View style={styles.buttonShare}>
                    <Button 
                            title="Share your playlist   "
                            titleStyle={
                            {
                            fontFamily:'Roboto',
                            color:'#517fa4'
                              }
                               }
                            onPress={()=>share("empty")}
                            type="outline"
                            icon={
                              <Icon
                                name='share-google'
                                type='evilicon'
                                color='#517fa4'
                              />
                              
                            }
                            iconRight
                            
                        />
                      </View>
                    </View>


         
 
  
                        </ScrollView>
                        <View style={styles.button}>
        
        
                        <Button 
                            title="Let's Rock     "
                            titleStyle={
                            {
                            fontFamily:'Roboto'}
                               }
                            onPress={()=>CreationLien("empty")}
                            buttonStyle={{
                                backgroundColor:"#00838F",
                            }}
                            icon={
                              <Icon
                                name='playlist-add-check'
                                type='material'
                                color='#FFF'
                              />
                              
                            }
                            iconRight
                        />
                        </View>
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
   
    marginRight:wp('7%'),
    marginLeft:wp('7%'),
    
  },


  button:{
   marginRight:wp('10%'),
   marginLeft:wp('10%'),
   marginBottom: wp('10%')
},

buttonShare:{
  marginRight:wp('10%'),
  marginLeft:wp('10%'),
  marginTop: wp('20%')
},

categoryTitle: {
    color:"#383838", 
    fontSize:hp('3%'), 
    width:wp('75%'), 
    marginLeft:wp('7%'),
    fontFamily: 'PermanentMarker'
  },


  
});


function mapStateToProps(state) {
  return { playlistUser: state.PlaylistAdd }
}
  
function mapDispatchToProps(dispatch) {
  return {
    addRadioId: function(radioId) {
        dispatch( {type: 'sendRadioId', radioId: radioId} )
    }
  }
}
export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(CreateRadioValidation);

// export default CreateRadio1


