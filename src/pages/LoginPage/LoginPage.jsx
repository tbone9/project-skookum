import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import userService from '../../utils/userService';
import { Form, Input, Button } from 'semantic-ui-react';

class LoginPage extends Component {

    state = {
        email: '',
        pw: '',
        password: '',
        passwordConf: '',
        login: true
    };

    handleChange = (e) => {
        this.setState({
            // Using ES2015 Computed Property Names
            [e.target.name]: e.target.value
        });
    }

    handleLogin = async (e) => {
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

    isLoginInvalid() {
        return !(this.state.email && this.state.pw);
    }

    changeToSignUp = () => {
        this.setState({
            login: false
        })
    }

    handleSignup = async (e) => {
        e.preventDefault();
        try {
            await userService.signup(this.state);

            this.props.handleSignupOrLogin();
            // Successfully signed up - show MainPage
            this.props.history.push('/');
        } catch (err) {

            this.props.updateMessage(err.message);
        }
    }

    isSignUpInvalid() {
        return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
    }

    render() {
        const entryForm = this.state.login ?

            <div className="login-container">
                <h2 className="heading">Log In</h2>
                <Form className="form-horizontal" onSubmit={this.handleLogin} >
                    <div className="login-form-group">
                        <Input required type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />

                        <Input required type="password" className="form-control" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />

                    </div>
                    <div className="form-button-group">
                        <Button inverted color='blue' disabled={this.isLoginInvalid()}>Log In</Button>
                    </div>
                </Form>
                <Button onClick={this.changeToSignUp} color='blue'>New User?</Button>
            </div>
            :
            <div>
                <h2 className="signup-heading">Sign Up</h2>
                <Form onSubmit={this.handleSignup} >
                    <div className="form-group">
                        <Input required type="text" className="form-control" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />

                        <Input required type="email" className="form-control" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />

                        <Input required type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />

                        <Input required type="password" className="form-control" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />

                    </div>
                    <div className="form-button-group">
                        <Button inverted color='blue' className="btn btn-default" disabled={this.isSignUpInvalid()}>Sign Up</Button>
                        <Link to='/'>Cancel</Link>
                    </div>
                </Form>
            </div>

        return (
            <>
                {entryForm}
            </>
        );
    }
}

export default LoginPage;
