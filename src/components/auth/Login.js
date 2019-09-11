import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import UserManager from "../../modules/UserManager"


class LoginForm extends Component {

    state = {
        username: "",
        password: "",
        activeUserId: 0,
        remember: false,
        loadingStatus: false
    }

    componentDidMount() {
        console.log(this.state);
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        // code on line below is for when there is no 'remember me' checkbox
        // stateToChange[evt.target.id] = evt.target.value
        evt.target.id === "remember" ? stateToChange[evt.target.id] = evt.target.checked : stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange);
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
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <label htmlFor="username">username</label>
                            <input
                                type="username"
                                required
                                onChange={this.handleFieldChange}
                                id="username"
                                placeholder="username"
                            />
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                required
                                onChange={this.handleFieldChange}
                                id="password"
                                placeholder="Enter Password"
                            />
                        </div>
                        <div className="alignRight">
                            <input type="checkbox" id="remember" onChange={this.handleFieldChange} />
                            <label htmlFor="remember">Remember me</label>
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.handleLogin}

                            >Login</button>
                        </div>
                    </fieldset>
                </form>
                <div>
                    <button
                        type="button"
                    // onclick={RENDER MODAL} 
                    //need to figure how modals work, 
                    //where the registration modal/form component should live
                    //and where/how to write the method to render it
                    >register new user</button>
                </div>
            </>
        )
    }
}
export default LoginForm
