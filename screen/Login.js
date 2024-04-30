import React, { useState } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Alert,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
  const backgroundImage = require('../img/Background.jpg');
  const logoImage = require('../img/anh.jpg');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Đăng Nhập thành công'))
      .catch((e) => Alert.alert(e.message));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.imageBackground}>
        <View style={styles.inputContainer}>
          <Image source={logoImage} style={styles.logo} />
          <TextInput
            style={styles.textInput}
            label={'Email'}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <TextInput
            style={styles.textInput}
            label={'Password'}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={true}
          />

          <Button mode="contained" style={styles.button} onPress={handleLogin}>
            Login
          </Button>
        </View>

        <View style={styles.footer}>
          <Button onPress={() => navigation.navigate('Register')}>
            Create New Account
          </Button>
          <Button onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 280,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'blue',
    marginVertical: 5,
    width: 350,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'aqua',
    height: 50,
    width: 350,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Login;
