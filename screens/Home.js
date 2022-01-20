import React, { useEffect, useState } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import Card from '../components/Card';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export const windowWidth = Dimensions.get("window").width;

const Home = ({navigation}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firestore()
    .collection('posts')
    .get()
    .then(snapshot => {
      var receivedPosts = [];
      snapshot.forEach(document =>{
        const {comments, body, images, topic} = document.data();
        console.table(receivedPosts)
        receivedPosts.push({id:document.id ,comments, body, images, topic});
      })
      console.log(receivedPosts)
      setPosts(receivedPosts);
    })
  }, [])
  const curiosities = [
    {
      id:1,
      body:`Tom et Jerry s'appelaient à l'origine Jasper et Jinx dans leur premier dessin animé "Puss Gets the Boot"`,
      images:[1]
    },
    {
      id:2,
      body:`80% des gens se sont retrouvés à un moment donné à chanter inconsciemment une chanson qu'ils détestent.`,
      images:[2]
    },
    {
      id:3,
      body:`De nouvelles recherches ont montré que les personnes seules ont des compétences sociales supérieures par rapport aux personnes qui ne sont pas seules.`,
      images:[3]
    },
    {
      id:4,
      body:`Un Rubik's Cube a 43 252 003 274 489 856 000 configurations possibles.`,
      images:[4]
    },
    {
      id:5,
      body:`Votre cerveau continue de se développer jusqu'à la quarantaine`,
      images:[5]
    },
    {
      id:6,
      body:`Le roi Abdallah d'Arabie Saoudite a été choqué lorsque la reine Elizabeth l'a conduit dans son domaine, car les femmes ne peuvent pas conduire dans son pays.`,
      images:[6]
    },
    {
      id:7,
      body:`Soyez une version de premier ordre de vous même, pas une version de second ordre de quelqu'un d'autre.`,
      images:[7]
    }
  ]
  return (
    <ImageBackground source={require("../assets/background.jpg")} style={styles.container}>
        <FlatList
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Card item={item} />}
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