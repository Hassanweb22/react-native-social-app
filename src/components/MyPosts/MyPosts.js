import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Text,
    Left,
    Right,
    Card,
    CardItem,
} from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';
import {
    Alert,
    Modal,
    Pressable,
    ScrollView,
    SafeAreaView,
    StatusBar,
    FlatList,
    Dimensions,
} from 'react-native';

import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import IndividualPost from '../AllPosts/IndividualPost'


const Posts = ({ navigation }) => {
    // console.log("lists routes", route.params)

    const loginUser = useSelector(state => state.todo.loginUser);
    const currentUserUID = useSelector(state => state.todo.loginUser.uid);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let uid = loginUser.uid;
        const dataFunc = () => {
            database()
                .ref(`users/${uid}`)
                .on('value', snap => {
                    let temp = []
                    if (snap.exists()) {
                        if (snap.val()?.posts) {
                            let userPost = snap.val().posts
                            Object.keys(userPost).map(postKey => temp.push(userPost[postKey]))
                        }
                        else {
                            console.log(snap.val().fisrtname, "has no post",)
                        }

                        console.log('My posts', temp);
                        setPosts(temp)
                    }
                });
        };
        dataFunc();
        return () => console.log("Clear")
    }, []);

    const deleteTodo = id => {
        database().ref(`users/${loginUser.uid}/posts`).child(id).remove();
    };

    return (
        <Container style={styles.container} >
            <ScrollView>
                {posts.length > 0 ? posts.map(item => {
                    return <IndividualPost mypost navigation={navigation} key={item.key} postID={item.key} item={item} />
                }) :
                    <Container style={{ borderColor: "red", flex: 1, alignItems: "center", justifyContent: "flex-end", height: Dimensions.get("window").width }}>
                        <Text style={{ fontWeight: "bold" }}>You Have No Posts</Text>
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
        borderWidth: 0.5
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
