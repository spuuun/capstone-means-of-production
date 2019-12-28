import React, { Component } from "react"
// import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
// import "./Kennel.css"
import NavBar from './nav/Navbar'
import './MeansOfProduction.css'

class MeansOfProduction extends Component {
    isAuthenticated() {
        if (sessionStorage.getItem('activeUser') !== null || localStorage.getItem('activeUser') !== null) {
            return true
        }
        else {
            return false
        }
    }

    render() {
        if (this.isAuthenticated()) {
            return <>
                <NavBar />
                <ApplicationViews />
            </>
        }
        else {
            return <ApplicationViews />
        }

    }
}

export default MeansOfProduction