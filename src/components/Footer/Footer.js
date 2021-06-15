import React from 'react'
import { View } from 'react-native'
import { Footer, FooterTab, Button, Text } from "native-base"
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const MyFooter = (props) => {
    return (
        <TouchableWithoutFeedback>
            <Footer>
                <FooterTab style={{ backgroundColor: props.color }}>
                    <Button full>
                        <Text style={{ color: "#fff" }}>Footer</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </TouchableWithoutFeedback>
    )
}

export default MyFooter
