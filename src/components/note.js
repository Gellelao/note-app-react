import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {
    MenuProvider,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

export default class Note extends React.PureComponent {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       title: '',
    //       content: '',
    //     }
    //     // this.dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    //   }
    state = { title: '', content: '', }

    render() {
        //   const textColor = this.props.selected ? "red" : "black";
        title = this.props.title
        content = this.props.content
        return (
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <TextInput
                        style={styles.title}
                        placeholder={title}
                        onChangeText={title => this.setState({ title })}
                        value={this.state.title}
                    />
                    {/* <TouchableOpacity
                        style={styles.moreButton}
                        onPress={this.openMore}
                    >
                        <Text> ... </Text>
                    </TouchableOpacity> */}
                    <MenuProvider style={styles.moreButton}>
                    <Menu>
                        <MenuTrigger text="..." />
                        <MenuOptions>
                            <MenuOption onSelect={() => alert(`Save`)} text="Save" />
                            <MenuOption onSelect={() => alert(`Delete`)}>
                                <Text style={{ color: 'red' }}>Delete</Text>
                            </MenuOption>
                            <MenuOption
                                onSelect={() => alert(`Not called`)}
                                disabled={true}
                                text="Disabled"
                            />
                        </MenuOptions>
                    </Menu>
                    </MenuProvider>
                </View>
                <TextInput
                    style={styles.content}
                    placeholder={content}
                    onChangeText={content => this.setState({ content })}
                    value={this.state.content}
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
        // borderBottomWidth: 0,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        elevation: 3,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        width: 300,

    },
    topRow: {
        flexDirection: 'row'
    },
    moreButton: {
        alignItems: 'center',
        // borderWidth: 1,
        // elevation: 2,
        // borderColor: 'rgba(52, 52, 52, 0.0)',
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        padding: 5,
    },
    title: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        // top: 40,
        // height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    content: {
        fontSize: 10,
    },
})