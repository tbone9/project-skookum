import React, { Component } from 'react';
import athleteService from '../../utils/athleteService';
import { Link } from 'react-router-dom';
import SessionCard from '../../components/SessionCard/SessionCard';

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
        const sessions = this.state.athlete.sessions;
        console.log(sessions, 'sessions')
        return (
            <div>
                <h2>Athlete Page</h2>
                <h3>Name: {athlete.firstName} {athlete.lastName}</h3>
                <h3>Address: {athlete.address}</h3>
                <h3>{athlete.city}, {athlete.state} {athlete.zip}</h3>
                <Link to='/addSession'>Add a Training Session</Link>
                <h3>Training Sessions: </h3>

                {sessions ?

                    sessions.map(session => (

                        <SessionCard key={session._id} session={session} />
                    ))
                    : ''
                }
            </div>
        )
    }
}

export default AthletePage;