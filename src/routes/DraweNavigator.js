import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyColors from '../colors/colors';

import { loginUser } from '../store/actions/actions';;
import CustomDrawerContent from '../components/CustomDrawer/CustomDrawer';
import StackPostsAll from './StackPostsAll';
import StackPostMy from './StackPostMy';
import CustomMessageStack from './CustomMessageStack';
import DashboardAndProfileStack from "./DashboardAndProfileStack"
import Messages from "../components/Messages/Users"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Platform } from 'react-native';


export default function MyDrawerNavigator() {
  const Drawer = createDrawerNavigator();
  const todoState = useSelector(state => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('todoState', todoState);
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={({ ...props }) => <CustomDrawerContent {...props} />}
      // hideStatusBar={Platform.OS === 'ios' ? true : false}
      statusBarAnimation="fade"
      drawerContentOptions={{
        activeBackgroundColor: "#c0edc1",
        activeTintColor: "green",
        inactiveTintColor: MyColors.green,

      }}
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        headerStyle: {
          // borderWidth: 1,
          backgroundColor: MyColors.green,
        },

        headerTitleStyle: {
          color: '#fff',
        },
        headerLeft: () => {
          return (
            <Icon
              style={{ marginLeft: 20 }}
              name="bars"
              size={25}
              color={'#fff'}
              onPress={() => {
                navigation.openDrawer()
              }}
            />
          );
        },
      })}>
      <Drawer.Screen
        options={({ navigation }) => ({
          title: 'Dshboard',
          drawerIcon: ({ color, focused, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerRight: ({ }) => {
            return (
              <Button transparent style={{ marginRight: 20 }}>
                <Icon
                  name="user-circle"
                  size={25}
                  color={'#fff'}
                  onPress={() => {
                    console.log("Dashboard Header Right button")
                    navigation.navigate("Profile")
                  }}
                />
              </Button>
            );
          },
        })}
        name="Home"
        component={DashboardAndProfileStack}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
          drawerLabel: 'My Posts',
        }}
        name="MyPosts"
        component={StackPostMy}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
          drawerLabel: 'Posts',
        }}
        name="Posts"
        component={StackPostsAll}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <MaterialIcons name="message" size={size} color={color} />
          ),
          drawerLabel: 'Messages',
          headerTitle: "Messages",
        }}
        name="messages"
        component={CustomMessageStack}
      />
    </Drawer.Navigator >
  );
}
