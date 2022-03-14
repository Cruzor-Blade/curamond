import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet, Dimensions, Modal, TextInput, TouchableOpacity} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

export const width = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

const CommentsScreen = ({route}) => {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [inputUsername, setInputUsername] = useState('');

  const validateUsername = async () => {
    try {
    await firestore()
    .collection('usernames')
    .doc(inputUsername)
    .get()
    .then(async snapshot => {
      if (!snapshot.exists) {
        console.log("Snapshot does't exist!")
        await firestore()
        .collection('usernames')
        .doc(inputUsername)
        .set({})
        
        AsyncStorage.setItem("username", inputUsername)
        setUsername(inputUsername)
        console.log("User inputed username ", username)
        setModalVisible(false)
      } else {
        console.log("Snapshot found")
        alert("Ce nom d'utilisateur est deja pris. Essayez en un autre !")
      }
    })

  } catch (e) {
    console.log(e)
  }
  }

  const fetchComments = async () => {
    let commentsList = [];
    const snapshot = await firestore()
    .collection('posts')
    .doc(route.params.postId)
    .collection('comments')
    .where('language', '==', 'fr')
    .get()
    
    snapshot.forEach(doc => {
      const object = doc.data()
      object.createdAt = obj.createdAt.toDate()
      commentsList.push(object)
    })

    setComments(commentsList)
  }

  useEffect(() => {
    fetchComments();

    try {
      AsyncStorage.getItem('username')
      .then(value => {
        if (value) {
          setUsername(value);
          console.log("Hit username", value)
        } else {
          setModalVisible(true);
        }
      })
      
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log(messages);
    messages[0].language = 'fr';
    
    firestore()
    .collection('posts')
    .doc(route.params.postId)
    .collection('comments')
    .add(messages[0])
    .catch(error => {
      console.log(error);
    });

    fetchComments();

  }, []);

  const renderSend = (props) => {
    if (username) return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
    return null;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <View style={styles.container} >
      <GiftedChat
      messagesContainerStyle={{}}
        messages={comments}
        onSend={(comments) => onSend(comments)}
        user={{
          _id: username,
        }}
        placeholder='Entrez un message...'
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        alignTop={true}
        renderAvatar={null}
        renderUsernameOnMessage={true}
        renderChatEmpty={() => <Text>Chat is  emplty</Text>}
        scrollToBottomComponent={scrollToBottomComponent}
      />
      <Modal visible={modalVisible} style={styles.overlay}>
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={{fontSize:18, fontWeight:'bold'}}>Enter a username</Text>
            <AntDesign
                name="closecircle"
                color="#666666"
                size={24}
                style={{marginBottom:2}}
                onPress={() => {
                  setModalVisible(false)
                }}
            />
          </View>
        <View style={{flexDirection:'row', alignItems:"center"}} >
          <TextInput
          placeholder="Enter your username here"
          style={styles.usernameTextInput}
          value={inputUsername}
          onChangeText={text => setInputUsername(text)}
          />
          <TouchableOpacity onPress={() => validateUsername()} >
            <View style={styles.usernameButton} ><Text style={{color:"#ffffff"}} >Done</Text></View>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:40}} ><Text style={{fontSize:17, fontWeight:"700"}} >Note: you must have a username in order to comment.</Text></View>
        </View>
      </Modal>
    </View>
    // Platform.OS === 'android' && <KeyboardAvoidingView behavior='padding' />
    // <View style={{flex:1, alignItems:'center', justifyContent:'center'}} ><Text>Comments Screen</Text></View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"rgba(10,4.2,4.2,0.95)"
  },
  background: {
    flex:1,
    position:'absolute',
    backgroundColor:"#ff0000",
    height:500
  },overlay:{
    flex:1,
},
textContainer:{
    marginHorizontal:8,
    height:"50%",
    backgroundColor:"#ffffff",
    marginBottom:20,
    borderRadius:10,
    padding:10,
    paddingHorizontal:10,
},
header:{
    borderRadius:10,
    borderBottomColor:"#444444",
    borderBottomWidth:1,
    height:42,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingLeft:25,
    paddingRight:10
  },
  usernameTextInput: {
    height:50,
    width:'80%',
    alignSelf:'center',
    fontSize:18,
    marginTop:10
  },
  usernameButton:{
    height:40,
    width:70, 
    backgroundColor:"#6000ff", 
    borderRadius:8, 
    alignItems:'center', 
    justifyContent:"center"
}
});
