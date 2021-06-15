import React, {useState} from 'react';
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
import {View, StyleSheet} from 'react-native';
import MyHeader from '../Header/Header';
import MyFooter from '../Footer/Footer';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';

const TodoForm = ({navigation, todos}) => {
  const currentUserUID = useSelector(state => state.todo.loginUser.uid);
  const initialState = {
    name: '',
    desc: '',
  };
  const [state, setState] = useState(initialState);

  const onChangeText = (value, name) => {
    setState({...state, [name]: value});
  };
  const handleSubmit = () => {
    // console.log('state', state);
    let uid = auth().currentUser.uid;
    let key = database().ref(`users/${currentUserUID}/todos`).push().key;
    let obj = state;
    console.log('currentUser', currentUserUID);
    database()
      .ref(`users/${currentUserUID}/todos`)
      .child(key)
      .set(obj, err => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('task submitted');
          setState(initialState);
        }
      });
  };

  const validate = () => {
    return state.name && state.desc ? true : false;
  };

  return (
    <Container>
      <Container style={styles.container}>
        <KeyboardAvoidingScrollView>
          <Card style={styles.card}>
            <CardItem bordered>
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
            </CardItem>
            <View style={{marginHorizontal: 10}}>
              <Form>
                <Item>
                  <Label style={{fontWeight: 'bold'}}>Name</Label>
                  <Input
                    value={state.name}
                    onChangeText={text => onChangeText(text, 'name')}
                  />
                </Item>
                <Item>
                  <Label style={{fontWeight: 'bold'}}>Desc</Label>
                  <Input
                    value={state.desc}
                    onChangeText={text => onChangeText(text, 'desc')}
                  />
                </Item>
              </Form>
            </View>
            <View>
              <Button
                style={{margin: 7, borderRadius: 10}}
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
      <MyFooter color="#5CB85C" />
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
    borderWidth: 1,
    borderColor: 'green',
  },
  card: {
    elevation: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    // marginTop: 100,
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
    textShadowOffset: {width: 1, height: 0.5},
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
