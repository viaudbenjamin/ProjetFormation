import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableHighlight,Swi } from 'react-native';
import { Avatar,ButtonGroup, Badge, Icon, withBadge, Card, List, ListItem, Image, Header } from 'react-native-elements'
import ListItemSwap, { Separator } from './components/userplaylist';
import  {TextField}  from 'react-native-material-textfield';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ip from '../variables';
import {connect} from 'react-redux';

function selectUser(props) {
const [firstName,setFirstName]=useState('')
const [userPlaylist,setUserPlaylist]=useState([])
const [indexButton,setIndex]=useState(0)
const [listToSearch,SetListToSearch] =useState();
const[search,setSearch]=useState("")
const [resultUser,setResultUser]=useState('')
const [playlistId,setPlaylistId]=useState('')

/* modifier le fetch pour envoiye le nom de la playlist quan elle sera implementer dans l'appli */
useEffect(()=>{
    var tableau = []
    async function checkUserPlaylist(){
        var button="orchestra"
    var requestBDD = await fetch(`${ip}/userListplaylist`,{
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        method:"POST",
        body:`playlistID=${props.radioId}`
    })
    var reponse = await requestBDD.json()


        for(var i= 0 ; i<reponse.userList.userInfo.length;i++){
        tableau.push({id:i,firstName:reponse.userList.userInfo[i].userID.firstName,lastName:reponse.userList.userInfo[i].userID.lastName,avatar:'https://randomuser.me/api/portraits/men/41.jpg',gradeType:reponse.userList.userInfo[i].gradeType,namePlaylist:reponse.userList.name,idUser:reponse.userList.userInfo[i].userID._id,idDelete:reponse.userList.userInfo[i]._id,playlistId:reponse.userList._id,button:button})
        }
        setUserPlaylist(tableau)
        setPlaylistId(reponse.userList._id)
        
    }
    checkUserPlaylist()
},[indexButton])

useEffect(()=>{
    var tableau = []
    let searchText = search
        var button="search"
        async function userSearch(){
        if(searchText){    
        var requestBDD = await fetch(`${ip}/userList`,{
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            method:"POST",
            body:`firstName=${searchText}`
        })
        var reponse = await requestBDD.json()
        for(var i= 0 ; i<reponse.userList.length;i++){
            tableau.push({id:i,firstName:reponse.userList[i].firstName,lastName:reponse.userList[i].lastName,avatar:'https://randomuser.me/api/portraits/men/41.jpg',idUser:reponse.userList[i]._id,playlistId:playlistId,button:button})
            }
        setResultUser(tableau) 
    }
    }   
    userSearch() 
    },[search,indexButton])

    const buttons = ['Playlist orchestra', 'Find your new musician']
    useEffect(() => {
    if(indexButton==0 || indexButton==3 ){
        SetListToSearch(userPlaylist)
        setIndex(0)
        
    }
    else{
        SetListToSearch(resultUser)
        setIndex(1)
        setSearch()

    }
    });



return (
    <View style={styles.container}>
        <Header
            rightComponent={<Avatar
                rounded source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
            />}
            containerStyle={{
                backgroundColor: '#FFFFFF',
                marginBottom: 0,
                paddingBottom: 0,
                paddingTop: 0

            }}
        />

            <View style={styles.input}> 
            <Text style={styles.categoryTitle}> Radio orchestra</Text>
                    <TextField
                        label={'Search a person'}
                        tintColor="#26a69a"
                        onChangeText={ (value) => setSearch(value) }
                        
                        />
            </View>            
                    <View>
                          <ButtonGroup
                            onPress={(e) => {setIndex(e) }}
                            selectedIndex={indexButton}
                            buttons={buttons}
                            containerStyle={{height: 40}}
                            selectedButtonStyle ={{
                            backgroundColor:"#00838F",
                              }}
                            />

                      </View>
        <FlatList
            data={listToSearch}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <ListItemSwap style={styles.flatList}
                    {...item}
                />
            )}
            ItemSeparatorComponent={() => <Separator />}
        />
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
          marginBottom:wp("5%"),
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
       marginRight:wp('10%'),
       marginLeft:wp('10%'),
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
    return { radioId: state.radioId,deleteUser:state.deleteUser }
  }
    
  export default connect(
    mapStateToProps,
    null
  )(selectUser);