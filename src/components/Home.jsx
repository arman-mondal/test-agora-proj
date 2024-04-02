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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
const {height} = Dimensions.get('screen');
import {Values} from '../../utils/Constants';
import axios from 'axios';

const Home = ({loggedInUser, users}) => {
  const navigation = useNavigation();
  const [joinChannel, setJoinChannel] = useState('');
  const [agoraToken, setAgoraToken] = useState(Values.temp_token);
  const filteredUsers = users.filter(user => user.key !== loggedInUser.key);

  const url = 'https://agroratoken.onrender.com';

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get(
        `${url}/access_token?channelName=${loggedInUser.email}&role=PUBLISHER&uid=123`,
      );
      await setAgoraToken(data.token);
    }
    fetchData();
  }, []);

  const goLive = () => {
    navigation.navigate('Video', {
      channel: loggedInUser.email,
      token: agoraToken,
    });
  };

  const joinLive = () => {
    if (joinChannel) {
      navigation.navigate('Video', {channel: joinChannel, token: agoraToken});
    } else {
      Alert.alert('Please provide channel name');
    }
  };

  return (
    <ScrollView style={{}}>
      <View>
        <Text style={styles.title}>Welcome, {loggedInUser.email}!</Text>
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
            <TouchableOpacity
              key={index}
              style={{
                borderWidth: 1,
                marginTop: 5,
                paddingHorizontal: 30,
                paddingVertical: 5,
                borderRadius: 20,
                marginBottom: 10,
              }}>
              <Text
                key={user.key}
                style={{color: '#000', fontSize: 16, fontWeight: '500'}}>
                {user.email}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
