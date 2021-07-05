import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AllPosts from '../Pages/AllPosts/AllPosts';
import Comments from '../Pages/Comments/Comments'
import AddPost from '../Pages/AddPost/AddPost';
import colors from '../colors/colors';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from "react-redux"
import { loginUser } from '../store/actions/actions';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


function StackPosts({ navigation, route }) {
    const dispatch = useDispatch()
    const Stack = createStackNavigator()

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "comments" || routeName === "AddPost") {
            navigation.setOptions({ tabBarVisible: false });
        } else {
            navigation.setOptions({ tabBarVisible: true });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator initialRouteName="AllPosts" screenOptions={({ route, navigation, focs }) => ({
            headerStyle: {
                backgroundColor: colors.green,
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerRight: () => {
                return (
                    route.name === "AllPosts" && <Button transparent style={{ marginRight: 20 }}>
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
                headerTitle: "Feeds",
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
                name="AllPosts" component={AllPosts}
            />
            <Stack.Screen name="comments" component={Comments} />
            <Stack.Screen name="AddPost" component={AddPost} />
        </Stack.Navigator>
    );
}

export default StackPosts;

const styles = StyleSheet.create({
    addButton: {
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#fff",
        paddingHorizontal: 8,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})
