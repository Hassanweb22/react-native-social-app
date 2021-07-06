import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import StackPostsAll from '../../StackNavigators/StackPostsAll'
import StackPostMy from '../../StackNavigators/StackPostMy'
import CustomMessageStack from '../../StackNavigators/CustomMessageStack'
import colors from '../../../colors/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';


const TabBar = () => {
    const Tab = createBottomTabNavigator();
    const isDark = useSelector(state => state.todo.dark);


    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#fff",
                inactiveTintColor: "black",
                keyboardHidesTabBar: true,
                safeAreaInsets: {
                    bottom: 90,
                    top: 90
                },
                showLabel: false,
                style: {
                    borderTopWidth: 0,
                    // marginVertical: (Platform.OS === 'ios') ? 20 : 10,
                    marginBottom: (Platform.OS === 'ios') ? 20 : 0,
                    paddingBottom: 7,
                    paddingTop: 7,
                    height: 55,
                    backgroundColor: colors.green,
                    shadowColor: isDark ? "#fff" : "#000",
                    shadowOffset: {
                        width: -2,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 5,
                },

            }} screenOptions={({ navigation, route }) => {
                return {
                }
            }}>
            <Tab.Screen options={({ navigation, route }) => ({
                tabBarIcon: ({ color, focused }) => <Icon name="list" size={22} color={color} />
            })} name="PostAll" component={StackPostsAll} />

            <Tab.Screen options={({ navigation, route }) => ({
                tabBarLabel: "My Post",
                tabBarIcon: ({ color, focused }) => <Icon name="user" size={22} color={color} />
            })} name="PostMy" component={StackPostMy} />

            <Tab.Screen options={({ navigation, route }) => {
                return {
                    tabBarVisible: false,
                    tabBarIcon: ({ color, focused }) => <MaterialIcons name="message" size={22} color={color} />,
                }
            }} name="Contacts" component={CustomMessageStack} />
        </Tab.Navigator>
    )
}

export default TabBar;

const styles = StyleSheet.create({})
