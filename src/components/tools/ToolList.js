import React, { Component } from 'react'
import ToolCard from './ToolCard'
import ToolManager from '../../modules/ToolManager'
import LoanManager from '../../modules/LoanManager'
import './ToolCard.css'

class ToolList extends Component {
    //define what this component needs to render
    state = {
        tools: [],
        activeUserId: null
    }

    componentDidMount() {
        //getAll from ToolManager and hang on to that data; put it in state
        ToolManager.getAllTools()
            .then((tools) => {
                console.log('cdm - all tools - expand=user', tools)
                this.setState({
                    tools: tools
                })
            })
    }

    checkoutTool = (tool) => {
        LoanManager.postLoan({
            borrowerId: this.props.activeUserId,
            toolId: tool.id,
            dateBorrowed: Date.now(),
            dateReturned: null
        })
            .then(loan => {
                ToolManager.getSingleTool(loan.toolId)
                    .then(tool => {
                        tool.isAvailable = false
                        ToolManager.update(tool)
                            .then(tool => {
                                ToolManager.getAllTools()
                                    .then((tools) => {
                                        this.setState({
                                            tools: tools
                                        })
                                    })
                            }
                            )
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
                            activeUserId={this.props.activeUserId}
                            checkoutTool={this.checkoutTool}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default ToolList
