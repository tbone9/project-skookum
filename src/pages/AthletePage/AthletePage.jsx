import React, { Component } from 'react';

// ------ Components ----- //
import SessionCard from '../../components/SessionCard/SessionCard';
import AddSession from '../../modals/AddSession/AddSession';
import UpdateAthlete from '../../modals/UpdateAthlete/UpdateAthlete';

// ------- Services ------ //
import athleteService from '../../utils/athleteService';
import userService from '../../utils/userService';
import sessionService from '../../utils/sessionService';

class AthletePage extends Component {
    constructor() {
        super();
        this.state = {
            athlete: {},
            sessions: [],
            user: {},
            showAddSession: false,
            showUpdateAthlete: false,
            showSessionDetails: false
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
        this.hideAddSession();
        this.setState(prevState => ({
            sessions: [...prevState.sessions, newSession]
        }));

    }

    showUpdateAthlete = () => {
        this.setState({ showUpdateAthlete: true })
    }
    hideUpdateAthlete = () => {
        this.setState({ showUpdateAthlete: false })
    }
    updateAthlete = async (e, athleteToUpdate) => {
        const athleteId = this.state.athlete._id;
        e.preventDefault();
        const athlete = await athleteService.editAthlete(e, athleteToUpdate, athleteId);
        this.hideUpdateAthlete();
        this.setState((state) => {
            return {
                athlete: athlete.data
            }
        });
    }

    handleSessionDetails = () => {
        this.setState(prevState => ({
            showSessionDetails: !prevState.showSessionDetails
        }))
    }

    handleDeleteSession = async (sessionId) => {
        // e.preventDefault();
        // console.log(sessionId)
        await sessionService.deleteSession(sessionId);
        const newSessionArray = this.state.sessions.filter(session => session._id !== sessionId);

        this.setState({
            sessions: newSessionArray
        })
    }

    render() {
        const athlete = this.state.athlete;
        const sessions = this.state.sessions;
        return (
            <div>
                <h2>Athlete Page</h2>

                <h3>Name: {athlete.firstName} {athlete.lastName}</h3>
                <h3>Address: {athlete.address}</h3>
                <h3>{athlete.city}, {athlete.state} {athlete.zip}</h3>

                <button type='button' onClick={this.showAddSession}>Add Session</button>
                <button type='button' onClick={this.showUpdateAthlete}>Update Athlete</button>

                <h3>Training Sessions: </h3>

                <AddSession addSession={this.addSession} showAddSession={this.state.showAddSession} handleClose={this.hideAddSession} user={this.state.user} athleteId={this.props.match.params.id} />

                {this.state.athlete ?
                    <UpdateAthlete
                        athlete={this.state.athlete}
                        updateAthlete={this.updateAthlete}
                        handleClose={this.hideUpdateAthlete}
                        showUpdateAthlete={this.state.showUpdateAthlete}
                    />
                    : ''}

                {sessions.map(session => (

                    <SessionCard key={session._id} session={session} deleteSession={this.handleDeleteSession} />


                ))}

            </div>
        )
    }
}

export default AthletePage;