import React, { Component } from 'react'
//import the components we will need
import ProjectCard from './ProjectCard'
import ProjectManager from '../../modules/ProjectManager'

class ProjectList extends Component {
    //define what this component needs to render
    state = {
        projects: [],
    }

    componentDidMount() {
        //getAll from ProjectManager and hang on to that data; put it in state
        ProjectManager.getAllProjects()
            .then((projects) => {
                this.setState({
                    projects: projects
                })
            })
    }

    deleteProject = id => {
        ProjectManager.delete(id)
            .then(() => {
                ProjectManager.getAllProjects()
                    .then((newProjects) => {
                        this.setState({
                            projects: newProjects
                        })
                    })
            })
    }

    render() {
        return (
            <>
                {/* <section className="section-content">
                    <button type="button"
                        className="btn"
                        onClick={() => { this.props.history.push("/projects/new") }}>
                        add project
                    </button>
                </section> */}
                <div className="container-cards">
                    {this.state.projects.map(project =>
                        <ProjectCard
                            key={project.id}
                            project={project}
                            deleteProject={this.deleteProject}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default ProjectList
