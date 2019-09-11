import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
// import Home from './home/Home'
// import AnimalList from './animal/AnimalList'
// import AnimalDetail from './animal/AnimalDetail'
// import LocationList from './location/LocationList'
// import EmployeeList from './employee/EmployeeList'
// import OwnerList from './owner/OwnerList'
// import LocationDetail from './location/LocationDetail';
import Home from './home/Home'
import NewUserForm from './users/NewUserForm'
import LoginForm from './auth/Login'
import Navbar from './nav/Navbar'
import RegisterForm from './auth/Register'


class ApplicationViews extends Component {

    state = {
        activeUserId: 0
    }

    isAuthenticated() {
        return sessionStorage.getItem('activeUser') !== null || localStorage.getItem('activeUser' !== null)
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
                <Route
                    exact
                    path="/"
                    render={props => {
                        return this.isAuthenticated() ? (
                            <Home {...props} />
                        ) : (
                                <Redirect to="/login" />
                            );
                    }}
                />
                <Route exact path="/newuser" render={(props) => {
                    return <NewUserForm {...props} />
                }} />
                <Route exact path="/login" render={(props) => {
                    return <LoginForm {...props} />
                }} />
                <Route exact path="/register" render={(props) => {
                    return <RegisterForm {...props} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews