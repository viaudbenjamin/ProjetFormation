import React from 'react';
import {ScrollView} from 'react-native';

import {Card, Badge, Text} from 'react-native-elements';

import {connect} from 'react-redux'

function GalleryScreen(props) {

var card = props.infoPhoto.map((photo,i)=>{
  var barbe = 'barbe'
  var sourir = 'joyeux !'
  var lunette = 'bigleux'
  if(photo.badge[i].barbe==false){
    barbe = 'rasé de pres'
  }
  if(photo.badge[i].lunette==false){
    lunette = 'exelente vue'
  }
  if(photo.badge[i].sourir==false){
    sourir = 'boudeur'
  }
    return(<Card key={i} image={{uri:photo.url[i].url}}>
      <Badge key={i} status="success" value={photo.badge[i].gender}/>
      <Badge key={i} status="success" value={photo.badge[i].age}/>
      <Badge key={i} status="success" value={barbe}/>
      <Badge key={i} status="success" value={sourir}/>
      <Badge key={i} status="success" value={lunette}/>
      <Badge key={i} status="success" value={"cheveux "+photo.badge[i].haircolor}/>
</Card>)
})





  return (
    <ScrollView style={{marginTop: 25}}>
        <Text h4 style={{textAlign: 'center'}}>John's Gallery</Text>
        {card}
    </ScrollView>
  );
}
function mapStateToProps(state){
    return {infoPhoto :[{url:state.urlImage,badge:state.attributeFacial}]}
  }

export default connect(
    mapStateToProps,
    null,
  )(GalleryScreen)