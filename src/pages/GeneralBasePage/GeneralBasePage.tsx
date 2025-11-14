import { type FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { Preloader } from '../../components/ui/Preloader/Preloader';
import Table from '../../components/layout/Table/Table';
import Pagination from '../../components/layout/Table/components/Pagination';
import { tableStore } from '../../store/table.store';
import SearchSection from './components/SearchSection';

// /. imports

const GeneralBasePage: FC = () => {
    const { isDataLoading } = tableStore;

    const [isPageLoading, setPageLoading] = useState<boolean>(true);

    // /. hooks

    useEffect(() => {
        let timeoutId: number | undefined;

        if (!isDataLoading) {
            timeoutId = setTimeout(() => {
                setPageLoading(false);
            }, 1400);
        }

        return () => clearTimeout(timeoutId);
    }, [isDataLoading]);

    // /. effects

    return (
        <div className="general-page">
            <>{isPageLoading && <Preloader />}</>

            <div
                className={`general-page__wrapper ${
                    isPageLoading ? 'blur' : ''
                }`}
            >
                <h1 className="title">Общая база сотрудников</h1>
                <SearchSection />
                <Table />
                <Pagination />
            </div>
        </div>
    );
};

export default observer(GeneralBasePage);
