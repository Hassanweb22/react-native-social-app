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
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import backgroundImg from '../../images/background.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../store/actions/actions';
import Auth from '@react-native-firebase/auth';

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const todoState = useSelector(state => state.todo);

  const initialState = {
    email: '',
    password: '',
  };
  const initialErrors = {
    email: '',
    password: '',
    access: '',
  };
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    const unsubscribe = Auth().onAuthStateChanged(user => {
      if (user) {
        console.log('no user');
      } else {
        console.log('user Loged out');
      }
    });

    // Unsubscribe from further state changes
    return unsubscribe();
  }, []);

  const onchange = (text, name) => {
    setState({ ...state, [name]: text });
    setErrors(initialErrors);
  };

  const onsubmit = () => {
    console.log('signin Submit', todoState);
    let { email, password } = state;

    if (!email) {
      setErrors({ ...errors, email: 'Required' });
    }
    if (!password) {
      setErrors({ ...errors, password: 'Required' });
    }

    if (email && password) {
      setLoading(true);
      Auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then(({ user }) => {
          if (user) {
            dispatch(loginUser(user._user));
            setErrors(initialErrors);
            setLoading(false);
          }
          setState(initialState);
        })
        .catch(error => {
          // console.log(error.code, error.message)
          if (error.code === 'auth/invalid-email') {
            setErrors({
              ...errors,
              email: 'That email address is badly formated',
            });
          }
          if (error.code === 'auth/user-not-found') {
            setErrors({ ...errors, email: 'User with this email not found' });
          }
          if (error.code === 'auth/wrong-password') {
            setErrors({ ...errors, password: 'The password is invalid' });
          }
          if (error.code === 'auth/too-many-requests') {
            setErrors({
              ...errors,
              access: 'Access to this account has been disabled',
            });
          }
          if (error.code === 'auth/network-request-failed') {
            alert('Connection Failed Make sure you have internet connection');
          }
          setLoading(false);
        });
      setErrors(initialErrors);
    }
    Keyboard.dismiss();
  };

  return (
    <Container
      style={{
        // borderWidth: 8,
        // borderColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ImageBackground
        source={require('../../images/pexels.jpeg')}
        style={{ flex: 1 }}
        resizeMode="cover">
        <KeyboardAvoidingScrollView>
          <View
            style={{
              marginTop: 170,
              marginHorizontal: 10,
              // borderWidth: 1,
              borderColor: 'green',
            }}>
            <View>
              <Card style={{ borderRadius: 10, elevation: 5, opacity: 0.9 }}>
                <View style={styles.imageContent}>
                  <Image
                    style={styles.tinyLogo}
                    source={require('../../images/user.png')}
                  />
                </View>

                {/* <CardItem style={{ flex: 1, justifyContent: "center", fontSize: 20 }}>
                                <Text style={{ color: "#4DAD4A", fontSize: 25, fontWeight: "bold" }}>Login</Text>
                            </CardItem> */}
                <View style={{ marginHorizontal: 10, marginTop: 50 }}>
                  <Form>
                    <View>
                      <Item
                        rounded
                        style={styles.item}
                        error={errors.email || errors.access ? true : false}>
                        <Label
                          style={{
                            fontWeight: 'bold',
                            color: 'rgba(0,0,0,0.6)',
                          }}>
                          Email
                        </Label>
                        <Input
                          value={state.email}
                          onChangeText={text => onchange(text, 'email')}
                        />
                      </Item>
                      {errors.email || errors.access ? (
                        <Text style={styles.error}>
                          {errors.email || errors.access}
                        </Text>
                      ) : null}
                    </View>
                    <View>
                      <Item
                        rounded
                        style={styles.item}
                        error={errors.password ? true : false}>
                        <Label
                          style={{
                            fontWeight: 'bold',
                            color: 'rgba(0,0,0,0.6)',
                          }}>
                          Password
                        </Label>
                        <Input
                          secureTextEntry
                          value={state.password}
                          onChangeText={text => onchange(text, 'password')}
                        />
                      </Item>
                      {errors.password ? (
                        <Text style={styles.error}>{errors.password}</Text>
                      ) : null}
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
                      Login <Icon name="user" size={17} color="#fff" />
                    </Text>
                    {loading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : null}
                  </Button>
                </Content>
                <View>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    OR
                  </Text>
                </View>
                <View style={styles.bottomLinks}>
                  <TouchableOpacity
                    style={styles.bottomLink}
                    onPress={_ => navigation.navigate('Signup')}>
                    <Text style={styles.bottomLinkText}>Create Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.bottomLink}
                    onPress={_ => navigation.navigate('forget')}>
                    <Text style={styles.bottomLinkText}>Forget Password</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          </View>
        </KeyboardAvoidingScrollView>
      </ImageBackground>
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  login: {
    display: 'flex',
    borderWidth: 1,
    borderColor: 'black',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  imageContent: {
    // borderWidth: 2,
    borderColor: 'green',
    position: 'absolute',
    bottom: '88%',
    left: '40%',
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // width: "80%",
    // marginVertical: 10,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    // marginVertical: 15,
  },
  item: {
    marginVertical: 7,
    borderWidth: 2,
    borderColor: 'green',
    paddingHorizontal: 10,
  },
  error: {
    fontSize: 12,
    marginBottom: 15,
    marginLeft: 10,
    color: 'red',
  },
  bottomLinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 0.85,
  },
});
