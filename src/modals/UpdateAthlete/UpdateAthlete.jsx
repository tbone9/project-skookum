import React, { Component } from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';
import { Label, Form, Input, Button } from 'semantic-ui-react'

class UpdateAthlete extends Component {
    constructor(props) {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            athleteId: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.athlete._id !== state.athleteId) {
            return {
                firstName: props.athlete.firstName,
                lastName: props.athlete.lastName,
                dob: props.athlete.dob,
                address: props.athlete.address,
                city: props.athlete.city,
                state: props.athlete.state,
                zip: props.athlete.zip,
                athleteId: props.athlete._id
            }
        } else {
            return null;
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    isFormInvalid() {
        return !(this.state.firstName && this.state.lastName);
    }

    render() {
        const showHideClassName = this.props.showUpdateAthlete ? 'modal display-block' : 'modal display-none';
        return (
            <div className={showHideClassName}>

                <Form onSubmit={(e) => this.props.updateAthlete(e, this.state)}>

                    <h3>Update Athlete</h3>
                    <p> * = required </p>

                    <Label htmlFor='firstName'>* First Name: </Label>
                    <Input required type='text' id='firstName' name='firstName' value={this.state.firstName || ''} onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='lastName'>* Last Name: </Label>
                    <Input required type='text' id='lastName' name='lastName' value={this.state.lastName || ''} onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='dob'>Date of Birth: </Label>
                    <Input type='date' id='dob' name='dob' value={this.state.dob || ''} onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='address'>Address: </Label>
                    <Input type='text' id='address' name='address' value={this.state.address || ''} onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='city'>City: </Label>
                    <Input type='text' id='city' name='city' value={this.state.city || ''} onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='state'>State: </Label>
                    <select id='state' name='state' value={this.state.state || ''} onChange={this.handleChange}>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>  <br></br>

                    <Label htmlFor='zip'>ZIP: </Label>
                    <Input type='number' id='zip' name='zip' value={this.state.zip || ''} onChange={this.handleChange} />  <br></br>

                    <div className='form-buttons'>
                        <div className='form-button'>
                            <Button inverted color='blue' type='submit' value='Update Athlete' disabled={this.isFormInvalid()}>Update Athlete</Button>
                        </div>
                        <div className='form-button'>
                            <Link to='#' className='link' onClick={this.props.handleClose}>Cancel</Link>
                        </div>
                    </div>

                </Form>
            </div>
        )
    }
}

export default UpdateAthlete;