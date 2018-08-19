import React from 'react'

class NoteInput extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: ''
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    handleAddNote() {
        let text = this.state.value;
        if (text.trim()) {
            this.props.addNoteList(text);
            this.setState({
                value: ''
            })
        }
    }
    
    handleSubmit(e) {
        if (e.keyCode == 13) {
            this.handleAddNote();
        }
    }

    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control"
                    onKeyUp={this.handleSubmit.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Please type in and press 'Enter' !"
                    value={this.state.value} />
                <span className="input-group-btn">
                    <button className="btn btn-success" type="button" onClick={this.handleAddNote.bind(this)}>Enter</button>
                </span>
            </div>
        )
    }
}
export default NoteInput;