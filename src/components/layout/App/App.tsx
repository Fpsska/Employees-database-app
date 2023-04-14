import React, { useEffect, useState } from 'react';

import { fetchContactsData } from 'app/api/fetchContactsData';

import {
    switchContactsDataLoadingStatus,
    switchEditingMode
} from 'app/slices/tableSlice';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import FindForm from 'components/layout/FindForm/FindForm';

import Table from 'components/layout/Table/Table';

import Pagination from 'components/layout/Pagination/Pagination';

import { declensionByQuantity } from 'utilts/helpers/declensionByQuantity';

import Navigation from 'components/layout/Navigation/Navigation';
import Profile from 'components/ui/Profile/Profile';

import './App.css';
import 'assets/styles/style.scss';

// /. imports

const App: React.FC = () => {
    const {
        filteredContactsData,
        fetchContactsDataStatus,
        isContactsDataLoading,
        fetchContactsDataError,
        isEditingMode
    } = useAppSelector(state => state.tableSlice);

    const [contactsTextValue, setContactsTextValue] = useState<string>('');

    const dispatch = useAppDispatch();

    const isBtnAvailable = !isContactsDataLoading && !fetchContactsDataError;

    // /. hooks

    useEffect(() => {
        dispatch(fetchContactsData());
    }, []);

    useEffect(() => {
        if (fetchContactsDataStatus !== 'loading') {
            setTimeout(() => {
                dispatch(switchContactsDataLoadingStatus(false));
            }, 1500);
        }
    }, [fetchContactsDataStatus]);

    useEffect(() => {
        const textValue = declensionByQuantity(filteredContactsData.length, [
            'контакт',
            'контакта',
            'контактов'
        ]);
        setContactsTextValue(textValue);
    }, [filteredContactsData]);

    // /. effects

    return (
        <div className="App">
            <div className="page">
                <header className="header">
                    <div className="header__wrapper">
                        <Navigation additionalClass="header__navigation" />
                        <Profile />
                    </div>
                </header>
                <main className="main">
                    <h1 className="page__title">Общая база сотрудников</h1>
                    <div className="search-section">
                        <div className="search-section__group">
                            <div className="search-section__info">
                                <span className="search-section__counter">
                                    {filteredContactsData.length}
                                </span>
                                <span className="search-section__text">
                                    {contactsTextValue}
                                </span>
                            </div>
                            <FindForm />
                        </div>
                        <button
                            className={`search-section__button ${
                                isEditingMode ? 'active' : ''
                            }`}
                            type="button"
                            disabled={!isBtnAvailable}
                            onClick={() =>
                                dispatch(switchEditingMode(!isEditingMode))
                            }
                        >
                            Режим редактирования
                        </button>
                    </div>
                    <Table />
                    <Pagination />
                </main>
                <footer className="footer"></footer>
            </div>
        </div>
    );
};
export default App;
