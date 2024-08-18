import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../components/Home';
import Live from '../components/Live';
import Login from '../components/Login';
import Video from '../components/Video';
import Audio from '../components/Audio';
import NewAgora from '../components/NewAgora';
import LiveScreen from '../components/LiveScreen';
import { GlobalProvider } from '../hooks/Wrapper';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
   <GlobalProvider>
     <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Live" component={Live} />
        <Stack.Screen name="Video" component={Video} />
        <Stack.Screen name="Audio" component={Audio} />
        <Stack.Screen name="Test" component={NewAgora} />
        <Stack.Screen name="LiveScreen" component={LiveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   </GlobalProvider>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
