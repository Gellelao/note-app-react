import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Note from './components/note'
import { pullNotes } from './data/firebaseProvider';

export default class ArchiveScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      update: false,
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
          )}
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