import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import Home from "../pages/Home/Home";
import Navigation from "../components/Navigation";
import LoginForm from '../pages/LoginPage';
import RegistrationForm from "../pages/RegistrationPage";
import FilmCardContainer from './FilmCardContainer';
import Settings from '../pages/Settings';
import Lists from '../pages/Lists';
import {SeenList, History, Blacklist, Temporary, Favorites} from './List';

const getSelection = (path) => (path === 'film' || path === 'settings') ? path : 'lists';

const routes = [
        { path: '/',             Component: Home                                    , exact: true  },
        { path: "/login",        Component: LoginForm                               },
        { path: "/registration", Component: RegistrationForm                        },
        { path: "/film",         Component: FilmCardContainer    , showNav: true    },
        { path: "/settings",     Component: Settings             , showNav: true    },
        { path: "/lists",        Component: Lists                , showNav: true    },
        { path: "/history",      Component: History              , showNav: true    },
        { path: "/seenList",     Component: SeenList             , showNav: true    },
        { path: "/blacklist",    Component: Blacklist            , showNav: true    },
        { path: "/temporary",    Component: Temporary            , showNav: true    },
        { path: "/favorites",    Component: Favorites            , showNav: true    },
    ];

const Router = (props) => (
    <BrowserRouter>
        { routes.map(({ path, Component, exact = false, showNav = false }) => (
            <Route key={ path } exact={ exact } path={ path }>
                {({ match }) => (
                    <>
                        <CSSTransition in={match != null} timeout={700} classNames="page" unmountOnExit>
                            <div className="page">
                                <Component />
                            </div>
                        </CSSTransition>
                        { (match && showNav) && <Navigation selection={ getSelection(path.slice(1)) } />}
                    </>
                )}
            </Route>
        )) }
    </BrowserRouter>
)

export default Router;