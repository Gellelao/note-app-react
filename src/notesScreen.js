import React from 'react';
import { StyleSheet, View, Text, Button, ListView, FlatList, ListItem, TouchableOpacity } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import Note from './components/note'

export default class NotesScreen extends React.Component {

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
    // let current = this.state.update
    // console.log("\n\nthis.data length: " + this.state.data.length)
    // let self = this;
    // console.log("self.data length: " + self.state.data.length + "\n\n")
    let userId = firebase.auth().currentUser.uid;
    // let userId = "D3gV8KSUMLhzMZlzP63WAxKtAB13"



    // firebase.database().ref('/notes/' + userId).once('value').then(function (snapshot) {
    //   // this.setState({ data: []})
    //   snapshot.forEach(function (childSnapshot) {
    //     // console.log(childSnapshot.val())
    //     let childData = childSnapshot.val();
    //     childData.key = childSnapshot.key;
    //     console.log("\n\nchilSnapshot.key = " + childSnapshot.key + "\n\n")
    //     self.state.data.push({
    //       title: childSnapshot.val().title,
    //       content: childSnapshot.val().content,
    //       date: childSnapshot.val().date,
    //       archived: childSnapshot.val().archived,
    //       id: childSnapshot.key
    //     })
    //   });
    //   self.setState({ update: !current })
    //   // Keep a reference to the original list for filtering
    //   // self.originalNoteList = self.noteList;
    // });
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

  // createNewNote() {
  //   let userId = firebase.auth().currentUser.uid;
  //   // let userId = "D3gV8KSUMLhzMZlzP63WAxKtAB13"
  //   let today = this.formatDate(new Date());
  //   let postData = {
  //     archived: "false",
  //     content: "",
  //     title: "",
  //     date: today
  //   };
  //   var newPostKey = firebase.database().ref().child('notes/' + userId).push().key;

  //   // this.state.data.push({ title: 'Title', content: 'Enter note here...', id: newPostKey })

  //   var update = {};
  //   update['notes/' + userId + '/' + newPostKey] = postData;
  //   firebase.database().ref().update(update);
  //   // this.pullActiveNotes()
  // }
  createNewNote() {
    let today = this.formatDate(new Date());
    let userId = firebase.auth().currentUser.uid;
    // let taskCategory = this.state.category;
    firebase.database().ref('/notes/' + userId).push({
      archived: "",
      content: "",
      title: "",
      date: today
    });
    this.pullActiveNotes()
  }

  render() {
    // const { navigation } = this.props;
    // const name = navigation.getParam('name', 'did you enter a name?');
    // const { currentUser } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              {this.renderIf(!(!!item.archived),
                <Note
                  title={item.title}
                  content={item.content}
                  archived={item.archived}
                  date={item.date}
                  id={item.id}
                />)}
            </View>


          )
          }
        />
        <TouchableOpacity
          onPress={() => this.addNote()}
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            position: 'absolute',
            bottom: 10,
            right: 10,
            height: 70,
            backgroundColor: '#fff',
            borderRadius: 100,
          }}
        >
        <Text>+</Text>
          {/* <Icon name="plus" size={30} color="#01a699" /> */}
        </TouchableOpacity>
        {/* <Button
          title={"Add Note"}
          onPress={() => this.addNote()}
        /> */}
      </View>
    );
  }

  addNote() {
    // console.log("Add Note!")
    // // this.state.data.push({ title: 'Title', content: 'Enter note here...' })
    // console.log("=============")
    // console.log(this.state.data.length)
    // console.log(this.state.data)
    this.createNewNote()

    // this.refreshList();
  }

  formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})