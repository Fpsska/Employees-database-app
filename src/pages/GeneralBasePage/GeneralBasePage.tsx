import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { switchEditingMode } from 'app/slices/tableSlice';

import { declensionByQuantity } from 'utilts/helpers/declensionByQuantity';

import FindForm from 'components/layout/FindForm/FindForm';
import Pagination from 'components/layout/Pagination/Pagination';

import Table from 'components/layout/Table/Table';

// /. imports

const GeneralBasePage: React.FC = () => {
    const {
        contactsData,
        filteredContactsData,
        isContactsDataLoading,
        fetchContactsDataError,
        isEditingMode
    } = useAppSelector(state => state.tableSlice);

    const [contactsTextValue, setContactsTextValue] = useState<string>('');

    const dispatch = useAppDispatch();

    const isBtnAvailable =
        !isContactsDataLoading &&
        !fetchContactsDataError &&
        contactsData.length > 0 &&
        filteredContactsData?.length;

    // /. hooks

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
                    onClick={() => dispatch(switchEditingMode(!isEditingMode))}
                >
                    Режим редактирования
                </button>
            </div>
            <Table />
            <Pagination />
        </div>
    );
};

export default GeneralBasePage;
