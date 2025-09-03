import { type FC, useEffect, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { declensionByQuantity } from '../../utilts/helpers/declensionByQuantity';
import { Preloader } from '../../components/ui/Preloader/Preloader';
import FindForm from '../../components/layout/FindForm/FindForm';
import Table from '../../components/layout/Table/Table';
import Pagination from '../../components/layout/Pagination/Pagination';
import { tableStore } from '../../store/table.store';

// /. imports

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

    const [contactsTextValue, setContactsTextValue] = useState<string>('');
    const [isPageLoading, setPageLoading] = useState<boolean>(true);

    console.log('isDataLoading>', isDataLoading);
    console.log('fetchStatus>', fetchStatus);

    const isBtnAvailable =
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
        !isDataLoading &&
            setTimeout(() => {
                setPageLoading(false);
            }, 1400);
    }, [isDataLoading]);

    useEffect(() => {
        const textValue = declensionByQuantity(filteredContactsData?.length, [
            'контакт',
            'контакта',
            'контактов'
        ]);
        setContactsTextValue(textValue);
    }, [filteredContactsData]);

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
                        disabled={!isBtnAvailable}
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
