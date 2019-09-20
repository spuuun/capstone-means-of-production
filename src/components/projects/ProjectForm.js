import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { Header, Form, Grid, Button, Select, Dropdown } from 'semantic-ui-react';
// import { saveProfile } from '../APIManager/profiles';
// import * as firebase from 'firebase/app';
// import 'firebase/storage';
import ProjectManager from '../../modules/ProjectManager';

class ProjectForm extends Component {
    state = {
        projectName: '',
        projectDescription: '',
        userId: null,
        statusId: null,
        completionDate: '',
        statusOptions: []
    }

    componentDidMount() {
        const sessionStorageId = JSON.parse(sessionStorage.getItem('activeUser'))
        const localStorageId = JSON.parse(localStorage.getItem('activeUser'))
        sessionStorageId !== null ? this.setState({ userId: sessionStorageId.activeUserId }) : (localStorageId !== null ? this.setState({ userId: localStorageId.activeUserId }) : window.alert('something has gone wrong'))

        ProjectManager.getAllStatus()
            .then(status => {
                const statusNames = status.map(status => {
                    return {
                        key: status.id,
                        value: status.statusName,
                        text: status.statusName
                    }
                })
                console.log(statusNames);
                this.setState({ statusOptions: statusNames })
            })
    }
    submitProjectForm = () => {
        const newProject = {
            userId: this.state.userId,
            projectName: this.state.projectName,
            projectDescription: this.state.projectDescription,
            statusId: this.state.statusId,
            createdOn: Date.now(),
            completionDate: this.state.completionDate
        }
        ProjectManager.postNewProject(newProject)
            .then(() => this.props.history.push("/projects"))
    }

    render() {
        console.log('render --- this.state', this.state);
        return (
            <div className="image-form__container">
                <Header>
                    Add a Project
                </Header>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column largeScreen={4} computer={6} tablet={8} mobile={12}>
                            <Form>
                                <Form.Field
                                    control="input"
                                    type="text"
                                    label="project name"
                                    onChange={(e) => this.setState({ projectName: e.target.value })}
                                    placeholder="name of your project" />
                                <Form.Field>
                                    <Form.Field
                                        control="input"
                                        type="text"
                                        label="project description"
                                        onChange={(e) => this.setState({ projectDescription: e.target.value })}
                                        placeholder="description/details of your project..." />
                                </Form.Field>
                                <Form.Field
                                    control='input'
                                    type='date'
                                    label='projected completion date'
                                    onChange={(e) => this.setState({ completionDate: e.target.value })}
                                />
                                <Form.Field>
                                    <Dropdown
                                        fluid
                                        selection
                                        placeholder='update your project status'
                                        options={this.state.statusOptions}
                                        label='project status'
                                        onChange={(e) => this.setState({ statusId: e.target.value })}
                                    />
                                </Form.Field>
                                <Button type="button" content='add project' onClick={this.submitProjectForm} />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default ProjectForm