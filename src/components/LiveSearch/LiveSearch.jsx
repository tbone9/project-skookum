import React, { useState } from 'react';
import styles from './LiveSearch.module.css';
import { Input } from 'semantic-ui-react'


function LiveSearch(props) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleOnInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={styles.searchContainer}>
            <h2 className={styles.searchHeading}>Search for Athletes</h2>

            <form onSubmit={(e) => {
                e.preventDefault();
                props.searchAthletes(searchTerm)
            }} className={styles.searchForm}>
                <Input type='text' id='search-input' placeholder='First Name...' value={searchTerm} name='query' onChange={handleOnInputChange} />
                <button type='submit' className='ui button' >Go</button>
            </form>

        </div >
    )
}


export default LiveSearch;