import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'native-base';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyColors from '../colors/colors';

import {loginUser} from '../store/actions/actions';
import HomeScreen from '../components/HomeScreen/HomeScreen';
import AddTodo from '../components/AddTodo/AddTodo';
import Lists from '../components/Lists/Lists';
import CustomDrawerContent from '../components/CustomDrawer/CustomDrawer';
import Auth from '@react-native-firebase/auth';
import UpdateProfile from '../components/UpdateProfile/UpdateProfile';

export default function MyDrawerNavigator() {
  const Drawer = createDrawerNavigator();
  const todoState = useSelector(state => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('todoState', todoState);
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={({...props}) => <CustomDrawerContent {...props} />}
      hideStatusBar={true}
      screenOptions={({navigation, route}) => ({
        headerShown: true,
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
              style={{marginLeft: 20}}
              name="bars"
              size={25}
              color={'#fff'}
              onPress={() => navigation.openDrawer()}
            />
          );
        },
        headerRight: () => {
          return (
            <Button transparent style={{marginRight: 20}}>
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
        options={{
          title: 'Dshboard',
          drawerIcon: ({color, focused, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color, focused, size}) => (
            <Icon name="plus-circle" size={size} color={color} />
          ),
          drawerLabel: 'Add Task',
        }}
        name="AddTodo"
        component={AddTodo}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color, focused, size}) => (
            <Icon name="list" size={size} color={color} />
          ),
          drawerLabel: 'Task List',
        }}
        name="Lists"
        component={Lists}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color, focused, size}) => (
            <Icon name="scroll" size={19} color={color} />
          ),
          drawerLabel: 'Update Profile',
          headerStyle: {
            backgroundColor: MyColors.green,
          },
        }}
        name="Update Profile"
        component={UpdateProfile}
      />
    </Drawer.Navigator>
  );
}
