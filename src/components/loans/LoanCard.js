import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, List } from 'semantic-ui-react'
import '../tools/ToolCard.css'

class LoanCard extends Component {
    render() {
        return (
            <List>
                <List.Item icon='user' content={this.props.loan.user.username} />
                <List.Item icon='microchip' content={this.props.loan.tool.model} />
                <List.Item icon='pin' content={this.props.loan.tool.userId} />
                <List.Item icon='clock' content={this.props.loan.dateBorrowed} />
            </List>
        );
    }
}

export default LoanCard;