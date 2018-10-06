import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Modal, Image, ActivityIndicator } from 'react-native';
import SearchableFlatlist from "searchable-flatlist";
import Note from './components/note'
import { pullNotes } from './data/firebaseProvider';
import { addNote } from './data/firebaseProvider'

export default class NotesScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      update: false,
      modalVisible: false,
      loading: true,
      searchTerm: "",
    }

    // Make the tutorial appear after 3 seconds
    setTimeout(() => { this.setState({ modalVisible: true }) }, 3000)
  }

  componentDidMount() {
    pullNotes(this)
  }

  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  createNewNote() {
    let today = this.formatDate(new Date());
    addNote(today)
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? <ActivityIndicator size="large" /> :
          <View>

            <View style={styles.filler}></View>
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
            <SearchableFlatlist
              searchProperty={"content"}
              searchTerm={this.state.searchTerm}
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
              )}
            />
            <View style={styles.topRow}>
              <TextInput
                placeholder={"Search"}
                style={styles.sSearchBar}
                onChangeText={searchTerm => this.setState({ searchTerm })}
              />
              <TouchableOpacity
                onPress={() => this.addNote()}
                style={styles.plusButton}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
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
    backgroundColor: 'rgba(230, 230, 230, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 75,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row'
  },
  sSearchBar: {
    // flexDirection: 'row',
    // flex: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 10,
    margin: 15,
    height: 70,
    width: 150,
    left: 30,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18
  },
  plusButton: {
    // flexDirection: 'row',
    // flex: 1,
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
  },
  filler: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.0)',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: 300,

  },
})