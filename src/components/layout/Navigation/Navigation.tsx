import {
    type FC,
    type SyntheticEvent,
    useState,
    useEffect,
    useRef
} from 'react';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router';

import './navigation.scss';
import { scrollToActiveElement } from '../../../utilts/helpers/scrollToActiveElement';

import { headerNavigationData } from '../../../context/data';

import type { IheaderNavigation } from '../../../types/dataTypes';

// /. imports

const Navigation: FC<{ additionalClass: string }> = ({ additionalClass }) => {
    const [navigationData, setNavigationData] = useState<IheaderNavigation[]>(
        []
    );

    const navListRef = useRef<HTMLUListElement>(null!);
    const navigate = useNavigate();

    // /. hooks

    const onNavLinkClick = (
        e: SyntheticEvent,
        template: IheaderNavigation
    ): void => {
        // e.stopPropagation();
        //
        const { id, href } = template;

        const newNavArray = navigationData.map((link) =>
            link.id === id
                ? { ...link, isActive: true }
                : { ...link, isActive: false }
        );
        setNavigationData(newNavArray);
        navigate(href);

        localStorage.setItem('navStorageData', JSON.stringify(newNavArray));
        scrollToActiveElement(navListRef);
    };

    const onButtonNavClick = (direction: string): void => {
        const activeIDX = navigationData.findIndex((link) => link.isActive);
        const dataCopy = [...navigationData];
        scrollToActiveElement(navListRef);

        switch (direction) {
            case 'prev':
                if (activeIDX > 0) {
                    dataCopy[activeIDX].isActive = false;
                    dataCopy[activeIDX - 1].isActive = true;
                    setNavigationData(dataCopy);
                    localStorage.setItem(
                        'navStorageData',
                        JSON.stringify(dataCopy)
                    );

                    navigate(dataCopy[activeIDX - 1].href, {
                        state: dataCopy[activeIDX - 1].text
                    });
                }
                break;
            case 'next':
                if (activeIDX < navigationData.length - 1) {
                    dataCopy[activeIDX].isActive = false;
                    dataCopy[activeIDX + 1].isActive = true;
                    setNavigationData(dataCopy);
                    localStorage.setItem(
                        'navStorageData',
                        JSON.stringify(dataCopy)
                    );

                    navigate(dataCopy[activeIDX + 1].href, {
                        state: dataCopy[activeIDX + 1].text
                    });
                }
                break;
            default:
                return;
        }
    };

    // /. functions

    useEffect(() => {
        // TODO
        const navStorageData = localStorage.getItem('navStorageData');

        if (navStorageData) {
            setNavigationData(JSON.parse(navStorageData));
        } else {
            setNavigationData(headerNavigationData);
        }
    }, []);

    return (
        <div className={`navigation ${additionalClass ? additionalClass : ''}`}>
            <div className="navigation__controls nav-controls">
                <button
                    className="nav-controls__button prev"
                    aria-label="switch to prev tab"
                    onClick={() => onButtonNavClick('prev')}
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
                    onClick={() => onButtonNavClick('next')}
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
                {navigationData.map((template: IheaderNavigation) => {
                    return (
                        <li
                            key={template.id}
                            className={`nav-list__template ${
                                template.isActive ? 'active' : ''
                            }`}
                        >
                            <Link
                                className="nav-list__link"
                                to={template.href}
                                state={template.text}
                                onClick={(e) => onNavLinkClick(e, template)}
                            >
                                {template.text}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Navigation;
