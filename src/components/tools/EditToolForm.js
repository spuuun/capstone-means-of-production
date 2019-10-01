import React, { Component } from 'react'
import { Button, Form, TextArea, Icon, Image, Modal } from 'semantic-ui-react'
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
            <Modal open={this.state.showModal} trigger={<Button onClick={() => this.setState({ showModal: true })}>Edit</Button>}>
                <Modal.Header>Edit Tool</Modal.Header>
                <Modal.Content image>
                    {this.state.photo !== null && <>
                        <Icon name='times'
                            onClick={() => {
                                window.confirm('delete this photo??? \nare you sure?!?!') && this.setState({ photo: null })
                            }}
                        />
                        <Image wrapped size='medium' src={this.state.photo} />
                    </>}
                    <Form>
                        <Form.Field
                            control="input"
                            type="text"
                            label="model"
                            onChange={(e) => this.setState({ model: e.target.value })}
                            value={this.state.model} />
                        <Form.Field />
                        <TextArea
                            label="additional notes"
                            onChange={(e) => this.setState({ description: e.target.value })}
                            value={this.state.description} />
                        {/* <Form.Field>
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
                        </Form.Field> */}
                        {/* <Form.Field>
                            <Checkbox
                                radio
                                label='no'
                                name='checkboxRadioGroup'
                                value='false'
                                checked={this.state.manual === 'false'}
                                onChange={(e) => this.setState({ manual: e.target.value })}
                            />
                        </Form.Field> */}
                        <Button type="button" content='save changes' onClick={this.updateTool} />
                        <Button type="button" content='cancel' onClick={() => this.setState({ showModal: false })} />
                    </Form>
                </Modal.Content>
            </Modal >
        )
    }
}

export default EditToolForm