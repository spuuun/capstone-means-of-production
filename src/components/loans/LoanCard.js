import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react'
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
                        {/* <List.Item icon='user' content={this.props.loan.user.username} /> */}
                        <List.Item content='tool: ' />
                        <List.Item icon='legal' content={this.props.loan.tool.model} />
                        <List.Item content='owner: ' />
                        <List.Item icon='user' content={this.state.ownerName} />
                        {/* <List.Item icon='clock' content={this.props.loan.dateBorrowed} /> */}
                    </List>
                    <Button
                        type='button'
                        content='return tool'
                        onClick={() => this.props.returnTool(this.props.loan)} />
                </> :
                <>
                    <List>
                        {/* <List.Item icon='user' content={this.props.loan.user.username} /> */}
                        <List.Item content='tool: ' />
                        <List.Item icon='legal' content={this.props.loan.tool.model} />
                        <List.Item content='loaned to: ' />
                        <List.Item icon='user' content={this.props.loan.user.username} />
                        {/* <List.Item icon='clock' content={this.props.loan.dateBorrowed} /> */}
                    </List>
                </>

        );
    }
}

export default LoanCard;