import React from 'react';
import { StyleSheet, View, Text, Button, ListView, FlatList, ListItem } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import Note from './components/note'

export default class ArchiveScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // data: [{ title: 'Title', content: 'Enter note here...' }],
      data: [],
      update: false
    }
  }

  componentDidMount() {
    this.pullActiveNotes()
  }


  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  pullActiveNotes() {
    this.setState({ data: [] })
    this.state.data = []
    
    let userId = firebase.auth().currentUser.uid;
    let self = this
    this.tasksReference = firebase
      .database()
      .ref('/notes/' + userId).on("value", tasksList => {
        this.items = [];
        tasksList.forEach(snap => {
          this.items.push({
            title: snap.val().title,
            content: snap.val().content,
            date: snap.val().date,
            archived: snap.val().archived,
            id: snap.key
          });
        });
        self.setState({ data: this.items })
      });
  }

  render() {
    // const { navigation } = this.props;
    // const name = navigation.getParam('name', 'did you enter a name?');
    // const { currentUser } = this.state;

    return (
      <View style={styles.container}>
        <Text>Archive</Text>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              {this.renderIf(item.archived,
            <Note
                title={item.title}
                content={item.content}
                archived={item.archived}
                date={item.date}
                id={item.id}
              /> )}
            </View>


          )
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 200, 0.5)',
  }
})