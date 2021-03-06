import React from 'react'
import NoteInput from 'component/noteinput/index.jsx';
import NoteList from 'component/notelist/index.jsx';

class NotesLists extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            noteslists: []
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log('defaultNotesValue==', nextProps.defaultNotesValue);
        let dnv = nextProps.defaultNotesValue;
        if (dnv) {
            this.setState({
                noteslists: dnv
            })
        }
    }
    //update item
    updateItem(id, textvalue) {
        console.log(textvalue);
        let data = this.state.noteslists;
        data.forEach(item => {
            if (item.id === id) {
                item.text = textvalue
            }
        })

        this.setState({
            noteslists: data
        }, () => {
            this.updateNotesLists();
        })
    }
    // remove item
    deleteItem(id) {
        let data = this.state.noteslists;
        this.setState({
            noteslists: data.filter((item, index) => {
                if (item.id !== id) {
                    return item;
                }
            })
        }, () => {
            this.updateNotesLists();
        })
    }
    // add new item
    addNoteList(value) {
        const id = Date.now();
        this.setState({
            noteslists: this.state.noteslists.concat({
                id: id,
                text: value
            })
        }, () => {
            this.updateNotesLists();
        })
    }
    // pass value to parent NotesLists
    updateNotesLists() {
        this.props.getNotesList(this.state.noteslists)
    }

    render() {
        return (
            <div>
                <NoteInput addNoteList={this.addNoteList.bind(this)} />
                <NoteList
                    noteslists={this.state.noteslists}
                    deleteItem={this.deleteItem.bind(this)}
                    updateItem={this.updateItem.bind(this)}
                />
            </div>
        )
    }
};
export default NotesLists;