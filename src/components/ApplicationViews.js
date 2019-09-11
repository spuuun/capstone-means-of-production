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


    isAuthenticated() {
        return sessionStorage.getItem('activeUser') !== null || localStorage.getItem('activeUser' !== null)
    }

    componentDidMount() {
        const userInfo = JSON.parse(sessionStorage.getItem('activeUser'));
        if (this.isAuthenticated()) {
            const userId = userInfo.activeUserId;
            console.log(userId);
        }
    }

    render() {
        return (this.isAuthenticated() ? (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <>
                        <Navbar />
                        <Home {...props} />
                    </>
                }} />
                <Route exact path="/newuser" render={(props) => {
                    return <NewUserForm {...props} />
                }} />

                {/* <Route exact path="/animals" render={(props) => {
                    return <AnimalList {...props} />
                }} />

                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    // Pass the animalId to the AnimalDetailComponent
                    return <AnimalDetail animalId={parseInt(props.match.params.animalId)} {...props} />
                }} />

                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props} />
                }} />

                <Route path="/locations/:locationId(\d+)" render={(props) => {
                    // Pass the locationId to the LocationDetailComponent
                    return <LocationDetail locationId={parseInt(props.match.params.locationId)} {...props} />
                }} />

                <Route path="/owner" render={(props) => {
                    return <OwnerList />
                }} />

                <Route path="/employee" render={(props) => {
                    return <EmployeeList />
                }} />

                <Route path="/location" render={(props) => {
                    return <LocationList />
                }} /> */}
            </React.Fragment>
        ) : (
                <>
                    <Route exact path="/login" render={(props) => {
                        return <LoginForm {...props} />
                    }} />
                    <Route exact path="/register" render={(props) => {
                        return <RegisterForm {...props} />
                    }} />
                </>
            )
        )
    }
}

export default ApplicationViews