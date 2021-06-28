import { Container } from 'native-base';
import React from 'react'
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const CommentLoading = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: StatusBar.currentHeight }} contentContainerStyle={{ alignItems: "center" }}>
            <SkeletonPlaceholder>
                <View style={{ paddingLeft: 0, paddingRight: 0, marginVertical: 20 }}>
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
                        <View style={{ width: 150, height: 8, borderRadius: 4, marginHorizontal: 0, marginTop: 5 }} />
                    </View>
                </View>
                <View style={{ paddingLeft: 0, paddingRight: 0, marginVertical: 20 }}>
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
                        <View style={{ width: 150, height: 8, borderRadius: 4, marginHorizontal: 0, marginTop: 5 }} />
                    </View>
                </View>
                <View style={{ paddingLeft: 0, paddingRight: 0, marginVertical: 20 }}>
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
                        <View style={{ width: 150, height: 8, borderRadius: 4, marginHorizontal: 0, marginTop: 5 }} />
                    </View>
                </View>
                <View style={{ paddingLeft: 0, paddingRight: 0, marginVertical: 20 }}>
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
                        <View style={{ width: 150, height: 8, borderRadius: 4, marginHorizontal: 0, marginTop: 5 }} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        </ScrollView>
    )
}

export default CommentLoading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
    }
})
