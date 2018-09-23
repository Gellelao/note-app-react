import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {
    MenuProvider,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

export default class Note extends React.PureComponent {

    state = { title: '', content: '', archived: false, date: '' }

    componentDidMount() {
        this.setState({ content: this.props.content, title: this.props.title, archived: this.props.archived, date: this.props.date })
    }

    updateNote() {
        let userId = firebase.auth().currentUser.uid;
        // let userId = "D3gV8KSUMLhzMZlzP63WAxKtAB13"

        title = this.state.title
        content = this.state.content
        date = this.state.date
        archived = this.state.archived
        id = this.props.id

        firebase.database().ref('notes/' + userId + '/' + id).set({
            content: content,
            title: title,
            date: date,
            archived: archived
        });
    }

    deleteNote() {
        let userId = firebase.auth().currentUser.uid;
        // let userId = "D3gV8KSUMLhzMZlzP63WAxKtAB13"
        id = this.props.id
        firebase.database().ref('notes/' + userId + '/' + id).remove();
    }

    archive() {
        let userId = firebase.auth().currentUser.uid;
        // let userId = "D3gV8KSUMLhzMZlzP63WAxKtAB13"
        
        this.setState({archived: true})
        id = this.props.id

        this.updateNote()
      }

    render() {
        // title = this.props.title
        // content = this.props.content
        return (
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <Text>{this.state.date}</Text>
                    <TextInput
                        style={styles.title}
                        placeholder={"Title"}
                        onChangeText={title => this.setState({ title })}
                        onSubmitEditing={this.updateNote()}
                        value={this.state.title}
                    />
                    <MenuProvider style={styles.moreButton}>
                        <Menu>
                            <MenuTrigger text="Options"/>
                            <MenuOptions>
                                <MenuOption onSelect={() => this.archive()} text="Archive" />
                                <MenuOption onSelect={() => this.deleteNote()}>
                                    <Text style={{ color: 'red' }}>Delete</Text>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </MenuProvider>
                </View>
                <TextInput
                    style={styles.content}
                    placeholder={"Enter note content here..."}
                    onChangeText={content => this.setState({ content })}
                    value={this.state.content}
                    onSubmitEditing={this.updateNote()}
                />
            </View>
        );
    }

    openMore() {
        console.log("MORE")
    }
}

const styles = StyleSheet.create({
    container: {
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
    topRow: {
        flexDirection: 'row'
    },
    moreButton: {
        alignItems: 'center',
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        padding: 5,
        flex: 5,
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    content: {
        fontSize: 10,
    },
})