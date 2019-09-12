import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
                <div>
                    <p> Welcome </p>
                    <h1>{this.state.username}!</h1>
                    <p> This is the home/profile page for registered and logged in user!</p>
                </div>
                <Link to='/tools/new'>
                    <button type='button'>add a new tool</button>
                </Link>
                <Link to='/projects/new'>
                    <button type='button'>add a new project</button>
                </Link>
            </div>
        )
    }
}
