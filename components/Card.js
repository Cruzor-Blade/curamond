import React from 'react';
import { Image, View, StyleSheet, Text, Dimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;

const Card = ({number}) => {
  const cards = [
    require("../assets/cards/card1.png"),
    require("../assets/cards/card2.png"),
    require("../assets/cards/card3.png"),
    require("../assets/cards/card4.png"),
    require("../assets/cards/card5.png"),
    require("../assets/cards/card6.png"),
  ];

  const curiosities = [
    {body:`Tom et Jerry s'appelaient à l'origine Jasper et Jinx dans leur premier dessin animé "Puss Gets the Boot"`},
    {body:`80% des gens se sont retrouvés à un moment donné à chanter inconsciemment une chanson qu'ils détestent.`},
    {body:`De nouvelles recherches ont montré que les personnes seules ont des compétences sociales supérieures par rapport aux personnes qui ne sont pas seules.`},
    {body:`Un Rubik's Cube a 43 252 003 274 489 856 000 configurations possibles.`},
    {body:`Votre cerveau continue de se développer jusqu'à la quarantaine`},
    {body:`Le roi Abdallah d'Arabie Saoudite a été choqué lorsque la reine Elizabeth l'a conduit dans son domaine, car les femmes ne peuvent pas conduire dans son pays.`},
    {body:`Soyez une version de premier ordre de vous même, pas une version de second ordre de quelqu'un d'autre.`}
  ]

  return (
    <View style={styles.card}>
      {/* <Image style={styles.cardImgStyles} source={cards[number]} /> */}
      <Text style={styles.body}>{curiosities[number].body}</Text>
    </View>
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
  body:{
    fontSize:28,
    fontWeight:'bold',
    color:"#dddddd"
  }
})