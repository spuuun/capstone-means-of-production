import React, { Component } from 'react'
import './ToolCard.css'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
// import LoanManager from '../../modules/LoanManager';
import EditToolForm from './EditToolForm';

class MyToolCard extends Component {

    render() {
        return (
            <Card className='tool-card'>
                <CardMedia
                    image={this.props.tool.photoUrl} alt='a cool tool that belongs to me' wrapped />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">

                        {this.props.tool.model}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">

                        {this.props.tool.description}
                    </Typography>
                </CardContent>
                <CardContent>
                    loaned out? {!this.props.tool.isAvailable ? `Yas` : "No"}
                    <>
                        <EditToolForm tool={this.props.tool} refreshTools={this.props.refreshTools} />
                        <button type='button'
                            onClick={() => this.props.deleteTool(this.props.tool.id)}
                            content='Delete' />
                    </>
                </CardContent>
            </Card>
        )
    }
}

export default MyToolCard
