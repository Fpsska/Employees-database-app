import React, { useEffect } from 'react';

import { fetchContactsData } from 'app/api/fetchContactsData';

import { switchContactsDataLoadingStatus } from 'app/slices/tableSlice';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import FindForm from 'components/layout/FindForm/FindForm';

import Table from 'components/layout/Table/Table';

import './App.css';
import 'assets/styles/style.scss';

// /. imports

const App: React.FC = () => {
    const {
        filteredContactsData,
        fetchContactsDataStatus,
        isContactsDataLoading,
        fetchContactsDataError
    } = useAppSelector(state => state.tableSlice);

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

    // /. effects

    return (
        <section className="App">
            <div className="page">
                <h1 className="page__title">Общая база сотрудников</h1>
                <div className="search-section">
                    <div className="search-section__group">
                        <div className="search-section__info">
                            <span className="search-section__counter">
                                {filteredContactsData.length}
                            </span>
                            <span className="search-section__text">
                                Контактов
                            </span>
                        </div>
                        <FindForm />
                    </div>
                    <button
                        className="search-section__button"
                        type="button"
                        disabled={!isBtnAvailable}
                    >
                        Режим редактирования
                    </button>
                </div>
                <Table />
            </div>
        </section>
    );
};
export default App;
