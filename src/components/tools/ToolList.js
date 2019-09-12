import React, { Component } from 'react'
import ToolCard from './ToolCard'
import ToolManager from '../../modules/ToolManager'
import './ToolCard.css'

class ToolList extends Component {
    //define what this component needs to render
    state = {
        tools: [],
    }

    componentDidMount() {
        console.log("ANIMAL LIST: ComponentDidMount");
        //getAll from AnimalManager and hang on to that data; put it in state
        ToolManager.getAllTools()
            .then((tools) => {
                console.log('cdm - all tools', tools)
                this.setState({
                    tools: tools
                })
            })
    }

    deleteTool = id => {
        ToolManager.deleteTool(id)
            .then(() => {
                ToolManager.getAllTools()
                    .then((newTools) => {
                        this.setState({
                            tools: newTools
                        })
                    })
            })
    }

    render() {
        return (
            <>
                <section className="section-content">
                    <button type="button"
                        className="btn"
                        onClick={() => { this.props.history.push("/tools/new") }}>
                        Add Tool
                    </button>
                </section>
                <div className="container-cards">
                    {this.state.tools.map(tool =>
                        <ToolCard
                            key={tool.id}
                            tool={tool}
                            deleteTool={this.deleteTool}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default ToolList
