import React, { Component } from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';
import { Input, Form, Label, Button } from 'semantic-ui-react'
import { storage, storageRef } from '../../utils/firebase';

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
            zip: '',
            profileURL: '',
            image: null,
            progress: 0,
            errMsg: ''
        }
    }

    handleImageChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            if (image.type === 'image/jpeg' && image.size < 2100000) {
                this.setState(() => ({
                    image: image,
                    errMsg: ''
                }));
                this.handleUpload(image);
            } else {
                this.setState({
                    errMsg: 'Upload is either too big or not an image!'
                })
            }
        }

    }

    handleUpload = (image) => {
        // const { image } = this.state;
        console.log(image, 'IMAGE')
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        console.log(uploadTask, 'UPLOAD')
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
            },
            error => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ profileURL: url });
                    });
            }
        );

    };

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    isFormInvalid() {
        return !(this.state.firstName && this.state.lastName);
    }

    render() {
        const showHideClassName = this.props.showAddAthlete ? 'modal display-block' : 'modal display-none';
        return (
            <div className={showHideClassName}>
                <Form onSubmit={(e) => this.props.addAthlete(e, this.state)}>
                    <h3>Add an Athlete</h3>
                    <p> * = required </p>

                    <Label htmlFor='profileURL'>Profile Photo: &lt; 2mb </Label>
                    <Input type='file' accept="image/*" onChange={this.handleImageChange} /><br></br>
                    {this.state.errMsg ? <p>{this.state.errMsg}</p> :
                        <progress value={this.state.progress} max='100' />
                    }
                    {/* <button onClick={this.handleUpload}>Upload Image</button> */}

                    <Label className='ui label' htmlFor='firstName'>* First Name: </Label>
                    <Input required type='text' id='firstName' name='firstName' onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='lastName'>* Last Name: </Label>
                    <Input required type='text' id='lastName' name='lastName' onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='dob'>Date of Birth: </Label>
                    <Input type='date' id='dob' name='dob' onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='address'>Address: </Label>
                    <Input type='text' id='address' name='address' onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='city'>City: </Label>
                    <Input type='text' id='city' name='city' onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='state'>State: </Label>
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

                    <Label htmlFor='zip'>ZIP: </Label>
                    <Input type='number' id='zip' name='zip' onChange={this.handleChange} />  <br></br>

                    <div className='form-buttons'>
                        <div>
                            <Button inverted color='blue' type='submit' value='Add Athlete' disabled={this.isFormInvalid()}>Add Athlete</Button>
                        </div>
                        <div className='form-button'>
                            <Link className='link' onClick={this.props.handleClose} to='#' >Cancel</Link>
                        </div>
                    </div>

                </Form>
            </div>
        )
    }
}

export default AddAthlete;