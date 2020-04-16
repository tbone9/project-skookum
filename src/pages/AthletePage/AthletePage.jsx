import React, { Component } from 'react';
import athleteService from '../../utils/athleteService';
import { Link } from 'react-router-dom';
import SessionCard from '../../components/SessionCard/SessionCard';
import AddSession from '../../modals/AddSession/AddSession';
import userService from '../../utils/userService';
import sessionService from '../../utils/sessionService';

class AthletePage extends Component {
    constructor() {
        super();
        this.state = {
            athlete: {},
            sessions: [],
            user: {},
            showAddSession: false
        }
    }

    async componentDidMount() {
        const athlete = await athleteService.fetchAthlete(this.props.match.params.id);
        const user = await userService.getUser();
        this.setState((state) => {
            return {
                athlete: athlete.data,
                user: user,
                sessions: athlete.data.sessions
            }
        });
    }

    showAddSession = () => {
        this.setState({ showAddSession: true })
    }

    hideAddSession = () => {
        this.setState({ showAddSession: false })

    }

    addSession = async (e, session) => {
        e.preventDefault();
        const newSession = await sessionService.createSession(e, session);
        console.log(newSession);
        // const athlete = await athleteService.fetchAthlete(this.props.match.params.id);
        this.hideAddSession();
        // console.log(athlete, 'athlete!!!');
        this.setState(prevState => ({
            sessions: [...prevState.sessions, newSession]
        }));

    }

    render() {
        const athlete = this.state.athlete;
        const sessions = this.state.sessions;
        console.log(sessions, 'sessions')
        return (
            <div>
                <h2>Athlete Page</h2>

                <h3>Name: {athlete.firstName} {athlete.lastName}</h3>
                <h3>Address: {athlete.address}</h3>
                <h3>{athlete.city}, {athlete.state} {athlete.zip}</h3>
                <button type='button' onClick={this.showAddSession}>Add Session</button>
                <h3>Training Sessions: </h3>

                <AddSession addSession={this.addSession} showAddSession={this.state.showAddSession} handleClose={this.hideAddSession} user={this.state.user} athleteId={this.props.match.params.id} />

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