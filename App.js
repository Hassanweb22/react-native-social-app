import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import SignIn from './src/components/Sigin/Sigin';
import Signup from './src/components/Signup/Signup';
import ForgetPassword from './src/components/ForgetPassword/ForgetPassword';
import Auth from '@react-native-firebase/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import MyDrawerNavigator from './src/routes/DraweNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  const initialState = {
    login: false,
  };
  const [state, setState] = useState(initialState);

  const Stack = createStackNavigator();

  useEffect(() => {
    Auth().onAuthStateChanged(user => {
      if (user) {
        // console.log("userLogin", user)
        setState({ ...state, login: true });
      } else {
        setState({ ...state, login: false });
      }
    });
    return () => console.log("user loged in")
  }, []);

  function MyStackSigninNavigator() {
    const todoState = useSelector(state => state.todo);

    // useEffect(() => {
    //   console.log('todoState', todoState);
    // }, []);
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




  return (
    <>
      <Provider store={store} >

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
