import React,{useEffect,useState,useRef} from 'react';
import { Avatar, Badge, Icon, withBadge,Card, ListItem } from 'react-native-elements'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
// import { GestureHandler } from 'expo';
// const { Swipeable } = GestureHandler;
import {connect} from 'react-redux';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('0.0001%'),
  },

  separator: {
    flex: hp('0.3%'),
    height: hp('0.1%'),
    backgroundColor: '#e4e4e4',
    marginLeft: hp('3%'),
  },


  rightAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    flex: hp('0.3%'),
    alignItems: 'flex-end',
  },
/*   actionText: {
    color: '#fff',
    fontWeight: '600',

  }, */
});

function SearchResultComponent(props) {


  let validPlaylist = (idPlaylistItem,type)=>{
    console.log("recup position",props.playlistUser)

    if (type=="playlist"){
      
      props.addplaylist(props.spotifyId)
    
      props.navigation.navigate('AddRadioEmpty')

    }else if(props.from=="search"){
/*     let id=props.position
      let name =props.name
      let text =props.text
      let url= props.url
      let spotifyId = props.idSpotify
      let type=props.type
      let isrc = props.isrc


      let ajoutObjet={id:id,name:name,text:text,url:url,spotifyId:spotifyId,type:type,isrc:isrc}

      props.addSong(ajoutObjet)

 */
      let id=props.playlistUser.listMusic.length
      let nameTitle = props.name
      let artist = props.artist
      let idSpotify =props.spotifyId
      let type = 'track'
      let image =props.image
      let isrc = props.isrcID
      let album = props.album
      let href =props.href
      let externalUrl= props.externalUrl
      let previewUrl= props.previewUrl
      let uri= props.uri
      let from="playlist"

      let ajoutObjet={from:from,position:props.playlistUser.listMusic.length,name:nameTitle,artist:artist,image:image,spotifyId:idSpotify,type:type,isrcID:isrc,href:href,externalUrl:externalUrl,previewUrl:previewUrl,uri:uri,album:album}
    console.log(ajoutObjet)
      props.addSong(ajoutObjet)


    }
  
} 




let RightActions = (progress, dragX, onPress) => {

  const scale = dragX.interpolate({
    inputRange: [-100,0],
    outputRange: [1,0],
    extrapolate: 'clamp',
  });

    return (
      <View style={styles.rightAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Delete none
        
        </Animated.Text>
      </View>
    )
  
  

};
//console.log("recup position",props.playlistUser.listMusic.length)

const[selected, setSelected]=useState(false);

const swipeableRef = useRef(null);

 const closeSwipeable = (item) => {

let value =props.position-1
console.log("recup item",value)
props.deleteSong(value)
  swipeableRef.current.close();
}
 

      if(selected && props.from =="search" ){
        return (

          <Swipeable     
        ref={swipeableRef}
          renderRightActions={RightActions}
          onSwipeableRightOpen={() => {closeSwipeable(props.position);props.position}} 
          >
            <View style={styles.container}>
              <ListItem style={styles.actionText}
                
            
                linearGradientProps={{
                  colors: ['#FFF', '#43a047'],
                  start: { x: 1, y: 0.1 },
                  end: { x: -2, y: 0.1 },
                }}
                leftAvatar={{ source: { uri:props.image } }}
                title={props.name}
                subtitle={`${props.artist} -- ${props.album}`} 
                onPress={()=>{validPlaylist(props.spotifyId,props.type,props.index), setSelected(!selected)}} 
                checkmark ={<Icon
                  reverse
                  name='ios-checkmark'
                  type='ionicon'
                  color='#43a047'
                  size={18}
                  reverse={true}
         
                />}

              />
              
            </View>
            </Swipeable>
        )
      }else if((props.type=="playlist")){
        return (

          <Swipeable     
        ref={swipeableRef}
          renderRightActions={RightActions}
          onSwipeableRightOpen={() => {closeSwipeable(props.id);props.position}} 
          >
            <View style={styles.container}>
              <ListItem style={styles.actionText}
                leftAvatar={{ source: { uri:props.image } }}
                title={props.name}
                subtitle={props.artist} 
                onPress={()=>{validPlaylist(props.spotifyId,props.type,props.index), setSelected(!selected)}} 
              />
              
            </View>
            </Swipeable>
        )

      }
      
      
      else{
        return (
          <Swipeable     
          ref={swipeableRef}
          renderRightActions={RightActions}
         // onSwipeableRightOpen={props.onSwipeFromRight} 
          onSwipeableRightOpen={() => {closeSwipeable(props.id),props.onSwipeFromRight()}} 
          >
            <View style={styles.container}>
              <ListItem style={styles.actionText}
                leftAvatar={{ source: { uri:props.image } }}
                title={props.name}
                subtitle={`${props.artist} -- ${props.album}`} 
                onPress={()=>{validPlaylist(props.spotifyId,props.type,props.index), setSelected(!selected)}} 
              />
            </View>
            </Swipeable>
        )
      }

}


export const Separator = (props) => <View style={styles.separator} />;





function mapDispatchToProps(dispatch) {
  return {
    addplaylist: function(info) { 
      dispatch( {type: 'addInfoPlaylistSpotify',info }) 
    },
    addSong: function(info) { 
      dispatch( {type: 'addSong',info }) 
    },
    deleteSong: function(info) { 
      dispatch( {type: 'deleteSong',info }) 
    },
    
  }
}

function mapStateToProps(state) {
  return { playlistUser: state.PlaylistAdd }
}
  


export default connect(
  mapStateToProps, 
    mapDispatchToProps
)(SearchResultComponent);


//export default SearchResultComponent;