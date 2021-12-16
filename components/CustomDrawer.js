import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';


const CustomDrawer = (props) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView
            {...props}
            // contentContainerStyle={{backgroundColor:"rgba(3,3,3,0.9)"}}
            >   
                <View style={styles.header}>
                    <Image style={styles.imgHeader} source={require("../assets/icon.png")} />
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity style={{paddingVertical:5}}>
                <View style={styles.bottomDrawer}>
                    <Ionicons name="share-social-outline" size={22} style={{color:"#fff", marginRight:10}} />
                    <Text style={{fontSize:15, color:"#fff"}}>Share with A Friend</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CustomDrawer;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:"rgba(3,3,3,0.9)",
    },
    header:{
        backgroundColor:"rgba(3,3,3,0.5)",
        padding:20,
        marginBottom:3
    },
    imgHeader: {
        height:60,
        width:60,
        opacity:0.85
    },
    bottomDrawer:{
        padding:15,
        borderTopWidth:1,
        borderTopColor:"#ccc",
        flexDirection:'row',
        alignItems:'center',
        marginTop:4
    }
})