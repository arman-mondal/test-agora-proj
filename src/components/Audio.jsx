import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const Audio = () => {
  const route = useRoute();
  const {user} = route.params;

  console.log(user);
  return (
    <View>
      <Text>Audio</Text>
    </View>
  );
};

export default Audio;

const styles = StyleSheet.create({});
