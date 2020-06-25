import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,SafeAreaView, ScrollView ,Switch,FlatList} from 'react-native';
import { ListItem,Button,ButtonGroup,Avatar } from 'react-native-elements'
import {connect} from 'react-redux';
import SearchComponent, { Separator } from './components/SearchResult';
import Profile from './components/Profile';
import ip from '../variables';

import police from '../screens/components/font';

import  {TextField,  FilledTextField, OutlinedTextField,}  from 'react-native-material-textfield';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function CreateRadioEmpty(props) {

const [radioName, setRadioName] = useState("hi")
const [isPrivate, setIsPrivate] = useState(false) ; 
const [isPlayingOnly, setIsPlayingOnly] = useState(false) ; 
const [send, setSender] = useState(false);

 /*  ------------------------------- Recuperation playlist   ------------------------------- */   

const[listMusicFromBack,setListSongFromBack]=useState()


let idSpotify = props.playlistUser.infoUser.idSpotify

const [refresh,setRefresh]=useState(false)
    // requete BDD
  

    useEffect(()=>{

      //Playlist courte
      //let idplaylistSpotify =props.playlistUser.idSpotify

      // playlistLongue
      let idplaylistSpotify =props.playlistUser.idSpotifPlaylist
      let userIdSpotify = props.playlistUser.infoUser.idSpotify
      async function recupDonnée(){
        var requestBDD = await fetch(`${ip}/playlist-item`,{
          method:"POST",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`idPlayslistSpotifyFromFront=${idplaylistSpotify}&idSpotify=${userIdSpotify}`
        })
        var reponse = await requestBDD.json()
        setListSongFromBack(reponse)
       
      }
     
      recupDonnée()
     
    },[])

const [listResultSpotify,setResultSpotify]=useState();


useEffect(()=>{
  let infoListSong = listMusicFromBack // check si présente 
    let emplacement =3
    
  if(infoListSong){
    let recupInfo = listMusicFromBack.response.items
        let mapArrayMusic = recupInfo.map((item,i)=>{
                    
          let nameTitle = item.track.name
          let artist = item.track.artists[0].name
          let idSpotify =item.track.id
          let type = item.track.type
          let image =item.track.album.images[0].url
          let isrc = item.track.external_ids.isrc

          let from = "playlistUser"

          let album = item.track.album.name
          let href =item.track.href
          let externalUrl= item.track.external_urls.spotify
          let previewUrl= item.track.preview_url
          let uri= item.track.uri



          props.addSong({position:props.playlistUser.listMusic.length,name:nameTitle,artist:artist,image:image,spotifyId:idSpotify,type:type,isrcID:isrc,from:from,href:href,externalUrl:externalUrl,previewUrl:previewUrl,uri:uri,album:album})
        })
    }else {console.log("recup ko")}
  },[listMusicFromBack])    


 /*  ------------------------------- Recuperation Recherche   ------------------------------- */   
//  Resquest


// setter recherche
const[search,setSearch]=useState("")
const [searchJSON,setSearchJson]=useState()

useEffect(()=>{
 
 let searchText = search
  
  async function recupDonnée(){
    let userIdSpotify = props.playlistUser.infoUser.idSpotify
    var requestBDD = await fetch(`${ip}/user-search`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`search_term=${searchText}&userId=${userIdSpotify}`
    })
    var reponse = await requestBDD.json()
     setSearchJson(reponse)
   
  }
  recupDonnée()
},[search])

/*  add list music result from spotify to array  */

let listOfResult=[]
const [arrayResult,setArrayResult] =useState()
console.log("recup position from",props.playlistUser.listMusic.length)
useEffect(()=>{
  let info = searchJSON
  
  if(info){ // attente de la reception du JSON
   
     let infoResultArray = searchJSON.response.tracks.items
                /* recuperation des info json */
            /* recuperation des info json */
            let mapArrayResult = infoResultArray.map((item,i)=>{

              let nameTitle = item.name
              let artist = item.artists[0].name
              let spotifyId =item.id
              let type = 'track'
              let image =item.album.images[0].url
              let isrc = item.external_ids.isrc
              let from = "search"

              let album = item.album.name
              let href =item.href
              let externalUrl= item.external_urls.spotify
              let previewUrl= item.preview_url
              let uri= item.uri
    

      listOfResult.push({position:props.playlistUser.listMusic.length,name:nameTitle,artist:artist,image:image,spotifyId:spotifyId,type:type,isrcID:isrc,from:from,href:href,externalUrl:externalUrl,previewUrl:previewUrl,uri:uri,album:album})
      
      setArrayResult(listOfResult)
             
      })
  }else {
      console.log("ko")
  }
},[searchJSON])

// Setter boutton
const buttons = ['My Playlist', 'Search on Spotify']
const [indexButton,setIndex]=useState(0)
 /* Affichage dynamique via button en fonction de l'ecran*/


 const [listToSearch,SetListToSearch] =useState();
    useEffect(() => {
     
      if(indexButton==0 || indexButton==3 ){
          SetListToSearch(props.playlistUser.listMusic)
          setIndex(0)
      }

      else{
       
        SetListToSearch(arrayResult)
      }
    });

/* let des fonctions  */


let touch =()=>{
  
}

const [arrayResultTest,setArrayResultTest] =useState(false)



let swypeValue =(item)=>{

  //  props.deleteSong(item)
  setIndex(3)


}


const [searchJSONResultSend,setSearchJSONResultSend]=useState()

let validPlaylist =async ()=>{

  //props.playlistUser

  let result = JSON.stringify(props.playlistUser);

  let resultEncoded = encodeURIComponent(result)
  var requestBDD = await fetch(`${ip}/radio-create`,{
    method:'post',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body:`resultat=${resultEncoded}`
  })


  var reponse = await requestBDD.json()
  console.log("response du back", reponse)

  setSearchJSONResultSend(reponse)
  props.addUrl(reponse)


props.navigation.navigate('CreateRadioValidation')



}


  return (

<View style={styles.container}>
  
  <Profile navigation={props.navigation}/>

    <View style={styles.form}>
                {/*  "#c2185b" */}
                    <View style={styles.input}> 
                       <Text style={styles.categoryTitle}> Add your favorite song</Text>
                    
                    <TextField
                        label={'Search a song'}
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
                   {/* liste des musiques */}
              
    {/* liste des musiques */}
            <FlatList
              //  data={props.playlistUser.listMusic}
                data={listToSearch}
              // keyExtractor={item => item.id}
              keyExtractor = { (item, index) => index.toString() } 
              renderItem={({ item}) => (
                <SearchComponent
                    {...item}

                   // onSwipeFromRight={() => {swypeValue(item.id);alert('swiped from left!')}}
                   onSwipeFromRight={() => {swypeValue(item.index)}}
                    onPress={touch(item.index)} 

                    navigation={props.navigation}
                  action = {"addtrack"}
                />
              )}
              ItemSeparatorComponent={() => <Separator />}
              />    

                        <View style={styles.button}>

                        <Button 
                            title="Save your Song"
                            onPress={()=>validPlaylist()}
                            tintColor="#26a69a"
                            buttonStyle={{
                                backgroundColor:"#00838F",
                            }}
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


function mapDispatchToProps(dispatch) {
  return {
    addSong: function(info) { 
      dispatch( {type: 'addSong',info }) 
    },
    deleteSong: function(info) { 
      dispatch( {type: 'deleteSong',info }) 
    },
    addUrl:function(info) { 
      dispatch( {type: 'addUrl',info }) 
    },
    
  }
}

function mapStateToProps(state) {
  return { playlistUser: state.PlaylistAdd }
}
  


export default connect(
  mapStateToProps, 
    mapDispatchToProps
  )(CreateRadioEmpty);

// export default CreateRadio1
