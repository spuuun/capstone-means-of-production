import React, { Component } from "react"
import ApplicationViews from "./ApplicationViews"
import NavBar from './nav/Navbar'
import './MeansOfProduction.css'

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