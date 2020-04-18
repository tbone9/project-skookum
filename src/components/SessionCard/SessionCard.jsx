import React, { useState } from 'react';

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
                </>
                : ''}

        </div >
    )
}

export default SessionCard;