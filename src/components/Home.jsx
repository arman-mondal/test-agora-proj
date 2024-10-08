import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Alert,
  Pressable,
  Button,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
const {height} = Dimensions.get('screen');
import {Values} from '../../utils/Constants';
import axios from 'axios';
import { GlobalContext } from '../hooks/Wrapper';
import {users} from '../user';
import requestCameraAndAudioPermission from './Permission';
const Home = ({}) => {
  const {balance,loggedInUser, setLoggedInUser}=useContext(GlobalContext)
  const navigation = useNavigation();
  const [joinChannel, setJoinChannel] = useState('');
  const [agoraToken, setAgoraToken] = useState('');
  const [show, setShow] = useState(false);
  const [showOptionsForUser, setShowOptionsForUser] = useState(null);
  const filteredUsers = users;

  const url = 'https://test-agora-backend.onrender.com';

  useEffect(() => {
   
  }, [agoraToken]);
  async function fetchData(channelName) {
    const {data} = await axios.get(
      `${url}/generate_token?channelName=${channelName}`,
    );
    console.log('hello')
    console.log(data.token)
    setAgoraToken(data.token);
    return data.token;
  }
  const goLive = async() => {
    const token = await fetchData(loggedInUser.email);
    navigation.navigate('Live', {
      channel: loggedInUser.email,
      token: token,
    });
  };

  const joinLive = async() => {
    if (joinChannel!=='') {
      const token = await fetchData(joinChannel);

      navigation.navigate('Live', {channel: joinChannel, token: token});
    } else {
      Alert.alert('Please provide channel name');
    }
  };
  const toggleOptionsForUser = userKey => {
    setShowOptionsForUser(prevUserKey =>
      prevUserKey === userKey ? null : userKey,
    );
  };

  const handleVideoCall = user => {
    navigation.navigate('Video', {
      user: user,
      token: agoraToken,
      appId: Values.App_ID,
    });
  };
  const handleAudioCall = user => {
    navigation.navigate('Audio', {
      user: user,
      token: agoraToken,
      appId: Values.App_ID,
    });
  };
  return (
    <ScrollView style={{}}>
      <View>
        <Text style={styles.title}>Welcome, {loggedInUser.email}!</Text>
        
        <Text style={styles.title}>Balance, {balance}Rs</Text>
        <Button onPress={()=>
          {
            console.log(balance)
          }
        } title="Check"/>
      </View>
      <TouchableOpacity
        onPress={goLive}
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 20,
          borderWidth: 1,
          width: '32%',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 30,
          backgroundColor: 'purple',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontWeight: '500',
            fontSize: 15,
          }}>
          Go lIve
        </Text>
      </TouchableOpacity>
      <View
        style={{
          paddingHorizontal: 40,
          marginTop: 30,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <TextInput
          placeholder="Enter Channel name to join live"
          value={joinChannel}
          onChangeText={text => setJoinChannel(text)}
          style={{
            borderRadius: 30,
            borderColor: '#000',
            borderWidth: 1,
            color: '#000',
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
          placeholderTextColor="#000"
        />
        <TouchableOpacity
          onPress={joinLive}
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
            borderWidth: 1,
            width: '40%',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 30,
            backgroundColor: 'green',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontWeight: '500',
              fontSize: 15,
            }}>
            Join
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Users:</Text>
        <View style={{alignItems: 'center'}}>
          {filteredUsers.map((user, index) => (
            <View style={{flex: 1}} key={index}>
              <TouchableOpacity
                onPress={() => toggleOptionsForUser(user.key)}
                style={{
                  borderWidth: 1,
                  marginTop: 5,
                  paddingHorizontal: 35,
                  paddingVertical: 10,
                  borderRadius: 20,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '500',
                    paddingVertical: 1,
                  }}>
                  {user.email}
                </Text>
              </TouchableOpacity>
              {showOptionsForUser === user.key && (
                <View style={{flex: 1, flexDirection: 'row', gap: 40}}>
                  <Pressable
                    onPress={async() => {
                      const token=await fetchData(user.email);
                      if(token){
                        navigation.navigate('Audio', {
                          user: user.email,
                          token: token,
                          appId: Values.App_ID,
                        });
                      }
                      else{
                        Alert.alert('Token not generated');
                      }

                    }}
                    style={{
                      backgroundColor: 'blue',
                      borderWidth: 1,
                      borderRadius: 20,
                      paddingHorizontal: 25,
                      paddingVertical: 8,
                    }}>
                    <Text
                      style={{color: '#fff', fontWeight: '500', fontSize: 15}}>
                      Audio
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={async() => {
                
                     const token= await fetchData(user.email);
                     requestCameraAndAudioPermission();
                     if(token){
                      navigation.navigate('Video', {
                        user: user.email,
                        token: token,
                        appId: Values.App_ID,
                      });
                     }
                    }}
                    style={{
                      backgroundColor: 'green',
                      borderWidth: 1,
                      borderRadius: 20,
                      paddingHorizontal: 25,
                      paddingVertical: 8,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#fff', fontWeight: '500', fontSize: 15}}>
                      Video
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <Button
          title="Join"
          onPress={() => navigation.navigate('LiveScreen',{channel: loggedInUser.email, token: agoraToken})}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'gray',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    alignItems: 'flex-start',
    color: '#000',
    fontWeight: '500',
  },
});
