import { type FC } from 'react';

import Navigation from '../Navigation/Navigation';
import Profile from '../../ui/Profile/Profile';

// /. imports

const Header: FC = () => {
    return (
        <>
            <header className="header">
                <div className="header__wrapper">
                    <Navigation additionalClass="header__navigation" />
                    <Profile additionalClass="header__profile" />
                </div>
            </header>
        </>
    );
};

export default Header;
