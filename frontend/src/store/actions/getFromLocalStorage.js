import { getBlacklistFromLocalStorage, getSeenListFromLocalStorage } from './filmActions';

export const getFromLocalStorage = () => {
    return dispatch => {
        if (localStorage.blacklist) {
            dispatch(getBlacklistFromLocalStorage(JSON.parse(localStorage.blacklist)));
        } else {
            dispatch(getBlacklistFromLocalStorage({ data: [], list: {} }));
        }
        if (localStorage.seenList) {
            dispatch(getSeenListFromLocalStorage(JSON.parse(localStorage.seenList)));
        } else {
            dispatch(getSeenListFromLocalStorage({ data: [], list: {} }));
        }
    }
};