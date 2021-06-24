import React, { useState, useEffect } from 'react'
import MyColors from "../../colors/colors"
import { StyleSheet, View, Image, ScrollView, Alert } from 'react-native'
import { Body, Card, Text, CardItem, Content, Left, Thumbnail, Button, Container, Right } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5"
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import LoadingView from '../UpdateProfile/LoadingView'
import { useSelector } from 'react-redux'
import Toast, { BaseToast } from 'react-native-toast-message';

const IndividualPost = (props) => {
    const { item, navigation, mypost } = props
    const currentUserUID = useSelector(state => state.todo.loginUser.uid);
    const temURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXBx9D///+9w83Y3OHDydL19vfS1t3q7O/IzdXt7/HN0tnd4OXGy9Tl5+v4+frg4+dnyPTjAAAKUUlEQVR4nN2d28KjKgyFGUTF8/u/7dba/tWWQ0IWSve6mYuZqX5yTEiC+pdfc9cuQ9X01o7GKGNGa/umGpa2my94usr543M3VdboVcql7S+Mraa8oLkI53boNzI324lzI+2HNhdmDsJ5aoyn2QKg2jRTDko4YVdZNt2b0lYd+oWwhG2jkvFekKppoe8EJNzwRHRvSiQkirCuQHhPSFXVoDfDEE4WifeEtBPk3QCE8wBtvgOjGgCTq5iwbvLgPSEbcWcVEublgzCKCOs+Nx+AUUA4Z2+/N6NgPKYTVlfxPRirywmnC/F2pa4daYT1eGUD7tJj2nBMIry0gx4Yk7pqAmF3C96uBMuDT3jZDOpSQjNyCTtzI98mwx2NTMLhzgbcpYeMhHMGE4IvbVnrP4fwzinmLM6EwyAsoIe+pJcchJfssqnSPZxwHu+G+tBIHYxEwvpuIIeIywaNsC2ph76kafMNiXAqEXBFJJkbFMKlTEDilEogLBaQhhgnLGgZ/BZhCxclLBqQghgjLLiL7op21AhhobPoUbEZNUz4A4BRxCBh9wuAsaU/RFj/BqAKb+BChHe/N0NphPbu12bIphD26Ld4hJXswh84+u1FLyF2IdRbmMXSdnU913XXLlvABvYB3mXRR4icRrVqpu+5oJ5QkQ37Q3wTqodwBj668U/mHdK97DH6PYSoWUabmA03GRSkZ7ZxE4K223E+JKNnE+4kxAxCTT7ymzAD0j0UnYSQswndEPk2YcajoRI2iKcpXuBWC3mm66M6CBGONR3YZLg1IyY37fisDkLEk1JOayEnyxTCSv4YzrHCQYht1Pen/SIEmEw0P6ZDAINbf22evgjl5xPJgBDEMUYof0ZiF90l76hf3/eTUPoASfTSJsB0EyaUTzPsZeJD8kXj4xOfCWf4F+RL/Ab6bGSc30i8myGeeIUk3xSfdzYnQvlKIRuEu8Qj5bxinAjlrhkAIKCfnpw2x3cSN6FgJTxKvGKdGvFIKG5C6Tz6kng+PTbigVDehKhMF7F1c2zEA6F4Iv3aMCVLvHU8TKdvQvFaCBqFm+Qj8b0mvgkH4Y+CJtLna0n19kq9X6uItfAl+fb0mxA7RUsFXLj+CMUztNPRlSyxu+9v5XoRyj8aspMCuulfl1KwX8Qm8Ir3339f/EUo/L0vm0UqnB33/FPuI0Xt2F4SL/qvHdaTUO7m5vjwKYK90ZNQ3ick/ieXFvEb6SOhvJPCdt0vwV5pJ5R3CfBUCjnhaw6E4h/D7mg2IXzvb0LA9wIvFpDlYu9XD0KAG1aDARGT377oPwgBR3clEu5r9EYI6BBlEj6GzkaIiCItcRzuJtRGiDi3L5LwsV5shIjQixJXi91mVaCvVeCeRu09S6GSmsrbl6r9uytIaALcxEfl/FcPQkyUHto+hL2Vgiw8Cr8gwt5KYSaa8vw0z7eaV0JU9iQzTT4iuQf+ofW7K8ykpZDnMptQIbzLSoiJRATvakBDZ9vVKFxaBXJFRHWsdTJVmHDZTchuCsuNNysh6reQsykwF+KfAqZv0escxITL19G1An4umH0B/Oq6U8iiXahGRKZcTQo2aynYSIQmdi4KmquN2X4ji4zoQUFsp7/fQ6yJ2Ky5SqG2NLsAGxvYdmZXo8CJlPJ+Ci6E0yt0LqzU1oeOmlUWTiiMjIJXALAKXh1JtGTgKwBYha+hJ9jaZKgAYDIQpiPmKHGQqQpiWkfNVKQiC2OSBzxPmZEsvVQlOYgzlX01+Ll0F7N8Y76ikyN8PXyLszDmK7yMX/Hf0pY6p9YZq4Za9L70JFql8byVz3uwbfEhHa8Yn7syf4O1Dx0KX1OR42KMsyqsje+U1r2jtMnaessFJVFXGx/ppwk8SPWHm6u2m676TNd+fGqB+trCehQXMsYo7yVeOTQh/aUlSndIn3eJ0jXw3KJMIc+eipRBnh8WKQs8Ay5TDfAcv0wtwFiMIqVbXDxNmXrE04Cij8qUBsa1lSmLi00sVBUwvrRIPeNL/8dTzTNG+H+8b3vGeSN2NTqH5K/1itWXudO1Gvsqj/pR5gj4y7dIH4ju6rJI1YugUu1fzkzqiqgtOgXBrWSH3F/eU9qhiO7ztt5RadeBHnLXEnw12sIv0A6qS2jHQ/4h35PBvfwMIH5HO+SQ8teLaxtwF/tStGMeMHPjRr5NCivmrVqnXG6eBYVOj6GLNemf8vFZ3RRbpoUnzgbzXFOB003v6aK7GLXiP+pi0GdTeGkBnhgL24vs+Sd5LkZn4XFFtde/6tNQjy+wuT8pIk6oXzWGiNPUzX10E7GfftWJIppQuJSKdJFiKxy1vkhLYgFNSGzEd8Inr+befWv9UZQB5aq5R7GDcZURJSKctDjrJhL2NfDCCWkitIWz9iVhwSijkxK6qad+aXSSgufcpyq6PfHUoI02IrwyRKpiu2hvHeFYI8Kre6Qq1hTeWtCx/1nIRBOdagL1vGPT6aUYIYVfM1CTPfJx7jR9zwoawsG6+mHb5EcIg3cjhNv/Rwg//i3njpKfIIzeURIyMH+CMHrPTGjF+AVCwl1BgcnmFwgJ9z0FJptfIPz+t5x718onJN675t3ZlE9IvDvP+wPFE5LvP/T5ekonZNxh6bmHtHBCzj2kPj8BunJgspxvx7pL1nPGc8PZtlPuTsq7D9gzFItAnN19lHmns6/CSAHOqNrdvdj3cvucNqw7cHPIE6+QcLe61yvJTGEGy2PdBTy5AULvifKNLjefpzTw1UPeJZ8hBbzYiSlP8FfQzRn0n/nOsW4ajL6QofCZX9hD6PVp3DEYffWjIl0q4gP1Il7u4fcWXYiNmZiX11t46+Ke6r2ZPFpeLOrH9uZ6a+bt6RL5ixLEd1lxT70/nZ1WMgGgyRsITdhGEs4i/BXi9CXH3oGqGZQKeJTTloCXWI/ZozMCx6GkhZl0nhRyhGcO9w6VGKTN57QTs2AIS8bhOJnQg2ndh3gm6DZZXoi6ysIY5qNuj8mnnsGAOUKVFraWMB85LoR+rhtJedA9cnmcq3CmjKYH2DFOrmN1XrRZQJ21jSWQcLwpnLP5eMgcoiHrSPMpZgAhK/qAUHJMq0YCWQ9j/BE8w4YZX0GpSLRBJnXXbqCk/nD9fdwIko6UD6C1HXibnW4hFh0y3E0UP0aGWptL67EiJSfWbWWpCaMJNltCFBAn/2jF3ApEuUHnbhoay0mHZTdgGiE3jUw/soSN7ZumGoahqqqm6a3hp/qmuaPTIrlSywA+/ldiCjO9SCGCMGcpR59STdH0aLxM9UbdEpyXCOIN81Z0PPFJ7DNRRGVaAjKbT2ZjC2NG8zOKfQjiqNi81TkBdicg7nceMhV51GoAmGOYyOYcZUjDhU/pQsVuE6w6Fp6qUG4RYHR6K6jR8YEnsjE/hI2/3yBllBqL9w9NuKqjm0IOPFvBfeg5cijmqTFsytX6aKYcbtdcWSJzO/RU62j9d/2Q5vggKGsezNwtjX3UDfaRKWObpct6SHdFpk/dtctQrVavHY1Rxox2tYarYWk9tj9W/wHyKYDIdACaHQAAAABJRU5ErkJggg=="


    const [user, setUser] = useState({})
    const [userLikedPost, setUserLikedPost] = useState(false)
    const [profileLoad, setProfileLoad] = useState(false);
    const [imageLoad, setImageLoad] = useState(false);
    const [actions, setActions] = useState(false);

    useEffect(() => {
        const datafunc = () => {
            database().ref(`users/${item?.userID}`).on("value", data => {
                if (data.exists()) {
                    setUser(data.val())
                }
            })
        }
        datafunc()
        return () => setUser({})
    }, [])

    const findLikes = () => {
        if (new Object(item).hasOwnProperty("likes")) {
            let likesCount = Object.keys(item?.likes).length
            if (likesCount === 1) return likesCount + " Like"
            else return likesCount + " Likes"
        }
        else {
            return 0 + " Likes"
        }
    }
    const findComments = () => {
        if (new Object(item).hasOwnProperty("comments")) {
            let commentCount = Object.keys(item?.comments).length
            if (commentCount === 1) return commentCount + " comment"
            else return commentCount + " comments"
        }
        else {
            return 0 + " comments"
        }
    }


    const handleDelete = (key) => {
        const deletePost = async () => {
            await database().ref(`users/${item.userID}/posts/${item.key}`).remove().then(async () => {
                Toast.show({
                    type: "success",
                    position: "top",
                    topOffset: 40,
                    text1: 'Delete',
                    text2: 'Your Post has been Deleted 👍 '
                });
                await storage().ref(`usersProfile/${item.userID}/posts`).child(key).delete()
                    .then(_ => {
                        console.log("Deleted File from storage succefuully")
                    }).
                    catch(err => console.log("stoarge err", err))
            }).catch(err => console.log(err))
        }
        Alert.alert(
            "Delete",
            "Do You want to permanently delete it?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deletePost() }
            ]
        );


    }

    const handleLike = async () => {

        if (userLikedPost) {
            await database().ref(`users/${item.userID}/posts/${item.key}/likes`).child(currentUserUID).remove()
            setUserLikedPost(false)
        }

        else {
            await database().ref(`users/${item.userID}/posts/${item.key}/likes`).child(currentUserUID).set({
                LikerID: currentUserUID
            }, err => {
                if (err) {
                    return console.log(err)
                }
                else setUserLikedPost(true)
            })
        }

    }

    const { photoURL, firstname, lastname } = user

    return (
        <View style={{ flex: 0, margin: 10 }}>
            <Card style={styles.card} onTouchEnd={() => actions && setActions(false)}>
                <CardItem >
                    <Left style={{ borderWidth: 1, borderColor: "transparent" }}>
                        <View>
                            <Thumbnail small source={{ uri: photoURL ? photoURL : temURI }}
                                onLoadStart={() => {
                                    // console.log("image load true")
                                    return setProfileLoad(true)
                                }}
                                onLoadEnd={_ => {
                                    setProfileLoad(false)
                                }}
                            />
                            {profileLoad && <LoadingView />}
                        </View>
                        <Body style={{
                            // borderWidth: 1,
                            // borderColor: "red"
                        }}>
                            <Text>{firstname + " " + lastname}</Text>
                            <Text note style={{ fontSize: 12 }}>{new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString()}</Text>
                        </Body>
                        {(item.userID === currentUserUID && !actions) &&
                            <Icon onPress={() => setActions(true)} name="ellipsis-v" size={20} color="#66BB6A" />}
                    </Left>
                    {actions &&
                        <Right style={{
                            borderWidth: 1, borderColor: "red", flex: 0.55, flexDirection: "row", justifyContent: "space-around",
                            borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5,
                            borderColor: MyColors.green, backgroundColor: "#e8f5e9c7",
                        }}>
                            <Icon onPress={() => console.log("edit")} name="edit" size={25} color="#66BB6A" />
                            <Icon onPress={() => handleDelete(item.key)} name="trash" size={25} color="#F44337" />
                        </Right>
                    }
                </CardItem>
                <CardItem >
                    <View style={{ position: "relative", width: "100%" }}>
                        <View style={{ flex: 1, paddingVertical: 10, paddingLeft: 4, borderBottomWidth: !item.picURL ? 1 : 0, borderColor: "#dcdfe2" }}>
                            <Text style={{}}>{item.title}</Text>
                        </View>
                        {item.picURL && <View style={{ position: "relative", width: "100%", height: 200, borderRadius: 4, borderWidth: 0.5, borderColor: "grey" }}>
                            <Image source={{ uri: item.picURL }}
                                style={{ height: "100%", width: "100%", position: "absolute", borderRadius: 4 }}
                                onLoadStart={() => {
                                    // console.log("image load true")
                                    return setImageLoad(true)
                                }}
                                onLoadEnd={_ => {
                                    setImageLoad(false)
                                }}
                            />
                            {imageLoad && <LoadingView postPic />}
                        </View>}
                    </View>
                </CardItem>
                <CardItem cardBody style={{ marginHorizontal: 10, paddingHorizontal: 20, marginVertical: 5 }}>
                    <Left>
                        <Button onPress={_ => handleLike()} transparent
                            style={{
                                borderRadius: 10, paddingRight: 0, paddingLeft: 10,
                                borderColor: MyColors.green, backgroundColor: "#e8f5e9c7",
                            }}
                        >
                            <Icon name="thumbs-up" size={14} color={userLikedPost ? "green" : "black"} />
                            <Text style={{
                                color: userLikedPost ? MyColors.green : "black",
                                fontWeight: userLikedPost ? "700" : "400",
                                fontSize: 12, textAlign: "center"
                            }}>{findLikes()}</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button onPress={() => navigation.navigate(mypost ? "mycomments" : "comments", { item, user })} transparent
                            style={{
                                borderRadius: 10, paddingRight: 0, paddingLeft: 10,
                                borderColor: MyColors.green, backgroundColor: "#e8f5e9c7"
                            }}>
                            <Icon name="comments" size={15} color={"green"} />
                            <Text style={{ color: MyColors.green, fontSize: 12, textAlign: "center" }}>{findComments()}</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        </View>
    )
}

export default IndividualPost

const styles = StyleSheet.create({
    card: {
        borderColor: "#000", borderWidth: 1, borderRadius: 10, padding: 4, shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})
