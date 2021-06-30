import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Button,
  Content,
  Card,
  CardItem,
  Text,
  Form,
  Item,
  Input,
  Label,
  Body,
} from 'native-base';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MyFooter from '../Footer/Footer';
import MyHeader from '../Header/Header';
import { useSelector } from 'react-redux';

import Auth from '@react-native-firebase/auth';
import Database from '@react-native-firebase/database';
import colors from '../../colors/colors';

const HomeScreen = ({ navigation }) => {
  const data = { name: 'hassan', email: 'hasso@gmail.com', age: 22 };
  const currentUserUID = useSelector(state => state.todo.loginUser.uid);
  const isDark = useSelector(state => state.todo.dark);

  const [user, setUser] = useState({});

  useEffect(() => {
    if (currentUserUID) {
      Database()
        .ref('users')
        .child(currentUserUID)
        .on('value', snap => {
          setUser(snap.val());
        });
    } else {
      console.log('no user');
    }
  }, []);


  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.green} />
      <Container style={[styles.container, { backgroundColor: isDark ? colors.dark : "#fff" }]}>
        <Card style={styles.card}>
          <View style={styles.cardView}>
            <Text style={styles.welcomeTitle}>
              Welcome Dear {user?.firstname}!
            </Text>
          </View>
          <View>
            <Text style={{ textAlign: 'center' }}>
              You can Create Posts Like it comment it and can Chat with others users
            </Text>
          </View>
          <View style={styles.bottomLinks}>
            <TouchableOpacity
              style={styles.bottomLink}
              onPress={_ => navigation.openDrawer()}>
              <Text style={styles.bottomLinkText}>Open Drawer</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.bottomLink}
              onPress={_ => navigation.navigate('Posts')}>
              <Text style={styles.bottomLinkText}>Check Posts</Text>
            </TouchableOpacity> */}
          </View>
        </Card>
      </Container>
      <MyFooter color="#5CB85C" />
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  card: {
    elevation: 10,
    borderRadius: 20,
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
});
