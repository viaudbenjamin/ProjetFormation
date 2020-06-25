import React from 'react';
import {connect} from 'react-redux';
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

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




export const Separator = () => <View style={styles.separator} />;

const LeftActions = (progress, dragX, onPress) => {

  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
      Add
      </Animated.Text>
    </View>
  );
};

const RightActions = (progress, dragX, onPress) => {

  const scale = dragX.interpolate({
    inputRange: [-100,0],
    outputRange: [1,0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.rightAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
      Delete
      </Animated.Text>
    </View>
  );
};

// Information:    
// props = {songId, text,name, url, onSwipeFromLeft, onSwipeFromRight, navigation, url}
const ListItemSwap = (props) => (
  <Swipeable
    renderLeftActions={LeftActions}
    onSwipeableLeftOpen={props.onSwipeFromLeft,props.id}
  
    renderRightActions={RightActions}
    onSwipeableRightOpen={props.onSwipeFromRight} 
  >

    <View style={styles.container}>

      <ListItem
      containerStyle={styles.listItem}
      titleStyle={styles.title}
      subtitleStyle={styles.subtitle}
      leftAvatar={{ source: { uri:props.url } }}
      title={props.name}
      subtitle={props.text}
      rightElement={<Icon type="entypo" color="#C8C8C8" name="dots-three-vertical" /> }
      rightIcon={<Icon type='font-awesome' name='heart' color= 'red'/> }
      onPress={ ()=> {props.playSong(props.songId); props.navigation.navigate(props.url) }}
      />

    </View>
  </Swipeable>
  
);


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('1%'),
    fontFamily: 'Roboto',
  },
  separator: {
    flex: hp('0.3%'),
    height: hp('0.1%'),
    backgroundColor: '#e4e4e4',
    marginLeft: hp('3%'),
  },
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: hp('0.3%'),
    
  },
  rightAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    flex: hp('0.3%'),
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: hp('7%'),
  },
  listItem: {
    height:hp('8%'),
    paddingTop:hp('0%'),
    paddingBottom:hp('0%')
  },
  title: {
    fontSize:hp('2.2%'),
    fontWeight: "bold",
    color:"#3a3a3a",
    fontFamily: 'RobotoBold'
  },
  subtitle: {
    fontSize:hp('2%'),
    color:"#3a3a3a",
    fontFamily: 'Roboto'
  }
});


function mapDispatchToProps(dispatch) {
  return {
    playSong: function(songId) {
        dispatch( {type: 'play', songId: songId} )
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(ListItemSwap);