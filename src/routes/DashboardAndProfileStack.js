import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { Button } from 'native-base'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../colors/colors';

import HomeScreen from '../Pages/HomeScreen/HomeScreen';
import UpdateProfile from '../Pages/UpdateProfile/UpdateProfile';

const DashboardAndProfileStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={({ navigation, route }) => ({
            headerStyle: {
                backgroundColor: colors.green,
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerRight: ({ }) => {
                if (route.name === "Dashboard")
                    return (
                        <Button transparent style={{ marginRight: 20 }}>
                            <Icon
                                name="user-circle"
                                size={25}
                                color={'#fff'}
                                onPress={() => {
                                    navigation.navigate("Profile")
                                }}
                            />
                        </Button>
                    );
            },
        })}>
            <Stack.Screen options={({ navigation }) => ({
                headerLeft: () => {
                    return (
                        <Button transparent style={{ marginLeft: 20 }}>
                            <Icon
                                name="bars"
                                size={25}
                                color={"#fff"}
                                onPress={_ => navigation.openDrawer()}
                            />
                        </Button>
                    )
                }
            })} name="Dashboard" component={HomeScreen} />
            <Stack.Screen name="Profile" component={UpdateProfile} />
        </Stack.Navigator>
    );
}

export default DashboardAndProfileStack

const styles = StyleSheet.create({})
