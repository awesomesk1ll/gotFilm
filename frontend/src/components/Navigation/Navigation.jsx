import React from "react";
import Search from '../icons/Search';
import Settings from '../icons/Settings';
import Hamburger from '../icons/Hamburger';
import CustomLink from '../CustomLink';

import { Radio } from 'antd';

import './Navigation.scss';

const Navigation = (props) => {
    return (
        <Radio.Group className="navigation-container" name="radiogroup" defaultValue={ props.checked } >

            <CustomLink
                tag={ Radio }
                to='/'
                value={ 'hamburger' }
                className={ `navigation-buttons ${props.checked === 'hamburger' ? 'navigation-buttons__checked' : ''}` }
            >
                <Hamburger />
            </CustomLink>
            <span className="divition-line"></span>
            <CustomLink
                tag={ Radio }
                to='/film'
                value={ 'search' }
                className={ `navigation-buttons ${props.checked === 'search' ? 'navigation-buttons__checked' : ''}` }
            >
                <Search className="search-icon_small" />
            </CustomLink>
            <span className="divition-line"></span>
            <CustomLink
                tag={ Radio }
                to='/settings'
                value={ 'settings' }
                className={ `navigation-buttons ${props.checked === 'settings' ? 'navigation-buttons__checked' : ''}` }
            >
                <Settings />
            </CustomLink>
        </Radio.Group>
    )
}

export default Navigation;