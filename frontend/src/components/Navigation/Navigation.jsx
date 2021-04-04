import React from "react";
import { Link } from "react-router-dom";
import Search from '../icons/Search';
import Settings from '../icons/Settings';
import Hamburger from '../icons/Hamburger';
import CustomLink from '../CustomLink';

import { Radio } from 'antd';

import './Navigation.scss';
import renderEmpty from "antd/lib/config-provider/renderEmpty";

const Navigation = () => {
    return (
        <Radio.Group className="navigation-container" name="radiogroup" defaultValue={ 'search' } >

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