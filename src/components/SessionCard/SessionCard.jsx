import React, { useState } from 'react';
// import UpdateSession from '../../modals/UpdateSession/UpdateSession';
import { Button } from 'semantic-ui-react';
import './styles.css';

function SessionCard(props) {

    const [showDetails, setShowDetails] = useState(false);
    let date = props.session.date;
    date = date.split('T');
    date = date[0];

    return (
        <div className='session-card-container' onClick={() => setShowDetails(!showDetails)}>
            <h3 >{date}</h3>
            {showDetails ?
                <>
                    <h3>Type: {props.session.type}</h3>
                    <h3>Duration: {props.session.duration}</h3>
                    <h3>Notes: {props.session.notes}</h3>
                    <Button inverted color='blue' onClick={() => props.handleClose(props.session)}>Update Session</Button>
                    <Button inverted color='blue' onClick={() => props.deleteSession(props.session._id)}>Remove</Button>
                </>
                : ''}

        </div >
    )
}

export default SessionCard;