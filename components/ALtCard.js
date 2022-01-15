import React from 'react';
import { Image, View, StyleSheet, Text, Dimensions, FlatList, ScrollView } from 'react-native';

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

    const images = imgs[item.images]

  return (
    // <SwiperFlatList style={styles.card}>
    //   <Text style={styles.body}>{item.body}</Text>
    // </SwiperFlatList>


    // <FlatList
    //   data={images}
    //   style={styles.card}
    //   horizontal={true}
    //   ListHeaderComponent={() =>
    //     <View style={{height:400, width:300}}>
    //       <Text style={styles.body}>{item.body}</Text>
    //     </View>
    //   }
    //   renderItem={({source}) => (
    //     <Image source={require("../assets/images/2.jpg")} style={{height:390, width:300}} />
    //   )}
    // />

    <ScrollView horizontal={false} style={styles.card} contentContainerStyle={styles.cardContent}>
      <View style={styles.card}>
        <Text style={styles.body} >{item.body}</Text>
      </View>
      {images.map(img => <Image key={img} source={require("../assets/images/2.jpg")} style={{height:390, width:300}} />)}
    </ScrollView>
  )
}

export default Card;

const styles= StyleSheet.create({
  cardImgStyles: {
    height:400,
    width:600,
    resizeMode:'contain',
  },
  card:{
    width:windowWidth*(12/13),
    height:430,
    borderWidth:0.5,
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
    marginHorizontal:windowWidth*(1/26),
    borderRadius:30
  },
  cardContent:{
    
  },
  body:{
    fontSize:28,
    fontWeight:'bold',
    color:"#dddddd"
  }
})