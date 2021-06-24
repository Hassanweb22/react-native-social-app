import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { Body, Button, Card, CardItem, Container, Content, Form, Input, Item, Label, Text } from "native-base"
import IndividualComments from './IndividualComments'
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../colors/colors';
import { useSelector } from 'react-redux';
import database from "@react-native-firebase/database"
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Comments = ({ route }) => {
    const { item } = route.params

    const currentUserUID = useSelector(state => state.todo.loginUser.uid);
    const initialState = {
        comment: ""
    };
    const initialError = {
        comment: '',
    };

    const [state, setState] = useState(initialState);
    const [allComments, setAllComments] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [errors, setError] = useState(initialError);

    useEffect(() => {
        console.log("Comments Props", route.params)
        database().ref(`users/${item.userID}/posts/${item.key}/comments`).on("value", snap => {
            if (snap.exists()) {
                console.log(snap.val())
                setAllComments(snap.val())
                setisLoading(false)
            }
            else {
                setisLoading(false)
                setAllComments({})
            }
        })
        return () => console.log("clenaup comments")
    }, [item])

    const onChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    };

    const handleSubmit = () => {
        if (state.comment) {
            let comKey = database().ref(`users/${item.userID}/posts/${item.key}/comments`).push().key
            let time = new Date()
            let obj = { comment: state.comment, comKey, postID: item.key, createdAt: time, commentBy: currentUserUID }
            // console.log("obj", obj)
            database().ref(`users/${item.userID}/posts/${item.key}/comments`).child(comKey).set(obj, err => {
                if (err) {
                    return console.log('error', err);
                }
                console.log('comment submitted');
                setState(initialState);
            })
        }
    }

    const showData = () => {
        if (isLoading) return true
    }

    return (
        <Container>
            <ScrollView>
                {isLoading ?
                    <View style={{
                        flex: 1, position: "relative",
                        height: Dimensions.get("screen").height - 170, justifyContent: "center", alignItems: "center"
                    }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View> :
                    !!Object.keys(allComments).length ? Object.keys(allComments).map(key => {
                        return <IndividualComments key={key} comment={allComments[key]} post={item} />
                    }) :
                        <View style={{
                            flex: 1, position: "relative",
                            height: Dimensions.get("screen").height - 170, justifyContent: "center", alignItems: "center"
                        }}>
                            <Text style={{ fontWeight: "bold" }}>No Comments Add One</Text>
                            {/* <ActivityIndicator size="large" color="#0000ff" /> */}
                        </View>
                }
            </ScrollView>
            <CardItem cardBody style={styles.addComment}>
                <Form style={{ borderWidth: 0, width: "100%" }}>
                    <Item rounded placeholder placeholderLabel="Comment">
                        <Input placeholder="Comment Here..." numberOfLines={5}
                            value={state.comment} onChangeText={(value) => onChangeText(value, "comment")}
                        />
                        <TouchableOpacity disabled={!state.comment} onPress={handleSubmit} style={{ borderWidth: 0, paddingHorizontal: 10 }}>
                            <Text>
                                <Icon name="send" color={state.comment ? colors.green : "grey"} size={30} />
                            </Text>
                        </TouchableOpacity>
                    </Item>
                </Form >
            </CardItem>
        </Container >
    )
}

export default Comments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomCard: {
        elevation: 5,
        // borderWidth: 0.5,
        borderRadius: 10,
        // marginLeft: 10,
        // marginRight: 10,
        // marginBottom: 20,
        // paddingHorizontal: 5,
        // paddingVertical: 10
    },
    addComment: {
        flexDirection: "row",
        position: "relative",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.green,
        borderRadius: 30,
        marginVertical: 15,
        marginHorizontal: 10,
        elevation: 10,
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // shadowColor: colors.green
    }

})
