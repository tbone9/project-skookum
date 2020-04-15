import React, { Component } from 'react';
import athleteService from '../../utils/athleteService';

class AthletePage extends Component {
    constructor() {
        super();
        this.state = {
            athlete: {}
        }
    }
    async componentDidMount() {
        const athlete = await athleteService.fetchAthlete(this.props.match.params.id);
        this.setState({
            athlete: athlete.data
        })
    }

    render() {
        const athlete = this.state.athlete;
        return (
            <div>
                <h2>Athlete Page</h2>
                <h3>Name: {athlete.firstName} {athlete.lastName}</h3>
                <h3>Address: {athlete.address}</h3>
                <h3>{athlete.city}, {athlete.state} {athlete.zip}</h3>

            </div>
        )
    }
}

export default AthletePage;