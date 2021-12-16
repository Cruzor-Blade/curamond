import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView
            {...props}
            contentContainerStyle={{backgroundColor:"#8200d6"}}
            >   
            <View style={{backgroundColor:"#999999"}}>
                <DrawerItemList {...props} />
            </View>
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer;

const styles = StyleSheet.create({
    container : {
        flex: 1,
    }
})