import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import {
    MenuProvider,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { updateNote } from '../data/firebaseProvider'
import { deleteNote } from '../data/firebaseProvider'

export default class Note extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { title: this.props.title, content: this.props.content, archived: this.props.archived, date: this.props.date }
    }

    componentDidMount() {
        this.setState({ content: this.props.content, title: this.props.title, archived: this.props.archived, date: this.props.date })
    }

    update() {
        data = ({
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            archived: this.state.archived,
            id: this.props.id,
        })

        updateNote(data)
    }

    delete() {
        deleteNote(this.props.id)
    }

    archive() {
        this.setState({ archived: "true" })
        this.update()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <TextInput
                        style={styles.title}
                        placeholder={"Title"}
                        onChangeText={title => this.setState({ title })}
                        onSubmitEditing={this.update()}
                        value={this.state.title}
                    />
                    <MenuProvider style={styles.moreButton}>
                        <Menu>
                            <MenuTrigger style={styles.moreButtonText} text="..." />
                            <MenuOptions>
                                <MenuOption onSelect={() => this.archive()} text="Archive" />
                                <MenuOption onSelect={() => this.delete()}>
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
                    onSubmitEditing={this.update()}
                />

                <Text style={styles.date}>{this.state.date}</Text>
            </View>
        );
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
        flex: 1,
    },
    title: {
        flex: 4,
        fontWeight: 'bold',
        fontSize: 16,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    moreButtonText: {
        padding: 20,
        fontSize: 150,
    },
    content: {
        fontSize: 10,
    },
    date: {
        fontSize: 10,
        left: 250,
        color: 'gray',
    },
})