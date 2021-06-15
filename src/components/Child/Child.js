import React, {useState, useEffect} from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Text,
  Form,
  Item,
  Input,
  View,
} from 'native-base';

import colors from '../../colors/colors';

const Child = () => {
  const initialState = {
    email: '',
    password: '',
  };
  const [state, setState] = useState(initialState);

  const handleText = (value, name) => {
    setState({...state, [name]: value});
  };

  const handleSubmit = () => {
    console.log('state', state);
    auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.log(error);
      });
  };

  return (
    <>
      <Container style={styles.container}>
        <View padder style={styles.form}>
          <SafeAreaView>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  color: colors.primaryText,
                  fontWeight: 'bold',
                }}>
                Sign In
              </Text>
            </View>
            <Form>
              <Item>
                <Input
                  value={state.email}
                  onChangeText={text => handleText(text, 'email')}
                  placeholder="Email"
                />
              </Item>
              <Item>
                <Input
                  value={state.password}
                  secureTextEntry
                  onChangeText={text => handleText(text, 'password')}
                  placeholder="Password"
                />
              </Item>
            </Form>
          </SafeAreaView>
          <View padder style={{marginTop: 10}}>
            <Button full rounded onPress={handleSubmit}>
              <Text>
                Login <Icon />
              </Text>
            </Button>
          </View>
          <View style={styles.bottomLinks}>
            <Text>Already Have Account?</Text>
            <Text style={{color: colors.primaryText, fontWeight: 'bold'}}>
              Click Here
            </Text>
          </View>
        </View>
      </Container>
    </>
  );
};

export default Child;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#EEEEEE',
    color: 'green',
  },
  textContainer: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
  },
  form: {
    margin: 6,
    // marginTop: 100,
    borderColor: '#eeeeee',
    borderWidth: 1,
    borderRadius: 10,
    elevation: 5,
  },
  bottomLinks: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 15,
  },
});
