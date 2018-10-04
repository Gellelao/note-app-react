import React from 'react';
import { StyleSheet, View, Text, Button, ListView, FlatList, ListItem, TouchableOpacity, Alert, Modal, Image, ActivityIndicator } from 'react-native';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import Note from './components/note'

export default class NotesScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      update: false,
      modalVisible: false,
      loading: true,
    }

    // Make the tutorial appear after 3 seconds
    setTimeout(() => { this.setState({ modalVisible: true }) }, 3000)
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
        self.setState({ loading: false })
      });
  }

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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <ActivityIndicator size="large" /> :
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Image
                    source={require('./images/swipe-left-md.png')}
                  />
                </TouchableOpacity>
              </View>
            </Modal>
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
            </TouchableOpacity>
          </View>}
      </View>
    );
  }

  addNote() {
    this.createNewNote()
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
  },
  imageContainer: {
    // width: 50, 
    // height: 50,
    marginTop: 75,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  }
})