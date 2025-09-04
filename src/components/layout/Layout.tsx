import { type FC } from 'react';

import { Outlet } from 'react-router';

import Header from './Header/Header';

// /. imports

const Layout: FC = () => {
    return (
        <>
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <footer className="footer"></footer>
        </>
    );
};

export default Layout;
