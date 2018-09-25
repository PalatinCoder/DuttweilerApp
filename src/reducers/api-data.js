/**
 * Handles all requests for data to the API
 */

import { REQUEST_DATA, RECEIVE_DATA, INVALIDATE_DATA } from '../actions/api-data'

const data = (
    state = {
        isFetching: false,
        didInvalidate: false,
        items: []
    },
    action
) => {
    switch(action.type) {
        case INVALIDATE_DATA:
            return Object.assign({}, state, { didInvalidate: true });
        case REQUEST_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.data,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
};

export const dataByEndpoint = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_DATA:
        case REQUEST_DATA:
        case INVALIDATE_DATA:
            return Object.assign({}, state, {
                [action.endpoint]: data(state[action.endpoint], action)
            })
        default:
            return state
    }
}
