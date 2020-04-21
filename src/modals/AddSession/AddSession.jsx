import React, { Component } from 'react';
import '../styles.css';
import userService from '../../utils/userService';
import { Link } from 'react-router-dom';

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
                <form onSubmit={(e) => this.props.addSession(e, this.state)}>

                    <label htmlFor='type'>Type of Session: </label>
                    <input required type='text' id='type' name='type' onChange={this.handleChange} />  <br></br>

                    <label htmlFor='duration'>Duration: </label>
                    <input type='number' id='duration' name='duration' onChange={this.handleChange} />  <br></br>

                    <label htmlFor='notes'>Notes: </label>
                    <textarea cols='50' rows='10' type='date' id='notes' name='notes' onChange={this.handleChange}></textarea>  <br></br>

                    <div className='form-buttons'>
                        <div className='form-button'>
                            <button type='submit' value='Add Session'>Add Session</button>
                        </div>
                        <div className='form-button'>
                            <Link className='link' onClick={this.props.handleClose} to='#' >Cancel</Link>
                        </div>
                    </div>

                </form>
            </div>
        )
    }
}

export default AddSession;