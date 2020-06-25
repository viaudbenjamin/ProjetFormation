import React from 'react';

import * as Font from 'expo-font';

export default async function police (){
    await Font.loadAsync({
    PermanentMarker: require("../../assets/fonts/PermanentMarker-Regular.ttf"),                         
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),                   
    });
    }