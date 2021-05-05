import React from "react";
import Search from '../icons/Search';
import Settings from '../icons/Settings';
import Hamburger from '../icons/Hamburger';
import CustomLink from '../CustomLink';

import { Radio } from 'antd';

import './Navigation.scss';

const Navigation = (props) => {
    return (
        <Radio.Group className="navigation__container" defaultValue={ props.checked } >

            <CustomLink to='/lists'
                        value="lists"
                        tag={ Radio }
                        className="navigation__buttons"
            >
                <Hamburger />
            </CustomLink>

            <span className="divition-line"></span>

            <CustomLink to='/film'
                        value="search"
                        tag={ Radio }
                        className="navigation__buttons"
            >
                <Search className="search-icon_small" />
            </CustomLink>

            <span className="divition-line"></span>

            <CustomLink to='/settings'
                        value="settings"
                        tag={ Radio }
                        className="navigation__buttons"
            >
                <Settings />
            </CustomLink>

        </Radio.Group>
    )
}

export default Navigation;
