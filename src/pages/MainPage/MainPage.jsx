import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import AthleteCard from '../../components/AthleteCard/AthleteCard';
import athleteService from '../../utils/athleteService';

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            athletes: []
        }
    }
    async componentDidMount() {
        const athletes = await athleteService.fetchAthletes();
        this.setState({
            athletes: athletes.data
        })
    }

    render() {
        return (
            <div>
                <NavBar
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />

                <h1>Main Page!</h1>
                <Link>Add Athlete</Link>

                <h2>Current Athletes</h2>

                {this.state.athletes.map(athlete => (
                    <AthleteCard athlete={athlete} />
                ))}
            </div>
        )
    }
}

export default MainPage;