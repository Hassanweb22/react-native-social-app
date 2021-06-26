import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyColors from '../colors/colors';

import { loginUser } from '../store/actions/actions';
import HomeScreen from '../components/HomeScreen/HomeScreen';
import AddPost from '../components/AddPost/AddPost';
import Lists from '../components/Lists/Lists';
import MyPosts from '../components/MyPosts/MyPosts';
import AllPosts from '../components/AllPosts/AllPosts';
import CustomDrawerContent from '../components/CustomDrawer/CustomDrawer';
import Auth from '@react-native-firebase/auth';
import UpdateProfile from '../components/UpdateProfile/UpdateProfile';
import StackPostsAll from './StackPostsAll';
import StackPostMy from './StackPostMy';
import DashboardAndProfileStack from "./DashboardAndProfileStack"

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
      // hideStatusBar={true}
      drawerContentOptions={{
        activeBackgroundColor: "#c0edc1",
        activeTintColor: "green",
        inactiveTintColor: MyColors.green,

      }}
      screenOptions={({ navigation, route }) => ({
        headerShown: !(route.name === "Posts" || route.name === "MyPosts" || route.name === "Home"),
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
        headerRight: () => {
          return (
            <Button transparent style={{ marginRight: 20 }}>
              <Icon
                name="sign-out-alt"
                size={25}
                color={'#fff'}
                onPress={() => {
                  Auth()
                    .signOut()
                    .then(_ => console.log('SignOut'));
                  dispatch(loginUser({}));
                }}
              />
            </Button>
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
    </Drawer.Navigator >
  );
}
