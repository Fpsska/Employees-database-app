import { type FC, type SyntheticEvent, useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router';

import './navigation.scss';
import { scrollToActiveElement } from '../../../utilts/helpers/scrollToActiveElement';

import { navigationData } from '../../../context/data';

import type { HeaderNavigation } from '../../../types/dataTypes';

// /. imports

interface INavigation {
    additionalClass: string;
}

const Navigation: FC<INavigation> = ({ additionalClass }) => {
    const [navigation, setNavigation] =
        useState<HeaderNavigation[]>(navigationData);

    const navListRef = useRef<HTMLUListElement>(null!);
    const navigate = useNavigate();

    // /. hooks

    const onNavLinkClick = (e: SyntheticEvent, nav: HeaderNavigation): void => {
        e.stopPropagation();
        if (nav.isActive) return;

        setNavigation((data) => {
            return data.map((link) => ({
                ...link,
                isActive: link.id == nav.id
            }));
        });
        scrollToActiveElement(navListRef);
        navigate(nav.href, {
            state: `Страница №${nav.id}`
        });
    };

    const onButtonPrevClick = (): void => {
        const activeNavIdx = navigation.findIndex((link) => link.isActive);
        if (activeNavIdx <= 0) return;

        const prevNavIdx = activeNavIdx - 1;
        const newNavigation = structuredClone(navigation);

        newNavigation[activeNavIdx].isActive = false;
        newNavigation[prevNavIdx].isActive = true;

        setNavigation(newNavigation);
        scrollToActiveElement(navListRef);
        navigate(newNavigation[prevNavIdx].href, {
            state: `Страница №${prevNavIdx + 1}`
        });
    };

    const onButtonNextClick = (): void => {
        const activeNavIdx = navigation.findIndex((link) => link.isActive);
        if (activeNavIdx >= navigation.length - 1) return;

        const nextNavIdx = activeNavIdx + 1;
        const newNavigation = structuredClone(navigation);

        newNavigation[activeNavIdx].isActive = false;
        newNavigation[nextNavIdx].isActive = true;

        setNavigation(newNavigation);
        scrollToActiveElement(navListRef);

        navigate(newNavigation[nextNavIdx].href, {
            state: `Страница №${nextNavIdx + 1}`
        });
    };

    // /. functions

    return (
        <div className={`navigation ${additionalClass ? additionalClass : ''}`}>
            <div className="navigation__controls nav-controls">
                <button
                    className="nav-controls__button prev"
                    aria-label="switch to prev tab"
                    onClick={onButtonPrevClick}
                >
                    <svg
                        width="10"
                        height="20"
                        viewBox="0 0 10 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.98326 10.3201L1.80078 18.9391C1.5014 19.2983 0.916667 19.0866 0.916667 18.619L0.916669 1.38102C0.916669 0.913375 1.5014 0.701675 1.80078 1.06093L8.98326 9.67991C9.13778 9.86533 9.13778 10.1347 8.98326 10.3201Z"
                            fill="#989FA3"
                        />
                    </svg>
                </button>
                <button
                    className="nav-controls__button next"
                    aria-label="switch to next tab"
                    onClick={onButtonNextClick}
                >
                    <svg
                        width="10"
                        height="20"
                        viewBox="0 0 10 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.98326 10.3201L1.80078 18.9391C1.5014 19.2983 0.916667 19.0866 0.916667 18.619L0.916669 1.38102C0.916669 0.913375 1.5014 0.701675 1.80078 1.06093L8.98326 9.67991C9.13778 9.86533 9.13778 10.1347 8.98326 10.3201Z"
                            fill="#989FA3"
                        />
                    </svg>
                </button>
            </div>
            <ul
                className="navigation__list nav-list scroll"
                ref={navListRef}
            >
                {navigation.map((nav) => {
                    return (
                        <li
                            key={nav.id}
                            className={`nav-list__template ${
                                nav.isActive ? 'active' : ''
                            }`}
                            onClick={(e) => onNavLinkClick(e, nav)}
                        >
                            <Link
                                className="nav-list__link"
                                to={nav.href}
                                state={nav.text}
                            >
                                {nav.text}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Navigation;
