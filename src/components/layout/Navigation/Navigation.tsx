import React, { useState } from 'react';

import { headerNavigationData } from 'context/data';

import { IheaderNavigation } from 'types/data.Types';

import './navigation.scss';

// /. imports

const Navigation: React.FC<{ additionalClass: string }> = ({
    additionalClass
}) => {
    const [navigationData, setNavigationData] =
        useState<IheaderNavigation[]>(headerNavigationData);

    // /. hooks

    const onNavLinkClick = (
        e: React.SyntheticEvent,
        payloadID: number
    ): void => {
        e.preventDefault();
        e.stopPropagation();
        //
        const newNavArray = navigationData.map(link =>
            link.id === payloadID
                ? { ...link, isActive: true }
                : { ...link, isActive: false }
        );
        setNavigationData(newNavArray);
    };

    const onButtonNavClick = (direction: string): void => {
        const activeIDX = navigationData.findIndex(link => link.isActive);
        const dataCopy = [...navigationData];

        switch (direction) {
            case 'prev':
                if (activeIDX > 0) {
                    dataCopy[activeIDX].isActive = false;
                    dataCopy[activeIDX - 1].isActive = true;
                    setNavigationData(dataCopy);
                }
                break;
            case 'next':
                if (activeIDX < navigationData.length - 1) {
                    dataCopy[activeIDX].isActive = false;
                    dataCopy[activeIDX + 1].isActive = true;
                    setNavigationData(dataCopy);
                }
                break;
            default:
                return;
        }
    };

    // /. functions

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
            <ul className="navigation__list nav-list scroll">
                {navigationData.map((template: IheaderNavigation) => {
                    return (
                        <li
                            className={`nav-list__template ${
                                template.isActive ? 'active' : ''
                            }`}
                            onClick={e => onNavLinkClick(e, template.id)}
                            key={template.id}
                        >
                            <a
                                className="nav-list__link"
                                href="#"
                                onClick={e => onNavLinkClick(e, template.id)}
                            >
                                {template.text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Navigation;
