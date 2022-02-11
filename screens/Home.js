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
import AsyncStorage from '@react-native-async-storage/async-storage';

export const windowWidth = Dimensions.get("window").width;

const Home = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showAd, setShowAd] = useState(false);
  const [shotLoading, setShotLoading] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [lastIndex, setLastIndex] = useState(null);

  const viewShotRef = useRef(null);
  const viewConfig = useRef ({viewAreaCoveragePercentThreshold: 50}).current
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].key);
    }
  ).current;

  const currentPostRef = firestore().collection('posts').doc(currentIndex);
  console.log("CurrentIndex", currentIndex)

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
    if (currentIndex) {
      setShowAd(true);
      setShotLoading(true);
      try {
        const imageURI = await viewShotRef.current.capture();
         setShowAd(false);
        await shareCapture(imageURI);
        setShotLoading(false);
      } catch (e) {
        console.log(e)
      }
    }
  }


  const checkStarred = async () => {
    const starredString = await AsyncStorage.getItem('starred');
    console.log("STarred String: ", starredString)
    if (starredString) {
      const starredArray = starredString.split(" ");
      if (starredArray.includes(currentIndex)) {
        console.log("Starred Array includes currentIndex", currentIndex);
        setIsStarred(true);
      } else {
        setIsStarred(false);
        console.log("Starred Array doesn't includes currentIndex", currentIndex);
      }
    } else {
      setIsStarred(false);
    }
  }

  const handleStar = async () => {
    console.log("User pressed handleStar !")
    try {
      var starred = await AsyncStorage.getItem('starred');
      if (!starred) {
        await AsyncStorage.setItem('starred', currentIndex);
        checkStarred();
        currentPostRef
        .update({'likes': firestore.FieldValue.increment(1)})
        .catch(error => {
          console.log("Error while incrementing the current post stars", error)
        });
      } else {
          const alreadyStarred = starred.split(" ");
          let newStarred;
          if (alreadyStarred.includes(currentIndex)) {
            newStarred = (alreadyStarred.filter(value => value != currentIndex)).join(" ");
            currentPostRef
            .update({'likes': firestore.FieldValue.increment(-1)})
            .catch(error => {
              console.log("Error while incrementing the current post stars", error)
            });
          } else {
            newStarred = starred + ' '+ currentIndex;
            currentPostRef
            .update({'likes': firestore.FieldValue.increment(1)})
            .catch(error => {
              console.log("Error while incrementing the current post stars", error)
            });
          }
          await AsyncStorage.setItem('starred', newStarred);
          checkStarred()
          console.log('New starred', newStarred)
      }
    } catch (e) {
      console.log(e);
    }
    console.log('currentIndex Stored!');
  }

  const nextIndex = (idx) => {
    const trunc = `${(Number(idx)+1)}`;
    return trunc + '0'.repeat(6-trunc.length);
  }

  const fetchPosts = (number, lastId) => {
    firestore()
    .collection('posts')
    .where('__name__', '>=', lastId || '000001')
    .limit(number)
    .get()
    .then(snapshot => {
      var receivedPosts = [];
      snapshot.forEach(document =>{
        const {comments, body, images, topic} = document.data();
        receivedPosts.push({id:document.id ,comments, body: body.fr, images, topic});
      })
      // console.log(receivedPosts)
      if (posts.length != 0) {
        setPosts(posts.concat(receivedPosts));
      } else {
        setPosts(receivedPosts);
      }
    })
  }

  const onEndReached = () => {
    if (currentIndex) {
      fetchPosts(4, nextIndex(currentIndex));
    }
    console.log('onEndReached')
  }

  useEffect(() => {
    checkStarred();
    if (currentIndex) {
      AsyncStorage.setItem('lastIndex', currentIndex);
    }
  }, [currentIndex]);
  
  useEffect(() => {
    AsyncStorage.getItem('lastIndex').then(value => {
      setLastIndex(value)
      fetchPosts(3, value);
    })
  }, []);


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
          <ViewShot ref={viewShotRef} options={{format:'jpg', quality:1}} >
            <Card loading={shotLoading} showAd={showAd} item={item} />
          </ViewShot>
          :
          <Card item={item} />}
      
          scrollEventThrottle={32}
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={viewableItemsChanged}
        
          onEndReached={onEndReached}
          onEndReachedThreshold={posts ? 1/(posts.length) : 0}
        />


      <View style={styles.menuTab}>
        {/* <AntDesign style={{padding:3}} name="star" size={26} color="#fff" /> */}
        <AntDesign style={{padding:3}} name={ isStarred ? "star" : "staro"} size={26} color="#fff" onPress={handleStar} />
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