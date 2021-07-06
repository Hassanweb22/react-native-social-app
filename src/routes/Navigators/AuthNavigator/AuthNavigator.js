import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../../../Pages/Sigin/Sigin';
import Signup from '../../../Pages/Signup/Signup';
import ForgetPassword from '../../../Pages/ForgetPassword/ForgetPassword';
import { useSelector } from 'react-redux';


function AuthNavigator() {
  const Stack = createStackNavigator();

  const todoState = useSelector(state => state.todo);

  React.useEffect(() => {
    //   console.log('todoState', todoState);
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


export default AuthNavigator
