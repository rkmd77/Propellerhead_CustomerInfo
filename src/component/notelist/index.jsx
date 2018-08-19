import React from 'react'

class NoteList extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      note: ''
    }
  }

  onTextChange(e, id) {
    // console.log('text',e.target.value);
    this.props.updateItem(id, e.target.value)
  }

  handleClick(id) {
    this.props.deleteItem(id)
  }

  render() {
    let noteslists = this.props.noteslists ? this.props.noteslists : [];
    return (
      <div>
        <ul className="list-group">
          {
            noteslists.map((item, index) => {
              return (
                <li key={index} className="list-group-item">
                  <div className="input-group">
                    <input type="text" className="form-control"
                      value={item.text}
                      onChange={(e) => this.onTextChange(e, item.id)} />
                    <span className="input-group-btn">
                      <button className="btn btn-danger" type="button"
                        onClick={this.handleClick.bind(this, item.id)}>Delete</button>
                    </span>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
export default NoteList;