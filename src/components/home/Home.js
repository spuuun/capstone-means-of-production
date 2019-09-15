import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'
import ToolManager from '../../modules/ToolManager'
import ToolCard from '../tools/ToolCard'
import '../tools/ToolCard.css'
import LoanManager from '../../modules/LoanManager'
import LoanCard from '../loans/LoanCard'

export default class Home extends Component {

    state = {
        activeUserId: null,
        username: '',
        myTools: [],
        loans: [],
        borrowed: [],
        loaned: []
    }
    componentDidMount() {
        const activeUser = JSON.parse(sessionStorage.getItem('activeUser'))
        this.setState({ activeUserId: activeUser.activeUserId, username: activeUser.username })

        ToolManager.getMyTools(activeUser.activeUserId).then(tools => {
            this.setState({ myTools: tools })
        })

        LoanManager.getLoans().then(loans => {
            this.setState({ loans: loans })
        })
        const toolsBorrowed = this.state.loans.filter(loan => {
            return this.state.activeUserId === loan.borrowerId
        })
        const toolsLoaned = this.state.loans.filter(loan => {
            return this.state.activeUserId === loan.tool.userId
        })
        this.setState({ borrowed: toolsBorrowed, loaned: toolsLoaned })

        // const activeUser = JSON.parse(localStorage.getItem('activeUser'))
        // const sessionUser = JSON.parse(sessionStorage.getItem('activeUser'))
        // if (activeUser === null) {
        //     this.setState({ activeUserId: sessionUser.activeUserId, username: sessionUser.username })
        //         .then(() => {
        //             ToolManager.getMyTools(this.state.activeUserId)
        //                 .then(tools => {
        //                     console.log(tools)
        //                     this.setState({ myTools: tools })
        //                 })
        //         })
        // } else {
        //     this.setState({ activeUserId: activeUser.activeUserId, username: activeUser.username })
        //         .then(() => {
        //             ToolManager.getMyTools(this.state.activeUserId)
        //                 .then(tools => {
        //                     console.log(tools)
        //                     this.setState({ myTools: tools })
        //                 })
        //         })
        // }
    }

    parsedLoans = () => {
        const toolsBorrowed = this.state.loans.filter(loan => {
            return this.state.activeUserId === loan.borrowerId
        })
        const toolsLoaned = this.state.loans.filter(loan => {
            return this.state.activeUserId === loan.tool.userId
        })
        this.setState({ borrowed: toolsBorrowed, loaned: toolsLoaned })
    }

    render() {
        return (
            <div>
                <div>
                    <p> Welcome </p>
                    <h1>{this.state.username}!</h1>
                    <p> This is the home/profile page for registered and logged in user!</p>
                </div>
                <Container>
                    <div className='my-loans'>
                        <Button type='button'
                            onClick={() => {
                                this.parsedLoans()
                            }}
                            content='fuck' />
                    </div>
                </Container>
                <Link to='/tools/new'>
                    <button type='button'>add a new tool</button>
                </Link>
                <Link to='/projects/new'>
                    <button type='button'>add a new project</button>
                </Link>
                <Container>
                    <div className='my-tools'>
                        {this.state.myTools.map(tool => {
                            return <ToolCard
                                key={tool.id}
                                tool={tool}
                                deleteTool={this.deleteTool}
                                activeUserId={this.props.activeUserId}
                                checkoutTool={this.checkoutTool}
                            />
                        })}
                    </div>
                </Container>
                <Container className='borrowed'>
                    <h2>loaned</h2>
                    {this.state.loaned.map(tool => {
                        return <LoanCard
                            key={tool.id}
                            loan={tool}
                        />

                    })}
                </Container>
                <Container className='borrowed'>
                    <h2>borrowed</h2>
                    {this.state.borrowed.map(tool => {
                        return <LoanCard
                            key={tool.id}
                            loan={tool}
                        />
                    })}
                </Container>
            </div>
        )
    }
}
