import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container, Content, Button, Card, CardItem, Text, Form, Item, Input, Label, Body, Thumbnail,
} from 'native-base';
import MyColors from '../../colors/colors';
import { View, StyleSheet, TouchableOpacity, ImagePickerIOS, SafeAreaView, Dimensions, PermissionsAndroid, Alert, Permission, Platform } from 'react-native';
import MyHeader from '../Header/Header';
import MyFooter from '../Footer/Footer';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import PhotoModal from "./PhotoModal"
import colors from '../../colors/colors';
import Toast from 'react-native-toast-message';

const UpdateProfile = () => {
  const currentUserUID = useSelector(state => state.todo.loginUser.uid);
  const isDark = useSelector(state => state.todo.dark);



  const initialState = {
    fname: '',
    lname: '',
    email: "",
    occupation: "",
    photo: null,
    photoCamera: null
  };
  const initialError = {
    fname: '',
    lname: '',
    photo: "",
  };
  const [state, setState] = useState(initialState);
  const [user, setUser] = useState({});
  const [progress, setProgress] = useState(0);
  const [errors, setError] = useState(initialError);



  useEffect(() => {
    database().ref(`users/${currentUserUID}`).on("value", data => {
      if (data.exists()) {
        const { firstname, lastname, email, occupation } = data.val()
        setUser(data.val())
        setState({ ...state, fname: firstname, lname: lastname, email, occupation })
      }
    })
  }, [currentUserUID])

  const onChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const checkChanges = () => {
    return user.firstname !== state.fname || user.lastname !== state.lname || user.occupation !== state.occupation
  }

  const imageHandler = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary({}, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else if (response.assets) {
        setState({ ...state, photo: response.assets[0] });
      }
    });
  };


  const cameraHandler = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera({
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', response.assets[0]);
        setState({ ...state, photoCamera: response.assets[0] })
      }
    });

  }

  const handleCameraPermission = async () => {
    const res = await check(PERMISSIONS.IOS.CAMERA);

    if (res === RESULTS.GRANTED) {
      setCameraGranted(true);
    } else if (res === RESULTS.DENIED) {
      const res2 = await request(PERMISSIONS.IOS.CAMERA);
      res2 === RESULTS.GRANTED
        ? setCameraGranted(true)
        : setCameraGranted(false);
    }
  };


  const requestCameraPermission = async () => {
    if (Platform.OS === "ios") {
      return cameraHandler();
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        cameraHandler()
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFile = async () => {
    if (Platform.OS === "ios") {
      return imageHandler();
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        imageHandler()
      } else {
        console.log("permissions storage denied")
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const imageUpload = () => {
    const usersProfile = firebase.storage().ref(`usersProfile/${currentUserUID}/profilePhoto`);
    const uploadTask = usersProfile
      .child("dp")
      .putFile(state.photo?.uri || state.photoCamera.uri);
    uploadTask.on(
      'state_changed',
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(parseInt(progress).toFixed(2))
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            break;
        }
      },
      err => {
        console.log('error', err);
        setError({ ...errors, photo: err })
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          database().ref(`users/${currentUserUID}`).child("photoURL").set(downloadURL).then(_ => {
            Toast.show({
              type: "success",
              position: "top",
              topOffset: 40,
              visibilityTime: 1000,
              text1: 'Photo',
              text2: 'Your Profile Photo been Updated 👍'
            });
          })
        });
        setState({ ...state, photo: null, photoCamera: null })
        setProgress(0)
      },
    );
  }

  const handleSubmit = () => {

    console.log("state", state);
    (state.photo || state.photoCamera) && imageUpload();

    if (state.occupation.length < 5) {
      return setError({ ...errors, occupation: "Length Should be greater than 5" })
    }

    let obj = {
      firstname: state.fname,
      lastname: state.lname,
      occupation: state.occupation
    };

    checkChanges() && database().ref(`users/${currentUserUID}`).update(obj, err => {
      if (err) {
        console.log('error', err);
      } else {
        Toast.show({
          type: "success",
          position: "top",
          topOffset: 40,
          visibilityTime: 1000,
          text1: 'Update',
          text2: 'Your Profile has been Updated 👍'
        });
        console.log('successfully updated');
        // setState(initialState);
      }
    });
  };

  const validate = () => {
    return state.fname && state.lname && state.occupation ? true : false;
  };


  const askAlert = () => {
    Alert.alert(
      "Take Photos",
      "Select one of the following",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Launch Library", onPress: () => downloadFile() },
        { text: "Launch Camera", onPress: () => requestCameraPermission() }
      ]
    );
  }

  const getFileName = () => {
    if (state.photo) {
      return state.photo.fileName
    }
    else if (state.photoCamera) {
      return state.photoCamera.fileName
    }
    else return ""
  }

  return (
    <Container>
      <View style={[styles.container, { backgroundColor: isDark ? colors.dark : "#fff" }]}>
        <KeyboardAvoidingScrollView style={{ borderWidth: 0 }}>
          <Card style={styles.card}>
            <CardItem>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", padding: 10 }}>
                <PhotoModal photoURL={user.photoURL} currentUserUID={currentUserUID} />
              </View>
            </CardItem>
            <View style={{}}>
              <Form>
                <Item disabled>
                  <Label style={{ fontWeight: 'bold' }}>Email</Label>
                  <Input
                    disabled
                    value={state.email}
                  />
                </Item>
                <Item>
                  <Label style={{ fontWeight: 'bold' }}>First Name</Label>
                  <Input
                    value={state.fname}
                    onChangeText={text => onChangeText(text, 'fname')}
                  />
                </Item>
                <Item>
                  <Label style={{ fontWeight: 'bold' }}>Last name</Label>
                  <Input
                    value={state.lname}
                    onChangeText={text => onChangeText(text, 'lname')}
                  />
                </Item>
                <Item>
                  <Label style={{ fontWeight: 'bold' }}>Occupation</Label>
                  <Input
                    value={state.occupation}
                    onChangeText={text => onChangeText(text, 'occupation')}
                  />
                </Item>
              </Form>
              <View
                style={{ marginVertical: 20, marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <TouchableOpacity
                  disabled={getFileName()}
                  style={{
                    padding: 5,
                    borderColor: MyColors.green,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                  onPress={askAlert}>
                  <Text style={{ fontSize: 15 }}>Upload Image</Text>
                </TouchableOpacity>
                <Text style={{ maxWidth: '60%' }} note>
                  {getFileName()}
                </Text>
              </View>
            </View>
            {progress ? <View style={styles.progressBar}>
              <Text style={{ textAlign: "center", width: progress + "%", backgroundColor: "lightgreen", fontSize: 14 }}>Upload {progress} %</Text>
            </View> : null}
            <View>
              <Button
                style={{ margin: 7, borderRadius: 10 }}
                full
                success
                disabled={!validate()}
                onPress={handleSubmit}>
                <Text>
                  Save <Icon name="get-pocket" size={15} color="#fff" />
                </Text>
              </Button>
            </View>
          </Card>
        </KeyboardAvoidingScrollView>
      </View>
      <MyFooter color="#5CB85C" />
    </Container>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10
    // borderWidth: 3,
  },
  card: {
    elevation: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 50,
    padding: 8,
    borderColor: '#000',
  },
  cardView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    marginHorizontal: 8,
    height: 18,
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "green",
    // backgroundColor: "lightgreen",
    overflow: "hidden",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  welcomeTitle: {
    color: '#4DAD4A',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowOffset: { width: 1, height: 0.5 },
    textShadowRadius: 1,
    textShadowColor: '#000',
  },
  bottomLinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  bottomLink: {
    // borderWidth: 1,
    // borderColor: "#4DAD4A",
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  bottomLinkText: {
    color: '#4DAD4A',
    fontWeight: 'bold',
  },
});
