import React, { Component } from "react"
// import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
// import "./Kennel.css"
import NavBar from './nav/Navbar'

class MeansOfProduction extends Component {
    render() {
        return (
            <>
                <NavBar />
                <ApplicationViews />
            </>
        )
    }
}

export default MeansOfProduction