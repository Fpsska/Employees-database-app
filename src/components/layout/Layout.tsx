import React from 'react';

import { Outlet } from 'react-router';

import Navigation from 'components/layout/Navigation/Navigation';
import Profile from 'components/ui/Profile/Profile';

// /. imports

const Layout: React.FC = () => {
    // /. hooks

    return (
        <div className="page">
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
        </div>
    );
};

export default Layout;
