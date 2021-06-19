import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Content,
  Button,
  Card,
  CardItem,
  Text,
  Form,
  Item,
  Input,
  Label,
  Body,
} from 'native-base';
import MyColors from '../../colors/colors';
import { View, StyleSheet, TouchableOpacity, ImagePickerIOS } from 'react-native';
import MyHeader from '../Header/Header';
import MyFooter from '../Footer/Footer';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';

const UpdateProfile = () => {
  const currentUserUID = useSelector(state => state.todo.loginUser.uid);

  const initialState = {
    fname: '',
    lname: '',
    email: "",
    occupation: "",
    photo: null,
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

  const imageUpload = () => {
    const usersProfile = firebase.storage().ref('usersProfile');
    const uploadTask = usersProfile
      .child(state.photo.fileName)
      .putFile(state.photo.uri);
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
          database().ref(`users/${currentUserUID}`).child("photoURL").set(downloadURL)
        });
        setState({ ...state, photo: null })
        setProgress(0)
      },
    );
  }

  const handleSubmit = () => {

    state.photo && imageUpload();

    if (state.occupation.length < 5) {
      return setError({ ...errors, occupation: "Length Should be greater than 5" })
    }

    let obj = {
      firstname: state.fname,
      lastname: state.lname,
      occupation: state.occupation
    };
    console.log('obj', obj);
    database().ref(`users/${currentUserUID}`).update(obj, err => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('successfully updated');
        // setState(initialState);
      }
    });
  };

  const validate = () => {
    return state.fname && state.lname && state.occupation ? true : false;
  };

  return (
    <Container>
      <KeyboardAvoidingScrollView>
        <View style={styles.container}>
          <Card style={styles.card}>
            <CardItem>
              <Text
                style={{
                  flex: 1,
                  color: '#4DAD4A',
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Update
              </Text>
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
                style={{
                  marginVertical: 20,
                  marginHorizontal: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    padding: 5,
                    borderColor: MyColors.green,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                  onPress={imageHandler}>
                  <Text style={{ fontSize: 15 }}>Upload Image</Text>
                </TouchableOpacity>
                <Text style={{ maxWidth: '60%' }} note>
                  {state.photo && state.photo.fileName}
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
                onPress={() => handleSubmit()}>
                <Text>
                  Save <Icon name="get-pocket" size={15} color="#fff" />
                </Text>
              </Button>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingScrollView>
      <MyFooter color="#5CB85C" />
    </Container>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: "center",
    padding: 5,
    // borderWidth: 1,
    // borderColor: 'green',
  },
  card: {
    elevation: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    // marginTop: 100,
    padding: 10,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "green",
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
