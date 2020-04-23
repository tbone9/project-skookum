import React, { Component } from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Label, TextArea } from 'semantic-ui-react';

class UpdateSession extends Component {
    constructor(props) {
        super();
        this.state = {
            type: '',
            duration: '',
            notes: '',
            date: '',
            sessionId: ''
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.session._id !== state.sessionId) {
            return {
                type: props.session.type,
                duration: props.session.duration,
                notes: props.session.notes,
                date: props.session.date,
                sessionId: props.session._id
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
        return !(this.state.type && this.state.duration);
    }

    render() {
        const showHideClassName = this.props.showUpdateSession ? 'modal display-block' : 'modal display-none';

        return (
            <div className={showHideClassName}>
                <Form onSubmit={(e) => this.props.updateSession(e, this.state, this.state.sessionId)}>

                    <h3>Update Session</h3>

                    <Label htmlFor='date'>Date: </Label>
                    <Input type='date' id='date' name='date' onChange={this.handleChange} value={this.state.date} />  <br></br>

                    <Label htmlFor='type'>* Type of Session: </Label>
                    <select required type='text' id='type' name='type' value={this.state.type} onChange={this.handleChange} >
                        <option value="Strength">Strength</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Stretching">Stretching</option>
                        <option value="Mental">Mental</option>
                        <option value="Other">Other</option>
                    </select> <br></br>

                    <Label htmlFor='duration'>* Duration: </Label>
                    <Input required type='number' id='duration' name='duration' onChange={this.handleChange} value={this.state.duration} />  <br></br>

                    <Label htmlFor='notes'>Notes: </Label>
                    <TextArea cols='50' rows='10' type='date' id='notes' name='notes' onChange={this.handleChange} value={this.state.notes}></TextArea>  <br></br>

                    <div className='form-buttons'>
                        <div className='form-button'>
                            <Button inverted color='blue' type='submit' value='Add Session' disabled={this.isFormInvalid()}>Update Session</Button>
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

export default UpdateSession;