// I followed this tutorial to create this screen
// https://medium.com/react-native-training/react-native-firebase-authentication-7652e1d2c8a2

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from '@firebase/app'
import '@firebase/auth'

export default class Login extends React.Component {

  // _isMounted = false;
  state = { email: '', password: '', errorMessage: null }
  
  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  // componentDidMount() {
  //   this._isMounted = true;
  // }

  // componentWillUnmount(){
  //   this._isMounted = false;
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignupScreen')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

// import React from 'react';
// import { View, Text, TextInput, Button, Alert } from 'react-native';

// export default class LoginScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: '',
//     };
//   }
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Log In</Text>
//         <TextInput
//           style={{ top: 40, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, margin: 50 }}
//           placeholder="Enter name here"
//           onSubmitEditing={() => this.props.navigation.navigate('Notes', { name: this.state.text })}
//           onChangeText={(text) => this.setState({text})}
//           value={this.state.text}
//         />
//         <Button
//           title="Submit"
//           // onPress={() => this.props.navigation.navigate('Details', { name: this.state.text })}
//           onPress={() => this.props.navigation.navigate('Notes', { name: this.state.text })}
//         />
//       </View>
//     );
//   }
// }