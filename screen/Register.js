import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập email và mật khẩu.');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => Alert.alert('Đăng ký thành công'))
      .catch((error) => Alert.alert('Lỗi', error.message));
  };

  return (
    <ImageBackground
      source={require('../img/Background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          theme={{
            colors: { primary: '#007bff', text: '#007bff' },
          }}
        />
        <Button mode="contained" onPress={handleCreateAccount} style={styles.button}>
          Đăng ký
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#af79d1',
    borderRadius: 20,
    elevation: 2,
  },
});

export default Register;
