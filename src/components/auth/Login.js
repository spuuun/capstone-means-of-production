import React, { Component } from "react"
//import { Link, Redirect } from "react-router-dom"
//import { Button, Form, Header, Checkbox, Grid, Divider, Container } from 'semantic-ui-react'
import { Grid, Divider, Button } from '@material-ui/core'
import UserManager from "../../modules/UserManager"
import './Auth.css'


class LoginForm extends Component {

    state = {
        username: '',
        password: null,
        remember: false,
        loadingStatus: false,
        activeUserId: 0
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
                    this.setState({ activeUserId: currentUser.id })
                    this.setAppropriateStorage()
                    this.props.setActiveUserId(currentUser.id)
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
            <div>
                <h1>
                    Means of Production
                </h1>

                <form className='login-form form'>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="baseline"
                        spacing={3}
                    >
                        <input
                            type="username"
                            required
                            onChange={this.handleFieldChange}
                            id="username"
                            placeholder="username"
                            width={6}
                        />
                        <input
                            type="password"
                            required
                            onChange={this.handleFieldChange}
                            id="password"
                            placeholder="enter password"
                            width={6}
                        />
                        <div>
                            <input
                                type="submit"
                                disabled={this.state.loadingStatus}
                                onClick={this.handleLogin}
                                value='Login'
                            />
                            {/* <Checkbox
                                // verticalAlign='middle'
                                label='remember me'
                                id="remember"
                                onChange={this.handleFieldChange} /> */}
                        </div>
                        <div>
                            <p>
                                or
                            </p>
                        </div>
                        <Button variant="contained" color="primary"
                            onClick={() => this.props.history.push('/register')}>
                            register new user
                        </Button>
                    </Grid>
                </form>
            </div>
        )
    }
}
export default LoginForm
