import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './Auth.css'
import Button from '@material-ui/core/Button'


class LocationForm extends Component {

    render() {
        return (
            <form>
                <h3>add location information</h3>
                <p>this helps track your tools and loans</p>
                <label htmlFor="address">street address</label>
                <input
                    id="address"
                    type="text"
                    onChange={this.props.handleFieldChange}
                    placeholder="123 Abc Avenue"
                />
                <label htmlFor="city">city</label>
                <input
                    id="city"
                    type="text"
                    onChange={this.props.handleFieldChange}
                    placeholder="city"
                />
                <label htmlFor="state">state</label>
                <input
                    type="text"
                    id="state"
                    onChange={this.props.handleFieldChange}
                    placeholder="state"
                />
                <label htmlFor="zip">zip</label>
                <input
                    id="zip"
                    type="text"
                    onChange={this.props.handleFieldChange}
                    placeholder="your 5-digit zip code"
                />
                <Button
                    // animated
                    variant="contained"
                    color="secondary"
                    className='animated-button'
                    disabled={this.props.loadingStatus}
                    onClick={this.props.handleRegister}>register!
            </Button>
                {/* <Checkbox
                    label='remember me'
                    id="remember"
                    onChange={this.props.handleFieldChange} /> */}
            </form >
        )
    }
}

export default withRouter(LocationForm)