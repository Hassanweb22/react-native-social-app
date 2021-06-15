import {firebase} from '@react-native-firebase/auth';
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Auth} from './src/firebase/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

const ScreenContainer = ({children}) => (
  <View style={styles.container}>{children}</View>
);

export const Home = ({navigation}) => {
  // console.log("home", props.navigation)
  const data = {name: 'hassan', email: 'hasso@gmail.com', age: 22};
  return (
    <ScreenContainer>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', data)}
      />
      <Button
        title="LogOut"
        onPress={() => {
          return firebase.auth().signOut();
        }}
      />
    </ScreenContainer>
  );
};

export const Details = ({route, navigation}) => {
  console.log(route.params);
  return (
    <ScreenContainer>
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      {route.params?.name ? (
        <>
          <Text>{route.params.name}</Text>
          <Text>{route.params.email}</Text>
          <Text>{route.params.age}</Text>
        </>
      ) : null}
      <Button
        title="Update Title"
        onPress={_ => navigation.setOptions({title: 'Update Details'})}
      />
    </ScreenContainer>
  );
};

// export const SignIn = ({ navigation }) => {

//     return (
//         <ScreenContainer>
//             <Text>Sign In Screen</Text>
//             <Button
//                 title="Login"
//                 onPress={() => navigation.push("CreateAccount")}
//             />
//         </ScreenContainer>
//     );
// };
export const Register = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Register Screen</Text>
      <Button
        title="Create Account"
        // onPress={() => navigation.push("Home")}
      />
    </ScreenContainer>
  );
};

export const CreateAccount = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => navigation.push('Signin')} />
    </ScreenContainer>
  );
};
