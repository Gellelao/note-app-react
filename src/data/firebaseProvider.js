import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'

export function pullNotes(notes) {
    let userId = firebase.auth().currentUser.uid;

    this.tasksReference = firebase
        .database()
        .ref('/notes/' + userId).on("value", tasksList => {
            let items = [];
            tasksList.forEach(snap => {
                items.push({
                    title: snap.val().title,
                    content: snap.val().content,
                    date: snap.val().date,
                    archived: snap.val().archived,
                    id: snap.key
                });
            });
            notes.setState({ data: items })
            notes.setState({ loading: false })
        });

}

export function addNote(today) {
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/notes/' + userId).push({
        archived: "",
        content: "",
        title: "",
        date: today
    });
}

export function updateNote(data) {
    let userId = firebase.auth().currentUser.uid;

    firebase.database().ref('notes/' + userId + '/' + data.id).set({
        content: data.content,
        title: data.title,
        date: data.date,
        archived: data.archived
    });
}

export function deleteNote(id) {
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('notes/' + userId + '/' + id).remove();
}