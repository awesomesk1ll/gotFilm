import { CHANGE_THEME } from "../actions/themeAction";

const initStore = {
    class: null
}

export default function themeReducer(store = initStore, action) {
    switch (action.type) {
        case CHANGE_THEME: 
            return {...store, class: action.newTheme}
        default: return store;
    }
}