import React from 'react';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status:[
              { id: '0', name: "prospective" },
              { id: '1', name: "current" },
              { id: '2', name: "non-active" }
            ],
            selected: '0',
            readOnly: ''
        }
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <select className="form-control"
                        value={this.props.defaultSelected}
                        name="Status"
                        readOnly={this.props.readOnly} 
                        onChange={(e) => this.onValueChange(e)} >
                        {
                            this.state.status.map(
                                (m, index) => <option value={m.id} key={index}>{m.name}</option>
                            )
                        }
                    </select>
            </div>
        )
    }
}
export default Selector;