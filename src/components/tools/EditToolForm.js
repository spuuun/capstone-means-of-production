import React, { Component } from 'react'
import { Modal } from '@material-ui/core'
import ToolManager from '../../modules/ToolManager'

class EditToolForm extends Component {

    state = {
        userId: this.props.tool.userId,
        model: this.props.tool.model,
        manual: this.props.tool.manual,
        isAvailable: this.props.tool.isAvailable,
        description: this.props.tool.description,
        id: this.props.tool.id,
        photo: this.props.tool.photoUrl,
        showModal: false
    }

    updateTool = () => {
        const updatedTool = {
            userId: this.state.userId,
            model: this.state.model,
            manual: this.state.manual,
            isAvailable: this.state.isAvailable,
            description: this.state.description,
            id: this.state.id,
            photoUrl: this.state.photo
        }
        ToolManager.update(updatedTool)
            .then(() => this.props.refreshTools())
            .then(() => this.setState({ showModal: false }))
    }

    render() {
        return (
            <Modal open={this.state.showModal} trigger={<button onClick={() => this.setState({ showModal: true })}>Edit</button>}>
                <h2>Edit Tool</h2>
                <div className="edit-tool-image">
                    {this.state.photo !== null && <>
                        <button
                            onClick={() => {
                                window.confirm('delete this photo??? \nare you sure?!?!') && this.setState({ photo: null })
                            }}
                        >delete</button>
                        <img src={this.state.photo} />
                    </>}
                    <form>
                        <input
                            type="text"
                            label="model"
                            onChange={(e) => this.setState({ model: e.target.value })}
                            value={this.state.model} />
                        <textarea
                            label="additional notes"
                            onChange={(e) => this.setState({ description: e.target.value })}
                            value={this.state.description} />
                        <button type="button" content='save changes' onClick={this.updateTool} />
                        <button type="button" content='cancel' onClick={() => this.setState({ showModal: false })} />
                    </form>
                </div>
            </Modal >
        )
    }
}

export default EditToolForm