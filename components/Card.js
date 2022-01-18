import React from 'react';
import { Image, View, StyleSheet, Text, Dimensions, FlatList, ImageStore } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { SwiperFlatList } from 'react-native-swiper-flatlist';

const windowWidth = Dimensions.get("window").width;

const Card = ({item}) => {
  const imgs = {
    1:[require("../assets/images/1.png")],
    2:[require("../assets/images/2.jpg")],
    3:[require("../assets/images/3.jpg")],
    4:[require("../assets/images/4.png")],
    5:[require("../assets/images/5.png")],
    6:[require("../assets/images/6-1.jpg"), require("../assets/images/6-2.jpg")],
    7:[require("../assets/images/7.jpeg")],
    };

    const images = imgs[item.images];
    console.log("Images, ", images)

  return (
   <View style={styles.card}>
      <ScrollView pagingEnabled={true}>
        <View style={styles.bodyCard} ><Text style={styles.body}>{item.body}</Text></View>
        {images.map (image => <Image source={image} style={{width:windowWidth*11/13, maxHeight:410, resizeMode:'contain'}} />)}
      </ScrollView>
      {/* <FlatList
        ListHeaderComponent={() => <View style={styles.bodyCard} ><Text style={styles.body}>{item.body}</Text></View>}
        data={images}
        pagingEnabled={true}
        keyExtractor={img => images.indexOf(img)}
        renderItem={({image}) => {
          console.log(image)
          return (
          <Image source={image} style={{width:windowWidth*11/13, maxHeight:410, resizeMode:'contain'}} />
        )}}
      
      /> */}
   </View>
  )
}

export default Card;

const styles = StyleSheet.create({
  card:{
    width:windowWidth*(25/26),
    maxHeight:430,
    borderWidth:1,
    borderColor:"#333333",
    elevation:8,
    shadowOpacity:0.8,
    shadowOffset:{
      width:2,
      height:4
    },
    backgroundColor:'#0f0602',
    paddingHorizontal:15,
    paddingVertical:20,
    marginHorizontal:windowWidth*(1/52),
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center'
  },
  body:{
    fontSize:28,
    fontWeight:'bold',
    color:"#dddddd",
    textAlign:'center'
  },
  bodyCard:{
    height:410,
    width:'99%',
    alignItems:'center',
    justifyContent:'center',
  }
})