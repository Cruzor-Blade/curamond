import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';

import { Picker } from '@react-native-picker/picker';

const AddPostScreen = () => {
//   const {user} = useContext(AuthContext);
//   const {postScreen, selectedLanguage} = useContext(LanguageContext);

  const [image, setImage] = useState(null);
  const [imgDims, setImgDims] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [topic, setTopic] = useState("facts");
  const [post, setPost] = useState(null);

  const windowWidth = Dimensions.get("window").width;

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth:640,
      compressImageMaxHeight:896,
      cropping: true,
      freeStyleCropEnabled:true,
    }).then((image) => {
      // console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      const {cropRect} = image;
      const ImgDimensions = {width: cropRect.width, height: cropRect.height};
      setImage(imageUri);
      setImgDims(ImgDimensions);
      // console.log("Image Dimensions: ", imgDims);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth:640,
      compressImageMaxHeight:896,
      cropping: true,
      freeStyleCropEnabled:true,
      compressImageQuality:0.8,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      const {cropRect} = image;
      const ImgDimensions = {width: cropRect.width, height: cropRect.height};
      setImage(imageUri);
      setImgDims(ImgDimensions);
      // console.log("Image Dimensions: ", imgDims);
    });
  };


  const submitPost = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    console.log('Post: ', post);

    await firestore()
    .collection('metadata')
    .doc('lastPost')
    .get()
    .then(async snapshot => {
      // const stringId = "000000"
      const {index} = snapshot.data();
      const stringId = "0".repeat(6 - `${index+1}`.length) + `${index+1}`;
      
      //Upload the document to firestore with the current id
      await firestore()
      .collection('posts')
      .doc(stringId)
      .set({
        topic,
        body: {en:post},
        images: [{url:imageUrl, ImgDimensions:imgDims}],
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: 0,
        // ImgDimensions:imgDims,
        comments:0,
      }).catch(error => console.log('Something went wrong while adding post to firestore.', error))

      firestore()
      .collection('metadata')
      .doc('lastPost')
      .update({'index': firestore.FieldValue.increment(1)})
      .catch(error => {
        console.log("Error while incrementing the last postindex value", error)
      });

    }).catch(error => {
      console.log("Error while getting the last post index", error)
    })

    Alert.alert(
      "Post Ajoute",
      "La curiosite a ete ajoutee avec succes!",
    );
    setPost(null);

  }

  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);
      setImgDims(null);

      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  return (
    <View style={styles.container}>
      {/* <InputWrapper> */}
        {image != null ?
        <AddImage
          source={{uri: image}}
          style={imgDims && {height:(imgDims.height/imgDims.width)*windowWidth, maxHeight:windowWidth*1.2, minHeight:windowWidth*(1/3)}}
        /> : null}
        <View style={[styles.picker, {width:windowWidth}]}>
          <Picker
              // style={{fontSize:25}}
              dropdownIconColor="#000000"
              // itemStyle={{fontSize:30}}
              selectedValue={topic}
              prompt="Theme de la curiosite"
              onValueChange={(itemTopic, itemIndex) => setTopic(itemTopic)}
              style={{width:windowWidth*0.9, height:55}}
              >
              <Picker.Item label="Advises" value="advises" />
              <Picker.Item label="Aliments" value="aliments" />
              <Picker.Item label="Animals" value="animals" />
              <Picker.Item label="Brain" value="brain" />
              <Picker.Item label="Celebrities" value="celebrities" />
              <Picker.Item label="Cars" value="cars" />
              <Picker.Item label="Cinema" value="cinema" />
              <Picker.Item label="Computers" value="computers" />
              <Picker.Item label="Country" value="country" />
              <Picker.Item label="Facts" value="facts" />
              <Picker.Item label="Flora" value="flora" />
              <Picker.Item label="Freaky" value="freaky" />
              <Picker.Item label="Funny" value="funny" />
              <Picker.Item label="Health" value="health" />
              <Picker.Item label="History" value="history" />
              <Picker.Item label="Human Body" value="humanBody" />
              <Picker.Item label="Humor" value="humor" />
              <Picker.Item label="Knowledge" value="knowledge" />
              <Picker.Item label="Languages" value="languages" />
              <Picker.Item label="Love" value="love" />
              <Picker.Item label="Music" value="music" />
              <Picker.Item label="Oceans" value="oceans" />
              <Picker.Item label="Phobias" value="phobias" />
              <Picker.Item label="Populations" value="population" />
              <Picker.Item label="Psychology" value="psychology" />
              <Picker.Item label="Quotes" value="motivation" />
              <Picker.Item label="Relationsships" value="relationships" />
              <Picker.Item label="Sex" value="sex" />
              <Picker.Item label="Society" value="society" />
              <Picker.Item label="Space" value="space" />
              <Picker.Item label="Tips" value="tips" />
              <Picker.Item label="Video Games" value="videoGames" />
          </Picker>
        </View>
        <InputField
          placeholder="Entrez le contenu ici..."
          multiline
          numberOfLines={8}
          value={post}
          onChangeText={(content) => setPost(content)}
        />
        {uploading ? (
          <StatusWrapper>
            <Text>{transferred}{"% transfere"}</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </StatusWrapper>
        ) : (
          <SubmitBtn onPress={() => {
            if (post || image){
              submitPost();
            }
            }}>
            <SubmitBtnText>Post</SubmitBtnText>
          </SubmitBtn>
        )}
      {/* </InputWrapper> */}
      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Prendre une photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choisir dans la gallery"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  picker:{
    backgroundColor:"#d1d1d1",
    alignItems:'center',
    marginHorizontal:2,
    borderRadius:5
  },
  actionButtonIcon: {
    fontSize: 24,
    height: 27,
    color: 'white',
  },
});
