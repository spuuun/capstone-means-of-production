import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Form, Grid, Button, Checkbox } from 'semantic-ui-react';
// import { saveProfile } from '../APIManager/profiles';
// import * as firebase from 'firebase/app';
// import 'firebase/storage';
import ToolManager from '../../modules/ToolManager';

class AddToolForm extends Component {
    state = {
        toolName: '',
        model: '',
        manual: null,
        activeUserId: null
    };

    // submitForm = () => {
    //     // step 1: save img to firebase
    //     //step 2: get url from firebase
    //     // step 3: save everything to json-server
    //     const imagesRef = firebase.storage().ref('images');
    //     const childRef = imagesRef.child(`${this.state.username}-${Date.now()}`)
    //     childRef.put(this.state.photo)
    //         .then(response => response.ref.getDownloadURL())
    //         .then(url => {
    //             return saveProfile({
    //                 username: this.state.username,
    //                 about: this.state.about,
    //                 photoUrl: url
    //             })
    //         }).then(() => this.props.history.push('/'));
    // }
    componentDidMount() {
        const sessionUser = JSON.parse(sessionStorage.getItem('activeUser'))
        const localUser = JSON.parse(localStorage.getItem('activeUser'))
        sessionUser !== null ? this.setState({ activeUserId: sessionUser.activeUserId }) : this.setState({ activeUserId: localUser.activeUserId })
        console.log('state after component mounts', this.state);
    }
    submitToolForm = () => {
        const newTool = {
            ownerId: this.state.activeUserId,
            model: this.state.model,
            manual: this.state.manual,
            name: this.state.toolName
        }
        console.log(newTool);
        ToolManager.post(newTool)
            .then(tool => console.log(tool))
        // .then(() => this.props.history.push("/tools"))
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
                                    label="tool name"
                                    onChange={(e) => this.setState({ toolName: e.target.value })}
                                    placeholder="toolName" />
                                <Form.Field
                                    control="input"
                                    type="text"
                                    label="model"
                                    onChange={(e) => this.setState({ model: e.target.value })}
                                    placeholder="Tool model/description here" />
                                <Form.Field>
                                    accompanying manual?
                                    {/* <b>{this.state.value}</b> */}
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
                                        // onChange={this.handleChange}
                                        onChange={(e) => this.setState({ manual: e.target.value })}
                                    />
                                </Form.Field>
                                {/* <Form.Field
                                    control="input"
                                    type="file"
                                    label="User Photo"
                                    onChange={(e) => this.setState({ photo: e.target.files[0] })} /> */}
                                <Button type="button" content="submit" onClick={this.submitToolForm} color="purple" />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default AddToolForm;

{/* <Form.Checkbox
                                    id='manualYes'
                                    onChange={(e) => this.setState({ manual: e.target.checked })}
                                >yes</Form.Checkbox> */}


// handleChange = (e, { value }) => this.setState({ value })

// render() {
//     return (
//         <Form>
//             <Form.Field>
//                 accompanying manual?: <b>{this.state.manual}</b>
//             </Form.Field>
//             <Form.Field>
//                 <Checkbox
//                     radio
//                     label='yes'
//                     name='checkboxRadioGroup'
//                     value='true'
//                     checked={this.state.manual === 'true'}
//                     onChange={this.handleChange}
//                 />
//             </Form.Field>
//             <Form.Field>
//                 <Checkbox
//                     radio
//                     label='no'
//                     name='checkboxRadioGroup'
//                     value='false'
//                     checked={this.state.value === 'false'}
//                     onChange={this.handleChange}
//                 />
//             </Form.Field>
//         </Form>
//     )
// }
