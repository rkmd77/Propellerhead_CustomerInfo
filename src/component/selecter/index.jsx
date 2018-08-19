import React from 'react';

class Selector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: [
                { id: '0', name: "prospective" },
                { id: '1', name: "current" },
                { id: '2', name: "non-active" }
            ],
            selected: '0',
            readOnly: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log('defaultSelected',defaultSelected);
        this.setState({
            selected: nextProps.defaultSelected
        })
    }

    onValueChange(e) {
        let value = e.target.value.trim();
        this.setState({
            selected: value
        }, () => {
            this.props.onSelectorValueChange(value)
        });
    }

    render() {
        return (
            <div>
                <select className="form-control"
                    value={this.props.defaultSelectedList ? this.props.defaultSelectedList : this.state.selected}
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