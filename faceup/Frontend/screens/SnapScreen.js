import React, { useState, useEffect, useRef} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Camera } from 'expo-camera';

import { withNavigationFocus } from 'react-navigation';

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';

import {Button, Overlay} from 'react-native-elements';

import {connect} from 'react-redux'
function SnapScreen(props) {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.torch);
  
  var camera = useRef(null);
 
  const [visible, setVisible] = useState(false);

  useEffect(() => {  
    (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })();
  }, []);
  
  var cameraDisplay;
  if(hasPermission && props.isFocused){
    cameraDisplay = <Camera 
      style={{ flex: 1 }}
      type={type}
      flashMode={flash}
      ref={ref => (camera = ref)}
    >
       <View    
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            style={{
            
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
            }}
          >
           <IconIonic
            name="md-reverse-camera"
            size={20}
            color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity>

           <TouchableOpacity
            style={{
            
                alignSelf: 'flex-end',
                alignItems: 'center',
            }}
            onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.torch
                    ? Camera.Constants.FlashMode.off
                    : Camera.Constants.FlashMode.torch
                );
              }}
            >
            <IconFontAwesome
            name="flash"
            size={20}
            color="#ffffff"
            /><Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flash </Text>
           </TouchableOpacity>

        </View>
    </Camera>
  } else {
    cameraDisplay = <View style={{ flex: 1 }}></View>
  }
  async function savePhoto(info){
    var data = new FormData()
    data.append('photo',{
      uri:info.uri,
      type: 'image/jpeg',
      name: 'user_avatar.jpg',
    })
    var saveBackend= await fetch("http://192.168.1.43:3000/upload",{
      method: "POST",
      body:data
    })
    var resultatSave = await saveBackend.json();
    
    if(resultatSave.result==true){
      setVisible(false);

    }
    props.saveUrl(resultatSave.image.url)
    props.saveAttributeFacial(resultatSave.optionVisage)

  }

  return (
    <View style={{flex: 1}}>
        <Overlay isVisible={visible}  width="auto" height="auto">
            <Text>Loading</Text>
        </Overlay>
        
        {cameraDisplay}
        <Button
            icon={
                <IconFontAwesome
                name="save"
                size={20}
                color="#ffffff"
                />
            } 
            title="Snap"
            buttonStyle={{backgroundColor: "#009788"}}
            type="solid"
            onPress={async () => {
                setVisible(true);
                if (camera) {
                    let photo = await camera.takePictureAsync({quality : 0.7});
                    
                    savePhoto(photo)
                }
            }}
        />

    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    saveUrl: function(url) { 
      dispatch( {type: 'saveURL', url: url }) 
    },
    saveAttributeFacial:function(AttributeFacial){
      dispatch({type:'saveAttributeFacial',age:AttributeFacial.age,barbe:AttributeFacial.barbe,gender:AttributeFacial.gender,haircolor:AttributeFacial.hairColor,lunette:AttributeFacial.lunette,sourir:AttributeFacial.sourir})
    }
  }
}



export default connect(
  null,
  mapDispatchToProps
)(withNavigationFocus(SnapScreen))







