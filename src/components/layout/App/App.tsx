import { type FC, useEffect } from 'react';

import { Route, Routes } from 'react-router';

import { observer } from 'mobx-react-lite';

import Layout from '../Layout';

import './App.css';
import '../../../assets/styles/_media.scss';
import '../../../assets/styles/style.scss';
import GeneralBasePage from '../../../pages/GeneralBasePage/GeneralBasePage';
import PlaceholderPage from '../../../pages/PlaceholderPage/PlaceholderPage';
import NoFoundPage from '../../../pages/NoFoundPage/NoFoundPage';

import { tableStore } from '../../../store/table.store';

// /. imports

const App: FC = () => {
    const { fetchContactsData } = tableStore;

    // /. hooks

    useEffect(() => {
        fetchContactsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        path="testing"
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

export default observer(App);
