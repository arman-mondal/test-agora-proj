import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import {users} from '../user';
import {useNavigation} from '@react-navigation/native';
import Home from './Home';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (email, password) => {
    const user = users.find(
      user => user.email === email && user.password === password,
    );
    if (user) {
      setLoggedInUser(user);
      Alert.alert('Login Successful');
    } else {
      Alert.alert('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      {loggedInUser ? (
        <Home loggedInUser={loggedInUser} users={users} />
      ) : (
        <View>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#000'}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#000'}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <Button title="Login" onPress={() => handleLogin(email, password)} />
        </View>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 7,
    borderRadius: 20,
    color: '#000',
    width: 300,
  },
});
