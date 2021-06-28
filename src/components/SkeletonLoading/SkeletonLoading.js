import { Container } from 'native-base';
import React from 'react'
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const SkeletonLoading = () => {
    return (
        <ScrollView style={{ flex: 1, marginBottom: StatusBar.currentHeight }} contentContainerStyle={{ alignItems: "center" }}>
            <SkeletonPlaceholder>
                <View style={{ paddingLeft: 10, paddingRight: 10, marginVertical: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginLeft: 10 }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                            />
                        </View>
                    </View>
                    <View style={{ marginLeft: 15, marginTop: 10 }}>
                        <View style={{ width: 250, height: 8, borderRadius: 4, marginHorizontal: 0, marginTop: 5 }} />
                        <View style={{ width: 200, height: 8, borderRadius: 4, marginHorizontal: 0, marginTop: 5 }} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                        <View style={{ width: Dimensions.get('screen').width - 50, height: 150, borderRadius: 4, }} />
                    </View>
                </View>
                <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginLeft: 10 }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                            />
                        </View>
                    </View>
                    <View style={{ marginLeft: 15, marginTop: 10 }}>
                        <View style={{ width: 250, height: 8, borderRadius: 4, marginHorizontal: 0, marginTop: 5 }} />
                        <View style={{ width: 200, height: 8, borderRadius: 4, marginHorizontal: 0, marginTop: 5 }} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                        <View style={{ width: Dimensions.get('screen').width - 50, height: 150, borderRadius: 4, }} />
                    </View>
                </View>
                <View style={{ paddingLeft: 10, paddingRight: 10, marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginLeft: 10 }}>
                        <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                        <View style={{ marginLeft: 20 }}>
                            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                            <View
                                style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                            />
                        </View>
                    </View>
                    <View style={{ marginLeft: 15, marginTop: 10 }}>
                        <View style={{ width: 250, height: 8, borderRadius: 4, marginHorizontal: 0, marginTop: 5 }} />
                        <View style={{ width: 200, height: 8, borderRadius: 4, marginHorizontal: 0, marginTop: 5 }} />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                        <View style={{ width: Dimensions.get('screen').width - 50, height: 150, borderRadius: 4, }} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        </ScrollView>
    )
}

export default SkeletonLoading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
    }
})
