export function pullNotes(){
    let userId = firebase.auth().currentUser.uid;

    this.tasksReference = firebase
      .database()
      .ref('/notes/' + userId).on("value", tasksList => {
        let items = [];
        tasksList.forEach(snap => {
          this.items.push({
            title: snap.val().title,
            content: snap.val().content,
            date: snap.val().date,
            archived: snap.val().archived,
            id: snap.key
          });
        });
        return new Promise(items)
      });
}