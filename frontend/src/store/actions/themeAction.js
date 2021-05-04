export const CHANGE_THEME = '@@theme/CHANGE_THEME'

export const changeTheme = (newTheme) => {
    return {
        type: CHANGE_THEME,
        newTheme: 'dark'
    }
}