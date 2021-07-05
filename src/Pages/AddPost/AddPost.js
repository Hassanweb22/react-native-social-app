import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Button, Card, CardItem, Text, Form, Item, Input, Label } from 'native-base';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';
import moment from "moment"
import colors from '../../colors/colors';
import { requestCameraPermission, requestStoargePermission } from "../../ImagePickerActions/Actions"

const TodoForm = ({ navigation, todos }) => {
  const currentUserUID = useSelector(state => state.todo.loginUser.uid);
  const isDark = useSelector(state => state.todo.dark);

  const initialState = {
    title: '',
    photo: null,
    photoCamera: null,
    photoURL: null
  };
  const initialError = {
    title: '',
    photo: "",
    photoUrl: ""
  };

  const [state, setState] = useState(initialState);
  const [progress, setProgress] = useState(0);
  const [errors, setError] = useState(initialError);

  const onChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };


  const imageUpload = async (postKey) => {
    const usersProfile = firebase.storage().ref(`usersProfile/${currentUserUID}/posts`);
    const uploadTask = usersProfile
      .child(postKey)
      .putFile(state.photo.uri);
    await uploadTask.on(
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
      async () => {
        await uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          // console.log('File available at', downloadURL);
          database().ref(`users/${currentUserUID}/posts`).child(postKey).update({
            picURL: downloadURL
          })
          setState({ ...state, photoURL: downloadURL })
        }).catch(err => console.log(err));
        setState({ ...state, photo: null, photoURL: null, title: "" })
        setProgress(0)
      },
    );
  }

  const handleSubmit = async () => {
    const { title, photo, photoURL } = state
    let key = database().ref(`users/${currentUserUID}/posts`).push().key;
    state.photo && imageUpload(key);

    console.log("moment js date", moment("2021-06-24T05:09:49-07:00").fromNow())

    if (state.title) {
      let obj = { title, createdAt: moment().format(), key, userID: currentUserUID };
      // console.log("obj", obj.createdAt)
      database()
        .ref(`users/${currentUserUID}/posts`)
        .child(key)
        .update(obj, err => {
          if (err) {
            return console.log('error', err);
          }
          else {
            !state.photo && setState(initialState);
            navigation.goBack()
          }
          // console.log('posts submitted');
        });
    }
  };

  const validate = () => {
    return state.title ? true : false;
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
        { text: "Launch Library", onPress: () => requestStoargePermission(state, setState) },
        { text: "Launch Camera", onPress: () => requestCameraPermission(state, setState) }
      ]
    );
  }


  return (
    <Container >
      <Container style={[styles.container, { backgroundColor: isDark ? colors.dark : "#fff" }]}>
        <KeyboardAvoidingScrollView>
          <Card style={styles.card}>
            {/* <CardItem >
              <Text
                style={{
                  flex: 1,
                  color: '#4DAD4A',
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Add New
              </Text>
            </CardItem> */}
            <View style={{ marginHorizontal: 5 }}>
              <Form>
                <Item rounded style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                  <Label style={{ fontWeight: 'bold' }}>Title</Label>
                  <Input
                    style={{ paddingBottom: 5 }}
                    multiline
                    value={state.title}
                    onChangeText={text => onChangeText(text, 'title')}
                  />
                </Item>
              </Form>
              <View
                style={{ marginVertical: 20, marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <TouchableOpacity
                  style={{
                    padding: 5,
                    borderColor: colors.green,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                  onPress={askAlert}>
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
                  ADD <Icon name="get-pocket" size={15} color="#fff" />
                </Text>
              </Button>
            </View>
          </Card>
        </KeyboardAvoidingScrollView>
      </Container>
      {/* <MyFooter color="#5CB85C" /> */}
    </Container>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    // borderWidth: 1,
    // borderColor: 'green',
  },
  card: {
    elevation: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    marginTop: 120,
    padding: 10,
    // borderColor: "#000"
  },
  cardView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});
