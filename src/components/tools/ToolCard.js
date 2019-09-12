import React, { Component } from 'react'
import { Card, Image, CardContent, Button } from 'semantic-ui-react'
import './ToolCard.css'

class ToolCard extends Component {

    componentDidMount() {
        console.log('this.props.tool', this.props.tool);
    }

    render() {
        return (
            <Card className='tool-card'>
                <Image size='mini' src={require('../../images/karlsson-adze.jpeg')} alt='cool adze' wrapped />
                <Card.Header>model: {this.props.tool.model}</Card.Header>
                <CardContent>
                    <Card.Meta>owner: {this.props.tool.user.username}</Card.Meta>
                    <Card.Description>{this.props.tool.description}</Card.Description>
                </CardContent>
                <CardContent extra>
                    available: {this.props.tool.isAvailable ? "Yes" : "No"}
                    {this.props.tool.isAvailable && <Button type='button' content='checkout' />}
                    {!this.props.tool.isAvailable && <Button type='button' content='place hold' />}
                </CardContent>
            </Card>
        )
    }
}

export default ToolCard