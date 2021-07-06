import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyPosts from '../../Pages/MyPosts/MyPosts';
import AddPost from '../../Pages/AddPost/AddPost';
import Comments from '../../Pages/Comments/Comments';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import colors from '../../colors/colors';

function StackPosts({ navigation, route }) {
    const Stack = createStackNavigator()

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "mycomments" || routeName === "AddPost") {
            navigation.setOptions({ tabBarVisible: false });
        } else {
            navigation.setOptions({ tabBarVisible: true });
        }
    }, [navigation, route]);


    return (
        <Stack.Navigator
            initialRouteName="AllPosts"
            screenOptions={({ route, navigation }) => ({
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
            <Stack.Screen
                options={({ route, navigation }) => ({
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
                name="MyPosts" component={MyPosts}
            />
            <Stack.Screen
                options={{
                    headerTitle: "Comments on my post",
                }}
                name="mycomments" component={Comments}
            />

            <Stack.Screen
                options={{
                    headerTitle: "Post Here",
                }}
                name="AddPost" component={AddPost}
            />
        </Stack.Navigator>
    );
}

export default StackPosts;

