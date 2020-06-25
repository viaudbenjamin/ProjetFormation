import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { Badge } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {connect} from 'react-redux';

function Radio(props) {

  // BADGES
  var badgeList = props.musicType.map((type,i) => {
    return (
      <Badge
        key={i}
        style={styles.badge}
      >
        <Text style={styles.badgeText}>{type}</Text>
      </Badge>
    )
  })

  // CALLBACK & CARDS & Playlist 
  /*let urlLien = props.url[0]
  let conv = urlLien.toString() 
  urlLien était mis dans le () du onPress*/


  return (
    <TouchableOpacity onPress={() => {props.navigation.navigate(props.url), props.addRadioId(props.radioId)}}>
        <View style={styles.cardView}>
            <Card 
                containerStyle={styles.cardContainer}
                image={{uri: props.img}}
                imageProps={{style: styles.cardImage}}
                >
                <Text style={styles.cardText}>{props.radioName}</Text>
            </Card>
          <View style={styles.badgeContainer}>
            {badgeList}
          </View>
        </View>
    </TouchableOpacity>
  );
}

// STYLES
const styles = StyleSheet.create({
  badge: {
    backgroundColor:'#00838F',
    padding:hp('0%'),
    marginRight:wp('1%')
  },
  badgeText: {
    color:"white", 
    fontSize:hp('1.5%'), 
    marginLeft:wp('1%'), 
    marginRight:wp('1%'), 
    marginBottom:hp('0%'), 
    marginTop:hp('0%'), 
    padding:hp('0%')
  },
  cardView: {
    flex:1, 
    justifyContent:"center"
  },
  cardContainer: {
    width:wp('28%'), 
    height:hp('15%'), 
    marginLeft:wp('7%'), 
    marginRight:wp('0%'), 
    marginTop:hp('3%'), 
    marginBottom:hp('0%'), 
    borderRadius:hp('1%'), 
    elevation:hp('3%'), 
    shadowOffset:{
      width:wp('3%'), 
      height:hp('3%') 
    }, 
    shadowColor: "grey", 
    shadowOpacity: 1, 
    shadowRadius:hp('2%')
  },
  cardImage: {
    width:wp('28%'), 
    height:hp('10%')
  }, 
  cardText: {
    width:wp('28%'), 
    height:hp('5%'), 
    fontSize:hp('1.5%'),
    color:"#383838"
  }, 
  badgeContainer: {
    flex:1, 
    flexDirection:"row", 
    justifyContent:"flex-start", 
    marginTop:hp('1%'), 
    marginLeft:wp('7%'), 
    marginBottom:hp('4%')
  }
})

function mapDispatchToProps(dispatch) {
  return {
    addRadioId: function(radioId) {
        dispatch( {type: 'sendRadioId', radioId: radioId} )
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(Radio);