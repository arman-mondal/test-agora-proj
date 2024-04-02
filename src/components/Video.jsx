import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Values} from '../../utils/Constants';

const Video = () => {
  const [videoCall, setVideoCall] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params;

  const connectionData = {
    token: data.token,
    appId: Values.App_ID,
    channel: data.channel,
  };
  const rtcCallbacks = {
    EndCall: () => {
      setVideoCall(false);
      navigation.navigate('Home');
    },
  };

  console.log('data: ', connectionData);
  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  ) : (
    <Text onPress={() => setVideoCall(true)}>Start Call</Text>
  );
};

export default Video;

const styles = StyleSheet.create({});
