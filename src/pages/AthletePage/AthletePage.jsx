import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './AthletePage.module.css';
import { Button, Icon } from 'semantic-ui-react';

// ------ Components ----- //
import SessionCard from '../../components/SessionCard/SessionCard';
import AddSession from '../../modals/AddSession/AddSession';
import UpdateAthlete from '../../modals/UpdateAthlete/UpdateAthlete';
import UpdateSession from '../../modals/UpdateSession/UpdateSession';
// import ProfileImage from '../../components/ProfileImage/ProfileImage';

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
            currentSession: {},
            showAddSession: false,
            showUpdateAthlete: false,
            showUpdateSession: false,
            showSessionDetails: false,
            warnDelete: false
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
        this.setState(prevState => ({ showAddSession: !prevState.showAddSession }))
    }

    addSession = async (e, session) => {
        e.preventDefault();
        const newSession = await sessionService.createSession(e, session);
        this.showAddSession();
        this.setState(prevState => ({
            sessions: [...prevState.sessions, newSession]
        }));

    }

    showUpdateAthlete = () => {
        this.setState(prevState => ({ showUpdateAthlete: !prevState.showUpdateAthlete }))
    }

    updateAthlete = async (e, athleteToUpdate) => {
        const athleteId = this.state.athlete._id;
        e.preventDefault();
        const athlete = await athleteService.editAthlete(e, athleteToUpdate, athleteId);
        this.showUpdateAthlete();
        this.setState((state) => {
            return {
                athlete: athlete.data
            }
        });
    }

    handleSessionDetails = () => {
        this.setState(prevState => ({
            showSessionDetails: !prevState.showSessionDetails
        }));
    }

    handleDeleteSession = async (sessionId) => {
        await sessionService.deleteSession(sessionId);
        const newSessionArray = this.state.sessions.filter(session => session._id !== sessionId);

        this.setState({
            sessions: newSessionArray
        });
    }

    showUpdateSession = (session) => {
        this.setState(prevState => ({
            showUpdateSession: !prevState.showUpdateSession,
            currentSession: session
        }));
    }

    updateSession = async (e, session, sessionId) => {
        e.preventDefault();
        const updatedSession = await sessionService.editSession(e, session, sessionId);
        console.log(updatedSession.data, 'Data')
        this.showUpdateSession();
        let sessionsArr = this.state.sessions;
        console.log(sessionsArr);

        let index = sessionsArr.findIndex(x => x._id === sessionId);
        sessionsArr[index] = updatedSession.data;
        console.log(sessionsArr);
        this.setState((state) => {
            return {
                sessions: sessionsArr
            }
        });

    }

    // gives you a warning before you delete
    warnDelete = () => {
        this.setState({
            warnDelete: true
        })
    }

    deleteAthlete = async () => {
        await athleteService.deleteAthlete(this.state.athlete._id);
        this.props.history.push('/');
    }

    render() {
        const athlete = this.state.athlete;
        const sessions = this.state.sessions;
        return (
            <div className={styles.container}>

                <Link className={styles.navLink} to='/'><Icon aria-hidden='true' className='arrow alternate circle left outline huge' /></Link>

                <h2>Athlete Details</h2>

                <h3>{athlete.firstName} {athlete.lastName}</h3>
                <img className={styles.profileImg} src={athlete.profileURL} alt='profile' />
                <h3>Address: {athlete.address}</h3>
                <h3>{athlete.city}, {athlete.state} {athlete.zip}</h3>

                {/* <ProfileImage /> */}

                <div className={styles.buttonGroup}>
                    <Button inverted color='blue' type='button' onClick={this.showAddSession}>Add Session</Button>
                    <Button inverted color='blue' type='button' onClick={this.showUpdateAthlete}>Update Athlete</Button>
                    {this.state.warnDelete ?
                        <Button color='red' type='button' onClick={this.deleteAthlete}>Are you sure?</Button>
                        :
                        <Button color='blue' type='button' onClick={this.warnDelete}>Delete Athlete</Button>
                    }

                </div>


                <h3>Training Sessions: </h3>

                {this.state.showAddSession ?
                    <AddSession addSession={this.addSession} showAddSession={this.state.showAddSession} handleClose={this.showAddSession} user={this.state.user} athleteId={this.props.match.params.id} />
                    : ''}

                {this.state.showUpdateAthlete ?
                    <UpdateAthlete
                        athlete={this.state.athlete}
                        updateAthlete={this.updateAthlete}
                        handleClose={this.showUpdateAthlete}
                        showUpdateAthlete={this.state.showUpdateAthlete}
                    />
                    : ''}

                {this.state.showUpdateSession ?
                    <UpdateSession
                        updateSession={this.updateSession}
                        session={this.state.currentSession}
                        handleClose={this.showUpdateSession}
                        showUpdateSession={this.state.showUpdateSession} />
                    : ''}

                <div className={styles.sessionGroup}>
                    {sessions.map(session => (

                        <SessionCard
                            key={session._id}
                            session={session}
                            deleteSession={this.handleDeleteSession} handleClose={this.showUpdateSession} showUpdateSession={this.state.showUpdateSession} />

                    ))}
                </div>

            </div >
        )
    }
}

export default AthletePage;