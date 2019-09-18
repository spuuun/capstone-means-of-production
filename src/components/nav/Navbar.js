import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Menu } from 'semantic-ui-react'

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
            <Menu pointing secondary>
                <Menu.Item
                    name='home'
                    active={this.state.activeItem === 'home'}
                    onClick={(e) => this.setState({ activeItem: 'home' })}
                    className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </Menu.Item>
                <Menu.Item
                    name='tools'
                    active={this.state.activeItem === 'tools'}
                    onClick={(e) => this.setState({ activeItem: 'tools' })}
                    className="nav-item">
                    <Link className="nav-link" to="/tools">Tools</Link>
                </Menu.Item>
                <Menu.Item
                    name='projects'
                    active={this.state.activeItem === 'projects'}
                    onClick={(e) => this.setState({ activeItem: 'projects' })}
                    className="nav-item">
                    <Link className="nav-link" to="/projects">Projects</Link>
                </Menu.Item>
                <Menu.Item
                    name='search'
                    active={this.state.activeItem === 'search'}
                    onClick={(e) => this.setState({ activeItem: 'search' })}
                    className="nav-item">
                    <Link className="nav-link" to="/search">Search</Link>
                </Menu.Item>
                <Menu.Item position='right'
                    name='logout'
                    active={this.state.activeItem === 'logout'}
                    onClick={(e) => this.setState({ activeItem: 'logout' })}
                    className="nav-item">
                    <Link className="nav-link"
                        to="/"
                        onClick={this.handleLogout} >
                        Logout</Link>
                </Menu.Item>
            </Menu>
        )
    }
}

export default NavBar