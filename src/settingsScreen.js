import React from 'react';
import { View, Text, Button } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class SettingsScreen extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate('Loading'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    // const { navigation } = this.props;
    // const name = navigation.getParam('name', 'did you enter a name?');
    const { currentUser } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>You are logged in as {currentUser && currentUser.email}</Text>
        <Button title="Logout" onPress={this.handleLogout} />
      </View>
    );
  }
}