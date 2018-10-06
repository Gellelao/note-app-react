import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import SearchableFlatlist from "searchable-flatlist";
import Note from './components/note'
import { pullNotes } from './data/firebaseProvider';

export default class ArchiveScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      update: false,
      searchTerm: ""
    }
  }

  componentDidMount() {
    pullNotes(this);
  }


  renderIf(condition, content) {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.filler}></View>
        <SearchableFlatlist
          searchProperty={"content"}
          searchTerm={this.state.searchTerm}
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
          )}
        />
        <TextInput
          placeholder={"Search"}
          style={styles.sSearchBar}
          onChangeText={searchTerm => this.setState({ searchTerm })}
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
  },
  sContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  sTextItem: {
    height: 50,
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18
  },
  sSearchBar: {
    paddingHorizontal: 10,
    margin: 10,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18
  },
  filler: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    elevation: 3,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: 300,
    backgroundColor: 'white',

},
})