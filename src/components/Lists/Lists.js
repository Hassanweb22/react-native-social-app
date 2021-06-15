import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Right,
  Card,
  CardItem,
} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';

import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import MyModal from './Modal';
import {useSelector} from 'react-redux';

const Lists = ({navigation}) => {
  // console.log("lists routes", route.params)

  const loginUser = useSelector(state => state.todo.loginUser);

  const [todos, setTodos] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    let uid = loginUser.uid;
    const dataFunc = () => {
      database()
        .ref(`users/${uid}`)
        .child('todos')
        .on('value', snap => {
          if (snap.exists()) {
            // console.log('snap Exists', snap.val());
            setTodos(snap.val());
          } else {
            setTodos({});
          }
        });
    };
    return dataFunc();
  }, []);

  const deleteTodo = id => {
    database().ref(`users/${loginUser.uid}/todos`).child(id).remove();
  };

  return (
    <Grid style={styles.container}>
      <Row size={1}>
        <CardItem
          style={styles.CardItem}
          style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{color: '#4DAD4A', fontSize: 20, fontWeight: 'bold'}}>
            Your Tasks
          </Text>
        </CardItem>
      </Row>
      <Row
        size={10}
        style={{borderWidth: 1, borderColor: 'green', paddingHorizontal: 10}}>
        <Container style={styles.cardContainer}>
          <SafeAreaView
            style={{flex: 1, marginTop: StatusBar.currentHeight || 0}}>
            <List>
              {!!Object.keys(todos).length ? (
                <FlatList
                  data={Object.keys(todos)}
                  keyExtractor={item => item}
                  renderItem={({item}) => (
                    <ListItem key={item} noIndent style={styles.listItem}>
                      <Left
                        style={{
                          flex: 2,
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                        }}>
                        <Text>{todos[item].name} </Text>
                      </Left>
                      <Right
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }}>
                        <Icon
                          style={styles.icon}
                          name="trash"
                          size={22}
                          color="red"
                          onPress={() => deleteTodo(item)}
                        />
                        <MyModal
                          item={{...todos[item], key: item}}
                          loginUser={loginUser}
                        />
                      </Right>
                    </ListItem>
                  )}
                />
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  No Tasks
                </Text>
              )}
            </List>
          </SafeAreaView>
        </Container>
      </Row>
    </Grid>
  );
};

export default Lists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignContent: 'flex-start',
    // marginHorizontal: 10
  },
  cardContainer: {
    flex: 1,
    // marginHorizontal: 10,
  },
  CardItem: {
    height: '20%',
  },
  listContainer: {
    height: '80%',
  },
  lists: {
    // backgroundColor: "#F7941E",
    paddingVertical: 10,
  },
  listItem: {
    backgroundColor: '#96ea93',
    borderRadius: 5,
    elevation: 5,
    marginVertical: 4,
    paddingLeft: 10,
  },
  icon: {
    marginHorizontal: 6,
  },
});
