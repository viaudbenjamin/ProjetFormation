import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage, TouchableOpacity} from 'react-native';
import { Avatar, Badge, Icon, withBadge,Card,List,ListItem, Image, Header,Overlay } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppLoading } from 'expo';
import { useFonts} from '@use-expo/font'


export default function Profile(props) {

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
      setVisible(!visible);
    };

    let [fontsLoaded] = useFonts({
        PermanentMarker: require("../../assets/fonts/PermanentMarker-Regular.ttf"),
        Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
        RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
      });
    if (!fontsLoaded) {
        return <AppLoading />;
    } else { 
        return(
            <Header
                rightComponent={<Avatar
                    rounded 
                    source={{uri: 'https://randomuser.me/api/portraits/men/41.jpg'}}
                    size="small"
                    onPress={() => toggleOverlay()}
                    />}
                containerStyle={{
                backgroundColor: 'white', 
                height:hp('10%')
                }}
            >
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Connect")}>
                        <Text style={{color:"#383838", fontSize:hp('3%'), width:wp('75%'), marginLeft:wp('7%'), fontFamily: 'PermanentMarker'}}>Deconnexion</Text>
                    </TouchableOpacity>
                </Overlay>
            </Header>
        )
    }

}