import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'

import Home from "../pages/Home/Home"
import LoginForm from '../pages/LoginPage';
import RegistrationForm from "../pages/RegistrationPage";
import FilmCardContainer from './FilmCardContainer';
import Settings from '../pages/Settings';
import Lists from '../pages/Lists';
import {SeenList, History, Blacklist, Temporary, Favorites} from './List';

const routes = [
        { path: '/',             Component: Home                 , exact: true},
        { path: "/login",        Component: LoginForm            },
        { path: "/registration", Component: RegistrationForm     },
        { path: "/film",         Component: FilmCardContainer    },
        { path: "/settings",     Component: Settings             },
        { path: "/lists",        Component: Lists                },
        { path: "/history",      Component: History              },
        { path: "/seenList",     Component: SeenList             },
        { path: "/blacklist",    Component: Blacklist            },
        { path: "/temporary",    Component: Temporary            },
        { path: "/favorites",    Component: Favorites            }
    ];

const Router = (props) => {
    return (
        <BrowserRouter>
            {routes.map(({ path, Component, exact = false }) => (
                <Route key={ path } exact path={ path }>
                    {({ match }) => (
                        <CSSTransition in={match != null} timeout={2000} classNames="page" unmountOnExit>
                            <div className="page">
                                <Component />
                            </div>
                        </CSSTransition>
                    )}
                </Route>
            ))}
        </BrowserRouter>
    );
};

export default Router;