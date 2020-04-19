import React, { Component } from 'react';

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
            showAddAthlete: false
        }
    }
    async componentDidMount() {
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
        console.log(athlete);
        const newAthlete = await athleteService.createAthlete(e, athlete);
        console.log(newAthlete);
        //this setState adds the new athlete without fetching from db
        this.setState(prevState => ({
            athletes: [...prevState.athletes, newAthlete]
        }));
    }


    render() {
        return (
            <div className='MainPage'>
                <NavBar
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />

                <h1>Main Page!</h1>
                <button type='button' onClick={this.showAddAthlete}>Add Athlete</button>

                <AddAthlete addAthlete={this.addAthlete} showAddAthlete={this.state.showAddAthlete} handleClose={this.hideAddAthlete} />

                <h2>Current Athletes</h2>

                {this.state.athletes.map(athlete => (
                    <AthleteCard key={athlete._id} athlete={athlete} />
                ))}
            </div>
        )
    }
}

export default MainPage;