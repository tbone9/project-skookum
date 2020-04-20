import React, { Component } from 'react';
import styles from './LiveSearch.module.css';

class LiveSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    handleOnInputChange = (e) => {
        this.setState({
            query: e.currentTarget.value,
        });
    };

    render() {
        return (
            <div className={styles.searchContainer}>
                <h2 className={styles.searchHeading}>Search for Athletes</h2>
                <label className={styles.searchLabel} htmlFor='search-input'>
                    <input type='text' id='search-input' placeholder='Search' name='query' onChange={this.handleOnInputChange} />
                    <i className={`fa fa-search ${styles.searchIcon}`} onClick={() => this.props.searchAthletes(this.state.query)} />
                </label>
            </div>
        )
    }
}

export default LiveSearch;