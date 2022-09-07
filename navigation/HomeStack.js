import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../context/AppContext';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import CommentsScreen from '../screens/CommentsScreen';

const Stack = createStackNavigator();

export default HomeStack = () => {
    const {currentTopic, numStars} = useContext(AppContext);
    console.log("Current Topic:", currentTopic);
    console.log("Number of stars:", numStars);
    return (
        <Stack.Navigator
        initialRouteName='HomeStack'
        screenOptions={{
            detachPreviousScreen:true,
            presentation:'transparentModal',
            // headerShown:false,
            header: () => (
                <View style={styles.header}>
                    <Text style={{fontSize:20, color:"#fff", fontStyle:'italic'}} >{currentTopic}</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}} >
                        <AntDesign color="#eeeeee" name="star" size={21} />
                        <Text style={{fontSize:18, color:"#fff", marginLeft:3}} >{numStars}</Text>
                    </View>
                </View>
                )
        }}
        >
            <Stack.Screen name="HomeStack" component={Home} />
            <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
        </Stack.Navigator>
    )
}

const styles= StyleSheet.create({
    header: {
        height:58,
        backgroundColor:"#0d0909",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:15
}
})