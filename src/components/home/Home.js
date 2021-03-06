import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
// import { Container, Image, Grid, Accordion, Icon, Header } from 'semantic-ui-react'
import Grid from '@material-ui/core/Grid'
import ToolManager from '../../modules/ToolManager'
import MyToolCard from '../tools/MyToolCard'
import '../tools/ToolCard.css'
import LoanManager from '../../modules/LoanManager'
import LoanCard from '../loans/LoanCard'
import UserManager from '../../modules/UserManager'

class Home extends Component {

    state = {
        activeUserId: null,
        username: '',
        user: {},
        myTools: [],
        loans: [],
        borrowed: [],
        loaned: [],
        activeIndexes: [],
        showModal: false
    }

    componentDidMount() {
        const activeUser = JSON.parse(sessionStorage.getItem('activeUser'))
        this.setState({ activeUserId: activeUser.activeUserId, username: activeUser.username })

        ToolManager.getMyTools(activeUser.activeUserId).then(tools => {
            console.log('home did mount - myTools from API', tools)
            this.setState({ myTools: tools })
        })

        LoanManager.getLoans().then(loans => {
            this.setState({ loans: loans })
        }).then(() => this.parsedLoans())

        UserManager.getSingleUser(activeUser.activeUserId)
            .then(user => {
                this.setState({ user: user })
            })

    }

    deleteTool = id => {
        ToolManager.delete(id)
            .then(() => {
                ToolManager.getMyTools(this.state.activeUserId)
                    .then(tools => {
                        this.setState({ myTools: tools })
                    })
            })
            .then(() => {
                LoanManager.getLoans()
                    .then(loans => {
                        loans.map(loan => {
                            //added return on following line to resolve browser warnin
                            //not sure if it will make an impact
                            return loan.toolId === id && LoanManager.delete(loan.id)
                        })
                    })
            })
            .then(() => LoanManager.getLoans())
            .then(loans => this.setState({ loans: loans }))
            .then(() => this.parsedLoans())
    }

    refreshTools = () => {
        ToolManager.getMyTools(this.state.activeUserId).then(tools => {
            this.setState({ myTools: tools, activeIndex: 0 })
        })
    }

    returnTool = (loan) => {
        LoanManager.returnLoan(loan.id)
            .then(() => LoanManager.getLoans())
            .then(loans => this.setState({ loans: loans }))
            .then(() => this.parsedLoans())
            .then(() => {
                ToolManager.return(loan.tool)
            })
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
        const activeIndexes = this.state.activeIndexes
        const newIndex = activeIndexes

        const currentIndexPosition = activeIndexes.indexOf(index);
        if (currentIndexPosition > -1) {
            newIndex.splice(currentIndexPosition, 1);
        } else {
            newIndex.push(index);
        }

        this.setState({ activeIndexes: newIndex })
    }

    render() {
        console.log('RENDER - this.state', this.state)
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="baseline"
                    spacing={3}
                >



                    <h2>Welcome back, {this.state.username}
                        <img src={this.state.user.photo} />
                    </h2>

                    <Link to='/tools/new'>
                        <button type='button'>add a new tool</button>
                    </Link>

                    {/* <Accordion styled>
                            <Accordion.Title
                                active={this.state.activeIndexes.includes(0)}
                                index={0}
                                onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                My Tools
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndexes.includes(0)}>
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
                                active={this.state.activeIndexes.includes(1)}
                                index={1}
                                onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Tools Loaned Out
                            </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndexes.includes(1)}>
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
                                active={this.state.activeIndexes.includes(2)}
                                index={2}
                                onClick={this.handleClick}>
                                <Icon name='dropdown' />
                                Tools Borrowed
                                </Accordion.Title>
                            <Accordion.Content active={this.state.activeIndexes.includes(2)}>
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

                    </Grid.Column> */}
                </Grid>
            </div >
        )
    }
}

export default withRouter(Home)
