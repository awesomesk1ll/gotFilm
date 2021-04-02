export const required = value => {
    if (value) return undefined;
    return 'Поле обязательное для заполнения';
};

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Не больше ${maxLength} символов`;
    return undefined;
};