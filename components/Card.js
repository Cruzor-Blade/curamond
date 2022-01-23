import React from 'react';
import { Image, View, StyleSheet, Text, Dimensions, FlatList, ImageStore } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const windowWidth = Dimensions.get("window").width;


const Card = ({item}) => {


  return (
    <View style={styles.card}>
          <Text selectable={true} style={styles.body}>{item.body}</Text>
        <ScrollView pagingEnabled={true}>        
          <View style={styles.bodyCard} >
            {item.images.map (image =>
              <Image source={{uri:image.url}} style={[{width:windowWidth*11.7/13, height:((windowWidth*11.7/13)/image.ImgDimensions.width)*image.ImgDimensions.height}, styles.images]} />
              )}
          </View>
        </ScrollView>
    </View>
   )
}

export default Card;

const styles = StyleSheet.create({
  card:{
    width:windowWidth*(25/26),
    maxHeight:450,
    borderWidth:1,
    borderColor:"#333333",
    elevation:8,
    shadowOpacity:0.8,
    shadowOffset:{
      width:2,
      height:4
    },
    backgroundColor:'#1f1d26',
    paddingHorizontal:10,
    paddingVertical:10,
    marginHorizontal:windowWidth*(1/52),
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center'
  },
  body:{
    // fontSize:28,
    fontSize:20,
    fontWeight:'bold',
    color:"#dddddd",
    textAlign:'center',
    marginTop:8
  },
  bodyCard:{
    minHeight:350,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
  },
  images: {
    borderRadius:10,
  }
})