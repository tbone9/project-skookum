import React from 'react';
import { Link } from 'react-router-dom';

function AthleteCard(props) {
    return (
        <h3><Link to={`/athlete/${props.athlete._id}`}>{props.athlete.firstName} {props.athlete.lastName}</Link> - {props.athlete.city}, {props.athlete.state}</h3>
    )
}

export default AthleteCard;