import React, { Component } from 'react'
import { Input, Header, Grid, Button } from 'semantic-ui-react'
import SearchManager from '../../modules/SearchManager'
import ToolCard from '../tools/ToolCard'

export default class extends Component {

    state = {
        search: '',
        filterBy: 'tools',
        activeButtonIndex: 0,
        toolResults: []
    }

    handleSearch = e => {
        console.log(this.state)

        this.state.filterBy === "tools"
            && SearchManager.searchTools(this.state.search)
                .then(tools => this.setState({ toolResults: tools }))

    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row centered>
                        <Header as='h1'>
                            Search for Tools/People
                        </Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Input
                            icon='search'
                            iconPosition='left'
                            type='text'
                            onChange={(e) => {
                                this.setState({ search: e.target.value })
                            }
                            }
                            placeholder='search...'
                        />
                        <Button content='search' onClick={this.handleSearch} />
                        <Button.Group floated='right'>
                            <Button
                                floated='right'
                                active={0 === this.state.activeButtonIndex}
                                content='tools'
                                value='tools'
                                type='button'
                                onClick={(e) => {
                                    this.setState({ filterBy: e.target.value, activeButtonIndex: 0 })
                                }}
                            />
                            <Button
                                floated='right'
                                active={1 === this.state.activeButtonIndex}
                                content='projects'
                                value='projects'
                                type='button'
                                onClick={(e) => {
                                    this.setState({ filterBy: e.target.value, activeButtonIndex: 1 })
                                }}
                            />
                        </Button.Group>
                    </Grid.Row>
                    {this.state.toolResults.length > 0 && this.state.toolResults.map(tool => {
                        return <ToolCard
                            key={tool.id}
                            tool={tool}
                        />
                    })}
                </Grid>
            </div>
        )
    }
}

