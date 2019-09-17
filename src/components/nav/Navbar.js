import React, { Component } from "react"
import { Link } from "react-router-dom"

//---------HANDLE LOGOUT FUNCTION NEEDS TO RESET STATE EVERYWHERE THERE'S ACTIVE USER ID
//--- or just at the top, after i move state up 

class NavBar extends Component {

    handleLogout() {
        console.log("pre-clear sessionStore", sessionStorage);
        console.log("pre-clear localStore", localStorage);
        sessionStorage.clear();
        localStorage.clear();
        console.log("post-clear sesionStore", sessionStorage);
        console.log("post-clear localStore", localStorage);
    }

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tools">Tools</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/projects">Projects</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/search">Search</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"
                            to="/"
                            onClick={this.handleLogout} >
                            Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar
