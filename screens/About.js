import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About =() => {
    return (
        <View style={styles.container}>
            <Text>About Screen</Text>
        </View>
    )
}

export default About;

const styles = StyleSheet.create({
    container :{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})