import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, FlatList, SafeAreaView, AsyncStorage } from 'react-native'
import { Tooltip, Slider, Header, Avatar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Audio } from 'expo-av';
import ListItemSwap, { Separator } from './components/Song';
import {connect} from 'react-redux';
import ip from '../variables';
import Profile from './components/Profile';

// ----------------------------------------
// PLAY FUNCTION

function Play(props) {

  // INITIAL STATE

  // Raw playlist from Spotify
  const [playlist, setPlaylist] = useState([]);
  // Player
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  // Whenever the state of the Audio instance changes, isBuffering gets an update
  const [isBuffering, setIsBuffering] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);
  const [playbackInstancePosition, setPlaybackInstancePosition] = useState(null);
  const [playbackInstanceDuration, setPlaybackInstanceDuration] = useState(null);
  
  // FETCH PLAYLIST FROM DB

  useEffect( () =>{
      fetchPlaylist = async () => {
        
        var request = await fetch(`${ip}/radio-playlist`,{
          method:"POST",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`radioId=${props.radioId}`
        })
        var response = await request.json();
        
        var rawPlaylist = [];
        for(var i=0; i<response.tracks.length; i++) {
          rawPlaylist.push({
            id: response.tracks[i]._id, 
            name: response.tracks[i].name, 
            artist: response.tracks[i].artist, 
            album: response.tracks[i].album, 
            image: response.tracks[i].image,
            length: response.tracks[i].length,
            position: response.tracks[i].position,
            isrcID: response.tracks[i].isrcID,
            upcID: response.tracks[i].upcID,
            spotifyId: response.tracks[i].spotifyId,
            href: response.tracks[i].href,
            externalUrl: response.tracks[i].externalUrl,
            previewUrl: response.tracks[i].previewUrl,
            uri: response.tracks[i].uri,
          });
        }
        setPlaylist(rawPlaylist);
        setCurrentIndex(props.songId);
      }
      fetchPlaylist()  
  },[])


  // TOP & BOTTOM PLAYLISTS

  let playlistTop = [];
  for(var i=0; i<playlist.length; i++) {
    if(i < currentIndex) {
      playlistTop.push({id: i, name: playlist[i].name, text: playlist[i].artist, url: playlist[i].image});
    }
  }

  let playlistBottom = [];
  for(var i=0; i<playlist.length; i++) {
    if(i > currentIndex) {
      playlistBottom.push({id: i, name: playlist[i].name, text: playlist[i].artist, url: playlist[i].image});
    }
  }
  

  // CONFIGURATION OF AUDIO COMPONENT
 
  useEffect( () => {
    audioConfiguration = async () => {
      try {
        await Audio.setAudioModeAsync({ 
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: true
        })
        // loadAudio()
      } catch (e) {
        console.log(e)
      }  
    }
    audioConfiguration();
  }, []);


  // LOAD OF AUDIO FILE

  loadAudio = async () => {
    try {
      if(playlist.length > 0) {
        const playbackInstanceNew = new Audio.Sound()
        const source = {uri: playlist[currentIndex].previewUrl} 
        const status = {
          shouldPlay: isPlaying,
          volume: volume,
        }
        playbackInstanceNew.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
        await playbackInstanceNew.loadAsync(source, status, false)
        setPlaybackInstance(playbackInstanceNew)
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect( () => {
    loadAudio();
  }, [playlist]);


  // AUDIO STATUS UPDATE

  onPlaybackStatusUpdate = status => {
    if(status.isLoaded) {
      setIsBuffering(status.isBuffering)
      setPlaybackInstancePosition(status.positionMillis)
      setPlaybackInstanceDuration(status.durationMillis)
    }
  }

  // SEEK HANDLER

  onSeekSliderValueChange = value => {
    if (playbackInstance != null && !isSeeking) {
      setIsSeeking(true);
      setShouldPlayAtEndOfSeek(shouldPlay);
      playbackInstance.pauseAsync();
    }
  };

  onSeekSliderSlidingComplete = async value => {
    if (playbackInstance != null) {
      setIsSeeking(false);
      const seekPosition = value * playbackInstanceDuration;
      if (shouldPlayAtEndOfSeek) {
        playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  getSeekSliderPosition = () => {
    if (
      playbackInstance != null &&
      playbackInstancePosition != null &&
      playbackInstanceDuration != null
    ) {
      return (
        playbackInstancePosition /
        playbackInstanceDuration
      );
    }
    return 0;
  }
  

  // TIMESTAMP

  getMMSSFromMillis = (millis) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  }

  getTimestampLeft = () => {
    if (
      playbackInstance != null &&
      playbackInstancePosition != null
    ) {
      return `${getMMSSFromMillis(playbackInstancePosition)}`;
    }
    return "";
  }

  getTimestampRight = () => {
    if (
      playbackInstance != null &&
      playbackInstanceDuration != null
    ) {
      return `${getMMSSFromMillis(playbackInstanceDuration)}`;
    }
    return "";
  }

  
  // CONTROL HANDLERS

  handlePlayPause = async () => {
    if (playbackInstance) { 
      isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
      setIsPlaying(!isPlaying)
    }
  }
 
  handlePreviousTrack = async () => {
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      currentIndex > 0 ? (setCurrentIndex(currentIndex - 1)) : (setCurrentIndex(playlist.length - 1))
      loadAudio()
    }
  }
 
  handleNextTrack = async () => {
    if (playbackInstance) {
      await playbackInstance.unloadAsync()
      currentIndex < playlist.length - 1 ? (setCurrentIndex(currentIndex + 1)) : (setCurrentIndex(0))
      loadAudio()
    }
  }

  handleVolume = async ({value}) => {
    if (playbackInstance) {
      await playbackInstance.setVolumeAsync(value)
      setVolume(value)
    }
  }
  decimal = (x) => {
    return Number.parseFloat(x).toFixed(1);
  }


  // DISPLAY THE INFORMATION

  renderFileInfo = () => {
    return playbackInstance ? (
      <View style={styles.trackInfo}>
        <Text style={styles.artistName}>
          {playlist[currentIndex].artist}
        </Text>
        <Text style={styles.trackName}>
          {playlist[currentIndex].name}
        </Text>
      </View>
    ) : null
  }


  // ----------------------------------------
  // CALLBACK

  return (
    <View style={{flex:1}}>
    
      <Profile navigation={props.navigation}/>
      
      <View style={styles.playView}>

        <View style={styles.flatlistViewTop}>
          <FlatList 
            data={playlistTop}
            invertStickyHeaders={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ListItemSwap style={styles.flatList}
                {...item} 
                onSwipeFromLeft={() => {setIdAdd(item.id)}}
                onSwipeFromRight={() => {setIdDel(item.id)}}
                
              />
            )}
            ItemSeparatorComponent={() => <Separator />}
          />
        </View>
        
        <View style={styles.player}>

          {playlist.length > 0 ? (<Image style={styles.albumCover} source={{ uri: playlist[currentIndex].image }}/>) : (<View></View>)}
          
          {renderFileInfo()}

          <View style={styles.seekView}>
            
            <Text style={styles.seekTime}>{getTimestampLeft()}</Text>
            
            <Slider
              style={styles.seekSlider}
              value={getSeekSliderPosition()}
              onValueChange={() => onSeekSliderValueChange()}
              onSlidingComplete={() => onSeekSliderSlidingComplete()}
              thumbTintColor="#343434"
              thumbStyle={{width:wp('4%'), height:hp('2.5%')}}
            />
            
            <Text style={styles.seekTime}>{getTimestampRight()}</Text>
          </View>

          <View style={styles.controls}>
            
            <TouchableOpacity style={styles.control} onPress={() => handlePreviousTrack()}>
              <Image source={require('../assets/icons/backward.png')} style={styles.icons}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.control} onPress={() => handlePlayPause()}>
              {isPlaying ? (<Image source={require('../assets/icons/hold.png')} style={styles.icons}/>) : (<Image source={require('../assets/icons/play.png')} style={styles.icons}/>)}
            </TouchableOpacity>
            <TouchableOpacity style={styles.control} onPress={() => handleNextTrack()}>
              <Image source={require('../assets/icons/forward.png')} style={styles.icons}/>
            </TouchableOpacity>
            <Tooltip width={wp('40%')} height={hp('15%')} backgroundColor='#E5E4E4' popover={<View><Slider value={volume} minimumValue={0} maximumValue={1} onValueChange={value => handleVolume({value})}/><Text>volume: {decimal(volume)*10}</Text></View>}>
              <Image source={require('../assets/icons/volume.png')} style={[styles.icons, styles.control]}/>
            </Tooltip>
            
          </View>

        </View>

        <View style={styles.flatlistViewBottom}>
          <FlatList 
            data={playlistBottom}
            keyExtractor={item => item.id}
            renderItem={({ item}) => (
              <ListItemSwap style={styles.flatList}
                {...item} 
                onSwipeFromLeft={() => {alert('swiped from left!');setIdAdd(item.id)}}
                onSwipeFromRight={() => {alert('pressed right!');setIdDel(item.id)}}
                
              />
            )}
            ItemSeparatorComponent={() => <Separator />}
          />
        </View>

      </View>
    </View>
    
  )
  
}


// ----------------------------------------
// STYLES

const styles = StyleSheet.create({
  playView: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  header: {
    height:hp('14%')
  },
  player: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#E5E4E4',
    width:wp('100%'),
    height:hp('35%')
  },
  albumCover: {
    width:wp('80%'),
    height:hp('12%'),
    marginTop:hp('2%')
  },
  trackInfo: {
    width:wp('60%'),
    justifyContent:'flex-start',
    marginTop:hp('1%')
  },
  artistName: {
    flexWrap:'wrap',
    fontSize:hp('2%'),
    fontWeight:"bold",
    color: '#383838'
  },
  trackName: {
    flexWrap:'wrap',
    fontSize:hp('2%'),
    color: '#383838'
  },
  controls: {
    flexDirection:'row'
  },
  control: {
    marginTop:wp('4%'),
    marginBottom:wp('5%'),
    marginLeft:wp('6%'),
    marginRight:wp('6%'),
  },
  icons: {
    width:wp('9.1%'), 
    height:hp('5%')
  },
  seekView: {
    flexDirection:'row'
  },
  seekTime: {
    fontSize:hp('2%'),
    color:"#8F8F8F",
    marginLeft:wp('3%'),
    marginRight:wp('3%')
  },
  seekSlider: {
    width:wp('60%'), 
    height:hp('5%')
  },
  flatList: {
    marginHorizontal: 0,
    marginVertical: 0,
    paddingVertical: 0,
  },
  flatlistViewTop: {
    height:hp('10%'),
    width:wp('100%')
  },
  flatlistViewBottom: {
    width:wp('100%'),
    height:hp('33%')
  }

})

function mapStateToProps(state) {
  return { songId: state.songId, radioId: state.radioId }
}
  
export default connect(
  mapStateToProps,
  null
)(Play);