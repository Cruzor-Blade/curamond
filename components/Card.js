import React from 'react';
import { Image, StyleSheet } from 'react-native';

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
    <Image style={styles.cardImgStyles} source={cards[number]} />
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