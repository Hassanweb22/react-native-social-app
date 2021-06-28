import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Container, Text
} from 'native-base';
import {
    ScrollView, SafeAreaView, StatusBar, FlatList, Dimensions, ActivityIndicator,
} from 'react-native';

import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import IndividualPost from './IndividualPost'
import SkeletonLoading from '../SkeletonLoading/SkeletonLoading';


const Posts = ({ navigation }) => {
    // console.log("lists routes", route.params)

    const loginUser = useSelector(state => state.todo.loginUser);
    const currentUserUID = useSelector(state => state.todo.loginUser.uid);

    const [posts, setPosts] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        const dataFunc = () => {
            database()
                .ref(`users`)
                .on('value', snap => {
                    let temp = []
                    if (snap.exists()) {
                        Object.keys(snap.val()).map(userID => {
                            if (userID !== currentUserUID) {
                                if (snap.val()[userID]?.posts) {
                                    let userPost = snap.val()[userID]?.posts
                                    Object.keys(userPost).map(postKey => temp.push(userPost[postKey]))
                                }
                                else {
                                    console.log(snap.val()[userID].firstname, "user has no post",)
                                }
                            }
                        })
                        setPosts(temp)
                        setisLoading(false)
                    }
                    else {
                        setPosts([])
                        setisLoading(false)
                    }
                });
        };
        dataFunc();
        return () => console.log("Clear")
    }, []);

    const deleteTodo = id => {
        database().ref(`users/${loginUser.uid}/posts`).child(id).remove();
    };

    const skeleton = () => {
        return (
            <Container style={{ borderColor: "red", flex: 1, alignItems: "center", justifyContent: "flex-end", height: Dimensions.get("window").width }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </Container>
            // <SkeletonLoading />
        )
    }

    return (
        <Container style={styles.container} >
            <ScrollView>
                {isLoading ?
                    skeleton() :
                    posts.length > 0 ? posts.map(item => {
                        return <IndividualPost navigation={navigation} key={item.key} item={item} />
                    }) :
                        <Container style={{ borderColor: "red", flex: 1, alignItems: "center", justifyContent: "flex-end", height: Dimensions.get("window").width }}>
                            <Text style={{ fontWeight: "bold" }}>No Posts Available</Text>
                        </Container>
                }
            </ScrollView>
        </Container>
    );
};

export default Posts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        // marginHorizontal: 10,
        // borderColor: "red",
        borderWidth: 0.4
    },
    cardContainer: {
        flex: 1,
        // marginHorizontal: 10,
    },
    CardItem: {
        height: '20%',
    },
    listContainer: {
        height: '80%',
    },
    lists: {
        // backgroundColor: "#F7941E",
        paddingVertical: 10,
    },
    listItem: {
        backgroundColor: '#96ea93',
        borderRadius: 5,
        elevation: 5,
        marginVertical: 4,
        paddingLeft: 10,
    },
    icon: {
        marginHorizontal: 6,
    },
});
