import React, {useEffect, useRef, useState} from 'react';
import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  View,
  Text,
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import RtcEngine, {
  ChannelProfile,
  RtcLocalView,
  RtcRemoteView,
} from 'react-native-agora';
import requestCameraAndAudioPermission from './Permission';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const NewAgora = ({ route }) => {
    
  return (
    <View>
      <Text>NewAgora</Text>
    </View>
  );
};

export default NewAgora;

const styles = StyleSheet.create({});
