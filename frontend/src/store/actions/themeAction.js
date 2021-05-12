export const CHANGE_THEME = '@@theme/CHANGE_THEME'

export const changeTheme = (isLightTheme) => ({
        type: CHANGE_THEME,
        isLightTheme: !isLightTheme
})