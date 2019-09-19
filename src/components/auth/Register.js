// import PropTypes from 'prop-types';
import React, { Component } from 'react'
import UserManager from '../../modules/UserManager'
// import LoginForm from './Login'
import { Button, Header, Form, Grid } from 'semantic-ui-react'

class Register extends Component {

    state = {
        activeUserId: 0,
        registerUsername: '',
        registerPassword: '',
        confirmPassword: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: 0,
        firstName: '',
        lastName: '',
        loadingStatus: false,
        remember: false
    }

    componentDidMount() {
        console.log(this.state)
    }

    setLocalAndSession() {
        localStorage.clear()
        localStorage.setItem(
            "activeUser",
            JSON.stringify({
                username: this.state.registerUsername,
                activeUserId: this.state.activeUserId
            })
        )
        sessionStorage.setItem(
            "activeUser",
            JSON.stringify({
                username: this.state.registerUsername,
                activeUserId: this.state.activeUserId
            })
        )
        this.props.history.push("/")
    }

    setSessionOnly() {
        sessionStorage.setItem(
            "activeUser",
            JSON.stringify({
                username: this.state.registerUsername,
                activeUserId: this.state.activeUserId
            })
        )
        this.props.history.push("/")
    }

    setAppropriateStorage = () => { this.state.remember ? this.setLocalAndSession() : this.setSessionOnly() }

    handleRegister = () => {
        if (this.state.registerPassword === this.state.confirmPassword) {
            console.log('state before newUser Obj created', this.state)
            const newUser = {
                username: this.state.registerUsername,
                email: this.state.email,
                password: this.state.registerPassword,
                streetAddress: this.state.address,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                createdOn: Date.now()
            }
            UserManager.postNewUser(newUser).then(user => {
                this.setState({ activeUserId: user.id })
                this.props.setActiveUserId(user.id)

            })
                .then(user => {
                    this.setAppropriateStorage()
                })
        } else {
            window.alert('passwords dont match')
        }
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        evt.target.id === "remember" ? stateToChange[evt.target.id] = evt.target.checked : stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange);
        console.log('stateToChange', stateToChange);
        console.log('state in handlefieldchange', this.state);
    }

    render() {
        return (
            <Grid centered>
                <Grid.Row centered>
                    <Header as="h1">
                        register...
                    </Header>
                    <Header as="h2">
                        join the revolution of the working class!
            </Header>
                </Grid.Row>
                <Grid.Row>
                    <Form>
                        <Grid.Column verticalAlign='middle'>
                            <Header as='h3'>your person</Header>
                            {this.props.children}
                            <Form.Field>
                                <label htmlFor="registerUsername">username</label>
                                <input
                                    id="registerUsername"
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    placeholder="enter username"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="firstName">first name</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    placeholder="first name"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="lastName">last name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    placeholder="lastName"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="email">email</label>
                                <input
                                    id="email"
                                    type="email"
                                    onChange={this.handleFieldChange}
                                    placeholder="enter your email"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="registerPassword">password</label>
                                <input
                                    id="registerPassword"
                                    type="password"
                                    onChange={this.handleFieldChange}
                                    placeholder="enter a password"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="confirmPassword">confirm password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    onChange={this.handleFieldChange}
                                    placeholder="confirm your password"
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column verticalAlign='middle' floated='right'>
                            <Header as='h3'>the location of your person</Header>
                            <Form.Field>
                                <label htmlFor="address">street address</label>
                                <input
                                    id="address"
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    placeholder="123 Abc Avenue"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="city">city</label>
                                <input
                                    id="city"
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    placeholder="city"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="state">state</label>
                                <input
                                    id="state"
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    placeholder="your state"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="zip">zip</label>
                                <input
                                    id="zip"
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    placeholder="your 5-digit zip code"
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Form.Field>
                            <div className="footer">
                                <Button
                                    type="button"
                                    disabled={this.state.loadingStatus}
                                    onClick={this.handleRegister}>register!</Button>
                            </div>
                            <input type="checkbox" id="remember" onChange={this.handleFieldChange} />
                            <label htmlFor="remember">Remember me</label>
                        </Form.Field>
                    </Form>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Register