import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import ToolManager from '../../modules/ToolManager'
import ToolCard from '../tools/ToolCard'
import '../tools/ToolCard.css'

export default class Home extends Component {

    state = {
        activeUserId: null,
        username: '',
        myTools: []
    }
    componentDidMount() {
        const activeUser = JSON.parse(sessionStorage.getItem('activeUser'))
        this.setState({ activeUserId: activeUser.activeUserId, username: activeUser.username })
        ToolManager.getMyTools(activeUser.id)
            .then(tools => {
                this.setState({ myTools: tools })
            })
    }
    render() {
        return (
            <div>
                <div>
                    <p> Welcome </p>
                    <h1>{this.state.username}!</h1>
                    <p> This is the home/profile page for registered and logged in user!</p>
                </div>
                <Link to='/tools/new'>
                    <button type='button'>add a new tool</button>
                </Link>
                <Link to='/projects/new'>
                    <button type='button'>add a new project</button>
                </Link>
                <Container>
                    <div className='my-tools'>
                        {this.state.myTools.map(tool => {
                            return <ToolCard
                                key={tool.id}
                                tool={tool}
                                deleteTool={this.deleteTool}
                                activeUserId={this.props.activeUserId}
                                checkoutTool={this.checkoutTool}
                            />
                        })}
                    </div>
                </Container>
            </div>
        )
    }
}
