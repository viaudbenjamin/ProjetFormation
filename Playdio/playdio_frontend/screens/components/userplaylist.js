import React,{useState,useRef, useEffect} from 'react';
import { Avatar, Badge, Icon, withBadge, Card, ListItem } from 'react-native-elements'
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Switch
} from 'react-native';
import ip from '../../variables';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
// import { GestureHandler } from 'expo';
// const { Swipeable } = GestureHandler;

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {connect} from 'react-redux'

export const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: hp('1%'),
        paddingVertical: hp('1%'),
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
    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: hp('7%'),
    },
    listItem: {
        height: hp('8%'),
        paddingTop: hp('0%'),
        paddingBottom: hp('0%')
    },
    title: {
        fontSize: hp('2.2%'),
        fontWeight: "bold",
        color: "#3a3a3a"
    },
    subtitle: {
        fontSize: hp('2%'),
        color: "#3a3a3a"
    }
});


const RightActions = (progress, dragX, onPress) => {

    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
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






const ListItemSwap = ({ id, text,firstName, lastName, avatar,gradeType,namePlaylist,idUser,idDelete,playlistId,button,delUser},props) =>{

    const[selected, setSelected]=useState(false);
    const [colorIcon,setColorIcon]=useState()
    const [idDel, setIdDel] = useState();
    const [indice,setIndice] = useState()
    
useEffect(()=>{
    if(gradeType==='composer'){
        setColorIcon('#C0C0C0')
    }else{
        setColorIcon('#796221')
    }
},[id])
    async function changeGrade(idUser,namePlaylist){

        if(colorIcon==='#796221'){
            var requestBDD = await fetch(`${ip}/userAdmin`,{
            method:"POST",
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body:`idUser=${idUser}&namePlaylist=${namePlaylist}&gradeType=composer`
        })
        setColorIcon('#C0C0C0')
        }else if(colorIcon==='#C0C0C0'){
                var requestBDD = await fetch(`${ip}/userAdmin`,{
                method:"POST",
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body:`idUser=${idUser}&namePlaylist=${namePlaylist}&gradeType=public`
            })
            setColorIcon('#796221')
        }
    }

    const swipeableRef = useRef(null);
    const deleteUser =async (item,idDelete,namePlaylist) => {
        if(gradeType){
        var requestBDD = await fetch(`${ip}/deleteUser`,{
                method:"POST",
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body:`idDelete=${idDelete}&namePlaylist=${namePlaylist}`
            })
            /* swipeableRef.current.close(); */
            delUser(idDelete)
        }

}




const addUser = async function (idUser,playlistId){
    if(!gradeType){
        var requestBDD = await fetch(`${ip}/addUser`,{
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        method:"POST",
        body:`idUser=${idUser}&playlistId=${playlistId}`
    })
    }
    
}


/* const closeSwipeable = (item) => {
   console.log("evenement", item)
props.deleteSong(item)

  
} */
if(button==='search'&& selected){
    return(
        <View style={styles.container}>
            <ListItem
            linearGradientProps={{
                colors: ['#FFF', '#43a047'],
                start: { x: 1, y: 0.1 },
                end: { x: -2, y: 0.1 },
              }}
                onPress={()=>addUser(idUser,playlistId)}
                containerStyle={styles.listItem}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}
                leftAvatar={{ source: { uri: avatar } }}
                title={firstName+' '+lastName}
                subtitle={text}
            />
        </View>
)
}else if(button==='search'){
    return(
        <View style={styles.container}>
            <ListItem
                onPress={()=>{addUser(idUser,playlistId),setSelected(!selected)}}
                containerStyle={styles.listItem}
                titleStyle={styles.title}
                subtitleStyle={styles.subtitle}
                leftAvatar={{ source: { uri: avatar } }}
                title={firstName+' '+lastName}
                subtitle={text}
            />
        </View>
)
}else{
    
        return(
            <Swipeable     
                ref={swipeableRef}
                renderRightActions={RightActions}
                onSwipeableRightOpen={() => {deleteUser(id,idDelete,namePlaylist),setIdDel(id)}} 
                >
            <View style={styles.container}>
                <ListItem
                    containerStyle={styles.listItem}
                    titleStyle={styles.title}
                    subtitleStyle={styles.subtitle}
                    leftAvatar={{ source: { uri: avatar } }}
                    title={firstName+' '+lastName}
                    subtitle={text}
                    rightIcon={
                    <Icon
                        name="ios-disc"
                        size={40}
                        color={colorIcon}
                        type='ionicon'
                        onPress={()=>{changeGrade(idUser,namePlaylist)}}
                        />
                        }
                />
            </View>
        </Swipeable>
    )
}
    ;} 

    function mapDispatchToProps(dispatch) {
        return {
            delUser: function(user) { 
            dispatch( {type: 'delete', delUser: user }) 
          }
        }
      }
      
      
      export default connect(
        null,
        mapDispatchToProps
      )(ListItemSwap)
      
