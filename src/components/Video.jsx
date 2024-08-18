import { Text, StyleSheet, View } from 'react-native';

import React, { useContext, useEffect, useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { useRoute } from '@react-navigation/native';
import { Values } from '../../utils/Constants';
import { GlobalContext } from '../hooks/Wrapper';
import requestCameraAndAudioPermission from './Permission';

const Video = () => {
  const route = useRoute();
  const { user, token, appId } = route.params;

  console.log(route.params);

  const [videoCall, setVideoCall] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [timer, setTimer] = useState(null);
const {decreaseBalance,loggedInUser}=useContext(GlobalContext)
  const connectionData = {
    appId: appId,
    channel: user,
    token: token,
  };

  const rtcCallbacks = {
    EndCall: () => {
      decreaseBalance(Number(0.83*callDuration).toFixed(2))
      setVideoCall(false);

    },
    UserJoined: (uid) => {
      setTimer(setInterval(() => {
        setCallDuration((prevDuration) => prevDuration + 1);
      }, 1000));
    },
    UserOffline: (uid) => {
      clearInterval(timer);
    },
  };

  useEffect(() => {
    return () => {
      clearInterval(timer);
      requestCameraAndAudioPermission()
    };
  }, []);

  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  ) : (
    <Text>{callDuration}</Text>

  );
};

export default Video;

const styles = StyleSheet.create({});
