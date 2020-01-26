// import PropTypes from 'prop-types';
import React, { Component } from 'react'
import UserManager from '../../modules/UserManager'
// import LoginForm from './Login'
import { Grid, Button } from '@material-ui/core'
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
                <h1>
                    register...
                    </h1>
                <h2>
                    join the revolution of the working class!
                </h2>
                {this.state.showUserForm &&
                    <form hidden={this.state.userFormHidden}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="baseline"
                            spacing={3}
                        >
                            {/* {this.props.children} */}
                            <label htmlFor="registerUsername">username</label>
                            <input
                                id="registerUsername"
                                type="text"
                                onChange={this.handleFieldChange}
                                placeholder="enter a username"
                            />
                            {/* <Button type='button' content='check username' onClick={this.verifyUsername} /> */}

                            <input
                                control="input"
                                type="file"
                                label="your profile pic"
                                onChange={(e) => this.setState({ photo: e.target.files[0] })} />

                            <label htmlFor="firstName">first name</label>
                            <input
                                id="firstName"
                                type="text"
                                onChange={this.handleFieldChange}
                                placeholder="first name"
                            />
                            <label htmlFor="lastName">last name</label>
                            <input
                                id="lastName"
                                type="text"
                                onChange={this.handleFieldChange}
                                placeholder="lastName"
                            />
                            <label htmlFor="email">email</label>
                            <input
                                id="email"
                                type="email"
                                onChange={this.handleFieldChange}
                                placeholder="enter your email"
                            />
                            <label htmlFor="registerPassword">password</label>
                            <input
                                id="registerPassword"
                                type="password"
                                onChange={this.handleFieldChange}
                                placeholder="enter a password"
                            />
                            <label htmlFor="confirmPassword">confirm password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                onChange={this.handleFieldChange}
                                placeholder="confirm your password"
                            />
                            <Button variant="contained" color="primary"
                                onClick={() => this.setState({ showLocationForm: true, showUserForm: false })}>
                                save and continue
                                    </Button>
                            <Button variant="contained" color="secondary" onClick={() => this.props.history.push('/login')} >cancel and return to login</Button>
                        </Grid>
                    </form>
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

