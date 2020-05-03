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
            <span >{date}</span>
            {showDetails ?
                <>
                    <div className='session-details'>
                        <div className='sub-details'>
                            <span><strong>Type: </strong>{props.session.type}</span>
                            <span><strong>Duration: </strong>{props.session.duration}</span>
                        </div>

                        <span><strong>Notes: </strong>{props.session.notes}</span>
                    </div>
                    <Button inverted color='blue' onClick={() => props.handleClose(props.session)}>Update Session</Button>
                    <Button inverted color='blue' onClick={() => props.deleteSession(props.session._id)}>Remove</Button>
                </>
                : ''}

        </div >
    )
}

export default SessionCard;