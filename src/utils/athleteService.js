const BASE_URL = '/api/athletes/';

const createAthlete = async (e, athleteToCreate) => {
    e.preventDefault();
    try {
        const athlete = await fetch(BASE_URL + 'create', {
            method: 'POST',
            body: JSON.stringify(athleteToCreate),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await athlete.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const fetchAthlete = async (id) => {
    try {
        const athlete = await fetch(BASE_URL + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await athlete.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const fetchAthletes = async () => {
    try {
        const athletes = await fetch(BASE_URL + 'all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await athletes.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const editAthlete = async (e, athleteToUpdate, athleteId) => {
    e.preventDefault();
    try {
        const athlete = await fetch(BASE_URL + athleteId, {
            method: 'PUT',
            body: JSON.stringify(athleteToUpdate),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await athlete.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteAthlete = async (athleteId) => {
    try {
        const athlete = await fetch(BASE_URL + athleteId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await athlete.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

module.exports.createAthlete = createAthlete;
module.exports.fetchAthlete = fetchAthlete;
module.exports.fetchAthletes = fetchAthletes;
module.exports.editAthlete = editAthlete;
module.exports.deleteAthlete = deleteAthlete;