import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { Button, Form, Header, Input, Checkbox, Grid, Divider } from 'semantic-ui-react'
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
        // console.log(this.props.isAuthenticated());
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
                const currentUser = users.find(user => {
                    return user.username === this.state.username && user.password === this.state.password
                })
                if (currentUser !== undefined) {
                    // Create the user and redirect user to her/his home
                    // this.setState({ activeUserId: currentUser.id, remember: this. })
                    this.setState({ activeUserId: currentUser.id })
                    this.setAppropriateStorage()
                    this.props.setActiveUserId(currentUser.id)

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
                <Header textAlign='left' as='h1'>
                    Means
                </Header>
                <Header textAlign='center' as='h1'>
                    of
                </Header>
                <Header textAlign='right' as='h1'>
                    Production
                </Header>
                <Form>
                    <Grid.Column
                        verticalAlign='center'
                    // floated='right'
                    >
                        <Form.Field>
                            <Input
                                type="username"
                                required
                                onChange={this.handleFieldChange}
                                id="username"
                                placeholder="username"
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                type="password"
                                required
                                onChange={this.handleFieldChange}
                                id="password"
                                placeholder="enter password"
                            />
                        </Form.Field>
                        <Form.Field inline>
                            <Button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.handleLogin}
                                content='Login'
                            />

                            <Checkbox
                                verticalAlign='middle'
                                label='remember me'
                                id="remember"
                                onChange={this.handleFieldChange} />
                        </Form.Field>
                        <Divider horizontal>or</Divider>
                        <Form.Field>
                            <Button type="button" onClick={() => this.props.history.push('/register')}>register new user</Button>
                        </Form.Field>
                    </Grid.Column>
                </Form>
            </>
        )
    }
}
export default LoginForm
