import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Messages from "../components/Messages/Users"
import Chats from "../components/Messages/Chats"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'native-base';
import colors from '../colors/colors';
import { getFocusedRouteNameFromRoute, ge } from '@react-navigation/native';



const CustomMessageStack = ({ navigation, route }) => {
    const Stack = createStackNavigator()
    console.log("getFocusedRouteNameFromRoute", getFocusedRouteNameFromRoute(route))
    if (getFocusedRouteNameFromRoute(route) !== "Messages") {
        navigation.setOptions({ tabBarVisible: false, title: "false" })
    }
    else {
        navigation.setOptions({ tabBarVisible: true })
    }
    return (
        <Stack.Navigator screenOptions={({ navigation, route }) => {
            return {
                headerStyle: {
                    backgroundColor: colors.green,
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
            }
        }}>
            <Stack.Screen options={({ navigation }) => ({
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
                }
            })}
                name="Messages" component={Messages} />
            <Stack.Screen options={({ route }) => ({
                headerTitle: route.params.title
            })}
                name="Chat" component={Chats} />
        </Stack.Navigator>
    )
}

export default CustomMessageStack

const styles = StyleSheet.create({})
