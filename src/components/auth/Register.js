// import PropTypes from 'prop-types';
import React, { Component } from 'react'
import UserManager from '../../modules/UserManager'

export default class Register extends Component {

    state = {
        username: '',
        activeUserId: 0,
        loadingStatus: false
    }

    componentDidMount() {
        console.log(this.state)
    }

    handleRegister(evt) {
        const newState = {}

        UserManager.postNewUser().then(newUser => console.log(newUser))
    }

    render() {
        return (
            <div className="backdrop"
            // style={{ backdropStyle }}
            >
                <div className="modal"
                //  style={{ modalStyle }}
                >
                    {this.props.children}
                    <label htmlFor="registerUsername">username</label>
                    <input
                        id="registerUsername"
                        type="text"
                        onChange={this.handleFieldChange}      //define this function!
                        placeholder="enter username"
                    />
                    <label htmlFor="registerEmail">email</label>
                    <input
                        id="registerEmail"
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
                </div>
            </div>
        );
    }
}

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