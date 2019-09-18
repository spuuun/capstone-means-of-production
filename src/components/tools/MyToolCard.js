import React, { Component } from 'react'
import { Card, Image, CardContent, Button } from 'semantic-ui-react'
import './ToolCard.css'
import LoanManager from '../../modules/LoanManager';
import EditToolForm from './EditToolForm';

class MyToolCard extends Component {

    render() {
        return (
            <Card className='tool-card'>
                <Image centered size='small' src={require('../../images/karlsson-adze.jpeg')} alt='cool adze' wrapped />
                <Card.Header>{this.props.tool.model}</Card.Header>
                <CardContent>
                    <Card.Meta></Card.Meta>
                    <Card.Description>{this.props.tool.description}</Card.Description>
                </CardContent>
                <CardContent extra>
                    loaned out? {!this.props.tool.isAvailable ? `Yas` : "No"}
                    <>
                        <EditToolForm tool={this.props.tool} refreshTools={this.props.refreshTools} />
                        <Button type='button'
                            onClick={() => this.props.deleteTool(this.props.tool.id)}
                            content='delete tool' />
                    </>
                </CardContent>
            </Card>
        )
    }
}

export default MyToolCard
