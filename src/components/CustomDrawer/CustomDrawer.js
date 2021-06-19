import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MyColors from '../../colors/colors';
import Animated from 'react-native-reanimated';
import {
  Container,
  Icon,
  Text,
  Header,
  List,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Content,
  Body,
  H3,
} from 'native-base';
import {
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import VectorIcon from "react-native-vector-icons"
import { useSelector } from "react-redux"
import database from "@react-native-firebase/database"
import storage from "@react-native-firebase/storage"


const CustomDrawer = ({ progress, ...props }) => {
  const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

  const currentUID = useSelector(state => state.todo.loginUser.uid)
  const userDarwer = useSelector(state => state.todo)

  const [user, setUser] = useState({})

  useEffect(() => {

    console.log("userdrawer", userDarwer)

    database().ref(`users/${currentUID}`).on("value", snap => {
      if (snap.exists()) {
        setUser(snap.val())
      }
    })

    return () => console.log("")
  }, [currentUID])

  return (
    <Container>
      <Header style={styles.header}>
        <Right>
          <Icon
            name="times"
            type="FontAwesome5"
            style={{ fontSize: 25, color: MyColors.green }}
            onPress={() => props.navigation.closeDrawer()}
          />
        </Right>
      </Header>
      {!!Object.keys(user).length &&
        <ListItem thumbnail>
          <Left>
            <Thumbnail source={{ uri: user?.photoURL ? user?.photoURL : uri }} />
          </Left>
          <Body>
            <Text style={{}}>{user.firstname + " " + user.lastname}</Text>
            <Text note style={{ fontWeight: '500', textTransform: "capitalize" }}>
              {user.occupation}
            </Text>
          </Body>
        </ListItem>
      }
      <Content>
        <DrawerContentScrollView>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Rate Us"
            icon={({ color, size, focused }) => (
              <Icon
                name="star"
                type="FontAwesome5"
                style={{ color: color, fontSize: size }}
              />
            )}
          />
        </DrawerContentScrollView>
      </Content>
    </Container>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    elevation: 0
  },
});
