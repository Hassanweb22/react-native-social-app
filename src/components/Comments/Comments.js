import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Body, Card, CardItem, Container, Content, Text } from "native-base"

import IndividualComments from './IndividualComments'

const Comments = ({ route }) => {
    console.log("Comments Props", route.params)
    return (
        <Container>
            <ScrollView>
                <IndividualComments />
                <IndividualComments />
                <IndividualComments />
                <IndividualComments />
                <IndividualComments />
                <IndividualComments />
            </ScrollView>
        </Container>
    )
}

export default Comments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
