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

    firestore()
    .collection('posts')
    .add({
    //   userId: user.uid,
      topic,
      post: post,
      postImg: [imageUrl],
      postTime: firestore.Timestamp.fromDate(new Date()),
      likes: null,
      ImgDimensions:imgDims,
      reactions:0,
      comments:0,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert(
        "Post Ajoute",
        "La curiosite a ete ajoutee avec succes!",
      );
      setPost(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
    });
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
              <Picker.Item label="Aliments" value="aliments" />
              <Picker.Item label="Amour" value="love" />
              <Picker.Item label="Animaux" value="animals" />
              <Picker.Item label="Astuces" value="tips" />
              <Picker.Item label="Celebrites" value="celebrities" />
              <Picker.Item label="Cerveau" value="brain" />
              <Picker.Item label="Cinema" value="cinema" />
              <Picker.Item label="Conseils" value="advises" />
              <Picker.Item label="CorpsHumain" value="humanBody" />
              <Picker.Item label="Drole" value="funny" />
              <Picker.Item label="Espace" value="space" />
              <Picker.Item label="Faits" value="facts" />
              <Picker.Item label="Flore" value="flora" />
              <Picker.Item label="Histoire" value="history" />
              <Picker.Item label="Humour" value="humor" />
              <Picker.Item label="Informatique" value="computers" />
              <Picker.Item label="Insolite" value="freaky" />
              <Picker.Item label="Jeux Videos" value="videoGames" />
              <Picker.Item label="Langues" value="languages" />
              <Picker.Item label="Musique" value="music" />
              <Picker.Item label="Oceans" value="oceans" />
              <Picker.Item label="Relations" value="relationships" />
              <Picker.Item label="Phobies" value="phobias" />
              <Picker.Item label="Populations" value="population" />
              <Picker.Item label="Psychologie" value="psychology" />
              <Picker.Item label="Quotes" value="motivation" />
              <Picker.Item label="Societe" value="society" />
              <Picker.Item label="Savoir" value="knowledge" />
              <Picker.Item label="Sante" value="health" />
              <Picker.Item label="Sexe" value="sex" />
              <Picker.Item label="Pays" value="country" />
              <Picker.Item label="Voitures" value="cars" />
          </Picker>
        </View>
        <InputField
          placeholder="Entrez le contenu ici..."
          multiline
          numberOfLines={4}
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
            <SubmitBtnText>Publier</SubmitBtnText>
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
