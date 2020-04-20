import React, { Component } from 'react';
import LiveSearch from '../../components/LiveSearch/LiveSearch';

// ------ components ------- //
import NavBar from '../../components/NavBar/NavBar';
import AthleteCard from '../../components/AthleteCard/AthleteCard';
import AddAthlete from '../../modals/AddAthlete/AddAthlete';

// import styles from './MainPage.module.css'

import athleteService from '../../utils/athleteService';

class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            athletes: [],
            athlete: {},
            showAddAthlete: false
        }
    }

    showAllAthletes = async () => {
        const athletes = await athleteService.fetchAthletes();
        this.setState({
            athletes: athletes.data
        })
    }

    showAddAthlete = () => {
        this.setState({ showAddAthlete: true })
    }

    hideAddAthlete = () => {
        this.setState({ showAddAthlete: false })
    }

    addAthlete = async (e, athlete) => {
        e.preventDefault();
        this.hideAddAthlete();
        const newAthlete = await athleteService.createAthlete(e, athlete);
        //this setState adds the new athlete without fetching from db
        this.setState(prevState => ({
            athletes: [...prevState.athletes, newAthlete]
        }));
    }

    searchAthletes = async (query) => {
        const athletes = await athleteService.fetchAthleteQuery(query);
        this.setState({
            athletes: athletes.data
        });
    }


    render() {
        return (
            <div className='MainPage'>
                <NavBar
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />

                <h1>Main Page!</h1>

                <LiveSearch searchAthletes={this.searchAthletes} />

                <button type='button' onClick={this.showAddAthlete}>Add Athlete</button>
                <button type='button' onClick={this.showAllAthletes}>Show All Athletes</button>

                <AddAthlete addAthlete={this.addAthlete} showAddAthlete={this.state.showAddAthlete} handleClose={this.hideAddAthlete} />

                <h2>Current Athletes</h2>
                {this.state.athletes ?
                    this.state.athletes.map(athlete => (
                        <AthleteCard history={this.props.history} key={athlete._id} athlete={athlete} />
                    ))
                    : ''}
            </div>
        )
    }
}

export default MainPage;