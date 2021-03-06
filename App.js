import React from 'react';
import { createSwitchNavigator } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation';

import LoginScreen from './src/auth/loginScreen';
import NotesScreen from './src/notesScreen';
import ArchiveScreen from './src/archiveScreen';
import SettingsScreen from './src/settingsScreen';
import Loading from './src/auth/loading';
import SignupScreen from './src/auth/signupScreen';
import { YellowBox } from 'react-native'

import firebase from '@firebase/app'
import '@firebase/auth'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "swen325ionic.firebaseapp.com",
  databaseURL: "https://swen325ionic.firebaseio.com",
  storageBucket: "swen325ionic.appspot.com"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const TabsNav = createMaterialTopTabNavigator({
  Notes: NotesScreen,
  Archive: ArchiveScreen,
  Settings: SettingsScreen,
},
  {
    initialRouteName: 'Notes',
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
);

const SwitchNav = createSwitchNavigator({
  Loading,
  LoginScreen,
  SignupScreen,
  Tabs: TabsNav
},
  {
    initialRouteName: 'Loading',
  }
);

export default class App extends React.Component {
  constructor() {
    super()
    YellowBox.ignoreWarnings([
      'Setting a timer',
      'In most cases you should not have more MenuProviders',
      'Warning:'
      // 'Can\'t call setState (or forceUpdate) on an unmounted component'
    ]);
  }
  render() {
    return <SwitchNav />;
  }
}
