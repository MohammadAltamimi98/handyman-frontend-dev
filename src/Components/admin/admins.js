import React, { Component } from 'react'

export class admins extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    }
    componentDidMount() {
        this.setState({
            name: this.props.name
        })
    }
    render() {
        return (
            <h2>{this.state.name}</h2>
        )
    }
}

export default admins
