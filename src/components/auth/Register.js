// import PropTypes from 'prop-types';
import React, { Component } from 'react'
import UserManager from '../../modules/UserManager'
// import LoginForm from './Login'
import { Button, Header, Form, Grid, Input } from 'semantic-ui-react'
import './Auth.css'
import LocationForm from './LocationForm'
import * as firebase from 'firebase/app';
import 'firebase/storage';


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
        remember: false,
        photo: null,
        showUserForm: true,
        showLocationForm: false
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
        const imagesRef = firebase.storage().ref('images');
        const childRef = imagesRef.child(`${this.state.model}-${Date.now()}`)
        if (this.state.registerPassword === this.state.confirmPassword) {

            childRef.put(this.state.photo)
                .then(response => response.ref.getDownloadURL())
                .then(url => {
                    return UserManager.postNewUser({
                        username: this.state.registerUsername,
                        email: this.state.email,
                        password: this.state.registerPassword,
                        streetAddress: this.state.address,
                        city: this.state.city,
                        state: this.state.state,
                        zip: this.state.zip,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        createdOn: Date.now(),
                        photo: url
                    })
                        .then(user => {
                            console.log('user created on register', user)
                            this.setState({ activeUserId: user.id })
                            this.props.setActiveUserId(user.id)
                        })
                        .then(() => {
                            this.setAppropriateStorage();
                        })
                })
        } else {
            window.alert('passwords dont match')
        }
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        evt.target.id === "remember" ? stateToChange[evt.target.id] = evt.target.checked : stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange);
        console.log('state in handlefieldchange', this.state);
    }

    //the following method feels like it's garbage
    verifyUsername() {
        const proposedUserName = this.state.username
        let matchingUsernames = []
        let usernameIsValid = null
        UserManager.getAllUsers()
            .then(users => {
                matchingUsernames = users.find(user => {
                    return user.username === proposedUserName
                })
            })
            .then(() => {
                matchingUsernames > 0 ? usernameIsValid = false : usernameIsValid = true
            })
        console.log(usernameIsValid)
    }

    render() {
        return (
            <>
                <Header verticalAlign='middle' as="h1">
                    register...
                    </Header>
                <Header as="h2">
                    join the revolution of the working class!
                </Header>
                {this.state.showUserForm &&
                    <Form hidden={this.state.userFormHidden}>
                        <Grid.Column verticalAlign='middle' floated='right'>
                            <Header as='h3'>so... tell me about you</Header>
                            {/* {this.props.children} */}
                            <Form.Field>
                                <label htmlFor="registerUsername">username</label>
                                <Input
                                    id="registerUsername"
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    placeholder="enter a username"
                                />
                                {/* <Button type='button' content='check username' onClick={this.verifyUsername} /> */}
                            </Form.Field>

                            <Form.Field
                                control="input"
                                type="file"
                                label="your profile pic"
                                onChange={(e) => this.setState({ photo: e.target.files[0] })} />

                            <Form.Field>
                                <label htmlFor="firstName">first name</label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    placeholder="first name"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="lastName">last name</label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    onChange={this.handleFieldChange}
                                    placeholder="lastName"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="email">email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    onChange={this.handleFieldChange}
                                    placeholder="enter your email"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="registerPassword">password</label>
                                <Input
                                    id="registerPassword"
                                    type="password"
                                    onChange={this.handleFieldChange}
                                    placeholder="enter a password"
                                />
                            </Form.Field>
                            <Form.Field>
                                <label htmlFor="confirmPassword">confirm password</label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    onChange={this.handleFieldChange}
                                    placeholder="confirm your password"
                                />
                            </Form.Field>
                            <Button content='save and continue'
                                onClick={() => this.setState({ showLocationForm: true, showUserForm: false })}
                            />
                            <Button content='cancel and return to login' onClick={() => this.props.history.push('/login')} />
                        </Grid.Column>
                    </Form>
                }
                {this.state.showLocationForm &&
                    < LocationForm
                        hidden={this.state.locationFormHidden}
                        handleFieldChange={this.handleFieldChange}
                        handleRegister={this.handleRegister}
                    />}
            </>
        );
    }
}

export default Register

