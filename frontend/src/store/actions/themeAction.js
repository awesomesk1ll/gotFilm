export const CHANGE_THEME = '@@theme/CHANGE_THEME'

export const changeTheme = (isLightTheme) => {
    return {
        type: CHANGE_THEME,
        isLightTheme: !isLightTheme
    }
}