import React from 'react';
import { StyleSheet, View, Text, Button, ListView, FlatList, ListItem } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import Note from './components/note'

export default class NotesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ title: 'Title', content: 'Enter note here...' }],
      update: false
    }
    // this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }

  render() {
    // const { navigation } = this.props;
    // const name = navigation.getParam('name', 'did you enter a name?');
    // const { currentUser } = this.state;

    return (
      <View style={styles.container}>
        <Text>Welcome !</Text>
        <FlatList
          // data={this.state.data}
          data={this.state.data}
          extraData={this.state.update}
          keyExtractor={(item, index) => index.toString()}
          // renderItem={
          //   ({item}) => <Text>{item.name}</Text>
          //           } 
          renderItem={({ item }) => (
            <Note
              // id={item.id}
              // selected={!!this.state.selected.get(item.id)}
              title={item.title}
              content={item.content}
            />
          )
          }
        />
        {/* <FlatList
          data={this.state.data}
          renderItem={({ item }) => <ListItem title={item.title} />}
        />
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.data)}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        /> */}
        <Button
          title={"Add Note"}
          onPress={() => this.addNote()}
        />
      </View>
    );
  }

  addNote() {
    console.log("Add Note!")
    this.state.data.push({ title: 'Title', content: 'Enter note here...' })
    // Toggle this to tell the list to update
    this.setState({update: !this.state.update})
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