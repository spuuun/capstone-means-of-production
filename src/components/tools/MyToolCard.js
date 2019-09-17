import React, { Component } from 'react'
import { Card, Image, CardContent, Button } from 'semantic-ui-react'
import './ToolCard.css'
import LoanManager from '../../modules/LoanManager';

class MyToolCard extends Component {

    componentDidMount() {
        console.log('hey');
    }

    render() {
        return (
            <Card className='tool-card'>
                <Image size='mini' src={require('../../images/karlsson-adze.jpeg')} alt='cool adze' wrapped />
                <Card.Header>{this.props.tool.model}</Card.Header>
                <CardContent>
                    <Card.Meta></Card.Meta>
                    <Card.Description>{this.props.tool.description}</Card.Description>
                </CardContent>
                <CardContent extra>
                    loaned out? {!this.props.tool.isAvailable ? `Yas` : "No"}
                    <>
                        <Button type='button'
                            content='edit tool'
                        // onClick={this.props.editTool}
                        />
                        <Button type='button'
                            onClick={this.props.deleteTool}
                            content='delete tool' />
                    </>
                </CardContent>
            </Card>
        )
    }
}

export default MyToolCard
