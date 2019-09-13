import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { Button, Form, Header } from 'semantic-ui-react'
import UserManager from "../../modules/UserManager"


class LoginForm extends Component {

    state = {
        username: '',
        password: null,
        remember: false,
        loadingStatus: false,
        activeUserId: 0
    }

    componentDidMount() {
        console.log(this.state);
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        // code on line below is for when there is no 'remember me' checkbox
        evt.target.id === "remember" ? stateToChange[evt.target.id] = evt.target.checked : stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    };

    setLocalAndSession() {
        localStorage.clear()
        localStorage.setItem(
            "activeUser",
            JSON.stringify({
                username: this.state.username,
                activeUserId: this.state.activeUserId
            })
        )
        sessionStorage.setItem(
            "activeUser",
            JSON.stringify({
                username: this.state.username,
                activeUserId: this.state.activeUserId
            })
        )
        this.props.history.push("/")
    }

    setSessionOnly() {
        sessionStorage.setItem(
            "activeUser",
            JSON.stringify({
                username: this.state.username,
                activeUserId: this.state.activeUserId
            })
        )
        this.props.history.push("/")
    }

    setAppropriateStorage = () => { this.state.remember ? this.setLocalAndSession() : this.setSessionOnly() }

    /*  Local method for validation, set loadingStatus, create user object, invoke the UserManager post method, and redirect home page
    */
    handleLogin = (evt) => {
        evt.preventDefault()
        this.setState({ loadingStatus: true })
        UserManager.getAllUsers()
            .then(users => {
                console.log('getAllUsers results on login', users);
                const currentUser = users.find(user => {
                    return user.username === this.state.username
                    // && user.password === this.state.password
                })
                console.log('currentUser', currentUser);
                if (currentUser !== undefined) {
                    // Create the user and redirect user to her/his home
                    // this.setState({ activeUserId: currentUser.id, remember: this. })
                    this.setState({ activeUserId: currentUser.id })
                    this.setAppropriateStorage()
                    // this.props.loadData(currentUser.id)
                }
                else {
                    // would like to do something different than window.alert()
                    // would like to add some red text next to the form fields or something
                    this.setState({ loadingStatus: false })
                    window.alert("Invalid Login Credentials")
                }
            }
            )

    }

    render() {
        return (
            <>
                <Header as='h1'>
                    Means
                </Header>
                <Header as='h1'>
                    of
                </Header>
                <Header as='h1'>
                    Production
                </Header>
                <Form>
                    <Form.Field>
                        <label htmlFor="username">username</label>
                        <input
                            type="username"
                            required
                            onChange={this.handleFieldChange}
                            id="username"
                            placeholder="username"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="password">password</label>
                        <input
                            type="password"
                            required
                            onChange={this.handleFieldChange}
                            id="password"
                            placeholder="Enter Password"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.handleLogin}
                        >Login</Button>
                        <input type="checkbox" id="remember" onChange={this.handleFieldChange} />
                        <label htmlFor="remember">Remember me</label>
                    </Form.Field>
                    <Form.Field>
                        <Link to='/register'>
                            <Button type="button">register new user</Button>
                        </Link>
                    </Form.Field>
                </Form>
            </>
        )
    }
}
export default LoginForm
