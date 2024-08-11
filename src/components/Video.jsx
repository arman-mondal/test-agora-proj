import {Text, StyleSheet, View} from 'react-native';

import React, {useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {useRoute} from '@react-navigation/native';
import {Values} from '../../utils/Constants';

const Video = () => {
  const route = useRoute();
  const {user, token, appId} = route.params;

  console.log(route.params);

  const [videoCall, setVideoCall] = useState(true);

  const connectionData = {
    appId:appId,
    channel: user,
    token: token,
    
  };
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };
  return videoCall ? (
    <AgoraUIKit  connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  ) : (
    <Text onPress={() => setVideoCall(true)}>Start Call</Text>
  );
};

export default Video;

const styles = StyleSheet.create({});
