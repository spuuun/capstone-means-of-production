import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Grid, Accordion, Icon } from 'semantic-ui-react'
import ToolManager from '../../modules/ToolManager'
import ToolCard from '../tools/ToolCard'
import MyToolCard from '../tools/MyToolCard'
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
        loaned: [],
        activeIndex: -1,
        showModal: false
    }

    componentDidMount() {
        const activeUser = JSON.parse(sessionStorage.getItem('activeUser'))
        this.setState({ activeUserId: activeUser.activeUserId, username: activeUser.username })

        ToolManager.getMyTools(activeUser.activeUserId).then(tools => {
            this.setState({ myTools: tools })
        })

        LoanManager.getLoans().then(loans => {
            this.setState({ loans: loans })
        }).then(() => this.parsedLoans())

    }

    deleteTool = id => {
        ToolManager.delete(id)
            .then(() => {
                ToolManager.getAllTools()
                    .then((newTools) => {
                        this.setState({
                            tools: newTools
                        })
                    })
            })
    }

    refreshTools = () => {
        ToolManager.getMyTools(this.state.activeUserId).then(tools => {
            this.setState({ myTools: tools, activeIndex: 0 })
        })
    }

    returnTool = (id) => {
        LoanManager.updateLoan(id).then(r => console.log(r))
    }

    parsedLoans = () => {
        const toolsBorrowed = this.state.loans.filter(loan => {
            return this.state.activeUserId === loan.userId && loan.dateReturned === null
        })
        const toolsLoaned = this.state.loans.filter(loan => {
            return this.state.activeUserId === loan.tool.userId && loan.dateReturned === null
        })
        this.setState({ borrowed: toolsBorrowed, loaned: toolsLoaned })
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const activeIndex = this.state.activeIndex
        const newIndex = activeIndex === index ? -1 : index

        console.log({ index }, { activeIndex });

        this.setState({ activeIndex: newIndex })
    }

    render() {
        return (
            <div>
                <Grid columns={2} padded>
                    <Grid.Row centered>
                        <div>
                            <p> Welcome </p>
                            <h1>{this.state.username}!</h1>
                            <p> This is the home/profile page for registered and logged in user!</p>
                        </div>
                    </Grid.Row>
                    <Grid.Column>
                        <Link to='/tools/new'>
                            <button type='button'>add a new tool</button>
                        </Link>
                        <Accordion styled>
                            <Accordion.Title
                                active={this.state.activeIndex === 0}
                                index={0}
                                onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                My Tools
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndex === 0}>
                                <Container>
                                    <div className='my-tools'>
                                        {this.state.myTools.map(tool => {
                                            return <MyToolCard
                                                key={tool.id}
                                                tool={tool}
                                                deleteTool={this.deleteTool}
                                                activeUserId={this.state.activeUserId}
                                                refreshTools={this.refreshTools}
                                            />
                                        })}
                                    </div>
                                </Container>
                            </Accordion.Content>
                            <Accordion.Title
                                active={this.state.activeIndex === 1}
                                index={1}
                                onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Tools Loaned Out
                                </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndex === 1}>
                                <Container className='borrowed'>
                                    {this.state.loaned.map(loan => {
                                        return <LoanCard
                                            key={loan.id}
                                            loan={loan}
                                            activeUserId={this.state.activeUserId}
                                            returnTool={this.returnTool}
                                        />

                                    })}
                                </Container>
                            </Accordion.Content>
                            <Accordion.Title
                                active={this.state.activeIndex === 2}
                                index={2}
                                onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Tools Borrowed
                                </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndex === 2}>
                                <Container className='borrowed'>
                                    {this.state.borrowed.map(loan => {
                                        return <LoanCard
                                            key={loan.id}
                                            loan={loan}
                                            activeUserId={this.state.activeUserId}
                                            returnTool={this.returnTool}
                                        />
                                    })}
                                </Container>
                            </Accordion.Content>
                        </Accordion>
                    </Grid.Column>
                    <Grid.Column>
                        <Link to='/projects/new'>
                            <button type='button'>add a new project</button>
                        </Link>
                    </Grid.Column>
                </Grid>
            </div >
        )
    }
}
