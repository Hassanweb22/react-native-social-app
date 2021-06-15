import React from 'react';
import { Button, Content, Container, Header, Left, Right, Body, Footer, FooterTab, Text, Title } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, DrawerLayoutAndroid, View } from 'react-native'
import Auth from "@react-native-firebase/auth"

const HeaderIconExample = (props) => {


    return (
        <Header style={{ backgroundColor: props.color }}>
            <Left style={{}}>
                <Button transparent>
                    <Icon name='arrow-left' size={20} color="#fff" />
                </Button>
            </Left>
            <Body style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginLeft: 30 }}>
                <Title>{props.title}</Title>
            </Body>
            <Right style={{}} >
                <Button transparent>
                    <Icon name='sign-out-alt' size={25} color="#fff"
                        onPress={() => Auth().signOut().then(() => console.log("User Logout")).catch(err => console.log(err))} />
                </Button>
            </Right>
        </Header>
    );
}
export default HeaderIconExample;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16
    },
    navigationContainer: {
        backgroundColor: "#ecf0f1"
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center"
    }
});