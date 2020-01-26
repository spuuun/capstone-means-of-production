import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Header, Form, Grid, Icon, Input, Checkbox } from 'semantic-ui-react'
import './Auth.css'
import StatesDropdown from './StateDropDown'


class LocationForm extends Component {

    render() {
        return (
            <Form>
                <Grid.Column verticalAlign='middle' floated='right'>
                    <Header as='h3'>add location information</Header>
                    <p>this helps track your tools and loans <br />
                        AND <br />
                        enables workers to contribute to each other's projects/workdays</p>
                    <Form.Field>
                        <label htmlFor="address">street address</label>
                        <Input
                            id="address"
                            type="text"
                            onChange={this.props.handleFieldChange}
                            placeholder="123 Abc Avenue"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="city">city</label>
                        <Input
                            id="city"
                            type="text"
                            onChange={this.props.handleFieldChange}
                            placeholder="city"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="state">state</label>
                        <StatesDropdown
                            {...this.props}
                            id="state"
                            onChange={this.props.handleFieldChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor="zip">zip</label>
                        <Input
                            id="zip"
                            type="text"
                            onChange={this.props.handleFieldChange}
                            placeholder="your 5-digit zip code"
                        />
                    </Form.Field>
                    <Button
                        animated
                        className='animated-button'
                        disabled={this.props.loadingStatus}
                        onClick={this.props.handleRegister}>
                        <Button.Content visible><Icon name='wrench' />register</Button.Content>
                        <Button.Content hidden>JOIN the revolution of the working class!</Button.Content>
                    </Button>
                    <Checkbox
                        label='remember me'
                        id="remember"
                        onChange={this.props.handleFieldChange} />
                </Grid.Column>
            </Form>
        )
    }
}

export default withRouter(LocationForm)