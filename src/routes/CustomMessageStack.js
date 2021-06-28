import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Messages from "../components/Messages/Users"
import Chats from "../components/Messages/Chats"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'native-base';
import colors from '../colors/colors';


const CustomMessageStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={({ navigation, route }) => ({
            headerStyle: {
                backgroundColor: colors.green,
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",

        })}>
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
