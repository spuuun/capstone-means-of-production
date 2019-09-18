import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, List, Button } from 'semantic-ui-react'
import '../tools/ToolCard.css'

class LoanCard extends Component {

    render() {
        return (
            <>
                <List>
                    <List.Item icon='user' content={this.props.loan.user.username} />
                    <List.Item icon='microchip' content={this.props.loan.tool.model} />
                    <List.Item icon='pin' content={this.props.loan.tool.userId} />
                    <List.Item icon='clock' content={this.props.loan.dateBorrowed} />
                </List>
                {this.props.loan.userId === this.props.activeUserId
                    && <Button
                        type='button'
                        content='return tool'
                        onClick={() => this.props.returnTool(this.props.loan)} />
                }
                {/* {this.props.loan.tool.userId === this.props.activeUserId
                    && <Button type='button' content='my tool' />} */}

            </>

        );
    }
}

export default LoanCard;