import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router';

import Layout from '../Layout';

import './App.css';
import '../../../assets/styles/_media.scss';
import '../../../assets/styles/style.scss';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchContactsData } from '../../../app/api/fetchContactsData';
import { switchContactsDataLoadingStatus } from '../../../app/slices/tableSlice';
import GeneralBasePage from '../../../pages/GeneralBasePage/GeneralBasePage';
import PlaceholderPage from '../../../pages/PlaceholderPage/PlaceholderPage';
import NoFoundPage from '../../../pages/NoFoundPage/NoFoundPage';

// /. imports

const App: React.FC = () => {
    const { fetchContactsDataStatus } = useAppSelector(
        (state) => state.tableSlice
    );

    const dispatch = useAppDispatch();

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
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<GeneralBasePage />}
                    />
                    <Route
                        path="placeholder"
                        element={<PlaceholderPage />}
                    />
                    <Route
                        path="*"
                        element={<NoFoundPage />}
                    />
                </Route>
            </Routes>
        </div>
    );
};
export default App;
