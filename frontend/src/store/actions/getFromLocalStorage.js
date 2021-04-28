import { getBlacklistFromLocalStorage, getSeenListFromLocalStorage } from './filmActions';

export const getFromLocalStorage = () => {
    return dispatch => {
        if (localStorage.blacklist) {
            dispatch(getBlacklistFromLocalStorage(JSON.parse(localStorage.blacklist)));
        }
        if (localStorage.seenList) {
            dispatch(getSeenListFromLocalStorage(JSON.parse(localStorage.seenList)));
        }
    }
};