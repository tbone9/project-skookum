import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import userService from '../../utils/userService';
import { Form, Input, Button } from 'semantic-ui-react';

class LoginPage extends Component {

    state = {
        email: '',
        pw: ''
    };

    handleChange = (e) => {
        this.setState({
            // Using ES2015 Computed Property Names
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(this.state);
            // Let <App> know a user has signed up!
            this.props.handleSignupOrLogin();
            // Successfully signed up - show MainPage
            this.props.history.push('/');
        } catch (err) {
            // Use a modal or toast in your apps instead of alert
            alert('Invalid Credentials!');
        }
    }

    isFormInvalid() {
        return !(this.state.email && this.state.pw);
    }

    render() {
        return (
            <div className="LoginPage">
                <h2 className="header-footer">Log In</h2>
                <Form className="form-horizontal" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <div className="col-sm-12">
                            <Input required type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <Input required type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12 text-center">
                            <Button inverted color='blue' className="btn btn-default" disabled={this.isFormInvalid()}>Log In</Button>&nbsp;&nbsp;&nbsp;
              <Link to='/signup'>New user?</Link>
                            {/* <Link to='/'>Cancel</Link> */}
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default LoginPage;
