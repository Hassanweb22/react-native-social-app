import React, { useState, useEffect } from 'react';
import { Container, Content, Button, Card, CardItem, Text, Form, Item, Input, Label, View, } from 'native-base';
import {
  StyleSheet,
  Image,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import Auth from '@react-native-firebase/auth';
import Icons from 'react-native-vector-icons/FontAwesome5';

const ForgetPassword = ({ navigation }) => {
  const initialState = {
    email: '',
  };
  const initialErrors = {
    email: '',
    password: '',
    access: '',
  };
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);

  const onchange = (text, name) => {
    setState({ ...state, [name]: text });
    setErrors(initialErrors);
  };

  const onsubmit = () => {
    console.log('state', state);
    let { email } = state;

    if (!email) {
      setErrors({ ...errors, email: 'Required' });
    }
    if (email) {
      console.log(state);
      Auth()
        .sendPasswordResetEmail(state.email)
        .then(function () {
          Alert.alert('Alert', 'My Alert Msg', [
            { text: 'OK', onPress: () => console.log('OK') },
          ]);
        })
        .catch(function (error) {
          // An error happened.
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
          <View style={{ marginHorizontal: 10, marginTop: 180 }}>
            <View>
              <Card style={{ borderRadius: 10, elevation: 5, opacity: 0.9 }}>
                <View style={styles.imageContent}>
                  <Image
                    style={styles.tinyLogo}
                    source={require('../../images/user.png')}
                  />
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 50 }}>
                  <Form>
                    <View>
                      <Item
                        style={styles.item}
                        error={errors.email ? true : false}
                        rounded>
                        <Label
                          style={{
                            fontWeight: 'bold',
                            color: 'rgba(0,0,0,0.65)',
                          }}>
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
                      Forget <Icons name="key" size={17} color="#fff" />
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
                    <Text style={styles.bottomLinkText}>Sign Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.bottomLink}
                    onPress={_ => navigation.navigate('login')}>
                    <Text style={styles.bottomLinkText}>Login</Text>
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

export default ForgetPassword;

const styles = StyleSheet.create({
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
});
