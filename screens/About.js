import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About =() => {
    return (
        <View style={styles.container}>
            <Text style={{fontSize:17, textAlign:'center'}} >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis saepe accusantium consequatur vero quis, architecto eius pariatur quia omnis iste ratione molestias laboriosam ea, quisquam officia ipsam ex dignissimos possimus?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et tenetur corporis quos sunt doloremque aperiam, eveniet ut ducimus pariatur odio perferendis a iusto sequi incidunt obcaecati repellat fugiat quisquam? Enim.
            </Text>
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