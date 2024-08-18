import {PermissionsAndroid, Platform} from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';

export default async function requestCameraAndAudioPermission() {
  try {
    if(Platform.OS==='android'){
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] === 'granted' &&
        granted['android.permission.CAMERA'] === 'granted'
      ) {
        console.log('You can use the cameras & mic');
      } else {
        console.log('Permission denied');
      }
    }
    

  } catch (err) {
    console.warn(err);
  }
}
