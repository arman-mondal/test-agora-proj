import { Text, StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { useRoute } from '@react-navigation/native';

const Audio = () => {
  const route = useRoute();
  const { user, token, appId } = route.params;

  console.log(route.params);

  const [audioCall, setAudioCall] = useState(true);
  const [callStartTime, setCallStartTime] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [otherUserJoined, setOtherUserJoined] = useState(false);

  const connectionData = {
    appId: appId,
    channel: user,
    token: token,
  };
  const styleProps = {
    videoMode: {
      disableVideo: true, // Disable video mode
    },
  };
  const rtcCallbacks = {
    EndCall: () => setAudioCall(false),
    UserJoined: () => setOtherUserJoined(true),
  };

  useEffect(() => {
    if (audioCall) {
      setCallStartTime(Date.now());
    } else {
      const endTime = Date.now();
      if (callStartTime) {
        const duration = Math.floor((endTime - callStartTime) / 1000); // Calculate duration in seconds
        setCallDuration(duration);
      }
    }
  }, [audioCall]);

  useEffect(() => {
    if (otherUserJoined) {
      setCallStartTime(Date.now());
    }
  }, [otherUserJoined]);

  return audioCall ? (
    <AgoraUIKit
      connectionData={connectionData}
      rtcCallbacks={rtcCallbacks}
      styleProps={styleProps}
      rtcProps={{
        enableVideo: false, // Disable video for the current session
        disableRemoteVideo: true, // Disable receiving video from remote users
      }}
    />
  ) : (
    <View>
      <Text>Call Duration: {callDuration} seconds</Text>
      <Text onPress={() => setAudioCall(true)}>Start Call</Text>
    </View>
  );
};

export default Audio;

const styles = StyleSheet.create({});
