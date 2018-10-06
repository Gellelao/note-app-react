// I followed this tutorial to create this screen
// https://medium.com/react-native-training/react-native-firebase-authentication-7652e1d2c8a2

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from '@firebase/app'
import '@firebase/auth'
import commonStyles from '../style/commonStyle'

export default class Login extends React.Component {

  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={commonStyles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={commonStyles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Text style={styles.padTop}>Don't have an account?</Text>
        <Button
          title="Sign Up"
          onPress={() => this.props.navigation.navigate('SignupScreen')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  padTop: {
    marginTop: 80
  }
})