import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from "react-native-vector-icons/Ionicons"
import { Button } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyColors from '../../../colors/colors';
import CustomDrawerContent from '../../../components/CustomDrawer/CustomDrawer';
import DashboardAndProfileStack from "../../StackNavigators/DashboardAndProfileStack"
import { Platform } from 'react-native';
import BottomTabNavigator from '../BottomTabNavigator/BottomTabNavigator';


export default function MyDrawerNavigator() {
  const Drawer = createDrawerNavigator();
  const todoState = useSelector(state => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {

    // console.log('todoState', todoState);
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={({ ...props }) => <CustomDrawerContent {...props} />}
      statusBarAnimation="fade"
      drawerContentOptions={{
        activeBackgroundColor: "#c0edc1",
        activeTintColor: "green",
        inactiveTintColor: MyColors.green,

      }}
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        headerStyle: {
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
      {/* <Drawer.Screen
        options={{
          drawerIcon: ({ color, focused, size }) => (
            <Icon name="list" size={size} color={color} />
          ),
          drawerLabel: 'My Posts',
        }}
        name="MyPosts"
        component={StackPostMy}
      /> */}
      {/* <Drawer.Screen
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
      /> */}
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="options" size={size} color={color} />
          ),
          drawerLabel: 'Tabs',
          headerShown: false
        }}
        name="TabStack"
        component={BottomTabNavigator}
      />
    </Drawer.Navigator >
  );
}
