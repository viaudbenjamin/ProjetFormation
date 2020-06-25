import React from 'react';
import { Avatar, Badge, Icon, withBadge,Card, ListItem, Image } from 'react-native-elements'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: hp('3%'),
    paddingVertical: hp('1%'),
    borderWidth: hp('0.1%'),
    borderColor: "#C8C8C8",
    height:hp('12%')
  },
  text: {
    color: '#4a4a4a',
    fontSize: hp('5%'),
  },
  separator: {
    flex: hp('0,3%'),
    height: hp('0,3%'),
    backgroundColor: '#e4e4e4',
    marginLeft: hp('3%'),
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: hp('6,5%'),
  },
  listItem: {
    height:hp('10%'),
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

export const Separator = () => <View style={styles.separator} />;



const Track = ({id, text,name, url}) => (
    <View style={styles.container}>

      <ListItem
        containerStyle={styles.listItem}
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
        leftElement={<Image
        style={{width:wp('16%'), height:hp('8%'), marginRight:wp('5%')}}
        source={{uri: 'https://img.cdandlp.com/2019/01/imgL/119431391.jpg'}}
      />}
      title='Stevie Wonder'
      subtitle='Superstition'
      rightIcon={{ type: 'font-awesome', name: 'play', color: 'black' }}
     
      />

    </View>
  
);

export default Track;