import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import SearchableFlatlist from "searchable-flatlist";
import Note from './components/note'
import { pullNotes } from './data/firebaseProvider';
import commonStyles from './style/commonStyle'

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
        <View style={commonStyles.filler}></View>
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
                />)}
            </View>
          )}
        />
        <TextInput
          placeholder={"Search"}
          style={commonStyles.sSearchBar}
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
  }
})