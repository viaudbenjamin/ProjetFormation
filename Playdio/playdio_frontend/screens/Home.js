import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage} from 'react-native';
import { Avatar, Badge, Icon, withBadge,Card,List,ListItem, Image, Header,Overlay } from 'react-native-elements'
import Radio from './components/Radio';
import Profile from './components/Profile';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useFonts} from '@use-expo/font'
import ip from '../variables';


export default function Home(props) {

  const [discoverRadio, setDiscoverRadio] = useState([]);
  const [myRadio, setMyRadio] = useState([]);
  const [communityRadio, setCommunityRadio] = useState([]);


// ajouter données local Storage
/* var storageUser = {
  "email": "m.michon@yahoo.fr",
  "idSpotify": "1127664154",
  "namePlatform": "spotify",
  "id": "5ee00cc69f32fc0ae27decac"
}
AsyncStorage.setItem("user",JSON.stringify(storageUser))
 */


  useEffect( () =>{
      fetchRadio = async () => {

        var infoUser = await AsyncStorage.getItem('user');
        var userData = JSON.parse(infoUser);
        
        var request = await fetch(`${ip}/radio`,{
          method:"POST",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`userId=${userData.id}`
        })
        var response = await request.json();
        
        // DISCOVER
        var rawDiscoverRadio = [];
        for(var i=0; i<response.discoverRadio.length; i++) {
          rawDiscoverRadio.push({
            name: response.discoverRadio[i].name, 
            img: response.discoverRadio[i].avatar,
            musicType: response.discoverRadio[i].tags,
            id: response.discoverRadio[i]._id,
            url:'Playlist',
          });
        }
        setDiscoverRadio(rawDiscoverRadio);

        // MY RADIOS
        var rawMyRadio = [{name:"New radio", img:"https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_960_720.png", musicType:[], id:"", url:'AddRadio'}];
        for(var i=0; i<response.myRadio.length; i++) {
          rawMyRadio.push({
            name: response.myRadio[i].name, 
            img: response.myRadio[i].avatar,
            musicType: response.myRadio[i].tags,
            id: response.myRadio[i]._id,
            url:'Playlist',
          });
        }
        setMyRadio(rawMyRadio);

        // RADIOS OF MY COMMUNITY
        var rawCommunityRadio = [];
        for(var i=0; i<response.communityRadio.length; i++) {
          rawCommunityRadio.push({
            name: response.communityRadio[i].name, 
            img: response.communityRadio[i].avatar,
            musicType: response.communityRadio[i].tags,
            id: response.communityRadio[i]._id,
            url:'Playlist',
          });
        }
        setCommunityRadio(rawCommunityRadio);


      }
      fetchRadio()  
  },[])


  // DISCOVER
  var discoverRadioList = discoverRadio.map(function(radio, i) {
    return <Radio key={i} radioName={radio.name} img={radio.img} musicType={radio.musicType} navigation={props.navigation} radioId={radio.id} url={radio.url}/>;
  })
  // MY RADIOS
  var myRadioList = myRadio.map(function(radio, i) {
    return <Radio key={i} radioName={radio.name} img={radio.img} musicType={radio.musicType} navigation={props.navigation} radioId={radio.id} url={radio.url}/>;
  })
  // RADIOS OF MY COMMUNITY
  var communityRadioList = communityRadio.map(function(radio, i) {
    return <Radio key={i} radioName={radio.name} img={radio.img} musicType={radio.musicType} navigation={props.navigation} radioId={radio.id} url={radio.url}/>;
  })

  let [fontsLoaded] = useFonts({
    PermanentMarker: require("../assets/fonts/PermanentMarker-Regular.ttf"),
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });
   if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View>

      <Profile navigation={props.navigation}/>

      <ScrollView style={styles.scrollView}>

        <View style={styles.categories}>
          <Text style={styles.categoryTitle}>Discover</Text>
          <Text style={styles.categoryLink}>See all</Text>
        </View>
        <ScrollView horizontal={true} indicatorStyle={'white'} >
          {discoverRadioList} 
        </ScrollView>

        <View style={styles.categories}>
          <Text style={styles.categoryTitle}>My radios</Text>
          <Text style={styles.categoryLink}>See all</Text>
        </View>
        <ScrollView horizontal={true} indicatorStyle={'white'}>
          {myRadioList}
        </ScrollView>

        <View style={styles.categories}>
          <Text style={styles.categoryTitle}>Radios of my community</Text>
          <Text style={styles.categoryLink}>See all</Text>
        </View>
        <ScrollView horizontal={true} indicatorStyle={'white'}>
          {communityRadioList}
        </ScrollView>

      </ScrollView>
    </View>
  );
}}

// STYLES
const styles = StyleSheet.create({
  homeView: { 
    alignItems:"center", 
    justifyContent:"flex-start",
    backgroundColor: "white"
  },
  
  categories: {
    flex:1, 
    flexDirection:"row", 
    justifyContent:"space-between",
    backgroundColor: "white"
  },

  scrollView: {
    backgroundColor: '#FFFFFF',
  },

  categoryTitle: {
    color:"#383838", 
    fontSize:hp('3%'), 
    width:wp('75%'), 
    marginLeft:wp('7%'),
    fontFamily: 'PermanentMarker'
  },
  categoryLink: {
    color:"#00838F", 
    fontSize:hp('2%'), 
    width:wp('25%'), 
    marginTop:hp('1.5%'),
    fontFamily: 'Roboto',
  }
})