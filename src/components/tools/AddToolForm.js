import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import ToolManager from '../../modules/ToolManager';

class AddToolForm extends Component {
    state = {
        model: '',
        ownerId: null,
        description: '',
        photo: null
    }

    componentDidMount() {
        const sessionStorageId = JSON.parse(sessionStorage.getItem('activeUser'))
        const localStorageId = JSON.parse(localStorage.getItem('activeUser'))
        sessionStorageId !== null ? this.setState({ ownerId: sessionStorageId.activeUserId }) : (localStorageId !== null ? this.setState({ ownerId: localStorageId.activeUserId }) : window.alert('something has gone wrong'))
    }

    submitToolForm = () => {
        // step 1: save img to firebase
        //step 2: get url from firebase
        // step 3: save everything to json-server
        const imagesRef = firebase.storage().ref('images');
        const childRef = imagesRef.child(`${this.state.model}-${Date.now()}`)
        childRef.put(this.state.photo)
            .then(response => response.ref.getDownloadURL())
            .then(url => {
                return ToolManager.postNewTool({
                    userId: this.state.ownerId,
                    model: this.state.model,
                    // manual: this.state.manual,
                    isAvailable: true,
                    description: this.state.description,
                    photoUrl: url
                })
            }).then(() => this.props.history.push('/tools'));
    }

    render() {
        console.log('this.state at render', this.state);
        return (
            <div className="image-form__container">
                <h2>
                    Add a Tool
                </h2>
                <form>
                    <input
                        type="file"
                        label="Tool Photo"
                        onChange={(e) => this.setState({ photo: e.target.files[0] })} />
                    <input
                        type="text"
                        label="model"
                        onChange={(e) => this.setState({ model: e.target.value })}
                        placeholder="model/name" />
                    <textarea
                        label="additional notes"
                        onChange={(e) => this.setState({ description: e.target.value })}
                        placeholder="include any notes or special instructions here" />
                    {/* ADD DROPDOWN FOR TOOL CATEGORY */}
                    <button type="button" onClick={this.submitToolForm} >add</button>
                </form>
            </div>
        )
    }
}

export default withRouter(AddToolForm)
