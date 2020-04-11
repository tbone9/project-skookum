import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

class MainPage extends Component {
    // constructor() {
    //     super();

    // }
    render() {
        return (
            <div>
                <NavBar
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                <h1>Main Page!</h1>
            </div>
        )
    }
}

export default MainPage;