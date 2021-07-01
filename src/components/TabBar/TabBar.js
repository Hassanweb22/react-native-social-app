import { Container, Content, Tab, Text, TabHeading, Tabs } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import StackPostsAll from '../../routes/StackPostsAll'
import StackPostMy from '../../routes/StackPostMy'
import AllPosts from '../AllPosts/AllPosts'
import MyPosts from '../MyPosts/MyPosts'
import CustomMessageStack from '../../routes/CustomMessageStack'
import colors from '../../colors/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const TabBar = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: "black"
            }} screenOptions={({ navigation, route }) => {
                return {
                    tabBarVisible: true,
                }
            }}>
            <Tab.Screen options={({ navigation, route }) => ({
                tabBarIcon: ({ color, focused }) => <Icon name="list" size={22} color={color} />
            })} name="PostAll" component={StackPostsAll} />

            <Tab.Screen options={({ navigation, route }) => ({
                tabBarIcon: ({ color, focused }) => <Icon name="list" size={22} color={color} />
            })} name="PostMy" component={StackPostMy} />

            <Tab.Screen options={({ navigation, route }) => {
                console.log("route", route.state.routeNames[1])
                let tabBarVisible = true;

                let routeName = route

                if (route.state.routeNames[1] == 'Chat') {
                    tabBarVisible = false
                }
                return {
                    tabBarIcon: ({ color, focused }) => <MaterialIcons name="message" size={22} color={color} />,
                    tabBarVisible: tabBarVisible
                }
            }} name="Contacts" component={CustomMessageStack} />
        </Tab.Navigator>
    )
}

export default TabBar

const styles = StyleSheet.create({})

        // <Container>
        //     <Tabs tabBarUnderlineStyle={{ backgroundColor: "green" }} style={{ backgroundColor: "green" }} tabBarActiveTextColor={colors.green} tabBarTextStyle={{ color: colors.green }}>
        //         <Tab heading={
        //             <TabHeading>
        //                 <Icon size={20} name="list" />
        //                 <Text>Post</Text>
        //             </TabHeading>}>
        //             <StackPostsAll />
        //         </Tab>
        //         <Tab heading={
        //             <TabHeading>
        //                 <Icon size={20} name="list" />
        //                 <Text>My Post</Text>
        //             </TabHeading>}>
        //             <StackPostMy />
        //         </Tab>
        //         <Tab heading={
        //             <TabHeading>
        //                 <MaterialIcons size={24} name="message" />
        //                 <Text>Contacts</Text>
        //             </TabHeading>}>
        //             <CustomMessageStack />
        //         </Tab>
        //     </Tabs>
        // </Container>

        // <View style={{ flex: 1 }}>
        //     <Tab.Navigator tabBarOptions={{
        //         activeTintColor: colors.green,
        //         inactiveTintColor: "black"
        //     }} screenOptions={{
        //         tabBarBadgeStyle: {
        //             backgroundColor: "red",
        //             marginHorizontal: 100
        //         }
        //     }}>
        //         <Tab.Screen options={({ navigation, route }) => ({
        //             tabBarLabel: "",
        //             tabBarIcon: ({ color, focused }) => <Icon name="list" size={22} color={color} />
        //         })} name="PostAll" component={StackPostsAll} />

        //         <Tab.Screen options={({ navigation, route }) => ({
        //             tabBarLabel: "",
        //             tabBarIcon: ({ color, focused }) => <Icon name="list" size={22} color={color} />
        //         })} name="PostMy" component={StackPostMy} />

        //         <Tab.Screen options={({ navigation, route }) => ({
        //             tabBarLabel: "",
        //             tabBarIcon: ({ color, focused }) => <MaterialIcons name="message" size={22} color={color} />
        //         })} name="MessagesStack" component={CustomMessageStack} />
        //     </Tab.Navigator>
        // </View>