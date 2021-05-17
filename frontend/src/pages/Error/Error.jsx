import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import './Error.scss';

const Error = ({ text }) => {
    const tryToRepair = useCallback(() => {
        localStorage.removeItem('settings');
        window.location.replace(window.location.href);
    }, []);

    return (
        <div className="error--wrapper">
            <div className="error__text"><span>{text}</span></div>
            <div className="error__buttons">
                <Button className="button" onClick={() => {window.location.replace(window.location.href);}}>Перезагрузить</Button>
                <Button className="button" onClick={tryToRepair}>Сброс настроек</Button>
            </div>
        </div>
    )
};

Error.propTypes = {
    error: PropTypes.string
};

export default Error;