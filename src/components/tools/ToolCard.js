import React, { Component } from 'react'
import { CardMedia, CardContent, Card, Typography } from '@material-ui/core'
import './ToolCard.css'
// import LoanManager from '../../modules/LoanManager';

class ToolCard extends Component {
    render() {
        return (
            <Card className='tool-card'>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">

                        model: {this.props.tool.model}
                    </Typography>
                    <img src={this.props.tool.photoUrl} alt='cool tool' />
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.tool.description}
                    </Typography>
                    <Typography variant="body3" color="textSecondary" component="p">
                        owner: {this.props.tool.user.username}
                    </Typography>
                </CardContent>
                <CardContent>
                    available: {this.props.tool.isAvailable ? "Yes" : "No"}
                    {this.props.tool.userId === this.props.activeUserId ?
                        <>
                            <button type='button'
                            >edit</button>
                            <button type='button'
                                onClick={() => { this.props.deleteTool(this.props.tool.id) }}
                            >delete tool</button>
                        </>
                        :
                        this.props.tool.isAvailable
                            ?
                            <button type='button' onClick={() => this.props.checkoutTool(this.props.tool)}>
                                checkout
                            </button>
                            :
                            <button type="button">
                                place hold
                            </button>
                    }
                </CardContent>
            </Card >
        )
    }
}

export default ToolCard
