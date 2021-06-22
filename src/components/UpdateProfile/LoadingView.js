import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'

const LoadingView = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color="black" />
        </View>
    )
}

export default LoadingView;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100 / 2,
        opacity: 0.6
    }
});