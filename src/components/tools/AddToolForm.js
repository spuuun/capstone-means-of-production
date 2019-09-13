import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { Header, Form, Grid, Button, Checkbox, TextArea } from 'semantic-ui-react';
// import { saveProfile } from '../APIManager/profiles';
// import * as firebase from 'firebase/app';
// import 'firebase/storage';
import ToolManager from '../../modules/ToolManager';

class AddToolForm extends Component {
    state = {
        model: '',
        manual: null,
        ownerId: null,
        description: ''
    }

    componentDidMount() {
        const sessionStorageId = JSON.parse(sessionStorage.getItem('activeUser'))
        const localStorageId = JSON.parse(localStorage.getItem('activeUser'))
        sessionStorageId !== null ? this.setState({ ownerId: sessionStorageId.activeUserId }) : (localStorageId !== null ? this.setState({ ownerId: localStorageId.activeUserId }) : window.alert('something has gone wrong'))
    }
    submitToolForm = () => {
        const newTool = {
            userId: this.state.ownerId,
            model: this.state.model,
            manual: this.state.manual,
            isAvailable: true,
            description: this.state.description
        }
        ToolManager.postNewTool(newTool).then(() => this.props.history.push("/tools"))
    }
    render() {
        return (
            <div className="image-form__container">
                <Header>
                    Add a Tool
                </Header>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column largeScreen={4} computer={6} tablet={8} mobile={12}>
                            <Form>
                                <Form.Field
                                    control="input"
                                    type="text"
                                    label="model"
                                    onChange={(e) => this.setState({ model: e.target.value })}
                                    placeholder="model/name" />
                                <Form.Field />
                                <TextArea
                                    label="additional notes"
                                    onChange={(e) => this.setState({ description: e.target.value })}
                                    placeholder="include any notes or special instructions her" />
                                <Form.Field>
                                    accompanying manual?
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        radio
                                        label='yes'
                                        name='checkboxRadioGroup'
                                        value='true'
                                        checked={this.state.manual === 'true'}
                                        onChange={(e) => this.setState({ manual: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox
                                        radio
                                        label='no'
                                        name='checkboxRadioGroup'
                                        value='false'
                                        checked={this.state.manual === 'false'}
                                        onChange={(e) => this.setState({ manual: e.target.value })}
                                    />
                                </Form.Field>
                                <Button type="button" content='add tool' onClick={this.submitToolForm} />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default AddToolForm