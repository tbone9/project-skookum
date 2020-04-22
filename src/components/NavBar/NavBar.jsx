import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
    let nav = props.user ?
        <div className='nav-user-group'>


            <div className='nav-welcome'>
                <span >WELCOME, {props.user.name}, to AthleteDB</span>
                <Link className='nav-link' to='' onClick={props.handleLogout}>Log Out</Link>
            </div>
        </div>
        :
        <div className='navHeader'>
            <h1>Welcome to AthleteDB!</h1>
        </div>;

    return (
        <nav className='NavBar'>
            {nav}
        </nav>
    );
};

export default NavBar;