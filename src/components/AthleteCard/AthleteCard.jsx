import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function AthleteCard(props) {
    return (
        <Link className='athlete-link' history={props.history} to={`/athlete/${props.athlete._id}`}>
            <div className='card-container'>
                <img height='50px' src={props.athlete.profileURL}></img>
                <span>
                    {props.athlete.firstName} {props.athlete.lastName} - {props.athlete.city}, {props.athlete.state}
                </span>

            </div>
        </Link>
    )
}

export default AthleteCard;