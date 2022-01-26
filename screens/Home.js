import React, { useEffect, useState, useRef } from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import Card from '../components/Card';


import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

export const windowWidth = Dimensions.get("window").width;

const Home = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [postShot, setPostShot] = useState(null);

  const viewShotRef = useRef(null);
  const viewConfig = useRef ({viewAreaCoveragePercentThreshold: 50}).current
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].key)
      }
  ).current

      const shareCapture = async (imgURI) => {
        const shareOptions = {
          message:"This is a text message",
          url: imgURI
        }

        try {
          const shareResponse = await Share.open(shareOptions)
        } catch (e) {
          console.log(e)
        }
      }

  const captureViewShot = async () => {
    try {
      const imageURI = await viewShotRef.current.capture()
      console.log(imageURI)
      setPostShot(imageURI)
      shareCapture(imageURI)
    } catch (e) {
      console.log(e)
    }
  }

  console.log("Index: ", currentIndex)
  useEffect(() => {
    firestore()
    .collection('posts')
    .get()
    .then(snapshot => {
      var receivedPosts = [];
      snapshot.forEach(document =>{
        const {comments, body, images, topic} = document.data();
        console.table(receivedPosts)
        receivedPosts.push({id:document.id ,comments, body: body.fr, images, topic});
      })
      console.log(receivedPosts)
      setPosts(receivedPosts);
    })
  }, [])


  return (
    <ImageBackground source={require("../assets/background.jpg")} style={styles.container}>
        <FlatList
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({item}) => item.id == currentIndex ? 
          <ViewShot ref={viewShotRef} options={{format:'jpg', quality:0.8}} ><Card item={item} /></ViewShot>  :  <Card item={item} />}
      
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={viewableItemsChanged}
        />


      <View style={styles.menuTab}>
        {/* <AntDesign style={{padding:3}} name="star" size={26} color="#fff" /> */}
        <AntDesign style={{padding:3}} name="staro" size={26} color="#fff" />
        <Entypo style={{padding:3}} name="chat" size={26} color="#fff" onPress={() => navigation.navigate('CommentsScreen', {postId:currentIndex})} />
        <Foundation style={{padding:3}} name="share" size={26} color="#fff" onPress={captureViewShot} />
        {/* <AntDesign style={{padding:3}} name="downcircleo" size={26} color="#fff" /> */}
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