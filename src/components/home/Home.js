import React, { Component } from 'react'

export default class Home extends Component {

    state = {
        activeUserId: null,
        username: ''
    }
    componentDidMount() {
        const activeUser = JSON.parse(sessionStorage.getItem('activeUser'))
        this.setState({ activeUserId: activeUser.activeUserId, username: activeUser.username })
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <p> Welcome </p>
                <h1>{this.state.username}!</h1>
                <p> This is the home/profile page for registered and logged in user!</p>
            </div>
        )
    }
}
