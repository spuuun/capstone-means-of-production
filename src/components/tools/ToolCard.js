import React, { Component } from 'react'
import { Card, Image, CardContent, Button } from 'semantic-ui-react'
import './ToolCard.css'
import LoanManager from '../../modules/LoanManager';

class ToolCard extends Component {
    render() {
        return (
            <Card className='tool-card'>
                <Image centered size='small' src={this.props.tool.photoUrl} alt='cool tool' wrapped />
                <Card.Header>model: {this.props.tool.model}</Card.Header>
                <CardContent>
                    <Card.Meta>owner: {this.props.tool.user.username}</Card.Meta>
                    <Card.Description>{this.props.tool.description}</Card.Description>
                </CardContent>
                <CardContent extra>
                    available: {this.props.tool.isAvailable ? "Yes" : "No"}
                    {this.props.tool.userId === this.props.activeUserId ?
                        <>
                            {/* <Button type='button'
                                content='edit tool' /> */}
                            <Button type='button'
                                onClick={() => { this.props.deleteTool(this.props.tool.id) }}
                                content='delete tool' />
                        </>
                        :
                        this.props.tool.isAvailable
                        &&
                        <Button type='button'
                            onClick={() => this.props.checkoutTool(this.props.tool)}
                            content='checkout' />}
                    {/* : <Button
                                type='button'
                                content='place hold' />} */}
                </CardContent>
            </Card>
        )
    }
}

export default ToolCard
