import React, { useState, useEffect } from 'react'
import { Body, Card, CardItem, Container, Left, List, ListItem, Text, Thumbnail } from 'native-base'
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import colors from '../../colors/colors';
import IndividualUser from './IndividualUser';


const Users = ({ navigation }) => {
    const currentUserUID = useSelector(state => state.todo.loginUser.uid);
    const isDark = useSelector(state => state.todo.dark)

    const initialState = {
        users: {}
    }
    const [state, setState] = useState(initialState)
    const [currentUser, setcurrentUser] = useState()
    const [profileLoad, setProfileLoad] = useState(false);


    useEffect(() => {
        database().ref(`users`).on("value", snap => {
            setState({ ...state, users: snap.val() })
            // console.log(snap.val(), "users message")
        })
        database().ref(`users/${currentUserUID}`).on("value", snap => {
            setcurrentUser(snap.val())
        })
        return () => console.log("Messages unmounted")
    }, [])

    return (
        <Container style={{ flex: 1, padding: 10, borderWidth: 0, borderColor: "green", backgroundColor: isDark ? colors.dark : "#fff" }}>
            <StatusBar barStyle="light-content" backgroundColor={colors.green} />
            {/* <CardItem header style={{ justifyContent: "center" }}>
                <Text style={{ color: "green", fontWeight: "bold" }}>Messages</Text>
            </CardItem> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {Object.keys(state.users).map(key => {
                    return key !== currentUserUID && <IndividualUser currentUser={currentUser} navigation={navigation} key={key} user={state.users[key]} userKey={key} />
                })}
            </ScrollView>
        </Container>
    )
}

export default Users

const styles = StyleSheet.create({})
