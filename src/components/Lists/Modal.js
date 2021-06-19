import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Card,
  Text,
  CardItem,
  Input,
  Item,
  Label,
  Button,
  Form,
} from 'native-base';
import Modal from 'react-native-modal';
import database from '@react-native-firebase/database';

function ModalTester({ item, loginUser }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const initialState = {
    name: '',
    desc: '',
  };
  const [state, setState] = useState(initialState);
  const [updated, setupdated] = useState('');

  useEffect(() => {
    setState({ name: item.name });
    return () => {
      setModalVisible(false);
    };
  }, [item]);

  const toggleModal = () => {
    setupdated('');
    setModalVisible(!isModalVisible);
  };

  const onChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    console.log(item, loginUser.uid);
    if (item.name !== state.name) {
      database()
        .ref(`users/${loginUser.uid}/todos`)
        .child(item.key)
        .update({
          name: state.name,
        })
        .then(_ => setupdated('Value Updated'))
        .catch(err => console.log(err));
    }
    // setModalVisible(false);
  };

  const validate = () => {
    state.name == '' ? true : false;
  };

  return (
    <View style={{}}>
      <Icon
        style={styles.icon}
        name="create"
        size={22}
        color="blue"
        onPress={toggleModal}
      />
      <Modal
        animationIn="bounceInLeft"
        animationInTiming={600}
        animationOut="bounceOutright"
        animationOutTiming={600}
        isVisible={isModalVisible}>
        <View style={{}}>
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
                Modal
              </Text>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Icon
                  style={styles.icon}
                  name="close"
                  size={22}
                  color="red"
                  onPress={toggleModal}
                />
              </View>
            </CardItem>
            <View style={{ marginHorizontal: 10 }}>
              <Form>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <Item>
                    <Label style={{ fontWeight: 'bold' }}>Name</Label>
                    <Input
                      value={state.name}
                      onChangeText={text => onChangeText(text, 'name')}
                    />
                  </Item>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Button
                    style={{ margin: 7, borderRadius: 10 }}
                    full
                    success
                    disabled={!state.name}
                    onPress={() => handleSubmit()}>
                    <Text>Updated</Text>
                  </Button>
                </View>
              </Form>
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
}

export default ModalTester;

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
  icon: {
    marginHorizontal: 10,
    // borderColor: 'green',
    // borderWidth: 1,
  },
});
