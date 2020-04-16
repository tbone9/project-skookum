import tokenService from './tokenService';
import athleteService from './athleteService';

const BASE_URL = '/api/sessions/';

const createSession = async (e, sessionToCreate) => {
    e.preventDefault();
    try {
        const session = await fetch(BASE_URL + 'create', {
            method: 'POST',
            body: JSON.stringify(sessionToCreate),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        });
        const response = await session.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const editSession = async (e, sessionToUpdate, sessionId) => {
    e.preventDefault();
    try {
        const session = await fetch(BASE_URL + sessionId, {
            method: 'PUT',
            body: JSON.stringify(sessionToUpdate),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        });
        const response = await session.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

const deleteSession = async (sessionId) => {
    try {
        const session = await fetch(BASE_URL + sessionId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenService.getToken()
            }
        });
        const response = await session.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default {
    createSession,
    editSession,
    deleteSession
}