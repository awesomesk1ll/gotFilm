import React from "react";
import { Link } from "react-router-dom";
import Search from '../icons/Search';
import Settings from '../icons/Settings';
import Hamburger from '../icons/Hamburger';

import { Radio } from 'antd';

import './Navigation.scss';

const Navigation = () => {
    return (
        <Radio.Group className="navigation-container" name="radiogroup" defaultValue={ 'search' }>
            <Radio value={ 'hamburger' }><Hamburger /></Radio>
            <Radio value={ 'search' }><Search /></Radio>
            <Radio value={ 'settings' }><Settings /></Radio>
        </Radio.Group>
    )
}

export default Navigation;