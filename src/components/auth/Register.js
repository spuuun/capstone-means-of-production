// import PropTypes from 'prop-types';
import React, { Component } from 'react'
import UserManager from '../../modules/UserManager'
import LoginForm from './Login'

class Register extends Component {

    state = {
        activeUserId: 0,
        registerUsername: '',
        registerPassword: '',
        confirmPassword: '',
        email: '',
        streetAddress: '',
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
        // evt.preventDefault()
        // UserManager.getAllUsers()
        // .then(users => {
        //     const matchingUser = users.find(user => {
        //         return user.username === this.state.username
        //     })
        //     return matchingUser
        // })
        // .then(user => {
        //     user.length > 0
        if (this.state.registerPassword === this.state.confirmPassword) {
            console.log('props before newUser Obj created', this.state)
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
            UserManager.postNewUser(newUser).then(user => this.setState({ activeUserId: user.id }))
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
            <div className="backdrop"
            // style={{ backdropStyle }}
            >
                <div className="modal"
                //  style={{ modalStyle }}
                >
                    <fieldset>
                        {this.props.children}
                        <label htmlFor="registerUsername">username</label>
                        <input
                            id="registerUsername"
                            type="text"
                            onChange={this.handleFieldChange}      //define this function!
                            placeholder="enter username"
                        />
                        <label htmlFor="email">email</label>
                        <input
                            id="email"
                            type="email"
                            onChange={this.handleFieldChange}      //define this function!
                            placeholder="enter your email"
                        />
                        <label htmlFor="registerPassword">password</label>
                        <input
                            id="registerPassword"
                            type="password"
                            onChange={this.handleFieldChange}      //define this function!
                            placeholder="enter a password"
                        />
                        <label htmlFor="confirmPassword">confirm password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            onChange={this.handleFieldChange}      //define this function!
                            placeholder="confirm your password"
                        />
                    </fieldset>
                    <div className="footer">
                        <button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.handleRegister}>register!</button>
                        {/* define onRegister() method */}
                        {/* <button onclick={this.props.onRegister}>register!</button>  */}
                        {/* <button onClick={this.props.onClose}> */}
                        {/* Close */}
                        {/* </button> */}
                    </div>
                    <input type="checkbox" id="remember" onChange={this.handleFieldChange} />
                    <label htmlFor="remember">Remember me</label>
                </div>
            </div>
        );
    }
}

export default Register

// class Modal extends React.Component {
//     render() {
//         // Render nothing if the "show" prop is false
//         if (!this.props.show) {
//             return null;
//         }

//         // The gray background
//         const backdropStyle = {
//             position: 'fixed',
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//             backgroundColor: 'rgba(0,0,0,0.3)',
//             padding: 50
//         };

//         // The modal "window"
//         const modalStyle = {
//             backgroundColor: '#fff',
//             borderRadius: 5,
//             maxWidth: 500,
//             minHeight: 300,
//             margin: '0 auto',
//             padding: 30
//         };

//         return (
//             <div className="backdrop" style={{ backdropStyle }}>
//                 <div className="modal" style={{ modalStyle }}>
//                     {this.props.children}
//                     <input
//                         id="registerUsername"
//                         type="text"
//                         onChange={this.handleFieldChange}      //define this function!
//                         placeholder="enter username"
//                     />
//                     <label htmlFor="registerUsername">username</label>
//                     <input
//                         id="registerEmail"
//                         type="email"
//                         onChange={this.handleFieldChange}      //define this function!
//                         placeholder="enter your email"
//                     />
//                     <label htmlFor="registerEmail">email</label>
//                     <input
//                         id="registerPassword"
//                         type="password"
//                         onChange={this.handleFieldChange}      //define this function!
//                         placeholder="enter a password"
//                     />
//                     <label htmlFor="registerPassword">password</label>
//                     <input
//                         id="confirmPassword"
//                         type="password"
//                         onChange={this.handleFieldChange}      //define this function!
//                         placeholder="confirm your password"
//                     />
//                     <label htmlFor="confirmPassword">confirm password</label>
//                     <div className="footer">
//                         {/* define onRegister() method */}
//                         {/* <button onclick={this.props.onRegister}>register!</button>  */}
//                         <button onClick={this.props.onClose}>
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// Modal.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     show: PropTypes.bool,
//     children: PropTypes.node
// };

// export default Modal;