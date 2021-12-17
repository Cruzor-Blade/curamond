import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Card from '../components/Card';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const windowWidth = Dimensions.get("window").width;

const Home = ({navigation}) => {
  const numbers = [0, 1, 2, 3, 4, 5]
  return (
    <View style={styles.container}>
      <>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{top:0}}
          contentContainerStyle={styles.flatList}
          data={numbers}
          keyExtractor={item => item}
          renderItem={({item}) => <Card number={item} />}
        />
      </>
      <View style={styles.menuTab}>
        {/* <AntDesign name="star" size={26} color="#fff" /> */}
        <AntDesign name="staro" size={26} color="#fff" />
        <Entypo name="chat" size={26} color="#fff" />
        <AntDesign name="menu-fold" size={26} color="#fff" onPress={() => navigation.openDrawer()} />
      </View>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    // justifyContent:'space-between',
    borderWidth:1,
  },
  flatList:{
    alignItems:'center'
  },
  menuTab:{
      height:55,
      width: windowWidth*2/3,
      marginBottom:-1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      backgroundColor:'#0f0909',
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      borderBottomLeftRadius:5,
      borderBottomRightRadius:5
  }
})