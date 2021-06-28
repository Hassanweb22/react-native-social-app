import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import MyPosts from '../components/MyPosts/MyPosts';
import AddPost from '../components/AddPost/AddPost';
import IndividualPost from '../components/AllPosts/IndividualPost';
import Comments from '../components/Comments/Comments';
import colors from '../colors/colors';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Auth from "@react-native-firebase/auth"
import { useDispatch } from "react-redux"
import { loginUser } from '../store/actions/actions';

function StackPosts() {
    const dispatch = useDispatch()
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator initialRouteName="AllPosts" screenOptions={({ route, navigation, focs }) => ({
            headerStyle: {
                backgroundColor: colors.green,
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerRight: () => {
                return (
                    route.name === "MyPosts" && <Button transparent style={{ marginRight: 20 }}>
                        <Icon
                            name="plus-circle"
                            size={25}
                            color={'#fff'}
                            onPress={() => navigation.navigate('AddPost')}
                        />
                    </Button>
                );
            }
        })}>
            <Stack.Screen options={({ route, navigation }) => ({
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
            })} name="MyPosts" component={MyPosts} />
            <Stack.Screen options={{
                headerTitle: "Comments on my post",
            }} name="mycomments" component={Comments} />

            <Stack.Screen options={{
                headerTitle: "Post Here",
            }} name="AddPost" component={AddPost} />
        </Stack.Navigator>
    );
}

export default StackPosts;

const styles = StyleSheet.create({})
