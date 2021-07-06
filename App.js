import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen'
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  StatusBar, SafeAreaView, Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import MyDrawerNavigator from './src/routes/Navigators/DrawerNavigator/DraweNavigator';
import Toast from 'react-native-toast-message';
import colors from './src/colors/colors';
import AuthNavigator from './src/routes/Navigators/AuthNavigator/AuthNavigator';

const THEME_COLOR = colors.green;


const App = () => {

  const initialState = {
    login: false,
  };
  const [state, setState] = useState(initialState);


  const unsubscribe = () => {
    Auth().onAuthStateChanged(user => {
      if (user) {
        setState({ ...state, login: true });
      } else {
        setState({ ...state, login: false });
      }
    });
  }

  useEffect(() => {
    SplashScreen.hide()
    return unsubscribe()
  }, []);



  return (
    <>
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          {Platform.OS === "android" ? <SafeAreaView style={[styles.topSafeArea,
          { backgroundColor: colors.green }]} /> : null}
          <StatusBar barStyle="light-content" backgroundColor={Platform.OS === "ios" ? "transparent" : colors.green} />
          <NavigationContainer>
            {state.login ? <MyDrawerNavigator /> : <AuthNavigator />}
          </NavigationContainer>
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
  topSafeArea: {
    flex: 0,
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: THEME_COLOR
  },
});
