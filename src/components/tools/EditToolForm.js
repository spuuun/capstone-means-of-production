import React, { Component } from 'react'
import { Button, Form, TextArea, Checkbox, Image, Modal } from 'semantic-ui-react'
import ToolManager from '../../modules/ToolManager'

class EditToolForm extends Component {

    state = {
        userId: this.props.tool.userId,
        model: this.props.tool.model,
        manual: this.props.tool.manual,
        isAvailable: this.props.tool.isAvailable,
        id: this.props.tool.id
    }

    updateTool = () => {
        const updatedTool = this.state
        ToolManager.update(updatedTool).then(this.props.history.push('/'))
    }

    render() {
        return (
            <Modal trigger={<Button>Edit</Button>}>
                <Modal.Header>Edit Tool</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='../../images/karlsson-adze.jpeg' />
                    <Form>
                        <Form.Field
                            control="input"
                            type="text"
                            label="model"
                            onChange={(e) => this.setState({ model: e.target.value })}
                            placeholder={this.props.tool.model} />
                        <Form.Field />
                        <TextArea
                            label="additional notes"
                            onChange={(e) => this.setState({ description: e.target.value })}
                            placeholder={this.props.tool.description} />
                        <Form.Field>
                            accompanying manual?
                    <Checkbox
                                radio
                                label='yes'
                                name='checkboxRadioGroup'
                                value='true'
                                checked={this.props.tool.manual === 'true'}
                                onChange={(e) => this.setState({ manual: e.target.value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                radio
                                label='no'
                                name='checkboxRadioGroup'
                                value='false'
                                checked={this.props.tool.manual === 'false'}
                                onChange={(e) => this.setState({ manual: e.target.value })}
                            />
                        </Form.Field>
                        <Button type="button" content='save changes' onClick={this.updateTool} />
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

export default EditToolForm