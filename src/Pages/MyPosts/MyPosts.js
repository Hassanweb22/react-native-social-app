import React, { useEffect, useState } from 'react';
import { Container, Text } from 'native-base';
import { StatusBar, FlatList, ActivityIndicator, } from 'react-native';

import { View, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import IndividualPost from '../../components/IndividualPost/IndividualPost'
import colors from '../../colors/colors';


const Posts = ({ navigation }) => {

    const currentUserUID = useSelector(state => state.todo.loginUser.uid);
    const isDark = useSelector(state => state.todo.dark);

    const [posts, setPosts] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);


    const dataFunc = () => {
        database()
            .ref(`users/${currentUserUID}/posts`)
            .on('value', snap => {
                let temp = []
                if (snap.exists()) {
                    let userPost = snap.val()
                    Object.keys(userPost).map(postKey => temp.push(userPost[postKey]))
                    temp.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setPosts(temp)
                    setisLoading(false)
                    setIsFetching(false)
                } else {
                    setisLoading(false)
                    setPosts([])
                }
            });
    };


    useEffect(() => {
        dataFunc()
        // return () => 
    }, []);


    const skeleton = () => {
        return (
            <Container style={{
                alignItems: "center", justifyContent: "center", backgroundColor: isDark ? colors.dark : "#fff"
            }}>
                <ActivityIndicator size="large" color={isDark ? "lightgreen" : "#000"} />
            </Container>
        )
    }

    const onRefresh = () => {
        setIsFetching(true)
        dataFunc()
    }

    return (
        <Container style={[styles.container, { backgroundColor: isDark ? colors.dark : "#fff" }]} >
            <StatusBar barStyle="light-content" backgroundColor={colors.green} />
            {isLoading ?
                skeleton() :
                posts.length ?
                    <FlatList
                        refreshing={isFetching}
                        onRefresh={() => onRefresh()}
                        data={posts}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => <IndividualPost mypost navigation={navigation} key={item.key} postID={item.key} item={item} />}
                    />
                    :
                    <Container style={{
                        borderColor: "red", borderWidth: 0, alignItems: "center", justifyContent: "center",
                        backgroundColor: isDark ? colors.dark : "#fff"
                    }}>
                        <Text style={{ fontWeight: "bold", color: isDark ? "#fff" : "#000" }}>You Have No Posts</Text>
                    </Container>
            }
        </Container>
    );
};

export default React.memo(Posts);

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
