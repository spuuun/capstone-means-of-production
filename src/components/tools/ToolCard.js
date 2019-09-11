import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import './ToolCard.css'

class ToolCard extends Component {
    render() {
        return (
            <Card className='tool-card'>
                <Image size='mini' src={require('../../images/karlsson-adze.jpeg')} alt='cool adze' wrapped />
                <Card.Content>
                    <Card.Header>Adze</Card.Header>
                    <Card.Meta>Owner: 'user who added tool'</Card.Meta>
                    {/* if there's a digital manual --- provide link here
                    else, if there's no digi-manual, but there is a physical one --- provide note indicating that 
                    else, if no manual listed --- either show nothing OR say 'no manual listed'*/}
                    <Card.Description>This is a carving tool that can be used to make bowls, canoes, chair seats, and more. It is very nice - take good care --message owner if you don't know what that entails--</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        show here:
                        
                        status -- checked out/avail

                        show affordances to request/place hold/contact owner
                </Card.Content>
            </Card>
        )
    }
}

export default ToolCard