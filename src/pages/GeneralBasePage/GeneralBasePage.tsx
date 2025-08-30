import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    setTableEditingKey,
    switchEditingMode
} from '../../app/slices/tableSlice';
import { declensionByQuantity } from '../../utilts/helpers/declensionByQuantity';
import { Preloader } from '../../components/ui/Preloader/Preloader';
import FindForm from '../../components/layout/FindForm/FindForm';
import Table from '../../components/layout/Table/Table';
import Pagination from '../../components/layout/Pagination/Pagination';

// /. imports

const GeneralBasePage: React.FC = () => {
    const {
        contactsData,
        filteredContactsData,
        isContactsDataLoading,
        fetchContactsDataError,
        isEditingMode
    } = useAppSelector((state) => state.tableSlice);

    const [contactsTextValue, setContactsTextValue] = useState<string>('');
    const [isPageLoading, setPageLoading] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    const isBtnAvailable =
        !isContactsDataLoading &&
        !fetchContactsDataError &&
        contactsData.length > 0 &&
        filteredContactsData?.length;

    // /. hooks

    const onEditButtonClick = (): void => {
        dispatch(switchEditingMode(!isEditingMode));
        dispatch(setTableEditingKey(''));
    };

    // /. functions

    useEffect(() => {
        !isContactsDataLoading &&
            setTimeout(() => {
                setPageLoading(false);
            }, 1400);
    }, [isContactsDataLoading]);

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

export default GeneralBasePage;
