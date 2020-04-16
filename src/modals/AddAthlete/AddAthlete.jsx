import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

class AddAthlete extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    render() {
        const showHideClassName = this.props.showAddAthlete ? 'modal display-block' : 'modal display-none';
        return (
            <div className={showHideClassName}>
                <form onSubmit={(e) => this.props.addAthlete(e, this.state)}>

                    <label htmlFor='firstName'>First Name: </label>
                    <input type='text' id='firstName' name='firstName' onChange={this.handleChange} />  <br></br>

                    <label htmlFor='lastName'>Last Name: </label>
                    <input type='text' id='lastName' name='lastName' onChange={this.handleChange} />  <br></br>

                    <label htmlFor='dob'>Date of Birth: </label>
                    <input type='date' id='dob' name='dob' onChange={this.handleChange} />  <br></br>

                    <label htmlFor='address'>Address: </label>
                    <input type='text' id='address' name='address' onChange={this.handleChange} />  <br></br>

                    <label htmlFor='city'>City: </label>
                    <input type='text' id='city' name='city' onChange={this.handleChange} />  <br></br>

                    <label htmlFor='state'>State: </label>
                    <select id='state' name='state' onChange={this.handleChange}>
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

                    <label htmlFor='zip'>ZIP: </label>
                    <input type='number' id='zip' name='zip' onChange={this.handleChange} />  <br></br>

                    <div className='form-buttons'>
                        <div className='form-button'>
                            <button type='submit' value='Add Athlete'>Add Athlete</button>
                        </div>
                        <div className='form-button'>
                            <Link onClick={this.props.handleClose} to={`/`} >Cancel</Link>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

export default AddAthlete;