// I followed this tutorial to create this screen
// https://medium.com/react-native-training/react-native-firebase-authentication-7652e1d2c8a2

import React from 'react'
import firebase from '@firebase/app';
import '@firebase/auth'
import commonStyles from '../style/commonStyle'

import { View, Text, ActivityIndicator } from 'react-native'
export default class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Tabs' : 'LoginScreen');
    })
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}