import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Antdesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import HomeStack from './HomeStack';
// import Home from '../screens/Home';
import About from '../screens/About';

import CustomDrawer from '../components/CustomDrawer';
import Post from '../screens/Post';

const HomeDrawer = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: "#7718ea",
                drawerActiveTintColor:"#fff",
                drawerInactiveTintColor:"#999999",
                drawerLabelStyle:{marginLeft:-20, fontSize:15},
                // headerShown:false,
                header: () => (
                <View style={styles.header}>

                </View>
                )
            }}
            >
            <Drawer.Screen name="Home" component={HomeStack} 
                options={{
                    drawerIcon : ({color}) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    ),
                    drawerStyle:{width:300},
                    headerShown:false
                }}
            />
            <Drawer.Screen name="About" component={About}
                options={{
                    drawerIcon : ({color}) => (
                        <View style={[styles.aboutIcon, {borderColor:color}]}>
                            <Entypo name="info" size={16} color={color} />
                        </View>
                    )
                }}
            />
            <Drawer.Screen name="Post" component={Post} 
                options={{
                    drawerIcon : ({color}) => (
                        <Antdesign name="upload" size={22} color={color} />
                    )
                }}
            />
        </Drawer.Navigator>
        )
}

export default HomeDrawer;

const styles = StyleSheet.create({
    header:{
        height:58,
        backgroundColor:"#0d0909"
    },
    aboutIcon:{
        height:25,
        width:25,
        borderRadius:12.5,
        borderWidth:2,
        alignItems:'center',
        justifyContent:'center',
        paddingRight:1
    }
})