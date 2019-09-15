import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Header } from 'semantic-ui-react'
import '../tools/ToolCard.css'

class LoanCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <Icon loading name='asterisk' />
                    <Header as='h2'><span className="card-petname">{this.props.loan.userId}</span></Header>
                    <p>{this.props.loan.toolId}</p>
                    {/* <button type="button" onClick={() => this.props.deleteAnimal(this.props.animal.id)}>Discharge</button> */}
                    {/* <Link to={`/animals/${this.props.animal.id}`}><button>Details</button></Link> */}
                </div>
            </div>
        );
    }
}

export default LoanCard;