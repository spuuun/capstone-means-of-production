import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import './ToolCard.css'

class ToolCard extends Component {
    render() {
        return (
            <Card className='tool-card'>
                <Image size='mini' src={require('../../images/karlsson-adze.jpeg')} alt='cool adze' wrapped />
                <Card.Content>
                    <Card.Header>model: {this.props.tool.model}</Card.Header>
                    <Card.Meta>owner: {this.props.tool.ownderId}</Card.Meta>
                    <Card.Description>here's where a description would go</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    show here:
                        available: {this.props.tool.isAvailable}
                    show affordances to request/place hold/contact owner
                </Card.Content>
            </Card>
        )
    }
}

export default ToolCard