import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Card from '../components/Card';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export const windowWidth = Dimensions.get("window").width;

const Home = ({navigation}) => {
  const numbers = [0, 1, 2, 3, 4, 5]
  return (
    <ImageBackground source={require("../assets/background.jpg")} style={styles.container}>
        <SwiperFlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={numbers}
          keyExtractor={item => item}
          renderItem={({item}) => <Card number={item} />}
        />
      <View style={styles.menuTab}>
        {/* <AntDesign style={{padding:3}} name="star" size={26} color="#fff" /> */}
        <AntDesign style={{padding:3}} name="staro" size={26} color="#fff" />
        <Entypo style={{padding:3}} name="chat" size={26} color="#fff" />
        <AntDesign style={{padding:3}} name="downcircleo" size={26} color="#fff" />
        {/* <AntDesign style={{padding:3}} name="totop" size={26} color="#fff" /> */}
        <AntDesign style={{padding:3}} name="menu-fold" size={26} color="#fff" onPress={() => navigation.openDrawer()} />
      </View>
    </ImageBackground>
  )
}

export default Home;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    resizeMode:'cover',
    width:windowWidth+1,
  
  },
  flatList:{
    alignItems:'center',
  },
  menuTab:{
      height:55,
      width: windowWidth*3/4,
      marginBottom:-1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      backgroundColor:'#0f0909',
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      borderBottomLeftRadius:5,
      borderBottomRightRadius:5,
      resizeMode:'cover',
  }
})