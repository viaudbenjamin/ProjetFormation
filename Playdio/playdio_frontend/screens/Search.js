import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Badge, Icon, withBadge,Card,List,ListItem, Image, Header } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function App() {
  return (
    <View>
       <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            rightComponent={<Avatar
                rounded 
                source={{uri: 'https://randomuser.me/api/portraits/men/41.jpg'}}
                size="small"
                />}
            containerStyle={{
            backgroundColor: 'white', 
            height:hp('10%')
            }}
        />
      <Text>welcome search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});