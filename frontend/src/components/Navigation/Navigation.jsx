import React from "react";
import PropTypes from 'prop-types';
import Search from '../icons/Search';
import Settings from '../icons/Settings';
import Hamburger from '../icons/Hamburger';
import CustomLink from '../CustomLink';

import { Radio } from 'antd';

import './Navigation.scss';

const Navigation = ({ selection }) => {
    return (
        <Radio.Group className="navigation__container" defaultValue={ selection } value={ selection } >

            <CustomLink to='/lists'
                        value="lists"
                        tag={ Radio }
                        className="navigation__buttons"
            >
                <Hamburger />
            </CustomLink>

            <span className="divition-line"></span>

            <CustomLink to='/film'
                        value="film"
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

Navigation.propTypes = {
    selection: PropTypes.string
}

export default Navigation;