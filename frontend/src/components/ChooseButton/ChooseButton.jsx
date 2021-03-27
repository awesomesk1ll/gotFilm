import React from 'react';

import './chooseButton.scss';

const ChooseButton = (props) => {
    return (
        <button className="button">{props.children}</button>
    )
}

export default ChooseButton;