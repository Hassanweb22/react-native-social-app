import React, { useState } from 'react';
import CustomHeader from "../Header/Header"
import TodoForm from "../Form/Form"
import TodoLists from "../Lists/Lists"
import { Container, Content } from 'native-base';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native"

const Main = ({ navigation }) => {
    const initialTodos = [
        { name: "Hassan", age: 20 }, { name: "Kashif", age: 22 }, { name: "hammad", age: 25 }
    ]

    const [todos, setTodos] = useState(initialTodos)

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Container>
                <CustomHeader color="#4DAD4A" />
                <Content style={styles.content} padder>
                    <TodoForm todos={todos} navigation={navigation} />
                </Content>
            </Container>
        </TouchableWithoutFeedback>
    );
}

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})


