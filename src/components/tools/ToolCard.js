import React, { Component } from 'react'

export default class ToolCard extends Component {
    render() {
        return (
            <div>
                <img src='#' alt='image of user added tool' />
                <h3>Name of Tool</h3>
                <h4>Owner: 'user who added tool'</h4>
                {/* if there's a digital manual --- provide link here
                    else, if there's no digi-manual, but there is a physical one --- provide note indicating that 
                    else, if no manual listed --- either show nothing OR say 'no manual listed'*/}
                <h5>Status: 'checked out' OR 'unavailable... place hold?'</h5>
            </div>
        )
    }
}

