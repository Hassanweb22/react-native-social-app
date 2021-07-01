import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import TabBar from '../components/TabBar/TabBar';
import colors from '../colors/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const TabStack = () => {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator screenOptions={({ navigation, route }) => {
            let tabBarVisible = true;

            let routeName = navigation.state.routes[navigation.state.index].routeName

            if (routeName == 'Chat') {
                tabBarVisible = false
            }
            return {
                tabBarVisible,
                headerStyle: {
                    backgroundColor: colors.green,
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
                headerShown: true
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
                name="Tabs" component={TabBar} />
        </Stack.Navigator>
    )
}

export default TabStack

const styles = StyleSheet.create({})
