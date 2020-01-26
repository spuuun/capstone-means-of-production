import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu, MenuItem, AppBar, Toolbar } from '@material-ui/core'
import "./Navbar.css"

//---------HANDLE LOGOUT FUNCTION NEEDS TO RESET STATE EVERYWHERE THERE'S ACTIVE USER ID
//--- or just at the top, after i move state up 

class NavBar extends Component {

    state = {
        activeItem: 'home'
    }

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
            <AppBar classname="app-bar margin-bottom-fix">
                <Toolbar>

                    <Link className="nav-link" to="/"
                        name='home'
                        active={this.state.activeItem === 'home'}
                        onClick={(e) => this.setState({ activeItem: 'home' })}
                        className="nav-item"
                    >
                        Home
                            </Link>
                    <Link className="nav-link" to="/tools"
                        name='tools'
                        active={this.state.activeItem === 'tools'}
                        onClick={(e) => this.setState({ activeItem: 'tools' })}
                        className="nav-item"
                    >Tools</Link>
                    <Link className="nav-link" to="/search"
                        name='search'
                        active={this.state.activeItem === 'search'}
                        onClick={(e) => this.setState({ activeItem: 'search' })}
                        className="nav-item"
                    >Search</Link>
                    <Link className="nav-link"
                        to="/"
                        onClick={this.handleLogout}
                        name='logout'
                        active={this.state.activeItem === 'logout'}
                        onClick={(e) => this.setState({ activeItem: 'logout' })}
                        className="nav-item"
                    >
                        Logout</Link>
                </Toolbar>
            </AppBar>
        )
    }
}

export default NavBar