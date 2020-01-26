import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './home/Home'
import NewUserForm from './users/NewUserForm'
import LoginForm from './auth/Login'
import RegisterForm from './auth/Register'
import ToolList from './tools/ToolList'
import AddToolForm from './tools/AddToolForm'
import Search from './searches/Search'
import './ApplicationViews.css'


class ApplicationViews extends Component {

    state = {
        activeUserId: null
    }

    setActiveUserId = (id) => {
        this.setState({ activeUserId: id })
    }

    isAuthenticated() {
        if (sessionStorage.getItem('activeUser') !== null || localStorage.getItem('activeUser') !== null) {
            return true
        }
        else {
            return false
        }
    }

    componentDidMount() {
        const userSessionInfo = JSON.parse(sessionStorage.getItem('activeUser'));
        const userLocalInfo = JSON.parse(localStorage.getItem('activeUser'));
        if (this.isAuthenticated()) {
            if (userSessionInfo !== null) {
                const activeUserId = userSessionInfo.activeUserId;
                this.setState({ activeUserId: activeUserId })
            }
            else {
                const activeUserId = userLocalInfo.activeUserId
                this.setState({ activeUserId: activeUserId })
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="application-views" className="margin-fix app-bar">
                    <Route
                        exact
                        path="/"
                        render={props => {
                            return (
                                this.isAuthenticated()
                                    ? <Home {...props} />
                                    : <Redirect to="/login" />
                            )
                        }}
                    />
                    <Route exact path="/newuser" render={(props) => {
                        return <NewUserForm {...props} />
                    }} />
                    <Route exact path="/login" render={(props) => {
                        return <LoginForm isAuthenticated={this.isAuthenticated} setActiveUserId={this.setActiveUserId} {...props} />
                    }} />
                    <Route exact path="/register" render={(props) => {
                        return <RegisterForm {...props} setActiveUserId={this.setActiveUserId} />
                    }} />
                    <Route exact path='/tools' render={(props) => {
                        return (
                            this.isAuthenticated()
                                ? <ToolList
                                    {...props}
                                    activeUserId={this.state.activeUserId} />
                                : <Redirect to='/login' />
                        )
                    }} />
                    {/* <Route exact path='/projects' render={(props) => {
                    return (
                        this.isAuthenticated()
                            ? <ProjectList {...props} activeUserId={this.state.activeUserId} />
                            : <Redirect to='/login' />
                    )
                }} /> */}
                    <Route exact path='/tools/new' render={(props) => {
                        return (
                            this.isAuthenticated()
                                ? <AddToolForm {...props} />
                                : <Redirect to="/login" />
                        )
                    }} />
                    {/* <Route exact path='/projects/new' render={(props) => {
                    return (
                        this.isAuthenticated()
                            ? <ProjectForm {...props} />
                            : <Redirect to="/login" />
                    )
                }} /> */}
                    {/* <Route
                    path="/projects/:projectId(\d+)/edit" render={props => {
                        return <ProjectEditForm {...props} />
                    }}
                /> */}
                    <Route exact path='/search' render={(props) => {
                        return (
                            this.isAuthenticated()
                                ? <Search {...props} />
                                : <Redirect to="/login" />
                        )
                    }} />
                </div>
            </React.Fragment>
        )
    }
}

export default ApplicationViews