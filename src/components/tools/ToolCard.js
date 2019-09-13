import React, { Component } from 'react'
import { Card, Image, CardContent, Button } from 'semantic-ui-react'
import './ToolCard.css'
import LoanManager from '../../modules/LoanManager';

class ToolCard extends Component {

    componentDidMount() {
        console.log('hey');
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
                    {this.props.tool.userId === this.props.activeUserId ?
                        <>
                            <Button type='button'
                                // onClick={}
                                content='edit tool' />
                            <Button type='button'
                                // onClick={}
                                content='delete tool' />
                        </>
                        : this.props.tool.isAvailable
                            ?
                            <Button type='button'
                                onClick={() => this.props.checkoutTool(this.props.tool)}
                                content='checkout' /> :
                            <Button
                                type='button'
                                content='place hold' />}
                </CardContent>
                <CardContent>IF I AM THE OWNER OF THIS TOOL - I SHOULD GET EDIT AND DELE AFFORDANCES TOO</CardContent>
            </Card>
        )
    }
}

export default ToolCard
