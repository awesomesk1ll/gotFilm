import { getBlacklistFromLocalStorage, getSeenListFromLocalStorage, getHistoryFromLocalStorage } from './filmActions';

export const getFromLocalStorage = () => {
    return dispatch => {
        if (localStorage.blacklist) {
            dispatch(getBlacklistFromLocalStorage(JSON.parse(localStorage.blacklist)));
        }
        if (localStorage.seenList) {
            dispatch(getSeenListFromLocalStorage(JSON.parse(localStorage.seenList)));
        }
        if (localStorage.history) {
            dispatch(getHistoryFromLocalStorage(JSON.parse(localStorage.history)));
        }
    }
};