import React, { Component } from 'react'

export default class Home extends Component {

    state = {
        activeUserId: this.props.activeUserId,
        username: this.props.username
    }

    componentDidMount() {
        const activeUser = JSON.parse(sessionStorage.getItem('activeUser'))
        // console.log(activeUserId);
        this.setState({ activeUserId: activeUser.id })
    }
    render() {
        return (
            <div>
                Welcome {this.props.username}!
                This is the home/profile page for registered and logged in user!
            </div>
        )
    }
}
