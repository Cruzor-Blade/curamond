import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Card = ({number}) => {
  const cards = [
    require("../assets/cards/card1.png"),
    require("../assets/cards/card2.png"),
    require("../assets/cards/card3.png"),
    require("../assets/cards/card4.png"),
    require("../assets/cards/card5.png"),
    require("../assets/cards/card6.png"),
  ];

  return (
    <View>
      <Image style={styles.cardImgStyles} source={cards[number]} />
    </View>
  )
}

export default Card;

const styles= StyleSheet.create({
  cardImgStyles: {
    height:400,
    width:600,
    resizeMode:'contain',
  }
})