import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const launchImageHandler = (state, setState) => {

    launchImageLibrary({}, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else if (response.assets) {
            setState({ ...state, photo: response.assets[0] });
            return response.assets[0]
        }
    });
};


const launchCameraHandler = (state, setState) => {
    launchCamera({
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    }, (response) => {

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
        } else {
            console.log('response', response?.assets[0]);
            setState({ ...state, photoCamera: response?.assets[0] })
            return response?.assets[0]
        }
    });

}


const requestCameraPermission = async (state, setState) => {
    if (Platform.OS === "ios") {
        return launchCameraHandler(state, setState);
    }
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera");
            launchCameraHandler(state, setState)
        } else {
            console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

const requestStoargePermission = async (state, setState) => {
    if (Platform.OS === "ios") {
        return launchImageHandler(state, setState);
    }
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            launchImageHandler(state, setState)
        } else {
            console.log("permissions storage denied")
        }
    } catch (err) {
        console.warn(err);
    }
}

export { requestCameraPermission, requestStoargePermission, launchCameraHandler, launchImageHandler }