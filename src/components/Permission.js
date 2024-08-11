import {PermissionsAndroid} from 'react-native';

export default async function requestCameraAndAudioPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    if (granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      && granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the microphone and camera');
    } else {
      console.log('Microphone or camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
