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
  View,
} from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import MyColors from '../../colors/colors';
import { loginUser } from '../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';


const Signup = ({ navigation, todos }) => {
  const dispatch = useDispatch()
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    occupation: "",
    photo: null
  };
  const initialErrors = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    occupation: ""
  };
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState(initialErrors);
  const { firstname, lastname, email, occupation } = state;

  useEffect(() => { }, []);

  const onchange = (text, name) => {
    setState({ ...state, [name]: text });
    setErrors(initialErrors);
  };

  const sendToDatabase = uid => {
    let userData = { uid, firstname, lastname, email, occupation };
    database()
      .ref('users')
      .child(uid)
      .set(userData)
      .then(() => console.log('user send'))
      .catch(err => console.log('err', err));
  };


  const onsubmit = () => {
    let { firstname, lastname, email, password, occupation } = state;

    if (!firstname) {
      setErrors({ ...errors, firstname: 'Required' });
    }
    if (!lastname) {
      setErrors({ ...errors, lastname: 'Required' });
    }
    if (!email) {
      setErrors({ ...errors, email: 'Required' });
    }
    if (!password) {
      setErrors({ ...errors, password: 'Required' });
    }
    if (!occupation) {
      setErrors({ ...errors, occupation: 'Required' });
    }
    console.log(state);
    // console.log(errors)


    if (firstname && lastname && email && password && occupation) {
      setLoading(true);
      Auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          console.log('User account created & signed in! with uid', user);
          sendToDatabase(user.uid)
          dispatch(loginUser(user._user));
          setLoading(false);
          // Auth().signOut();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setErrors({
              ...errors,
              email: 'That email address is already in use!',
            });
          }
          if (error.code === 'auth/invalid-email') {
            setErrors({ ...errors, email: 'Email is invalid!' });
          }

          if (error.code === 'auth/weak-password') {
            setErrors({ ...errors, password: 'Password is weak!' });
          }
          if (error.code === 'auth/network-request-failed') {
            alert('Connection Failed Make sure you have internet connection');
          }

          console.log(error);
          setLoading(false);
        });
      setErrors(initialErrors);
    }
    Keyboard.dismiss();
  };

  return (
    <Container>
      <ImageBackground
        source={require('../../images/pexels.jpeg')}
        style={{ flex: 1 }}
        resizeMode="cover">
        <KeyboardAvoidingScrollView>
          <View style={{ marginTop: 120, marginHorizontal: 10 }}>
            <View>
              <Card style={{ borderRadius: 10, elevation: 5, opacity: 0.9 }}>
                <View style={styles.imageContent}>
                  <Image
                    style={styles.tinyLogo}
                    source={require('../../images/user.png')}
                  />
                </View>
                {/* <CardItem bordered style={{ flex: 1, justifyContent: "center" }}>
                                <Text style={{ color: "#4DAD4A", fontSize: 20, fontWeight: "bold" }}>Sign Up</Text>
                              </CardItem> */}
                <View style={{ marginHorizontal: 10, marginTop: 50 }}>
                  <Form>
                    <View>
                      <Item
                        style={styles.item}
                        rounded
                        error={errors.firstname ? true : false}>
                        <Label style={{ fontWeight: 'bold', fontSize: 15 }}>
                          First Name
                        </Label>
                        <Input
                          value={state.firstname}
                          onChangeText={text => onchange(text, 'firstname')}
                        />
                      </Item>
                      {errors.firstname ? (
                        <Text style={styles.error}>{errors.firstname}</Text>
                      ) : null}
                    </View>
                    <View>
                      <Item
                        style={styles.item}
                        rounded
                        error={errors.lastname ? true : false}>
                        <Label style={{ fontWeight: 'bold', fontSize: 15 }}>
                          Last Name
                        </Label>
                        <Input
                          value={state.lastname}
                          onChangeText={text => onchange(text, 'lastname')}
                        />
                      </Item>
                      {errors.lastname ? (
                        <Text style={styles.error}>{errors.lastname}</Text>
                      ) : null}
                    </View>
                    <View>
                      <Item
                        style={styles.item}
                        rounded
                        error={errors.email ? true : false}>
                        <Label style={{ fontWeight: 'bold', fontSize: 15 }}>
                          Email
                        </Label>
                        <Input
                          value={state.email}
                          onChangeText={text => onchange(text, 'email')}
                        />
                      </Item>
                      {errors.email ? (
                        <Text style={styles.error}>{errors.email}</Text>
                      ) : null}
                    </View>
                    <View>
                      <Item
                        style={styles.item}
                        rounded
                        error={errors.occupation ? true : false}>
                        <Label style={{ fontWeight: 'bold' }}>Occupation</Label>
                        <Input
                          value={state.occupation}
                          onChangeText={text => onchange(text, 'occupation')}
                        />
                      </Item>
                      {errors.occupation ? (
                        <Text style={styles.error}>{errors.occupation}</Text>
                      ) : null}
                    </View>
                    <View>
                      <Item
                        style={styles.item}
                        rounded
                        error={errors.password ? true : false}>
                        <Label style={{ fontWeight: 'bold' }}>Password</Label>
                        <Input
                          secureTextEntry
                          value={state.password}
                          onChangeText={text => onchange(text, 'password')}
                        />
                      </Item>
                      <Text
                        style={[errors.password ? styles.error : styles.info, { marginLeft: 10, }]}>
                        {errors.password
                          ? errors.password
                          : 'Password shoule be greater than 6'}
                      </Text>
                    </View>
                  </Form>
                </View>

                <Content style={{ marginVertical: 7 }}>
                  <Button
                    style={{ margin: 7, borderRadius: 10 }}
                    full
                    success
                    disabled={loading}
                    onPress={() => onsubmit()}>
                    <Text>
                      Signup <Icon name="user" size={17} color="#fff" />
                    </Text>
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : null}
                  </Button>
                </Content>
                <View style={styles.bottomLinks}>
                  {/* <TouchableOpacity style={styles.bottomLink} onPress={_ => navigation.navigate("CreateAccount")}> */}
                  <Text style={styles.bottomLinkText}>
                    Already Have Account?
                  </Text>
                  {/* </TouchableOpacity> */}
                  {/* <TouchableOpacity style={styles.bottomLink} onPress={_ => navigation.navigate("forget")}> */}
                  <Text
                    style={[
                      styles.bottomLinkText,
                      { marginRight: 10, color: 'grey' },
                    ]}
                    onPress={_ => navigation.navigate('login')}>
                    Click Here
                  </Text>
                  {/* </TouchableOpacity> */}
                </View>
              </Card>
            </View>
          </View>
        </KeyboardAvoidingScrollView>
      </ImageBackground>
    </Container>
  );
};

export default Signup;

const styles = StyleSheet.create({
  login: {
    display: 'flex',
    borderWidth: 1,
    borderColor: 'black',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    // borderWidth: 2,
    borderColor: 'green',
    position: 'absolute',
    bottom: '90%',
    left: '40%',
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // marginVertical: 10,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    marginVertical: 10,
  },
  item: {
    marginVertical: 7,
    borderWidth: 2,
    borderColor: 'green',
    paddingHorizontal: 10,
  },
  error: {
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
    color: 'red',
  },
  info: {
    fontSize: 12,
    marginBottom: 10,
    // marginLeft: 10,
    color: 'grey',
  },
  bottomLinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "green",
    overflow: "hidden",
  }
});
