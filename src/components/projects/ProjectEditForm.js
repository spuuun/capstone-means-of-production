import React, { Component } from "react"
import ProjectManager from '../../modules/ProjectManager'
import { Header, Grid, Form, Button } from 'semantic-ui-react'

class ProjectEditForm extends Component {
    //set the initial state
    state = {
        userId: null,
        projectName: "",
        projectDescription: "",
        completionDate: "",
        loadingStatus: true,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingAnimal = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedProject = {
            id: this.props.match.params.projectId,
            projectName: this.state.projectName,
            projectDescription: this.state.projectDescription,
            completionDate: this.state.completionDate,
            userId: this.state.userId
        };

        ProjectManager.updateProject(editedProject)
            .then(() => this.props.history.push("/projects"))
    }

    componentDidMount() {
        ProjectManager.getSingleProject(this.props.match.params.projectId)
            .then(project => {
                console.log(project);
                this.setState({
                    projectName: project.projectName,
                    projectDescription: project.projectDescription,
                    userId: project.userId,
                    completionDate: project.completionDate,
                    loadingStatus: false
                });
            });
    }

    render() {
        return (
            <div className="image-form__container">
                <Header>
                    EDIT EDIT EDIT
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
                                    value={this.state.projectName} />
                                <Form.Field>
                                    <Form.Field
                                        control="input"
                                        type="text"
                                        label="project description"
                                        value={this.state.projectDescription}
                                        onChange={(e) => this.setState({ projectDescription: e.target.value })} />
                                </Form.Field>
                                <Form.Field
                                    control='input'
                                    type='date'
                                    label='projected completion date'
                                    value={this.state.completionDate}
                                    onChange={(e) => this.setState({ completionDate: e.target.value })}
                                />
                                {/* <Form.Field>
                                    <Dropdown
                                        fluid
                                        selection
                                        placeholder='update your project status'
                                        options={this.state.statusOptions}
                                        label='project status'
                                        onChange={(e) => this.setState({ statusId: e.target.value })}
                                    />
                                </Form.Field> */}
                                <Button type="button" content='save changes' onClick={this.updateExistingAnimal} />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default ProjectEditForm

//     render() {
//         return (
//             <>
//                 <form>
//                     <fieldset>
//                         <div className="formgrid">
//                             <input
//                                 type="text"
//                                 required
//                                 className="form-control"
//                                 onChange={this.handleFieldChange}
//                                 id="animalName"
//                                 value={this.state.animalName}
//                             />
//                             <label htmlFor="animalName">Animal name</label>

//                             <input
//                                 type="text"
//                                 required
//                                 className="form-control"
//                                 onChange={this.handleFieldChange}
//                                 id="breed"
//                                 value={this.state.breed}
//                             />
//                             <label htmlFor="breed">Breed</label>
//                         </div>
//                         <div className="alignRight">
//                             <button
//                                 type="button" disabled={this.state.loadingStatus}
//                                 onClick={this.updateExistingAnimal}
//                                 className="btn btn-primary"
//                             >Submit</button>
//                         </div>
//                     </fieldset>
//                 </form>
//             </>
//         );
//     }
// }

// export default AnimalEditForm