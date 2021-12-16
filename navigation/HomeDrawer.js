import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import Home from '../screens/Home';
import About from '../screens/About';

import CustomDrawer from '../components/CustomDrawer';

const HomeDrawer = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: "#aa18ea",
                drawerActiveTintColor:"#fff",
                drawerInactiveTintColor:"#000000",
                drawerLabelStyle:{marginLeft:-20, fontSize:15}
            }}
            >
            <Drawer.Screen name="Home" component={Home} 
                options={{
                    drawerIcon : ({color}) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen name="About" component={About}
                options={{
                    drawerIcon : ({color}) => (
                        <View style={{height:25, width:25, borderRadius:12.5 ,borderWidth:2, borderColor:color, alignItems:'center', justifyContent:'center', paddingRight:1}}>
                            <Entypo name="info" size={16} color={color} />
                        </View>
                    )
                }}
            />
        </Drawer.Navigator>
        )
}

export default HomeDrawer;