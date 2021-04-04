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
            >
                <Hamburger />
            </CustomLink>
            <CustomLink
                tag={ Radio }
                to='/film'
                value={ 'search' }
            >
                <Search />
            </CustomLink>
            <CustomLink
                tag={ Radio }
                to='/'
                value={ 'settings' }
            >
                <Settings />
            </CustomLink>
        </Radio.Group>
    )
}

export default Navigation;