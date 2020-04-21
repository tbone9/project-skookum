import React, { Component } from 'react';

// ------ components ------- //
import LiveSearch from '../../components/LiveSearch/LiveSearch';
// import NavBar from '../../components/NavBar/NavBar';
import AthleteCard from '../../components/AthleteCard/AthleteCard';
import AddAthlete from '../../modals/AddAthlete/AddAthlete';
// import Footer from '../../components/Footer/Footer';

// import styles from './MainPage.module.css'
import '../App/App.css';
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
        this.setState(prevState => ({ showAddAthlete: !prevState.showAddAthlete }))
    }

    addAthlete = async (e, athlete) => {
        e.preventDefault();
        this.showAddAthlete();
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

    makeAnError = () => {
        throw new Error('OMG What Happened?')
    }


    render() {
        return (
            <div className='mainPage'>

                <h1>Main Page!</h1>

                <LiveSearch searchAthletes={this.searchAthletes} />

                <button type='button' onClick={this.showAddAthlete}>Add Athlete</button>
                <button type='button' onClick={this.showAllAthletes}>Show All Athletes</button>

                <AddAthlete addAthlete={this.addAthlete} showAddAthlete={this.state.showAddAthlete} handleClose={this.showAddAthlete} />

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