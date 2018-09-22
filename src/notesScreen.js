import React from 'react';
import { StyleSheet, View, Text, Button, ListView } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'

export default class NotesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});
  }

  render() {
    // const { navigation } = this.props;
    // const name = navigation.getParam('name', 'did you enter a name?');
    // const { currentUser } = this.state;

    return (
      <View style={styles.container}>
        <Text>Welcome !</Text>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.data)}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
        <Button
          title={"Add Note"}
          onPress={() => this.addNote()}
        />
      </View>
    );
  }

  addNote() {
    console.log("Add Note!")
    this.state.data.push("anotha one")
    console.log(this.state.data)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})