import React, { useState } from 'react';
// import UpdateSession from '../../modals/UpdateSession/UpdateSession';

function SessionCard(props) {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            <h3 onClick={() => setShowDetails(!showDetails)}>{props.session.date}</h3>
            {showDetails ?
                <>
                    <h3>Type: {props.session.type}</h3>
                    <h3>Duration: {props.session.duration}</h3>
                    <h3>Notes: {props.session.notes}</h3>
                    <button onClick={() => props.handleClose(props.session)}>Update Session</button>
                    <button onClick={() => props.deleteSession(props.session._id)}>Remove</button>
                </>
                : ''}

        </div >
    )
}

export default SessionCard;