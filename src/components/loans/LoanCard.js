import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { List, Button, ListItem, ListSubheader, ListItemText } from '@material-ui/core'
import '../tools/ToolCard.css'
import UserManager from '../../modules/UserManager';

class LoanCard extends Component {

    state = {
        ownerName: '',
        owner: {},
    }

    componentDidMount() {
        this.getOwnerName(this.props.loan.tool.userId)
    }

    getOwnerName = (id) => {
        UserManager.getSingleUser(id)
            .then(user => {
                this.setState({ ownerName: user.username, owner: user })
            })
    }

    render() {
        return (
            this.props.loan.userId === this.props.activeUserId ?
                <>
                    <List>
                        <ListItem>
                            <ListSubheader as='h2'>{this.props.loan.tool.model}</ListSubheader>
                            <img src={this.props.loan.tool.photoUrl} />
                            <div floated='right' verticalAlign='middle'>
                                <img src={this.state.owner.photo} />
                                <ListSubheader>{this.state.ownerName} <span className='ital owner-label'>(owner)</span></ListSubheader>
                                <ListItemText>
                                    Due Back
                                        <br />on *DUEDATE*
                                        <br />at *LINK to 'owner.location'*
                                </ListItemText>
                            </div>
                        </ListItem>
                    </List>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.props.returnTool(this.props.loan)} >return tool</Button>
                </> :
                <>
                    <List>
                        {/* <List.Item icon='user' content={this.props.loan.user.username} /> */}
                        <ListItem content='tool: ' />
                        <ListItem icon='legal' content={this.props.loan.tool.model} />
                        <ListItem content='loaned to: ' />
                        <ListItem icon='user' content={this.props.loan.user.username} />
                        {/* <List.Item icon='clock' content={this.props.loan.dateBorrowed} /> */}
                    </List>
                </>

        );
    }
}

export default LoanCard;