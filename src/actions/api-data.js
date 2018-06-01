/**
 * Handles all requests for data to the API
 */

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const INVALIDATE_DATA = 'INVALIDATE_DATA';

const requestData = (endpoint) => {
    return {
        type: REQUEST_DATA,
        endpoint
    };
};
const receiveData = (endpoint, data) => {
    return {
        type: RECEIVE_DATA,
        endpoint,
        data,
        receivedAt: Date.now()
    }
}

const invalidateData = (endpoint) => {
    return {
        type: INVALIDATE_DATA,
        endpoint
    }
}

// TODO: functional invalidateData

const fetchData = (endpoint) => (dispatch) => {
    dispatch(requestData(endpoint))
    return fetch(`https://www.duttweiler.de/api/${endpoint}.json`)
        .then(
            response => response.json(),
            error => console.log('ERR: ', error)
        )
        .then(json => dispatch(receiveData(endpoint, json)))
}

const shouldFetchData = (state, endpoint) => {
    const data = state.dataByEndpoint[endpoint]
    if (!data)  {
        return true
    } else if (data.isFetching) {
        return false
    } else {
        return data.didInvalidate
    }
}

export const fetchDataIfNeeded = (endpoint) => {
    return (dispatch, getState) => {
        if (shouldFetchData(getState(), endpoint)) {
            return dispatch(fetchData(endpoint))
        } else {
            return Promise.resolve()
        }
    }
}
