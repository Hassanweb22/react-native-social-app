import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Mycolors from './src/colors/colors';

import SignIn from './src/components/Sigin/Sigin';
import Signup from './src/components/Signup/Signup';
import ForgetPassword from './src/components/ForgetPassword/ForgetPassword';
import Home from './src/components/HomeScreen/HomeScreen';
import Lists from './src/components/Lists/Lists';
import Auth from '@react-native-firebase/auth';
import { Button, Container, Text } from 'native-base';
import Child from './src/components/Child/Child';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import { loginUser } from './src/store/actions/actions';
import MyDrawerNavigator from './src/routes/DraweNavigator';
import Toast, { BaseToast } from 'react-native-toast-message';

const App = () => {
  const initialState = {
    login: false,
  };
  const [state, setState] = useState(initialState);

  const AuthStack = createStackNavigator();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tabs = createBottomTabNavigator();

  useEffect(() => {
    // console.log(todos);
    Auth().onAuthStateChanged(user => {
      if (user) {
        // console.log("userLogin", user)
        setState({ ...state, login: true });
      } else {
        setState({ ...state, login: false });
      }
    });
  }, []);

  function MyStackSigninNavigator() {
    const todoState = useSelector(state => state.todo);

    useEffect(() => {
      console.log('todoState', todoState);
    }, []);
    return (
      <Stack.Navigator
        screenOptions={{
          title: 'My home',
          headerStyle: {
            backgroundColor: 'fff',
            opacity: 0.2,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: false,
        }}>
        <Stack.Screen name="login" component={SignIn} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="forget" component={ForgetPassword} />
      </Stack.Navigator>
    );
  }
  function MyTabNavigator() {
    return (
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let colorName = focused ? 'black' : '#717D7E';
            let iconName;
            if (route.name === 'Signin') {
              iconName = 'sign-in-alt';
            } else if (route.name === 'CreateAccount') {
              iconName = 'users';
            }

            return <Icon name={iconName} size={20} color={colorName} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: '#717D7E',
        }}>
        <Tabs.Screen name="Signin" component={MyStackSigninNavigator} />
        <Tabs.Screen name="CreateAccount" component={Signup} />
      </Tabs.Navigator>
    );
  }

  const { width, height } = Dimensions.get('screen');

  const toastConfig = {
    /* 
      overwrite 'success' type, 
      modifying the existing `BaseToast` component
    */
    success: ({ text1, props, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: 'red' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
        text1={text1}
        text2={props.uuid}
      />
    ),
  };


  return (
    // <Child />
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <NavigationContainer>
              {state.login ? <MyDrawerNavigator /> : <MyStackSigninNavigator />}
            </NavigationContainer>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
