import React, { Component } from 'react';
import '../styles.css';
import userService from '../../utils/userService';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Label, TextArea } from 'semantic-ui-react';

class AddSession extends Component {
    constructor() {
        super();
        this.state = {
            type: 'Strength',
            duration: 0,
            notes: '',
            createdBy: userService.getUser(),
            athleteId: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
            athleteId: this.props.athleteId
        })
    }

    isFormInvalid() {
        return !(this.state.type && this.state.duration);
    }

    render() {
        const showHideClassName = this.props.showAddSession ? 'modal display-block' : 'modal display-none';

        return (
            <div className={showHideClassName}>
                <Form className='ui form' onSubmit={(e) => this.props.addSession(e, this.state)}>

                    <h3>Add a Session</h3>
                    <p>* = required</p>

                    <Label htmlFor='date'>Date (default: now): </Label>
                    <Input type='date' id='date' name='date' onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='type'>* Type of Session: </Label>
                    <select required type='text' id='type' name='type' onChange={this.handleChange} >
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Stretching">Stretching</option>
                        <option value="Mental">Mental</option>
                        <option value="Other">Other</option>
                    </select>  <br></br>

                    <Label htmlFor='duration'>* Duration: </Label>
                    <Input required type='number' id='duration' name='duration' onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='notes'>Notes: </Label>
                    <TextArea cols='50' rows='10' type='date' id='notes' name='notes' onChange={this.handleChange}></TextArea>  <br></br>

                    <div className='form-buttons'>
                        <div className='form-button'>
                            <Button inverted color='blue' type='submit' value='Add Session' disabled={this.isFormInvalid()}>Add Session</Button>
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

export default AddSession;