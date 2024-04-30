import React, { useState } from 'react';
import { Alert, StyleSheet, View, ImageBackground } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const ForgotPassword = () => {
  const backgroundImage = require('../img/Background.jpg');
  const [email, setEmail] = useState('');

  const handleSendEmail = () => {
    if (!email.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ email.');
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Thành công', 'Đã gửi link reset password đến email của bạn!');
        setEmail(''); // Reset trường email sau khi gửi thành công
      })
      .catch((error) => Alert.alert('Lỗi', error.message));
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          theme={{ colors: { primary: '#007bff' } }}
        />
        <Button mode="contained" onPress={handleSendEmail} style={styles.button}>
          Sent Email
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
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
    elevation: 2,
  },
});

export default ForgotPassword;
