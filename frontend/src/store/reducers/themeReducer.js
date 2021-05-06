import update from 'react-addons-update';
import { CHANGE_THEME } from "../actions/themeAction";

const initStore = {
    isLightTheme: true
}

export default function themeReducer(store = initStore, action) {
    switch (action.type) {
        case CHANGE_THEME: 
        return update(store, {
            isLightTheme: {
                $set: action.isLightTheme
            }
        })
        default: return store;
    }
}