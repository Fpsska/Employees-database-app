import { type FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { declensionByQuantity } from '../../utilts/helpers/declensionByQuantity';
import { Preloader } from '../../components/ui/Preloader/Preloader';
import FindForm from '../../components/layout/FindForm/FindForm';
import Table from '../../components/layout/Table/Table';
import Pagination from '../../components/layout/Pagination/Pagination';
import { tableStore } from '../../store/table.store';

// /. imports

const contactTranslates = ['контакт', 'контакта', 'контактов'];

const GeneralBasePage: FC = () => {
    const {
        contactsData,
        filteredContactsData,
        isDataLoading,
        fetchStatus,
        isEditingMode,
        // actions
        setTableEditingKey,
        switchEditingMode
    } = tableStore;

    const [isPageLoading, setPageLoading] = useState<boolean>(true);

    // console.log('isDataLoading>', isDataLoading);
    // console.log('fetchStatus>', fetchStatus);

    const contactsTextValue = declensionByQuantity(
        filteredContactsData?.length,
        contactTranslates
    );

    const isBtnSearchAvailable =
        !isDataLoading &&
        fetchStatus === 'success' &&
        contactsData.length > 0 &&
        filteredContactsData?.length;

    // /. hooks

    const onEditButtonClick = (): void => {
        switchEditingMode(!isEditingMode);
        setTableEditingKey('');
    };

    // /. functions

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
                <div className="search-section">
                    <div className="search-section__group">
                        <div className="search-section__info">
                            <span className="search-section__counter">
                                {filteredContactsData?.length || 0}
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
                        disabled={!isBtnSearchAvailable}
                        onClick={onEditButtonClick}
                    >
                        Режим редактирования
                    </button>
                </div>
                <Table />
                <Pagination />
            </div>
        </div>
    );
};

export default observer(GeneralBasePage);
