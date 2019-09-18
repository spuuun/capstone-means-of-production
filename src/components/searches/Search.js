import React, { Component } from 'react'
import { Input, Header, Grid, Button, Container } from 'semantic-ui-react'
import SearchManager from '../../modules/SearchManager'
import ProjectCard from '../projects/ProjectCard'
import ToolCard from '../tools/ToolCard'

export default class extends Component {

    state = {
        search: '',
        filterBy: 'tools',
        activeButtonIndex: 0,
        toolResults: [],
        projectResults: []
    }

    handleSearch = e => {
        this.setState({ search: e.target.value })

        console.log(this.state)

        this.state.filterBy === "tools"
            && SearchManager.searchTools(this.state.search)
                .then(tools => this.setState({ toolResults: tools }))

        this.state.filterBy === "projects"
            && SearchManager.searchProjects(this.state.search)
                .then(projects => {
                    console.log(projects)
                    this.setState({ projectResults: projects })
                })

        // this.state.filterBy === "all"
        //     && SearchManager.searchProjects(this.state.search)
        //         .then(tools => this.setState({ toolResults: tools }))
        //         .then(() => {
        //             SearchManager.searchProjects(this.state.search)
        //         })
        //         .then(projects => {
        //             console.log(projects)
        //             this.setState({ projectResults: projects })
        //         })
    }

    render() {
        // const searchOptions = [
        //     { key: 'tools', text: 'tools', value: 'tools' },
        //     { key: 'projects', text: 'projects', value: 'projects' },
        //     { key: 'all', text: 'all', value: 'all' },
        // ]
        return (
            <div>
                <Grid>
                    <Grid.Row centered>
                        <Header as='h1'>
                            Search for Tools/Projects
                        </Header>
                    </Grid.Row>
                    <Grid.Row>
                        <Input
                            icon='search'
                            iconPosition='left'
                            type='text'
                            onChange={(e) => this.setState({ search: e.target.value })}
                            placeholder='search...'
                            onClick={() => console.log(this.state)}
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
                            {/* <Button
                                floated='right'
                                active={2 === this.state.activeButtonIndex}
                                content='all'
                                value='all'
                                type='button'
                                onClick={(e) => {
                                    this.setState({ filterBy: e.target.value, activeButtonIndex: 2 })
                                }}
                            /> */}
                        </Button.Group>
                        {/* <Dropdown onChange={(e) => console.log(e.target.value)} button basic floating options={searchOptions} defaultValue='tools' /> */}
                    </Grid.Row>
                    {this.state.toolResults.length > 0 && this.state.toolResults.map(tool => {
                        return <ToolCard
                            key={tool.id}
                            tool={tool}
                        />
                    })}
                    {this.state.projectResults.length > 0 && this.state.projectResults.map(project => {
                        return <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    })}
                </Grid>
            </div>
        )
    }
}

