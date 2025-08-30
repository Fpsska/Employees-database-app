import React from 'react';

import { Outlet } from 'react-router';

import Profile from '../ui/Profile/Profile';

import Navigation from './Navigation/Navigation';

// /. imports

const Layout: React.FC = () => {
    // /. hooks

    return (
        <>
            <header className="header">
                <div className="header__wrapper">
                    <Navigation additionalClass="header__navigation" />
                    <Profile additionalClass="header__profile" />
                </div>
            </header>
            <main className="main">
                <Outlet />
            </main>
            <footer className="footer"></footer>
        </>
    );
};

export default Layout;
