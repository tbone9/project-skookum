import React, { Component } from 'react';

// ------ styles ---------//
import { Button } from 'semantic-ui-react'

// ------ components ------- //
import LiveSearch from '../../components/LiveSearch/LiveSearch';
import AthleteCard from '../../components/AthleteCard/AthleteCard';
import AddAthlete from '../../modals/AddAthlete/AddAthlete';

import styles from './MainPage.module.css'
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
            <div className={styles.MainPage}>

                <h1 className={styles.heading}>AthleteDB</h1>

                <LiveSearch searchAthletes={this.searchAthletes} />
                <div className='button-group'>
                    <Button inverted color='blue' type='button' onClick={this.showAddAthlete}>Add Athlete</Button>
                    <Button inverted color='blue' type='button' onClick={this.showAllAthletes}>Show All Athletes</Button>
                </div>

                {this.state.showAddAthlete ?
                    <AddAthlete addAthlete={this.addAthlete} showAddAthlete={this.state.showAddAthlete} handleClose={this.showAddAthlete} />
                    : ''}

                <div className={styles.athleteGroup}>
                    {this.state.athletes ?
                        this.state.athletes.map(athlete => (

                            <AthleteCard history={this.props.history} key={athlete._id} athlete={athlete} />

                        ))
                        : ''}
                </div>

            </div>
        )
    }
}

export default MainPage;