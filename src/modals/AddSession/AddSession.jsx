import React, { Component } from 'react';
import '../styles.css';
import userService from '../../utils/userService';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Label, TextArea } from 'semantic-ui-react';

class AddSession extends Component {
    constructor() {
        super();
        this.state = {
            type: '',
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

    render() {
        const showHideClassName = this.props.showAddSession ? 'modal display-block' : 'modal display-none';

        return (
            <div className={showHideClassName}>
                <Form className='ui form' onSubmit={(e) => this.props.addSession(e, this.state)}>

                    <h3>Add a Session</h3>
                    <Label htmlFor='type'>Type of Session: </Label>
                    <Input required type='text' id='type' name='type' onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='duration'>Duration: </Label>
                    <Input type='number' id='duration' name='duration' onChange={this.handleChange} />  <br></br>

                    <Label htmlFor='notes'>Notes: </Label>
                    <TextArea cols='50' rows='10' type='date' id='notes' name='notes' onChange={this.handleChange}></TextArea>  <br></br>

                    <div className='form-buttons'>
                        <div className='form-button'>
                            <Button inverted color='blue' type='submit' value='Add Session'>Add Session</Button>
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